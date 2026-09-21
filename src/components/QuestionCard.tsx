import React from 'react';
import { Atom, Landmark, Sparkles, HelpCircle, CheckCircle2, XCircle, ArrowRight, Star, Cpu, Bot, Loader2, Keyboard } from 'lucide-react';
import { Question, Team } from '../types/game';
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from '../data/questions';

interface QuestionCardProps {
  question: Question | null;
  team: Team;
  selectedOptionIndex: number | null;
  isAnswerSubmitted: boolean;
  onSelectOption: (index: number) => void;
  onNextQuestion: () => void;
  disabled?: boolean;
  isBotTurn?: boolean;
  isBotThinking?: boolean;
  autoAdvanceSeconds?: number | null;
  pressedKeyIndex?: number | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  team,
  selectedOptionIndex,
  isAnswerSubmitted,
  onSelectOption,
  onNextQuestion,
  disabled = false,
  isBotTurn = false,
  isBotThinking = false,
  autoAdvanceSeconds = null,
  pressedKeyIndex = null,
}) => {
  if (!question) {
    return (
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 shadow-xl">
        <HelpCircle className="w-10 h-10 mx-auto text-slate-600 mb-2 animate-spin" />
        <p className="font-mono text-sm">Hệ thống đang truy xuất câu hỏi thông minh...</p>
      </div>
    );
  }

  const catConfig = CATEGORY_CONFIG[question.category];
  const diffConfig = DIFFICULTY_CONFIG[question.difficulty];

  // Render category icon
  const renderCategoryIcon = () => {
    switch (question.category) {
      case 'science':
        return <Atom className="w-3.5 h-3.5" />;
      case 'history':
        return <Landmark className="w-3.5 h-3.5" />;
      case 'culture':
        return <Sparkles className="w-3.5 h-3.5" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5" />;
    }
  };

  const optionLetters = ['A', 'B', 'C', 'D'];
  const keyHints = ['1', '2', '3', '4'];

  const isRed = team.id === 'red';
  const teamThemeBorder = isRed ? 'border-rose-500/50 shadow-rose-950/30' : 'border-blue-500/50 shadow-blue-950/30';
  const teamBadgeBg = isRed
    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    : 'bg-blue-500/20 text-blue-300 border-blue-500/40';

  return (
    <div
      id={`question-card-${team.id}`}
      className={`w-full bg-slate-900/90 border ${teamThemeBorder} rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-300 backdrop-blur-sm`}
    >
      {/* Subtle smart cyber grid watermark */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Top Header: Team with Mascot + Category + Difficulty */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3.5 mb-4 border-b border-slate-800/80">
        {/* Active Team with Animal Mascot */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-lg shadow-inner">
            {team.mascot.emoji}
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 ${teamBadgeBg}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-ping" />
              Lượt Trả Lời: {team.name}
              {isBotTurn && (
                <span className="px-1.5 py-0.2 rounded-md bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 text-[10px] font-mono flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  MÁY
                </span>
              )}
            </span>
            <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium italic">
              ({team.mascot.name})
            </span>
          </div>
        </div>

        {/* Tags: Category & Difficulty */}
        <div className="flex items-center gap-2">
          {/* Category Tag */}
          <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 shadow-sm ${catConfig.tagBg}`}>
            {renderCategoryIcon()}
            {catConfig.label}
          </span>

          {/* Difficulty Tag */}
          <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 shadow-sm ${diffConfig.badgeBg}`}>
            <Star className="w-3 h-3 fill-current" />
            Cấp: {diffConfig.label}
          </span>

          {/* Smart AI Indicator */}
          <span className="hidden md:flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-1 rounded-lg">
            <Cpu className="w-3 h-3" />
            Tự động nâng cấp
          </span>
        </div>
      </div>

      {/* Bot Thinking Animated Banner */}
      {isBotTurn && isBotThinking && !isAnswerSubmitted && (
        <div className="mb-4 px-4 py-3 rounded-2xl bg-indigo-950/80 border border-indigo-500/50 flex items-center justify-between animate-pulse shadow-lg shadow-indigo-950/40">
          <div className="flex items-center gap-2.5">
            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
            <span className="text-xs sm:text-sm font-bold text-indigo-200">
              🤖 {team.name} đang suy nghĩ và phân tích dữ liệu câu hỏi...
            </span>
          </div>
          <span className="text-[10px] font-mono font-black text-indigo-300 bg-indigo-900/80 px-2.5 py-1 rounded-lg border border-indigo-700/60">
            TÍNH TOÁN ĐÁP ÁN...
          </span>
        </div>
      )}

      {/* Question Text */}
      <div className="min-h-[72px] flex items-center mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed tracking-wide">
          {question.text}
        </h2>
      </div>

      {/* Answer Options Grid (4 options) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          const isCorrect = idx === question.correctAnswerIndex;
          const isKeyPressed = pressedKeyIndex === idx;

          let btnStyle = 'bg-slate-800/80 hover:bg-slate-750 border-slate-700/80 text-slate-200 hover:border-slate-600';
          let letterStyle = 'bg-slate-700 text-slate-300';

          if (isAnswerSubmitted) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-xl shadow-emerald-950/60 ring-2 ring-emerald-500/80';
              letterStyle = 'bg-emerald-500 text-white font-black';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500/80 shadow-xl shadow-rose-950/60';
              letterStyle = 'bg-rose-500 text-white font-black';
            } else {
              btnStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-50';
            }
          } else if (isSelected) {
            btnStyle = isRed
              ? 'bg-rose-900/60 border-rose-500 text-white ring-2 ring-rose-500/50 shadow-lg'
              : 'bg-blue-900/60 border-blue-500 text-white ring-2 ring-blue-500/50 shadow-lg';
            letterStyle = isRed ? 'bg-rose-500 text-white' : 'bg-blue-500 text-white';
          }

          if (isKeyPressed) {
            btnStyle += ' ring-4 ring-amber-400 scale-[1.02] shadow-2xl bg-slate-700';
          }

          const isOptionClickable = !isAnswerSubmitted && !disabled && !isBotTurn;

          return (
            <button
              key={idx}
              id={`option-btn-${team.id}-${idx}`}
              onClick={() => {
                if (isOptionClickable) {
                  onSelectOption(idx);
                }
              }}
              disabled={!isOptionClickable}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left font-medium transition-all duration-150 flex items-start gap-3 relative group ${
                isOptionClickable ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'
              } ${btnStyle}`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-black transition-colors shadow-sm ${letterStyle}`}>
                  {optionLetters[idx]}
                </span>
                {!isBotTurn && (
                  <span className="px-1.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/90 text-amber-300 font-mono text-[10px] font-black group-hover:border-amber-400 group-hover:bg-amber-500/10 shadow-sm transition-all flex items-center gap-0.5 whitespace-nowrap">
                    <kbd className="font-mono">Phím {optionLetters[idx]}</kbd>
                  </span>
                )}
              </div>

              <span className="text-sm sm:text-base flex-1 pt-0.5 leading-snug">
                {option}
              </span>

              {isAnswerSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 self-center animate-bounce" />
              )}
              {isAnswerSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 self-center" />
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Keyboard Connection Bar */}
      {!isBotTurn && (
        <div className="mb-2 px-3.5 py-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5" />
              Phím Máy:
            </span>
            <span className="text-slate-400 hidden sm:inline">Nhấn</span>
            <div className="flex items-center gap-1">
              {['A', 'B', 'C', 'D'].map((keyLetter) => (
                <kbd
                  key={keyLetter}
                  className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-mono font-black text-xs shadow-sm hover:border-amber-400 transition-colors"
                >
                  {keyLetter}
                </kbd>
              ))}
            </div>
            <span className="text-slate-500 text-[11px]">(hoặc 1, 2, 3, 4)</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            {isAnswerSubmitted ? (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                Bấm <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold text-[10px]">Enter</kbd> hoặc <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold text-[10px]">Space</kbd> tiếp tục
              </span>
            ) : (
              <span className="text-slate-400">
                ⚡ Kết nối phím trực tiếp • Phản hồi ngay
              </span>
            )}
          </div>
        </div>
      )}

      {/* Answer Submitted Feedback & Smart Explanation */}
      {isAnswerSubmitted && (
        <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-950/80 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-3xl animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {selectedOptionIndex === question.correctAnswerIndex ? (
                  <span className="text-emerald-400 font-black text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Chính xác! Lực kéo +{diffConfig.pullBonus}m về phía {team.name}
                  </span>
                ) : (
                  <span className="text-rose-400 font-black text-sm flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    {isBotTurn ? `${team.name} đã chọn sai!` : 'Chưa chính xác!'} (Đáp án đúng: {optionLetters[question.correctAnswerIndex]})
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                💡 <span className="text-amber-400 font-semibold">Giải thích thông thái:</span> {question.explanation}
              </p>
            </div>

            <button
              id="next-question-btn"
              onClick={onNextQuestion}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer whitespace-nowrap self-center"
            >
              Tiếp Tục Lượt Sau
              {autoAdvanceSeconds !== null && autoAdvanceSeconds > 0 && (
                <span className="bg-slate-950/20 px-1.5 py-0.5 rounded text-[11px] font-mono">
                  ({autoAdvanceSeconds}s)
                </span>
              )}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
