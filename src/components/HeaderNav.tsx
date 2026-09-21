import React from 'react';
import { Volume2, VolumeX, Settings, HelpCircle, RotateCcw, Swords, BookOpen, Bot, Users } from 'lucide-react';
import { OpponentMode } from '../types/game';

interface HeaderNavProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenRules: () => void;
  onOpenAnimalSelect: () => void;
  onResetMatch: () => void;
  gameMode: string;
  opponentMode: OpponentMode;
  onToggleOpponentMode: () => void;
  activeTab: 'arena' | 'questions';
  onTabChange: (tab: 'arena' | 'questions') => void;
  questionCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenRules,
  onOpenAnimalSelect,
  onResetMatch,
  gameMode,
  opponentMode,
  onToggleOpponentMode,
  activeTab,
  onTabChange,
  questionCount,
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80">
      {/* Brand logo and Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
          <Swords className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
            KÉO CO TRI THỨC
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              AI SMART
            </span>
          </h1>
          <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block font-medium">
            {opponentMode === 'ai' ? 'Chế độ Chơi Với Máy (AI)' : 'Chế độ 2 Người Chơi (PvP)'} • Khoa học, Lịch sử, Văn hóa
          </p>
        </div>
      </div>

      {/* Center Tabs: Arena vs Question Manager */}
      <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 order-3 sm:order-2">
        <button
          onClick={() => onTabChange('arena')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'arena'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Swords className="w-3.5 h-3.5" />
          <span>Sàn Đấu</span>
        </button>

        <button
          onClick={() => onTabChange('questions')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'questions'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Quản Lý Câu Hỏi</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
            activeTab === 'questions' ? 'bg-white/20 text-white' : 'bg-slate-800 text-amber-400'
          }`}>
            {questionCount}
          </span>
        </button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 order-2 sm:order-3">
        {/* Opponent Mode Quick Toggle */}
        <button
          onClick={onToggleOpponentMode}
          title={opponentMode === 'ai' ? 'Đang chơi với Máy (Bấm để đổi sang 2 người)' : 'Đang chơi 2 người (Bấm để đổi sang đấu Máy)'}
          className={`px-2.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
            opponentMode === 'ai'
              ? 'bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-300 border-indigo-500/50 shadow-indigo-950/40'
              : 'bg-amber-950/50 hover:bg-amber-900/50 text-amber-300 border-amber-500/50 shadow-amber-950/40'
          }`}
        >
          {opponentMode === 'ai' ? (
            <>
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs">Đấu Máy</span>
            </>
          ) : (
            <>
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs">2 Người</span>
            </>
          )}
        </button>

        {/* Animal Mascot Selector Button */}
        <button
          onClick={onOpenAnimalSelect}
          title="Chọn linh thú đại diện"
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
        >
          <span className="text-base">🐾</span>
          <span className="hidden sm:inline text-xs">Linh Thú</span>
        </button>

        {/* Sound toggle button */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700'
              : 'bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border-rose-800/50'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          <span className="hidden md:inline text-xs">{soundEnabled ? 'Bật' : 'Tắt'}</span>
        </button>

        {/* Rules button */}
        <button
          onClick={onOpenRules}
          title="Luật chơi"
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span className="hidden md:inline text-xs">Luật</span>
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          title="Cài đặt trận đấu"
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4 text-cyan-400" />
          <span className="hidden md:inline text-xs">Cài đặt</span>
        </button>

        {/* Reset match */}
        <button
          onClick={onResetMatch}
          title="Chơi lại từ đầu"
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden lg:inline text-xs">Làm lại</span>
        </button>
      </div>
    </header>
  );
};
