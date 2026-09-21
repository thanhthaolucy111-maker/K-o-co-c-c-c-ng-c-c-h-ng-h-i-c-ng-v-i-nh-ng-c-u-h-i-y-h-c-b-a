import React from 'react';
import { Clock, Zap, AlertCircle, Timer, Radio } from 'lucide-react';
import { Team } from '../types/game';

interface TimerDashboardProps {
  roundTimer: number;
  maxRoundTime: number;
  activeTeamId: 'red' | 'blue' | 'both';
  teamATimer: number;
  teamBTimer: number;
  maxQuestionTime: number;
  teamA: Team;
  teamB: Team;
  gameStatus: string;
}

export const TimerDashboard: React.FC<TimerDashboardProps> = ({
  roundTimer,
  maxRoundTime,
  activeTeamId,
  teamATimer,
  teamBTimer,
  maxQuestionTime,
  teamA,
  teamB,
  gameStatus,
}) => {
  // Format seconds to mm:ss.f
  const formatTime = (secs: number) => {
    if (secs <= 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isRoundUrgent = maxRoundTime > 0 && roundTimer <= 15;
  const isTeamAUrgent = teamATimer <= 5 && teamATimer > 0;
  const isTeamBUrgent = teamBTimer <= 5 && teamBTimer > 0;

  // Percentage for progress bars
  const teamAPercent = Math.max(0, Math.min(100, (teamATimer / maxQuestionTime) * 100));
  const teamBPercent = Math.max(0, Math.min(100, (teamBTimer / maxQuestionTime) * 100));
  const roundPercent = maxRoundTime > 0 ? (roundTimer / maxRoundTime) * 100 : 100;

  const isTeamAActive = (activeTeamId === 'red' || activeTeamId === 'both') && gameStatus === 'playing';
  const isTeamBActive = (activeTeamId === 'blue' || activeTeamId === 'both') && gameStatus === 'playing';

  // Smart pacing label
  const getPacingLabel = (timer: number) => {
    if (timer > maxQuestionTime * 0.6) return { label: 'Tốc độ vàng (+4m thưởng)', color: 'text-emerald-400' };
    if (timer > 5) return { label: 'Tốc độ tiêu chuẩn', color: 'text-slate-400' };
    return { label: 'Khẩn cấp! Sắp hết giờ', color: 'text-rose-400' };
  };

  const pacingA = getPacingLabel(teamATimer);
  const pacingB = getPacingLabel(teamBTimer);

  return (
    <div id="timer-dashboard" className="w-full max-w-5xl mx-auto my-2 px-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        
        {/* Ô THỜI GIAN TRẢ LỜI CỦA ĐỘI ĐỎ (TEAM A) */}
        <div
          id="team-a-timer-box"
          className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-4 flex flex-col justify-between backdrop-blur-sm ${
            isTeamAActive
              ? isTeamAUrgent
                ? 'bg-rose-950/80 border-rose-500 shadow-xl shadow-rose-500/30 ring-2 ring-rose-500/60'
                : 'bg-slate-900/90 border-rose-500/60 shadow-lg shadow-rose-950/40'
              : 'bg-slate-900/60 border-slate-800/80 opacity-60'
          }`}
        >
          {/* Smart Telemetry Top Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl filter drop-shadow">{teamA.mascot.emoji}</span>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400 font-bold block">
                  ĐỒNG HỒ TRẢ LỜI
                </span>
                <span className="font-bold text-xs text-white flex items-center gap-1">
                  {teamA.name}
                </span>
              </div>
            </div>

            {isTeamAActive ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1 animate-pulse font-mono">
                <Radio className="w-3 h-3 text-rose-400" />
                ĐANG SUY NGHĨ
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 font-mono">
                CHỜ LƯỢT
              </span>
            )}
          </div>

          {/* Smart Digital Time Display */}
          <div className="flex items-baseline justify-between my-2.5">
            <div className="flex items-baseline gap-1.5">
              <span
                className={`font-mono font-black text-4xl tabular-nums tracking-tight ${
                  isTeamAUrgent ? 'text-rose-400 animate-pulse' : isTeamAActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {teamATimer.toFixed(1)}
              </span>
              <span className="text-xs text-rose-400/80 font-mono font-bold">s</span>
            </div>

            <div className="text-right">
              <span className={`text-[10px] font-bold block ${pacingA.color}`}>
                {isTeamAActive ? pacingA.label : 'Tạm dừng'}
              </span>
              <span className="text-[9px] font-mono text-slate-500">
                Tối đa {maxQuestionTime}s / câu
              </span>
            </div>
          </div>

          {/* Smart Segmented Progress bar */}
          <div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-rose-900/40 p-0.5">
              <div
                className={`h-full transition-all duration-100 rounded-full ${
                  isTeamAUrgent
                    ? 'bg-rose-500 shadow-md shadow-rose-500/60'
                    : 'bg-gradient-to-r from-rose-500 to-amber-500'
                }`}
                style={{ width: `${teamAPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Ô ĐẾM THỜI GIAN HIỆP ĐẤU (ROUND TIMER - CENTER) */}
        <div
          id="round-timer-box"
          className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-4 flex flex-col justify-between backdrop-blur-sm ${
            isRoundUrgent
              ? 'bg-amber-950/80 border-amber-500 shadow-xl shadow-amber-500/30 ring-2 ring-amber-500/60'
              : 'bg-slate-900/90 border-slate-700/80 shadow-xl shadow-slate-950/60'
          }`}
        >
          {/* Top Label & Mode Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-[10px] text-amber-300 font-extrabold">ĐỒNG HỒ HIỆP ĐẤU</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                gameStatus === 'playing'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {gameStatus === 'playing' ? 'HIỆP ĐANG CHẠY' : 'TẠM DỪNG'}
            </span>
          </div>

          {/* Large Digital LED Clock */}
          <div className="flex items-center justify-center my-2">
            <div className="text-center">
              <div
                className={`font-mono font-black text-4xl sm:text-5xl tabular-nums tracking-wider ${
                  isRoundUrgent ? 'text-amber-400 animate-pulse' : 'text-white'
                }`}
              >
                {maxRoundTime > 0 ? formatTime(roundTimer) : 'VÔ TẬN'}
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-1">
                {maxRoundTime > 0 ? `Đếm ngược hiệp: ${Math.ceil(roundTimer)}s` : 'Kéo đến khi chạm vạch dứt điểm'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          {maxRoundTime > 0 ? (
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800 p-0.5">
              <div
                className={`h-full transition-all duration-200 rounded-full ${
                  isRoundUrgent ? 'bg-amber-500 shadow-md' : 'bg-gradient-to-r from-indigo-500 via-cyan-500 to-amber-500'
                }`}
                style={{ width: `${roundPercent}%` }}
              />
            </div>
          ) : (
            <div className="h-2 w-full flex items-center justify-center">
              <span className="text-[9px] font-mono text-slate-500">Chế độ phân định thắng bại</span>
            </div>
          )}
        </div>

        {/* Ô THỜI GIAN TRẢ LỜI CỦA ĐỘI XANH (TEAM B) */}
        <div
          id="team-b-timer-box"
          className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-4 flex flex-col justify-between backdrop-blur-sm ${
            isTeamBActive
              ? isTeamBUrgent
                ? 'bg-blue-950/80 border-blue-500 shadow-xl shadow-blue-500/30 ring-2 ring-blue-500/60'
                : 'bg-slate-900/90 border-blue-500/60 shadow-lg shadow-blue-950/40'
              : 'bg-slate-900/60 border-slate-800/80 opacity-60'
          }`}
        >
          {/* Smart Telemetry Top Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl filter drop-shadow">{teamB.mascot.emoji}</span>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400 font-bold block">
                  ĐỒNG HỒ TRẢ LỜI
                </span>
                <span className="font-bold text-xs text-white flex items-center gap-1">
                  {teamB.name}
                </span>
              </div>
            </div>

            {isTeamBActive ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1 animate-pulse font-mono">
                <Radio className="w-3 h-3 text-blue-400" />
                ĐANG SUY NGHĨ
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 font-mono">
                CHỜ LƯỢT
              </span>
            )}
          </div>

          {/* Smart Digital Time Display */}
          <div className="flex items-baseline justify-between my-2.5">
            <div className="flex items-baseline gap-1.5">
              <span
                className={`font-mono font-black text-4xl tabular-nums tracking-tight ${
                  isTeamBUrgent ? 'text-blue-400 animate-pulse' : isTeamBActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {teamBTimer.toFixed(1)}
              </span>
              <span className="text-xs text-blue-400/80 font-mono font-bold">s</span>
            </div>

            <div className="text-right">
              <span className={`text-[10px] font-bold block ${pacingB.color}`}>
                {isTeamBActive ? pacingB.label : 'Tạm dừng'}
              </span>
              <span className="text-[9px] font-mono text-slate-500">
                Tối đa {maxQuestionTime}s / câu
              </span>
            </div>
          </div>

          {/* Smart Segmented Progress bar */}
          <div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-blue-900/40 p-0.5">
              <div
                className={`h-full transition-all duration-100 rounded-full ${
                  isTeamBUrgent
                    ? 'bg-blue-500 shadow-md shadow-blue-500/60'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                }`}
                style={{ width: `${teamBPercent}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
