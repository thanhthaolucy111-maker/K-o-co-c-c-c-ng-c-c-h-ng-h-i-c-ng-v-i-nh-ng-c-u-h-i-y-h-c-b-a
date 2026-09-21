import React from 'react';
import { Trophy, TrendingUp, Sparkles, Activity, Gauge, Shield, Zap } from 'lucide-react';
import { Team } from '../types/game';
import { DIFFICULTY_CONFIG } from '../data/questions';

interface TugOfWarArenaProps {
  teamA: Team;
  teamB: Team;
  ropePosition: number; // -50 (Red win) to +50 (Blue win), 0 is center
  winThreshold: number; // e.g. 35
  lastPullEvent: {
    teamId: 'red' | 'blue';
    amount: number;
    text: string;
  } | null;
  currentRound: number;
  onOpenAnimalSelect?: () => void;
}

export const TugOfWarArena: React.FC<TugOfWarArenaProps> = ({
  teamA,
  teamB,
  ropePosition,
  winThreshold,
  lastPullEvent,
  currentRound,
  onOpenAnimalSelect,
}) => {
  // Map ropePosition (-50 to +50) to percentage (0% to 100%)
  const ribbonPercentage = Math.max(0, Math.min(100, ((ropePosition + 50) / 100) * 100));

  // Threshold markers percentage
  const leftWinPercent = ((-winThreshold + 50) / 100) * 100;
  const rightWinPercent = ((winThreshold + 50) / 100) * 100;

  const diffAConfig = DIFFICULTY_CONFIG[teamA.currentDifficulty];
  const diffBConfig = DIFFICULTY_CONFIG[teamB.currentDifficulty];

  // Smart tension calculation based on pull offset
  const tensionValue = Math.min(100, Math.round(50 + Math.abs(ropePosition) * 1.4));

  return (
    <div id="tug-of-war-arena" className="w-full max-w-5xl mx-auto my-2 px-3">
      {/* Smart HUD Top Header: Team telemetry + Animal Mascots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center mb-3">
        {/* Đội Đỏ Header */}
        <div className="bg-slate-900/90 border border-rose-500/40 rounded-2xl p-3 flex items-center justify-between shadow-xl shadow-rose-950/20 backdrop-blur-sm relative overflow-hidden group">
          {/* Subtle grid line background for smart tech feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f43f5e08_1px,transparent_1px),linear-gradient(to_bottom,#f43f5e08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            {/* Mascot Avatar Card */}
            <button
              onClick={onOpenAnimalSelect}
              title="Nhấn để đổi linh thú"
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/30 to-rose-950/80 border border-rose-400/50 flex flex-col items-center justify-center shadow-lg shadow-rose-600/20 cursor-pointer hover:scale-105 transition-transform relative group/avatar"
            >
              <span className="text-3xl filter drop-shadow-md">{teamA.mascot.emoji}</span>
              <span className="text-[9px] font-black text-rose-300 uppercase -mt-0.5 tracking-tighter">
                {teamA.mascot.species}
              </span>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold shadow opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                ✎
              </span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-rose-200 tracking-tight flex items-center gap-1.5">
                  {teamA.name}
                </h3>
                <span className="bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded-full border border-rose-500/30 font-extrabold uppercase">
                  {teamA.roundsWon} Hiệp Thắng
                </span>
              </div>

              {/* Animal Mascot title & trait */}
              <div className="text-[11px] text-slate-300 font-semibold flex items-center gap-1 mt-0.5">
                <span className="text-amber-300 font-bold">Linh thú:</span> {teamA.mascot.name}
              </div>

              {/* Difficulty badge */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Cấp độ:</span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${diffAConfig.badgeBg}`}>
                  <TrendingUp className="w-3 h-3" />
                  {diffAConfig.label} (+{diffAConfig.pullBonus}m)
                </span>
              </div>
            </div>
          </div>

          <div className="text-right hidden sm:block relative z-10">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Độ Chuẩn Xác</div>
            <div className="font-mono font-black text-2xl text-rose-400">
              {teamA.totalAnswered > 0
                ? `${Math.round((teamA.totalCorrect / teamA.totalAnswered) * 100)}%`
                : '--'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {teamA.totalCorrect}/{teamA.totalAnswered} đúng
            </div>
          </div>
        </div>

        {/* Đội Xanh Header */}
        <div className="bg-slate-900/90 border border-blue-500/40 rounded-2xl p-3 flex items-center justify-between shadow-xl shadow-blue-950/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          <div className="text-left hidden sm:block relative z-10">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Độ Chuẩn Xác</div>
            <div className="font-mono font-black text-2xl text-blue-400">
              {teamB.totalAnswered > 0
                ? `${Math.round((teamB.totalCorrect / teamB.totalAnswered) * 100)}%`
                : '--'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {teamB.totalCorrect}/{teamB.totalAnswered} đúng
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end flex-1 sm:flex-initial relative z-10">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/30 font-extrabold uppercase">
                  {teamB.roundsWon} Hiệp Thắng
                </span>
                <h3 className="font-black text-base sm:text-lg text-blue-200 tracking-tight">
                  {teamB.name}
                </h3>
              </div>

              {/* Animal Mascot title & trait */}
              <div className="text-[11px] text-slate-300 font-semibold flex items-center justify-end gap-1 mt-0.5">
                {teamB.mascot.name} <span className="text-amber-300 font-bold">:Linh thú</span>
              </div>

              {/* Difficulty badge */}
              <div className="flex items-center justify-end gap-1.5 mt-1">
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${diffBConfig.badgeBg}`}>
                  <TrendingUp className="w-3 h-3" />
                  {diffBConfig.label} (+{diffBConfig.pullBonus}m)
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">:Cấp độ</span>
              </div>
            </div>

            {/* Mascot Avatar Card */}
            <button
              onClick={onOpenAnimalSelect}
              title="Nhấn để đổi linh thú"
              className="w-14 h-14 rounded-2xl bg-gradient-to-bl from-blue-500/30 to-blue-950/80 border border-blue-400/50 flex flex-col items-center justify-center shadow-lg shadow-blue-600/20 cursor-pointer hover:scale-105 transition-transform relative group/avatar"
            >
              <span className="text-3xl filter drop-shadow-md">{teamB.mascot.emoji}</span>
              <span className="text-[9px] font-black text-blue-300 uppercase -mt-0.5 tracking-tighter">
                {teamB.mascot.species}
              </span>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] flex items-center justify-center font-bold shadow opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                ✎
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Intelligent Stadium Stage */}
      <div className="relative bg-slate-950/95 border border-slate-800 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl">
        {/* Background Cyber Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

        {/* Tactical Telemetry Top Bar */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[11px] text-cyan-300 font-semibold">CĂN LỰC DÂY KÉO:</span>
            <span className="text-white font-bold">{tensionValue}%</span>
          </div>

          {/* Central Round Pill */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-amber-400 shadow-md">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>HIỆP {currentRound}</span>
          </div>

          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] text-slate-300">TỌA ĐỘ TÂM:</span>
            <span className={`font-bold font-mono ${ropePosition < 0 ? 'text-rose-400' : ropePosition > 0 ? 'text-blue-400' : 'text-slate-300'}`}>
              {ropePosition === 0 ? '0.00m' : `${ropePosition > 0 ? '+' : ''}${ropePosition.toFixed(1)}m`}
            </span>
          </div>
        </div>

        {/* Floating pull notification pop-up */}
        {lastPullEvent && (
          <div
            className={`absolute top-12 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full text-xs font-black shadow-xl animate-bounce border flex items-center gap-1.5 ${
              lastPullEvent.teamId === 'red'
                ? 'bg-rose-600 text-white border-rose-300 shadow-rose-600/40'
                : 'bg-blue-600 text-white border-blue-300 shadow-blue-600/40'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            {lastPullEvent.text}
          </div>
        )}

        {/* The Pulling Arena Stage */}
        <div className="relative flex items-center justify-between py-6 min-h-[170px]">
          
          {/* TEAM RED ANIMAL SQUAD (LEFT) */}
          <div
            className={`flex items-center gap-1 transition-transform duration-500 ease-out ${
              ropePosition < 0 ? '-translate-x-2 scale-105' : 'translate-x-0'
            }`}
          >
            <div className="flex -space-x-3 items-end select-none">
              {/* Squad Puller 1 */}
              <div className="flex flex-col items-center">
                <span className="text-2xl filter drop-shadow opacity-90 transform -rotate-12">
                  🐾
                </span>
                <span className="text-[9px] text-rose-400/80 font-bold">Trợ lực</span>
              </div>

              {/* Squad Puller 2 */}
              <div className="flex flex-col items-center">
                <span className="text-3xl filter drop-shadow transform -rotate-6">
                  {teamA.mascot.emoji}
                </span>
                <span className="text-[9px] text-rose-400 font-bold">Hộ vệ</span>
              </div>

              {/* ANIMAL MASCOT LEADER (ANCHOR) */}
              <div className="flex flex-col items-center relative">
                {/* Glow ring around leader */}
                <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-md animate-pulse" />
                <span className="text-4xl sm:text-5xl filter drop-shadow-lg transform -rotate-12 hover:scale-110 transition-transform relative z-10">
                  {teamA.mascot.emoji}
                </span>
                <div className="mt-0.5 px-2 py-0.5 rounded bg-rose-950/90 border border-rose-500/40 text-[9px] text-rose-200 font-black uppercase tracking-wider relative z-10">
                  {teamA.mascot.name}
                </div>
              </div>
            </div>

            {/* Rope grip clamp */}
            <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-md -ml-1 z-10" />
          </div>

          {/* THE PHYSICAL TUG-OF-WAR ROPE */}
          <div className="flex-1 relative mx-2 sm:mx-6 h-14 flex items-center">
            
            {/* Left Victory Threshold Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-rose-500/80 z-0 flex flex-col justify-between items-center"
              style={{ left: `${leftWinPercent}%` }}
            >
              <span className="text-[9px] font-mono font-bold text-rose-400 -translate-y-4 bg-slate-900/90 px-1.5 py-0.5 rounded border border-rose-500/30 whitespace-nowrap shadow">
                VẠCH ĐỎ: -{winThreshold}m
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 -mb-1 shadow" />
            </div>

            {/* Center Zero Marker */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-700 -translate-x-1/2 z-0 flex flex-col justify-between items-center">
              <span className="text-[9px] font-mono text-slate-400 -translate-y-4 bg-slate-900/80 px-1 rounded whitespace-nowrap">
                GỐC 0m
              </span>
            </div>

            {/* Right Victory Threshold Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 border-r-2 border-dashed border-blue-500/80 z-0 flex flex-col justify-between items-center"
              style={{ left: `${rightWinPercent}%` }}
            >
              <span className="text-[9px] font-mono font-bold text-blue-400 -translate-y-4 bg-slate-900/90 px-1.5 py-0.5 rounded border border-blue-500/30 whitespace-nowrap shadow">
                VẠCH XANH: +{winThreshold}m
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 -mb-1 shadow" />
            </div>

            {/* The Rope Body */}
            <div className="w-full h-4 sm:h-5 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 rounded-full shadow-inner border border-amber-500/50 relative overflow-hidden flex items-center">
              <div className="w-full h-full opacity-35 bg-[repeating-linear-gradient(45deg,#000,#000_5px,#d97706_5px,#d97706_10px)]" />
            </div>

            {/* Moving Center Red Ribbon / Flag */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out flex flex-col items-center pointer-events-none"
              style={{ left: `${ribbonPercentage}%` }}
            >
              {/* Red Ribbon Top Diamond */}
              <div className="w-3.5 h-3.5 bg-red-500 rotate-45 border-2 border-white shadow-lg shadow-red-500/80 -mb-2" />
              {/* Ribbon Clamp on Rope */}
              <div className="w-7 h-9 bg-red-600 border-2 border-white rounded shadow-2xl flex items-center justify-center">
                <span className="w-1.5 h-4 bg-white rounded-full animate-pulse" />
              </div>
              {/* Tassel */}
              <div className="w-3 h-5 bg-red-700 rounded-b-md shadow-md" />

              {/* Smart Coordinate Pill */}
              <div className="mt-1 bg-slate-950 border border-slate-700 px-2 py-0.5 rounded-md text-[10px] font-mono font-black text-amber-300 shadow-md whitespace-nowrap">
                {ropePosition > 0
                  ? `+${ropePosition.toFixed(1)}m Xanh`
                  : ropePosition < 0
                  ? `${ropePosition.toFixed(1)}m Đỏ`
                  : 'Cân Bằng'}
              </div>
            </div>

          </div>

          {/* TEAM BLUE ANIMAL SQUAD (RIGHT) */}
          <div
            className={`flex items-center gap-1 transition-transform duration-500 ease-out ${
              ropePosition > 0 ? 'translate-x-2 scale-105' : 'translate-x-0'
            }`}
          >
            {/* Rope grip clamp */}
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md -mr-1 z-10" />

            <div className="flex -space-x-3 items-end select-none">
              {/* ANIMAL MASCOT LEADER (ANCHOR) */}
              <div className="flex flex-col items-center relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md animate-pulse" />
                <span className="text-4xl sm:text-5xl filter drop-shadow-lg transform rotate-12 hover:scale-110 transition-transform relative z-10">
                  {teamB.mascot.emoji}
                </span>
                <div className="mt-0.5 px-2 py-0.5 rounded bg-blue-950/90 border border-blue-500/40 text-[9px] text-blue-200 font-black uppercase tracking-wider relative z-10">
                  {teamB.mascot.name}
                </div>
              </div>

              {/* Squad Puller 2 */}
              <div className="flex flex-col items-center">
                <span className="text-3xl filter drop-shadow transform rotate-6">
                  {teamB.mascot.emoji}
                </span>
                <span className="text-[9px] text-blue-400 font-bold">Hộ vệ</span>
              </div>

              {/* Squad Puller 1 */}
              <div className="flex flex-col items-center">
                <span className="text-2xl filter drop-shadow opacity-90 transform rotate-12">
                  🐾
                </span>
                <span className="text-[9px] text-blue-400/80 font-bold">Trợ lực</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Tactical Status & Mascot Taglines */}
        <div className="mt-2 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5 text-rose-300/90 text-[11px]">
            <span>{teamA.mascot.emoji}</span>
            <span className="font-semibold italic">"{teamA.mascot.tagline}"</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAnimalSelect}
              className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-2.5 py-1 rounded-lg border border-cyan-500/30 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Đổi Linh Thú Đại Diện
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-blue-300/90 text-[11px]">
            <span className="font-semibold italic">"{teamB.mascot.tagline}"</span>
            <span>{teamB.mascot.emoji}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
