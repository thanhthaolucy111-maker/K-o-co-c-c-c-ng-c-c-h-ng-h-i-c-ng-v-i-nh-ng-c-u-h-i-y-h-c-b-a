import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, Zap, Swords } from 'lucide-react';
import { AnimalMascot } from '../types/game';
import { ANIMAL_MASCOTS } from '../data/animals';
import { soundFx } from '../utils/audio';

interface AnimalSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRedMascot: AnimalMascot;
  selectedBlueMascot: AnimalMascot;
  onConfirmSelection: (redMascot: AnimalMascot, blueMascot: AnimalMascot) => void;
}

export const AnimalSelectionModal: React.FC<AnimalSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedRedMascot,
  selectedBlueMascot,
  onConfirmSelection,
}) => {
  const [activeTab, setActiveTab] = useState<'red' | 'blue'>('red');
  const [tempRed, setTempRed] = useState<AnimalMascot>(selectedRedMascot);
  const [tempBlue, setTempBlue] = useState<AnimalMascot>(selectedBlueMascot);

  if (!isOpen) return null;

  const handleSelectAnimal = (animal: AnimalMascot) => {
    soundFx.playTick();
    if (activeTab === 'red') {
      setTempRed(animal);
    } else {
      setTempBlue(animal);
    }
  };

  const handleConfirm = () => {
    soundFx.playWhistle();
    onConfirmSelection(tempRed, tempBlue);
    onClose();
  };

  const currentSelected = activeTab === 'red' ? tempRed : tempBlue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                CHỌN LINH THÚ ĐẠI DIỆN
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Hệ Thống Thông Minh
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Chọn linh thú động vật đại diện chỉ huy kéo co cho từng đội
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Team Selector Tabs */}
        <div className="grid grid-cols-2 gap-2.5 my-3.5">
          {/* Tab Đội Đỏ */}
          <button
            onClick={() => setActiveTab('red')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              activeTab === 'red'
                ? 'bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/40 shadow-lg shadow-rose-950/50'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 opacity-70'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl filter drop-shadow">{tempRed.emoji}</span>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase text-rose-400 block">Đội 1 (Đỏ)</span>
                <span className="text-xs sm:text-sm font-bold text-white">{tempRed.name}</span>
              </div>
            </div>
            {activeTab === 'red' && <Check className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Tab Đội Xanh */}
          <button
            onClick={() => setActiveTab('blue')}
            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              activeTab === 'blue'
                ? 'bg-blue-950/80 border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-950/50'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 opacity-70'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl filter drop-shadow">{tempBlue.emoji}</span>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase text-blue-400 block">Đội 2 (Xanh)</span>
                <span className="text-xs sm:text-sm font-bold text-white">{tempBlue.name}</span>
              </div>
            </div>
            {activeTab === 'blue' && <Check className="w-4 h-4 text-blue-400" />}
          </button>
        </div>

        {/* Selected Mascot Preview Banner */}
        <div className={`p-3 rounded-2xl border mb-3 flex items-center justify-between bg-gradient-to-r ${currentSelected.bgGradient} ${
          activeTab === 'red' ? 'border-rose-500/40' : 'border-blue-500/40'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-white/20 flex items-center justify-center text-3xl shadow-inner">
              {currentSelected.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white">{currentSelected.name}</h3>
                <span className="text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30">
                  {currentSelected.title}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Đặc tính: <strong className="text-white">{currentSelected.trait}</strong></span>
                <span className="text-slate-500">•</span>
                <span>{currentSelected.pullStyle}</span>
              </p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 italic block">"{currentSelected.tagline}"</span>
          </div>
        </div>

        {/* Animal Roster Grid */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ANIMAL_MASCOTS.map(animal => {
            const isChosenCurrent = currentSelected.id === animal.id;
            const isChosenOpponent =
              activeTab === 'red' ? tempBlue.id === animal.id : tempRed.id === animal.id;

            return (
              <button
                key={animal.id}
                onClick={() => handleSelectAnimal(animal)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                  isChosenCurrent
                    ? activeTab === 'red'
                      ? 'bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/50 shadow-md shadow-rose-900/40'
                      : 'bg-blue-950/80 border-blue-500 ring-2 ring-blue-500/50 shadow-md shadow-blue-900/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                {/* Opponent chosen tag */}
                {isChosenOpponent && (
                  <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                    Đội kia chọn
                  </span>
                )}

                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-3xl mb-2 group-hover:scale-110 transition-transform shadow-sm">
                    {animal.emoji}
                  </div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-white leading-tight">
                    {animal.name}
                  </h4>
                  <p className="text-[10px] text-amber-400 font-semibold mt-0.5">
                    {animal.species}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                  <div className="truncate font-medium text-slate-300">
                    {animal.trait}
                  </div>
                </div>

                {isChosenCurrent && (
                  <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-white ${
                    activeTab === 'red' ? 'bg-rose-500' : 'bg-blue-500'
                  }`}>
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3.5 mt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            Mỗi linh thú mang lại phong thái và khí thế chiến đấu khác biệt trên đấu trường!
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial"
            >
              <Check className="w-4 h-4" />
              Xác Nhận Linh Thú
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
