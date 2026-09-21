import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Team,
  Question,
  GameSettings,
  GameStatus,
  RoundResult,
  DifficultyLevel,
  OpponentMode,
  BotDifficulty,
} from './types/game';
import { QUESTIONS, getNextQuestion, getNextDifficulty } from './data/questions';
import { soundFx } from './utils/audio';
import { HeaderNav } from './components/HeaderNav';
import { TimerDashboard } from './components/TimerDashboard';
import { TugOfWarArena } from './components/TugOfWarArena';
import { QuestionCard } from './components/QuestionCard';
import { QuestionManager } from './components/QuestionManager';
import { RoundEndModal } from './components/RoundEndModal';
import { GameSettingsModal } from './components/GameSettingsModal';
import { RulesModal } from './components/RulesModal';
import { AnimalSelectionModal } from './components/AnimalSelectionModal';
import { DEFAULT_RED_MASCOT, DEFAULT_BLUE_MASCOT } from './data/animals';
import { AnimalMascot } from './types/game';
import { Play, Pause, RotateCcw, Swords, Volume2, HelpCircle, Sparkles, BookOpen, Bot, Users, Cpu, Loader2, Keyboard } from 'lucide-react';

const STORAGE_KEY_QUESTIONS = 'tug_of_war_custom_questions_v1';

const DEFAULT_SETTINGS: GameSettings = {
  questionTimeLimit: 15,
  roundTimeLimit: 90,
  maxRounds: 3, // Best of 3 (first to 2 wins)
  winRopeThreshold: 35, // -35m Red wins, +35m Blue wins
  pullPowerPerAnswer: 10,
  categories: ['science', 'history', 'culture'],
  soundEnabled: true,
  gameMode: 'turn_based',
  opponentMode: 'pvp',
  botDifficulty: 'medium',
};

export default function App() {
  // Game settings
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  // Teams state
  const [teamA, setTeamA] = useState<Team>({
    id: 'red',
    name: 'Chiến Binh Đỏ',
    color: '#f43f5e',
    accentColor: '#fb7185',
    mascot: DEFAULT_RED_MASCOT,
    roundsWon: 0,
    currentDifficulty: 'easy',
    totalCorrect: 0,
    totalAnswered: 0,
    fastestAnswerTime: null,
  });

  const [teamB, setTeamB] = useState<Team>({
    id: 'blue',
    name: 'Thần Tốc Xanh',
    color: '#3b82f6',
    accentColor: '#60a5fa',
    mascot: DEFAULT_BLUE_MASCOT,
    roundsWon: 0,
    currentDifficulty: 'easy',
    totalCorrect: 0,
    totalAnswered: 0,
    fastestAnswerTime: null,
  });

  // Game flow states
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu');
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [ropePosition, setRopePosition] = useState<number>(0); // -50 (Red) to +50 (Blue)
  const [activeTurn, setActiveTurn] = useState<'red' | 'blue'>('red');

  // Timers
  const [roundTimer, setRoundTimer] = useState<number>(DEFAULT_SETTINGS.roundTimeLimit);
  const [teamATimer, setTeamATimer] = useState<number>(DEFAULT_SETTINGS.questionTimeLimit);
  const [teamBTimer, setTeamBTimer] = useState<number>(DEFAULT_SETTINGS.questionTimeLimit);

  // Tabs state: Arena vs Question Manager
  const [activeNavTab, setActiveNavTab] = useState<'arena' | 'questions'>('arena');

  // Question bank with local persistence
  const [questionsPool, setQuestionsPool] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to parse questions from localStorage', err);
    }
    return QUESTIONS;
  });

  // Save to localStorage whenever questions pool changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questionsPool));
    } catch (err) {
      console.error('Failed to persist questions to localStorage', err);
    }
  }, [questionsPool]);

  // Questions and tracking (guaranteeing no duplicates)
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Question Manager handlers
  const handleAddQuestion = (newQuestion: Question) => {
    setQuestionsPool(prev => [newQuestion, ...prev]);
  };

  const handleUpdateQuestion = (updated: Question) => {
    setQuestionsPool(prev => prev.map(q => (q.id === updated.id ? updated : q)));
    if (currentQuestion && currentQuestion.id === updated.id) {
      setCurrentQuestion(updated);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestionsPool(prev => prev.filter(q => q.id !== questionId));
    if (currentQuestion && currentQuestion.id === questionId) {
      loadQuestionForTurn(activeTurn, usedQuestionIds);
    }
  };

  const handleResetQuestionsToDefaults = () => {
    setQuestionsPool(QUESTIONS);
    try {
      localStorage.removeItem(STORAGE_KEY_QUESTIONS);
    } catch (err) {
      console.error(err);
    }
  };

  // Animation & Results
  const [lastPullEvent, setLastPullEvent] = useState<{
    teamId: 'red' | 'blue';
    amount: number;
    text: string;
  } | null>(null);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [isMatchOver, setIsMatchOver] = useState<boolean>(false);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isAnimalSelectOpen, setIsAnimalSelectOpen] = useState<boolean>(false);

  // Bot / AI Opponent states & timers
  const [isBotThinking, setIsBotThinking] = useState<boolean>(false);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState<number | null>(null);
  const [pressedKeyIndex, setPressedKeyIndex] = useState<number | null>(null);
  const botTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelectOpponentMode = useCallback((mode: OpponentMode) => {
    setSettings(prev => ({ ...prev, opponentMode: mode }));
    if (mode === 'ai') {
      setTeamB(prev => ({
        ...prev,
        name: prev.name === 'Thần Tốc Xanh' ? 'Máy AI Thông Minh' : prev.name,
      }));
    } else {
      setTeamB(prev => ({
        ...prev,
        name: prev.name === 'Máy AI Thông Minh' ? 'Thần Tốc Xanh' : prev.name,
      }));
    }
  }, []);

  const handleConfirmAnimalSelection = (redMascot: AnimalMascot, blueMascot: AnimalMascot) => {
    setTeamA(prev => ({ ...prev, mascot: redMascot }));
    setTeamB(prev => ({ ...prev, mascot: blueMascot }));
  };

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync sound settings
  useEffect(() => {
    soundFx.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

  // Load a new question for the team whose turn it is
  const loadQuestionForTurn = useCallback(
    (turnTeamId: 'red' | 'blue', usedIds: Set<string>) => {
      const activeTeam = turnTeamId === 'red' ? teamA : teamB;
      const nextQ = getNextQuestion(
        settings.categories,
        activeTeam.currentDifficulty,
        usedIds,
        questionsPool
      );

      if (nextQ) {
        setCurrentQuestion(nextQ);
        const updatedUsed = new Set(usedIds);
        updatedUsed.add(nextQ.id);
        setUsedQuestionIds(updatedUsed);
      }

      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);

      // Reset individual team timer
      if (turnTeamId === 'red') {
        setTeamATimer(settings.questionTimeLimit);
      } else {
        setTeamBTimer(settings.questionTimeLimit);
      }
    },
    [settings.categories, settings.questionTimeLimit, teamA, teamB, questionsPool]
  );

  // Start a new match
  const startNewMatch = useCallback(() => {
    if (botTimerRef.current) {
      clearTimeout(botTimerRef.current);
      botTimerRef.current = null;
    }
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setIsBotThinking(false);
    setAutoAdvanceSeconds(null);

    soundFx.playWhistle();
    setActiveNavTab('arena');
    setCurrentRound(1);
    setRopePosition(0);
    setActiveTurn('red');
    setRoundTimer(settings.roundTimeLimit);
    setTeamATimer(settings.questionTimeLimit);
    setTeamBTimer(settings.questionTimeLimit);
    setIsMatchOver(false);
    setRoundResult(null);
    setLastPullEvent(null);

    const freshUsed = new Set<string>();
    setUsedQuestionIds(freshUsed);

    setTeamA(prev => ({
      ...prev,
      roundsWon: 0,
      currentDifficulty: 'easy',
      totalCorrect: 0,
      totalAnswered: 0,
    }));

    setTeamB(prev => ({
      ...prev,
      roundsWon: 0,
      currentDifficulty: 'easy',
      totalCorrect: 0,
      totalAnswered: 0,
    }));

    setGameStatus('playing');

    // Load first question for Red team
    const firstQ = getNextQuestion(settings.categories, 'easy', freshUsed, questionsPool);
    if (firstQ) {
      setCurrentQuestion(firstQ);
      freshUsed.add(firstQ.id);
      setUsedQuestionIds(freshUsed);
    }
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
  }, [settings.categories, settings.questionTimeLimit, settings.roundTimeLimit, questionsPool]);

  // Handle Round Conclusion and Automatic Difficulty Increase
  const handleEndRound = useCallback(
    (forcedWinner?: 'red' | 'blue' | 'draw') => {
      if (botTimerRef.current) {
        clearTimeout(botTimerRef.current);
        botTimerRef.current = null;
      }
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
      setIsBotThinking(false);
      setAutoAdvanceSeconds(null);

      soundFx.playVictory();
      setGameStatus('round_end');

      let winner: 'red' | 'blue' | 'draw' = forcedWinner || 'draw';
      if (!forcedWinner) {
        if (ropePosition <= -1) winner = 'red';
        else if (ropePosition >= 1) winner = 'blue';
        else winner = 'draw';
      }

      const winnerName = winner === 'red' ? teamA.name : winner === 'blue' ? teamB.name : 'Hòa';

      let upgradedTeam: 'red' | 'blue' | undefined;
      let newDiff: DifficultyLevel | undefined;

      // AUTOMATIC DIFFICULTY PROGRESSION FOR WINNING TEAM
      if (winner === 'red') {
        const nextDifficulty = getNextDifficulty(teamA.currentDifficulty);
        upgradedTeam = 'red';
        newDiff = nextDifficulty;
        setTeamA(prev => ({
          ...prev,
          roundsWon: prev.roundsWon + 1,
          currentDifficulty: nextDifficulty,
        }));
      } else if (winner === 'blue') {
        const nextDifficulty = getNextDifficulty(teamB.currentDifficulty);
        upgradedTeam = 'blue';
        newDiff = nextDifficulty;
        setTeamB(prev => ({
          ...prev,
          roundsWon: prev.roundsWon + 1,
          currentDifficulty: nextDifficulty,
        }));
      }

      const updatedAWins = winner === 'red' ? teamA.roundsWon + 1 : teamA.roundsWon;
      const updatedBWins = winner === 'blue' ? teamB.roundsWon + 1 : teamB.roundsWon;

      // Check match victory (e.g. Best of 3 => 2 wins, Best of 5 => 3 wins)
      const targetWins = Math.ceil(settings.maxRounds / 2);
      const matchEnded =
        updatedAWins >= targetWins ||
        updatedBWins >= targetWins ||
        currentRound >= settings.maxRounds;

      setIsMatchOver(matchEnded);

      setRoundResult({
        roundNumber: currentRound,
        winnerId: winner,
        winnerName,
        finalRopePosition: ropePosition,
        redCorrect: teamA.totalCorrect,
        blueCorrect: teamB.totalCorrect,
        difficultyUpgradedTeam: upgradedTeam,
        newDifficultyLevel: newDiff,
      });
    },
    [currentRound, ropePosition, settings.maxRounds, teamA, teamB]
  );

  // Next round setup
  const handleNextRound = () => {
    if (botTimerRef.current) {
      clearTimeout(botTimerRef.current);
      botTimerRef.current = null;
    }
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setIsBotThinking(false);
    setAutoAdvanceSeconds(null);

    soundFx.playWhistle();
    const nextRoundNum = currentRound + 1;
    setCurrentRound(nextRoundNum);
    setRopePosition(0);
    setRoundTimer(settings.roundTimeLimit);
    setTeamATimer(settings.questionTimeLimit);
    setTeamBTimer(settings.questionTimeLimit);
    setLastPullEvent(null);
    setRoundResult(null);

    // Alternate starting team per round
    const nextStartingTeam: 'red' | 'blue' = nextRoundNum % 2 === 1 ? 'red' : 'blue';
    setActiveTurn(nextStartingTeam);
    setGameStatus('playing');

    loadQuestionForTurn(nextStartingTeam, usedQuestionIds);
  };

  // Handle Answer Selection
  const handleSelectOption = useCallback((optionIndex: number) => {
    if (isAnswerSubmitted || !currentQuestion || gameStatus !== 'playing') return;

    setSelectedOptionIndex(optionIndex);
    setIsAnswerSubmitted(true);

    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    const isRed = activeTurn === 'red';

    if (isCorrect) {
      soundFx.playCorrect();
      soundFx.playRopeTug();

      // Pull distance calculation based on question difficulty & speed bonus
      const remainingTime = isRed ? teamATimer : teamBTimer;
      const speedBonus = remainingTime > settings.questionTimeLimit * 0.6 ? 4 : 0;
      const basePull = settings.pullPowerPerAnswer;
      const totalPull = basePull + speedBonus;

      // Red pulls left (negative), Blue pulls right (positive)
      const delta = isRed ? -totalPull : totalPull;
      const newPos = Math.max(-50, Math.min(50, ropePosition + delta));
      setRopePosition(newPos);

      setLastPullEvent({
        teamId: activeTurn,
        amount: totalPull,
        text: `${isRed ? teamA.name : teamB.name} kéo +${totalPull}m!${speedBonus > 0 ? ' (Thưởng tốc độ ⚡)' : ''}`,
      });

      // Update team stats
      if (isRed) {
        setTeamA(prev => ({
          ...prev,
          totalCorrect: prev.totalCorrect + 1,
          totalAnswered: prev.totalAnswered + 1,
        }));
      } else {
        setTeamB(prev => ({
          ...prev,
          totalCorrect: prev.totalCorrect + 1,
          totalAnswered: prev.totalAnswered + 1,
        }));
      }

      // Check immediate threshold victory
      if (newPos <= -settings.winRopeThreshold) {
        setTimeout(() => handleEndRound('red'), 800);
      } else if (newPos >= settings.winRopeThreshold) {
        setTimeout(() => handleEndRound('blue'), 800);
      }
    } else {
      soundFx.playWrong();

      // Incorrect answer: Opponent gains small counter-tug advantage (+4m)
      const penaltyDelta = isRed ? 4 : -4;
      const newPos = Math.max(-50, Math.min(50, ropePosition + penaltyDelta));
      setRopePosition(newPos);

      setLastPullEvent({
        teamId: isRed ? 'blue' : 'red',
        amount: 4,
        text: `Sai rồi! ${isRed ? teamB.name : teamA.name} hưởng ưu thế +4m!`,
      });

      if (isRed) {
        setTeamA(prev => ({ ...prev, totalAnswered: prev.totalAnswered + 1 }));
      } else {
        setTeamB(prev => ({ ...prev, totalAnswered: prev.totalAnswered + 1 }));
      }

      // Check threshold
      if (newPos <= -settings.winRopeThreshold) {
        setTimeout(() => handleEndRound('red'), 800);
      } else if (newPos >= settings.winRopeThreshold) {
        setTimeout(() => handleEndRound('blue'), 800);
      }
    }
  }, [
    isAnswerSubmitted,
    currentQuestion,
    gameStatus,
    activeTurn,
    teamATimer,
    teamBTimer,
    settings.questionTimeLimit,
    settings.pullPowerPerAnswer,
    settings.winRopeThreshold,
    ropePosition,
    teamA.name,
    teamB.name,
    handleEndRound,
  ]);

  // Move to Next Question (Switch turn between Team Red and Team Blue)
  const handleNextQuestion = useCallback(() => {
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    setAutoAdvanceSeconds(null);
    const nextTurn: 'red' | 'blue' = activeTurn === 'red' ? 'blue' : 'red';
    setActiveTurn(nextTurn);
    loadQuestionForTurn(nextTurn, usedQuestionIds);
  }, [activeTurn, loadQuestionForTurn, usedQuestionIds]);

  // Bot thinking & automated answering effect when playing with AI
  useEffect(() => {
    if (
      gameStatus === 'playing' &&
      settings.opponentMode === 'ai' &&
      activeTurn === 'blue' &&
      !isAnswerSubmitted &&
      currentQuestion
    ) {
      setIsBotThinking(true);

      // Natural thinking delay between 1.6s and 2.6s
      const thinkingDelay = Math.floor(Math.random() * 1000) + 1600;

      botTimerRef.current = setTimeout(() => {
        let accuracy = 0.75;
        if (settings.botDifficulty === 'easy') accuracy = 0.60;
        else if (settings.botDifficulty === 'medium') accuracy = 0.75;
        else if (settings.botDifficulty === 'hard') accuracy = 0.88;
        else if (settings.botDifficulty === 'expert') accuracy = 0.96;

        const isCorrect = Math.random() < accuracy;
        let chosenOption = currentQuestion.correctAnswerIndex;

        if (!isCorrect) {
          const wrongOptions = [0, 1, 2, 3].filter(i => i !== currentQuestion.correctAnswerIndex);
          chosenOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        }

        setIsBotThinking(false);
        handleSelectOption(chosenOption);
      }, thinkingDelay);

      return () => {
        if (botTimerRef.current) {
          clearTimeout(botTimerRef.current);
          botTimerRef.current = null;
        }
      };
    }
  }, [
    gameStatus,
    settings.opponentMode,
    activeTurn,
    isAnswerSubmitted,
    currentQuestion,
    settings.botDifficulty,
    handleSelectOption,
  ]);

  // Auto-advance timer after Bot's turn answer submission
  useEffect(() => {
    if (
      gameStatus === 'playing' &&
      settings.opponentMode === 'ai' &&
      activeTurn === 'blue' &&
      isAnswerSubmitted
    ) {
      setAutoAdvanceSeconds(3);
      const interval = setInterval(() => {
        setAutoAdvanceSeconds(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            handleNextQuestion();
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      autoAdvanceTimerRef.current = interval;

      return () => {
        clearInterval(interval);
      };
    } else {
      setAutoAdvanceSeconds(null);
    }
  }, [gameStatus, settings.opponentMode, activeTurn, isAnswerSubmitted, handleNextQuestion]);

  // Timeout handler for active team question timer
  const handleQuestionTimeout = useCallback(() => {
    if (isAnswerSubmitted || gameStatus !== 'playing') return;

    soundFx.playWrong();
    setIsAnswerSubmitted(true);
    setSelectedOptionIndex(-1); // None selected

    const isRed = activeTurn === 'red';
    // Penalty: Opponent gets +4m pull
    const penaltyDelta = isRed ? 4 : -4;
    const newPos = Math.max(-50, Math.min(50, ropePosition + penaltyDelta));
    setRopePosition(newPos);

    setLastPullEvent({
      teamId: isRed ? 'blue' : 'red',
      amount: 4,
      text: `Hết giờ! ${isRed ? teamA.name : teamB.name} bị phạt!`,
    });

    if (isRed) {
      setTeamA(prev => ({ ...prev, totalAnswered: prev.totalAnswered + 1 }));
    } else {
      setTeamB(prev => ({ ...prev, totalAnswered: prev.totalAnswered + 1 }));
    }
  }, [activeTurn, gameStatus, isAnswerSubmitted, ropePosition, teamA.name, teamB.name]);

  // Main Active Game Loop Timer
  useEffect(() => {
    if (gameStatus !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 100;
    timerRef.current = setInterval(() => {
      // 1. Overall round timer countdown
      if (settings.roundTimeLimit > 0) {
        setRoundTimer(prev => {
          const next = prev - intervalMs / 1000;
          if (next <= 0) {
            handleEndRound();
            return 0;
          }
          if (next <= 5 && Math.floor(next * 10) % 10 === 0) {
            soundFx.playTick(true);
          }
          return next;
        });
      }

      // 2. Active Team question timer countdown
      if (!isAnswerSubmitted) {
        if (activeTurn === 'red') {
          setTeamATimer(prev => {
            const next = prev - intervalMs / 1000;
            if (next <= 0) {
              handleQuestionTimeout();
              return 0;
            }
            if (next <= 4 && Math.floor(next * 10) % 10 === 0) {
              soundFx.playTick(true);
            }
            return next;
          });
        } else {
          setTeamBTimer(prev => {
            const next = prev - intervalMs / 1000;
            if (next <= 0) {
              handleQuestionTimeout();
              return 0;
            }
            if (next <= 4 && Math.floor(next * 10) % 10 === 0) {
              soundFx.playTick(true);
            }
            return next;
          });
        }
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [
    activeTurn,
    gameStatus,
    handleEndRound,
    handleQuestionTimeout,
    isAnswerSubmitted,
    settings.roundTimeLimit,
  ]);

  // Keyboard controls listener (Dedicated physical keys A, B, C, D & 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger shortcuts when typing inside form inputs or textareas
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Do not trigger while a modal or Question Manager tab is open
      if (isSettingsOpen || isRulesOpen || isAnimalSelectOpen || activeNavTab !== 'arena') {
        return;
      }

      if (gameStatus !== 'playing') return;

      if (!isAnswerSubmitted) {
        // Prevent player keyboard from answering during Bot's thinking turn
        if (settings.opponentMode === 'ai' && activeTurn === 'blue') {
          return;
        }

        const key = e.key.toLowerCase();
        const code = e.code;

        let selectedOptionIdx: number | null = null;

        // Phím A hoặc Phím 1
        if (
          code === 'KeyA' ||
          key === 'a' ||
          code === 'Digit1' ||
          code === 'Numpad1' ||
          key === '1'
        ) {
          selectedOptionIdx = 0;
        }
        // Phím B hoặc Phím 2
        else if (
          code === 'KeyB' ||
          key === 'b' ||
          code === 'Digit2' ||
          code === 'Numpad2' ||
          key === '2'
        ) {
          selectedOptionIdx = 1;
        }
        // Phím C hoặc Phím 3
        else if (
          code === 'KeyC' ||
          key === 'c' ||
          code === 'Digit3' ||
          code === 'Numpad3' ||
          key === '3'
        ) {
          selectedOptionIdx = 2;
        }
        // Phím D hoặc Phím 4
        else if (
          code === 'KeyD' ||
          key === 'd' ||
          code === 'Digit4' ||
          code === 'Numpad4' ||
          key === '4'
        ) {
          selectedOptionIdx = 3;
        }

        if (selectedOptionIdx !== null) {
          e.preventDefault();
          setPressedKeyIndex(selectedOptionIdx);
          setTimeout(() => setPressedKeyIndex(null), 250);
          handleSelectOption(selectedOptionIdx);
        }
      } else {
        // When answer is submitted: Enter, Space, or ArrowRight moves to next question
        if (
          e.key === 'Enter' ||
          e.code === 'Space' ||
          e.key === ' ' ||
          e.code === 'ArrowRight'
        ) {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    gameStatus,
    isAnswerSubmitted,
    handleNextQuestion,
    handleSelectOption,
    settings.opponentMode,
    activeTurn,
    isSettingsOpen,
    isRulesOpen,
    isAnimalSelectOpen,
    activeNavTab,
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Header bar */}
      <HeaderNav
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenAnimalSelect={() => setIsAnimalSelectOpen(true)}
        onResetMatch={startNewMatch}
        gameMode={settings.gameMode}
        opponentMode={settings.opponentMode}
        onToggleOpponentMode={() => handleSelectOpponentMode(settings.opponentMode === 'pvp' ? 'ai' : 'pvp')}
        activeTab={activeNavTab}
        onTabChange={setActiveNavTab}
        questionCount={questionsPool.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 py-2 flex flex-col justify-start">
        {activeNavTab === 'questions' ? (
          <QuestionManager
            questions={questionsPool}
            onAddQuestion={handleAddQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onResetToDefaults={handleResetQuestionsToDefaults}
            onBackToArena={() => setActiveNavTab('arena')}
          />
        ) : gameStatus === 'menu' ? (
          /* Welcome / Start Game Hero Screen */
          <div className="my-auto py-8 text-center max-w-2xl mx-auto animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 via-amber-500 to-blue-500 p-1 shadow-2xl shadow-amber-500/20 mb-6 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                <Swords className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Đấu Trường Trí Tuệ Đối Kháng
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
              KÉO CO TRI THỨC
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Trận chiến kéo co bằng kiến thức giữa <span className="text-rose-400 font-bold">Đội Đỏ</span> và{' '}
              <span className="text-blue-400 font-bold">Đội Xanh</span>. Trả lời đúng để kéo dây, vượt qua các câu hỏi Khoa học, Lịch sử, Văn hóa. Thắng mỗi hiệp sẽ được tự động tăng độ khó câu hỏi!
            </p>

            {/* Lựa Chọn Chế Độ Chơi: Với Máy (AI) hoặc 2 Người (PvP) */}
            <div className="my-5 p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl text-left">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Chế Độ Thi Đấu Đối Kháng
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-slate-800 text-slate-300 border-slate-700">
                  {settings.opponentMode === 'ai' ? '🤖 Đấu Với Máy' : '👥 2 Người Cùng Chơi'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 2 Người Chơi Card */}
                <div
                  id="mode-pvp-card"
                  onClick={() => handleSelectOpponentMode('pvp')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    settings.opponentMode === 'pvp'
                      ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-500/50 shadow-xl'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      settings.opponentMode === 'pvp' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
                        Chơi 2 Người (PvP)
                        {settings.opponentMode === 'pvp' && (
                          <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                            ĐANG CHỌN
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400">Đấu trí đối kháng 2 người trên cùng thiết bị</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                    <span className="text-rose-400 font-bold">Đỏ ({teamA.name})</span>
                    <span>⚔️</span>
                    <span className="text-blue-400 font-bold">Xanh ({teamB.name})</span>
                  </div>
                </div>

                {/* Chơi Với Máy Card */}
                <div
                  id="mode-ai-card"
                  onClick={() => handleSelectOpponentMode('ai')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    settings.opponentMode === 'ai'
                      ? 'bg-indigo-500/20 border-indigo-400 ring-2 ring-indigo-500/50 shadow-xl'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      settings.opponentMode === 'ai' ? 'bg-indigo-600 text-white font-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-sm sm:text-base flex items-center gap-2">
                        Chơi Với Máy (AI)
                        {settings.opponentMode === 'ai' && (
                          <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-black">
                            ĐANG CHỌN
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400">Đấu trí với AI thông minh tự động tính toán</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-rose-400 font-bold">Bạn ({teamA.name})</span>
                      <span>⚔️</span>
                      <span className="text-indigo-400 font-bold">{teamB.name}</span>
                    </div>
                    {settings.opponentMode === 'ai' && (
                      <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-700/50">
                        {settings.botDifficulty === 'easy' ? 'Tập Sự' : settings.botDifficulty === 'medium' ? 'Chiến Binh' : settings.botDifficulty === 'hard' ? 'Cao Thủ' : 'Siêu Trí Tuệ'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Bot Difficulty selector if AI mode selected */}
              {settings.opponentMode === 'ai' && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 animate-fade-in">
                  <span className="text-xs text-slate-300 font-bold flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-indigo-400" />
                    Mức độ thông minh của Máy AI:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { id: 'easy', label: 'Tập Sự (60%)' },
                      { id: 'medium', label: 'Chiến Binh (75%)' },
                      { id: 'hard', label: 'Cao Thủ (88%)' },
                      { id: 'expert', label: 'Siêu Trí Tuệ (96%)' },
                    ].map(b => (
                      <button
                        key={b.id}
                        onClick={() => setSettings(s => ({ ...s, botDifficulty: b.id as BotDifficulty }))}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          settings.botDifficulty === b.id
                            ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-white/30'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Animal Mascots Face-off Banner on Welcome Screen */}
            <div className="my-5 p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Đội Hình Linh Thú Đại Diện Đang Chọn
                </span>
                <button
                  onClick={() => setIsAnimalSelectOpen(true)}
                  className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>🐾 Đổi Linh Thú</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                {/* Red Mascot */}
                <div
                  onClick={() => setIsAnimalSelectOpen(true)}
                  className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 flex items-center gap-3 cursor-pointer hover:border-rose-400 transition-all text-left group"
                >
                  <span className="text-3xl sm:text-4xl filter drop-shadow group-hover:scale-110 transition-transform">
                    {teamA.mascot.emoji}
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase text-rose-400 block">{teamA.name}</span>
                    <span className="text-xs sm:text-sm font-bold text-white block">{teamA.mascot.name}</span>
                    <span className="text-[10px] text-slate-400 hidden sm:block truncate">{teamA.mascot.trait}</span>
                  </div>
                </div>

                {/* Blue Mascot */}
                <div
                  onClick={() => setIsAnimalSelectOpen(true)}
                  className="p-3 rounded-2xl bg-blue-950/60 border border-blue-500/40 flex items-center gap-3 cursor-pointer hover:border-blue-400 transition-all text-left group"
                >
                  <span className="text-3xl sm:text-4xl filter drop-shadow group-hover:scale-110 transition-transform">
                    {teamB.mascot.emoji}
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-400 block">{teamB.name}</span>
                    <span className="text-xs sm:text-sm font-bold text-white block">{teamB.mascot.name}</span>
                    <span className="text-[10px] text-slate-400 hidden sm:block truncate">{teamB.mascot.trait}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 text-left">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-amber-400 font-black text-sm mb-1 flex items-center gap-1.5">
                  ⏱️ Ô Đếm Thời Gian
                </div>
                <p className="text-xs text-slate-400">
                  Đồng hồ đếm hiệp chung & ô đếm thời gian trả lời riêng biệt cho mỗi đội.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-cyan-400 font-black text-sm mb-1 flex items-center gap-1.5">
                  📚 Đa Dạng Lĩnh Vực
                </div>
                <p className="text-xs text-slate-400">
                  Khoa học, Lịch sử và Văn hóa phong phú, bảo đảm không bị trùng lặp.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-rose-400 font-black text-sm mb-1 flex items-center gap-1.5">
                  📈 Tự Động Tăng Cấp
                </div>
                <p className="text-xs text-slate-400">
                  Thắng vòng đấu, hệ thống sẽ tự động nâng cấp độ khó câu hỏi cho đội thắng!
                </p>
              </div>
            </div>

            {/* Keyboard shortcut hint banner */}
            <div className="my-4 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 shadow-md">
              <span className="flex items-center gap-1.5 font-bold text-amber-400">
                <Keyboard className="w-4 h-4 text-cyan-400" />
                Hỗ trợ phím máy tính:
              </span>
              <span>Bấm trực tiếp phím</span>
              <div className="inline-flex items-center gap-1 font-mono font-bold text-amber-300">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400">A</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400">B</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400">C</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400">D</kbd>
              </div>
              <span className="text-slate-400">(hoặc 1, 2, 3, 4) để chọn đáp án ngay lập tức</span>
            </div>

            {/* Start Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                id="start-match-btn"
                onClick={startNewMatch}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                {settings.opponentMode === 'ai' ? 'Vào Đấu Với Máy 🤖' : 'Vào Trận 2 Người 👥'}
              </button>

              <button
                onClick={() => setActiveNavTab('questions')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 font-bold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors border border-indigo-700/50 shadow-md"
              >
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Quản Lý Câu Hỏi ({questionsPool.length})
              </button>

              <button
                onClick={() => setIsAnimalSelectOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-750 text-amber-300 font-bold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors border border-amber-500/30"
              >
                <span>🐾</span>
                Chọn Linh Thú
              </button>

              <button
                onClick={() => setIsRulesOpen(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-amber-400" />
                Xem Luật Chơi
              </button>
            </div>
          </div>
        ) : (
          /* Active Playing Arena Screen */
          <div className="flex flex-col gap-2">
            {/* 1. TUG OF WAR ARENA (Rope, Characters, Position, Rounds) */}
            <TugOfWarArena
              teamA={teamA}
              teamB={teamB}
              ropePosition={ropePosition}
              winThreshold={settings.winRopeThreshold}
              lastPullEvent={lastPullEvent}
              currentRound={currentRound}
              onOpenAnimalSelect={() => setIsAnimalSelectOpen(true)}
            />

            {/* 2. TIMER DASHBOARD:
                - Ô ĐẾM THỜI GIAN TRẬN ĐẤU / HIỆP ĐẤU
                - Ô THỜI GIAN TRẢ LỜI CỦA ĐỘI ĐỎ
                - Ô THỜI GIAN TRẢ LỜI CỦA ĐỘI XANH
            */}
            <TimerDashboard
              roundTimer={roundTimer}
              maxRoundTime={settings.roundTimeLimit}
              activeTeamId={activeTurn}
              teamATimer={teamATimer}
              teamBTimer={teamBTimer}
              maxQuestionTime={settings.questionTimeLimit}
              teamA={teamA}
              teamB={teamB}
              gameStatus={gameStatus}
            />

            {/* 3. QUESTION CARD:
                Category tags, Difficulty tags, 4 options, Explanation
            */}
            <div className="w-full max-w-5xl mx-auto px-3 my-2">
              <QuestionCard
                question={currentQuestion}
                team={activeTurn === 'red' ? teamA : teamB}
                selectedOptionIndex={selectedOptionIndex}
                isAnswerSubmitted={isAnswerSubmitted}
                onSelectOption={handleSelectOption}
                onNextQuestion={handleNextQuestion}
                disabled={gameStatus !== 'playing'}
                isBotTurn={settings.opponentMode === 'ai' && activeTurn === 'blue'}
                isBotThinking={isBotThinking}
                autoAdvanceSeconds={autoAdvanceSeconds}
                pressedKeyIndex={pressedKeyIndex}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer info bar */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-2.5 text-center text-xs text-slate-500 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          Kéo Co Tri Thức © 2026 • Trò chơi đối kháng hỏi đáp học tập & rèn luyện tư duy
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            ⌨️ Phím máy: <strong className="text-amber-400 font-mono">[A, B, C, D]</strong> hoặc <strong className="text-slate-300 font-mono">[1, 2, 3, 4]</strong>
          </span>
          <span>•</span>
          <span><strong className="text-slate-300 font-mono">[Enter] / [Space]</strong>: Tiếp tục</span>
        </div>
      </footer>

      {/* MODALS */}
      <RoundEndModal
        isOpen={gameStatus === 'round_end'}
        roundResult={roundResult}
        teamA={teamA}
        teamB={teamB}
        isMatchOver={isMatchOver}
        onNextRound={handleNextRound}
        onRestartMatch={startNewMatch}
      />

      <GameSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        currentTeamAName={teamA.name}
        currentTeamBName={teamB.name}
        onSaveSettings={(newSettings, newTeamA, newTeamB) => {
          setSettings(newSettings);
          setTeamA(prev => ({ ...prev, name: newTeamA }));
          setTeamB(prev => ({ ...prev, name: newTeamB }));
        }}
      />

      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      {/* Animal Mascot Selection Modal */}
      <AnimalSelectionModal
        isOpen={isAnimalSelectOpen}
        onClose={() => setIsAnimalSelectOpen(false)}
        selectedRedMascot={teamA.mascot}
        selectedBlueMascot={teamB.mascot}
        onConfirmSelection={handleConfirmAnimalSelection}
      />
    </div>
  );
}
