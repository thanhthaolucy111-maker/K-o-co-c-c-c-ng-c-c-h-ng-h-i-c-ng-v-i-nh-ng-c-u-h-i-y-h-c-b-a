import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  RotateCcw,
  Atom,
  Landmark,
  Sparkles,
  HelpCircle,
  Star,
  CheckCircle2,
  AlertTriangle,
  Check,
  BookOpen,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { Question, Category, DifficultyLevel } from '../types/game';
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from '../data/questions';
import { QuestionFormModal } from './QuestionFormModal';
import { soundFx } from '../utils/audio';

interface QuestionManagerProps {
  questions: Question[];
  onAddQuestion: (newQuestion: Question) => void;
  onUpdateQuestion: (updatedQuestion: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
  onResetToDefaults: () => void;
  onBackToArena: () => void;
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onResetToDefaults,
  onBackToArena,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'category' | 'difficulty'>('default');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Delete confirmation
  const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filtered and sorted questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Category match
      if (selectedCategory !== 'all' && q.category !== selectedCategory) {
        return false;
      }
      // Difficulty match
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const textMatch = q.text.toLowerCase().includes(query);
        const optionsMatch = q.options.some(opt => opt.toLowerCase().includes(query));
        const explanationMatch = q.explanation.toLowerCase().includes(query);
        if (!textMatch && !optionsMatch && !explanationMatch) return false;
      }
      return true;
    });
  }, [questions, selectedCategory, selectedDifficulty, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = questions.length;
    const science = questions.filter(q => q.category === 'science').length;
    const history = questions.filter(q => q.category === 'history').length;
    const culture = questions.filter(q => q.category === 'culture').length;

    const easy = questions.filter(q => q.difficulty === 'easy').length;
    const medium = questions.filter(q => q.difficulty === 'medium').length;
    const hard = questions.filter(q => q.difficulty === 'hard').length;
    const expert = questions.filter(q => q.difficulty === 'expert').length;

    return { total, science, history, culture, easy, medium, hard, expert };
  }, [questions]);

  const handleOpenAdd = () => {
    setEditingQuestion(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (q: Question) => {
    setEditingQuestion(q);
    setIsFormModalOpen(true);
  };

  const handleSaveQuestion = (savedQuestion: Question) => {
    if (editingQuestion) {
      onUpdateQuestion(savedQuestion);
      showToast(`Đã cập nhật thành công câu hỏi: "${savedQuestion.text.slice(0, 35)}..."`);
    } else {
      onAddQuestion(savedQuestion);
      showToast(`Đã thêm mới câu hỏi: "${savedQuestion.text.slice(0, 35)}..."`);
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingQuestionId) return;
    soundFx.playTick();
    onDeleteQuestion(deletingQuestionId);
    setDeletingQuestionId(null);
    showToast('Đã xóa câu hỏi khỏi kho dữ liệu thành công!');
  };

  const handleConfirmReset = () => {
    soundFx.playWhistle();
    onResetToDefaults();
    setShowResetConfirm(false);
    showToast('Đã khôi phục lại kho câu hỏi gốc mặc định (36 câu)!');
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div id="question-manager-view" className="w-full max-w-5xl mx-auto my-3 px-3 animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900 border border-emerald-500 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-4 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                QUẢN LÝ KHO CÂU HỎI
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Thêm, sửa, xóa các câu hỏi đa lĩnh vực. Các câu hỏi tùy chỉnh sẽ được sử dụng trực tiếp trong trận đấu kéo co!
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleOpenAdd}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Thêm Câu Hỏi Mới
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Khôi phục lại kho câu hỏi gốc ban đầu"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Khôi Phục Gốc</span>
            </button>

            <button
              onClick={onBackToArena}
              className="px-3 py-2.5 rounded-xl bg-indigo-900/40 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Vào Đấu Trường ➔</span>
            </button>
          </div>
        </div>

        {/* Real-time Category & Difficulty Stats Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-300 font-semibold">Tổng số câu hỏi:</span>
            </div>
            <span className="font-mono font-black text-white text-base">{stats.total}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Atom className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-cyan-300 font-semibold">Khoa học:</span>
            </div>
            <span className="font-mono font-black text-cyan-400 text-base">{stats.science}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-300 font-semibold">Lịch sử:</span>
            </div>
            <span className="font-mono font-black text-amber-400 text-base">{stats.history}</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-300 font-semibold">Văn hóa:</span>
            </div>
            <span className="font-mono font-black text-purple-400 text-base">{stats.culture}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 shadow-lg backdrop-blur-sm space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo từ khóa trong câu hỏi, đáp án hoặc lời giải thích..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder-slate-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Filter Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-semibold text-[11px] mr-1">Chủ đề:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-xl font-bold cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Tất cả ({questions.length})
            </button>
            <button
              onClick={() => setSelectedCategory('science')}
              className={`px-3 py-1 rounded-xl font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                selectedCategory === 'science'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-950 text-cyan-400 border border-slate-800'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              Khoa học ({stats.science})
            </button>
            <button
              onClick={() => setSelectedCategory('history')}
              className={`px-3 py-1 rounded-xl font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                selectedCategory === 'history'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-950 text-amber-400 border border-slate-800'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              Lịch sử ({stats.history})
            </button>
            <button
              onClick={() => setSelectedCategory('culture')}
              className={`px-3 py-1 rounded-xl font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                selectedCategory === 'culture'
                  ? 'bg-purple-500 text-slate-950'
                  : 'bg-slate-950 text-purple-400 border border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Văn hóa ({stats.culture})
            </button>
          </div>

          {/* Difficulty Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-semibold text-[11px] mr-1">Độ khó:</span>
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-2.5 py-1 rounded-xl font-bold cursor-pointer transition-colors ${
                selectedDifficulty === 'all'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Tất cả
            </button>
            {(['easy', 'medium', 'hard', 'expert'] as DifficultyLevel[]).map(diff => {
              const cfg = DIFFICULTY_CONFIG[diff];
              const count =
                diff === 'easy'
                  ? stats.easy
                  : diff === 'medium'
                  ? stats.medium
                  : diff === 'hard'
                  ? stats.hard
                  : stats.expert;
              return (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-xl font-bold cursor-pointer transition-colors ${
                    selectedDifficulty === diff
                      ? `${cfg.badgeBg} font-black ring-1 ring-white/30`
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cfg.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Questions Results List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 text-center text-slate-400">
            <HelpCircle className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-200">Không tìm thấy câu hỏi nào phù hợp</h3>
            <p className="text-xs text-slate-400 mt-1">
              Thử thay đổi bộ lọc chủ đề, cấp độ khó hoặc từ khóa tìm kiếm.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold cursor-pointer"
            >
              Xóa Bộ Lọc
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            const catConfig = CATEGORY_CONFIG[q.category];
            const diffConfig = DIFFICULTY_CONFIG[q.difficulty];

            return (
              <div
                key={q.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-4 sm:p-5 transition-all shadow-md relative group"
              >
                {/* Card Top: Badges and Action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-bold">
                      #{index + 1}
                    </span>

                    {/* Category */}
                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${catConfig.tagBg}`}>
                      {q.category === 'science' && <Atom className="w-3 h-3" />}
                      {q.category === 'history' && <Landmark className="w-3 h-3" />}
                      {q.category === 'culture' && <Sparkles className="w-3 h-3" />}
                      {catConfig.label}
                    </span>

                    {/* Difficulty */}
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${diffConfig.badgeBg}`}>
                      <Star className="w-3 h-3 fill-current" />
                      {diffConfig.label} (+{diffConfig.pullBonus}m)
                    </span>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(q)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
                      title="Sửa câu hỏi này"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Sửa</span>
                    </button>

                    <button
                      onClick={() => setDeletingQuestionId(q.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-rose-800/50"
                      title="Xóa câu hỏi này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <h4 className="text-sm sm:text-base font-bold text-white mb-3 leading-snug">
                  {q.text}
                </h4>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctAnswerIndex;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                          isCorrect
                            ? 'bg-emerald-950/70 border-emerald-500/70 text-emerald-200 font-semibold'
                            : 'bg-slate-950/50 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[11px] flex-shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {optionLetters[optIdx]}
                        </span>
                        <span className="flex-1 truncate">{opt}</span>
                        {isCorrect && (
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <span className="text-amber-400 font-bold">💡 Giải thích: </span>
                  {q.explanation}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Question Modal */}
      <QuestionFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveQuestion}
        editingQuestion={editingQuestion}
      />

      {/* Delete Confirmation Dialog */}
      {deletingQuestionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white text-center">Xóa Câu Hỏi Này?</h3>
            <p className="text-xs text-slate-400 text-center mt-1.5 leading-relaxed">
              Bạn có chắc chắn muốn xóa câu hỏi này khỏi kho dữ liệu? Câu hỏi này sẽ không còn xuất hiện trong các hiệp đấu kéo co.
            </p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setDeletingQuestionId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs cursor-pointer shadow-lg shadow-rose-600/30"
              >
                Xác Nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white text-center">Khôi Phục Dữ Liệu Gốc?</h3>
            <p className="text-xs text-slate-400 text-center mt-1.5 leading-relaxed">
              Thao tác này sẽ đặt lại kho câu hỏi về 36 câu hỏi chuẩn mặc định (Khoa học, Lịch sử, Văn hóa) và xóa các câu hỏi tùy chỉnh chưa lưu.
            </p>
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg shadow-amber-500/30"
              >
                Đồng Ý Khôi Phục
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
