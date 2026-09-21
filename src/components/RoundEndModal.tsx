import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, TrendingUp, ArrowRight, RotateCcw, Award, CheckCircle } from 'lucide-react';
import { Team, DifficultyLevel, RoundResult } from '../types/game';
import { DIFFICULTY_CONFIG } from '../data/questions';

interface RoundEndModalProps {
  isOpen: boolean;
  roundResult: RoundResult | null;
  teamA: Team;
  teamB: Team;
  isMatchOver: boolean;
  onNextRound: () => void;
  onRestartMatch: () => void;
}

export const RoundEndModal: React.FC<RoundEndModalProps> = ({
  isOpen,
  roundResult,
  teamA,
  teamB,
  isMatchOver,
  onNextRound,
  onRestartMatch,
}) => {
  useEffect(() => {
    if (isOpen && roundResult) {
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: roundResult.winnerId === 'red' ? ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b'] : ['#3b82f6', '#60a5fa', '#93c5fd', '#f59e0b'],
      });
    }
  }, [isOpen, roundResult]);

  if (!isOpen || !roundResult) return null;

  const isDraw = roundResult.winnerId === 'draw';
  const winnerTeam = roundResult.winnerId === 'red' ? teamA : roundResult.winnerId === 'blue' ? teamB : null;
  const isWinnerRed = roundResult.winnerId === 'red';

  const newDiffConfig = roundResult.newDifficultyLevel ? DIFFICULTY_CONFIG[roundResult.newDifficultyLevel] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
        {/* Glow ambient background */}
        <div
          className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none ${
            isWinnerRed ? 'bg-rose-500' : 'bg-blue-500'
          }`}
        />

        {/* Trophy icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/10">
          <Trophy className="w-8 h-8 text-amber-400 animate-bounce" />
        </div>

        {/* Title */}
        <div className="mb-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
            {isMatchOver ? 'TRẬN ĐẤU KẾT THÚC' : `KẾT QUẢ HIỆP ĐẤU ${roundResult.roundNumber}`}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {isDraw
              ? 'HIỆP ĐẤU HÒA!'
              : isMatchOver
              ? `🏆 ${winnerTeam?.name} VÔ ĐỊCH CHUNG CUỘC!`
              : `🎉 ${winnerTeam?.name} THẮNG HIỆP NÀY!`}
          </h2>
        </div>

        {/* Mascot Victory Banner */}
        {winnerTeam && (
          <div className="my-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-center gap-3">
            <span className="text-4xl filter drop-shadow animate-bounce">{winnerTeam.mascot.emoji}</span>
            <div className="text-left">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Linh Thú Trưởng Đội: {winnerTeam.mascot.name}
              </span>
              <p className="text-xs text-slate-300 italic">
                "{winnerTeam.mascot.tagline}"
              </p>
            </div>
          </div>
        )}

        {/* Match Score Display */}
        <div className="my-3 p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-around">
          <div className="text-center">
            <div className="text-xs font-bold text-rose-400 flex items-center justify-center gap-1">
              <span>{teamA.mascot.emoji}</span>
              <span>{teamA.name}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{teamA.roundsWon}</div>
            <div className="text-[11px] text-slate-400">{roundResult.redCorrect} câu đúng</div>
          </div>
          <div className="text-slate-600 font-black text-xl font-mono">VS</div>
          <div className="text-center">
            <div className="text-xs font-bold text-blue-400 flex items-center justify-center gap-1">
              <span>{teamB.name}</span>
              <span>{teamB.mascot.emoji}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{teamB.roundsWon}</div>
            <div className="text-[11px] text-slate-400">{roundResult.blueCorrect} câu đúng</div>
          </div>
        </div>

        {/* ⭐ CRITICAL PROMPT REQUIREMENT: AUTOMATIC DIFFICULTY INCREASE ANNOUNCEMENT ⭐ */}
        {winnerTeam && roundResult.newDifficultyLevel && (
          <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/40 text-left">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm mb-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>TỰ ĐỘNG NÂNG CẤP ĐỘ KHÓ CÂU HỎI!</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Vì <strong className="text-white font-bold">{winnerTeam.name}</strong> đã xuất sắc giành chiến thắng vòng này, hệ thống tự động tăng mức độ khó câu hỏi cho đội ở hiệp tiếp theo lên:
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-black border flex items-center gap-1.5 shadow-sm ${newDiffConfig?.badgeBg}`}>
                <Award className="w-3.5 h-3.5" />
                Cấp Độ Mới: {newDiffConfig?.label} (+{newDiffConfig?.pullBonus}m lực kéo)
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          {isMatchOver ? (
            <button
              onClick={onRestartMatch}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Chơi Trận Đấu Mới
            </button>
          ) : (
            <>
              <button
                onClick={onNextRound}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <span>Bắt Đầu Hiệp {roundResult.roundNumber + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onRestartMatch}
                className="py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Làm lại
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
