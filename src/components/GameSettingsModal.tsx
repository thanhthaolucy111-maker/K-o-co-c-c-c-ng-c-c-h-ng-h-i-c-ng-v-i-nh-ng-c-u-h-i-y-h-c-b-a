import React, { useState } from 'react';
import { X, Settings, Check, Sliders, Layers, Bot, Users, Cpu } from 'lucide-react';
import { Category, GameSettings, OpponentMode, BotDifficulty } from '../types/game';

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSaveSettings: (newSettings: GameSettings, teamAName: string, teamBName: string) => void;
  currentTeamAName: string;
  currentTeamBName: string;
}

export const GameSettingsModal: React.FC<GameSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  currentTeamAName,
  currentTeamBName,
}) => {
  const [teamAName, setTeamAName] = useState(currentTeamAName);
  const [teamBName, setTeamBName] = useState(currentTeamBName);
  const [opponentMode, setOpponentMode] = useState<OpponentMode>(settings.opponentMode);
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>(settings.botDifficulty || 'medium');
  const [questionTimeLimit, setQuestionTimeLimit] = useState(settings.questionTimeLimit);
  const [roundTimeLimit, setRoundTimeLimit] = useState(settings.roundTimeLimit);
  const [maxRounds, setMaxRounds] = useState(settings.maxRounds);
  const [categories, setCategories] = useState<Category[]>(settings.categories);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);

  if (!isOpen) return null;

  const toggleCategory = (cat: Category) => {
    if (categories.includes(cat)) {
      if (categories.length > 1) {
        setCategories(categories.filter(c => c !== cat));
      }
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleModeChange = (mode: OpponentMode) => {
    setOpponentMode(mode);
    if (mode === 'ai' && teamBName === 'Chiến Thần Xanh') {
      setTeamBName('Máy AI Thông Minh');
    } else if (mode === 'pvp' && teamBName === 'Máy AI Thông Minh') {
      setTeamBName('Chiến Thần Xanh');
    }
  };

  const handleSave = () => {
    onSaveSettings(
      {
        ...settings,
        opponentMode,
        botDifficulty,
        questionTimeLimit,
        roundTimeLimit,
        maxRounds,
        categories,
        soundEnabled,
      },
      teamAName.trim() || 'Đội Đỏ',
      teamBName.trim() || (opponentMode === 'ai' ? 'Máy AI' : 'Đội Xanh')
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <h3 className="font-black text-lg text-white">Cài Đặt Trận Đấu</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4 text-sm">
          {/* Lựa chọn Chơi với người hoặc Chơi với máy */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                Chế Độ Đối Thủ
              </span>
              <span className="text-xs text-amber-400 font-bold">
                {opponentMode === 'ai' ? '🤖 Đấu Với Máy' : '👥 2 Người Chơi'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleModeChange('pvp')}
                className={`p-3 rounded-xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  opponentMode === 'pvp'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>2 Người Chơi (PvP)</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('ai')}
                className={`p-3 rounded-xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  opponentMode === 'ai'
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>Chơi Với Máy (AI)</span>
              </button>
            </div>

            {/* Độ khó của máy AI */}
            {opponentMode === 'ai' && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 animate-fade-in">
                <span className="text-[11px] font-bold text-indigo-300 block mb-1.5">
                  Độ Khéo Của Máy (Tỉ lệ trả lời chính xác):
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'easy', label: 'Tập Sự', rate: '~60%' },
                    { id: 'medium', label: 'Chiến Binh', rate: '~75%' },
                    { id: 'hard', label: 'Cao Thủ', rate: '~88%' },
                    { id: 'expert', label: 'Siêu Trí Tuệ', rate: '~96%' },
                  ].map(b => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBotDifficulty(b.id as BotDifficulty)}
                      className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                        botDifficulty === b.id
                          ? 'bg-indigo-500 text-white border-indigo-400 font-black ring-1 ring-white/30'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="text-[11px]">{b.label}</div>
                      <div className="text-[9px] font-mono text-indigo-200/80">{b.rate}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tên hai đội */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
            <h4 className="font-bold text-slate-200 mb-2.5 flex items-center gap-2 text-xs uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Tên Hai Đội Thi Đấu
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-rose-400 block mb-1">
                  Đội 1 (Đỏ - {opponentMode === 'ai' ? 'Bạn' : 'Người chơi 1'})
                </label>
                <input
                  type="text"
                  value={teamAName}
                  onChange={e => setTeamAName(e.target.value)}
                  maxLength={15}
                  className="w-full bg-slate-900 border border-rose-500/40 rounded-xl px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-blue-400 block mb-1">
                  Đội 2 (Xanh - {opponentMode === 'ai' ? 'Máy AI' : 'Người chơi 2'})
                </label>
                <input
                  type="text"
                  value={teamBName}
                  onChange={e => setTeamBName(e.target.value)}
                  maxLength={15}
                  className="w-full bg-slate-900 border border-blue-500/40 rounded-xl px-3 py-2 text-white text-xs font-bold focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Thời gian câu hỏi (Ô thời gian trả lời của mỗi đội) */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Thời Gian Trả Lời Mỗi Câu ({questionTimeLimit}s)
              </span>
              <span className="text-xs text-amber-400 font-bold">Ô thời gian mỗi đội</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 30].map(sec => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setQuestionTimeLimit(sec)}
                  className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                    questionTimeLimit === sec
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Thời gian vòng đấu (Ô đếm thời gian trận đấu) */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Thời Gian Hiệp Đấu ({roundTimeLimit > 0 ? `${roundTimeLimit}s` : 'Vô tận'})
              </span>
              <span className="text-xs text-indigo-400 font-bold">Ô đếm thời gian chung</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[60, 90, 120, 0].map(sec => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setRoundTimeLimit(sec)}
                  className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                    roundTimeLimit === sec
                      ? 'bg-indigo-500 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {sec === 0 ? 'Vô tận' : `${sec}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Lĩnh vực câu hỏi */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-200">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Lĩnh Vực Câu Hỏi (Không Trùng Lặp)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'science', label: 'Khoa Học', color: 'cyan' },
                { id: 'history', label: 'Lịch Sử', color: 'amber' },
                { id: 'culture', label: 'Văn Hóa', color: 'purple' },
              ].map(item => {
                const isSelected = categories.includes(item.id as Category);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCategory(item.id as Category)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 text-white border-amber-500/70 shadow-sm'
                        : 'bg-slate-900/60 text-slate-500 border-slate-800 opacity-60'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    {item.label}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Hệ thống lọc và đối chiếu ID để đảm bảo các câu hỏi xuất hiện không trùng lặp.
            </p>
          </div>

          {/* Số hiệp đấu */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Thể Thức Trận Đấu
              </span>
              <span className="text-xs text-slate-400">Đấu bao nhiêu hiệp</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { rounds: 1, label: '1 Hiệp Duy Nhất' },
                { rounds: 3, label: 'Bo3 (Thắng 2)' },
                { rounds: 5, label: 'Bo5 (Thắng 3)' },
              ].map(opt => (
                <button
                  key={opt.rounds}
                  type="button"
                  onClick={() => setMaxRounds(opt.rounds)}
                  className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                    maxRounds === opt.rounds
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex gap-3">
          <button
            onClick={onClose}
            className="w-1/3 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="w-2/3 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Lưu & Áp Dụng
          </button>
        </div>
      </div>
    </div>
  );
};
