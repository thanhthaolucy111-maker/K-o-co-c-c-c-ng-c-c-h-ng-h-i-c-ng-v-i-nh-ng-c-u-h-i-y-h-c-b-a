import React, { useState, useEffect } from 'react';
import { X, Check, Atom, Landmark, Sparkles, HelpCircle, Star, AlertCircle, Save } from 'lucide-react';
import { Question, Category, DifficultyLevel } from '../types/game';
import { CATEGORY_CONFIG, DIFFICULTY_CONFIG } from '../data/questions';
import { soundFx } from '../utils/audio';

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  editingQuestion?: Question | null;
}

export const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingQuestion,
}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('science');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [options, setOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingQuestion) {
      setText(editingQuestion.text);
      setCategory(editingQuestion.category);
      setDifficulty(editingQuestion.difficulty);
      setOptions([
        editingQuestion.options[0] || '',
        editingQuestion.options[1] || '',
        editingQuestion.options[2] || '',
        editingQuestion.options[3] || '',
      ]);
      setCorrectAnswerIndex(editingQuestion.correctAnswerIndex);
      setExplanation(editingQuestion.explanation || '');
      setError(null);
    } else {
      // Reset to blank for new question
      setText('');
      setCategory('science');
      setDifficulty('easy');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex(0);
      setExplanation('');
      setError(null);
    }
  }, [editingQuestion, isOpen]);

  if (!isOpen) return null;

  const handleOptionChange = (index: number, val: string) => {
    const updated = [...options] as [string, string, string, string];
    updated[index] = val;
    setOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    const trimmedOptions = options.map(o => o.trim());
    if (trimmedOptions.some(o => !o)) {
      setError('Vui lòng điền đầy đủ cả 4 phương án trả lời (A, B, C, D)!');
      return;
    }

    const trimmedExplanation = explanation.trim();
    if (!trimmedExplanation) {
      setError('Vui lòng nhập phần lời giải thích kiến thức!');
      return;
    }

    const savedQuestion: Question = {
      id: editingQuestion ? editingQuestion.id : `custom_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      text: trimmedText,
      category,
      difficulty,
      options: trimmedOptions,
      correctAnswerIndex,
      explanation: trimmedExplanation,
    };

    soundFx.playCorrect();
    onSave(savedQuestion);
    onClose();
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/90 rounded-3xl p-5 sm:p-7 shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Save className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {editingQuestion ? 'SỬA CÂU HỎI TRI THỨC' : 'THÊM CÂU HỎI MỚI'}
              </h2>
              <p className="text-xs text-slate-400">
                {editingQuestion
                  ? 'Chỉnh sửa thông tin câu hỏi và đáp án chuẩn xác'
                  : 'Bổ sung câu hỏi mới vào sàn đấu kéo co'}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 py-4 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Category and Difficulty Selector Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Chủ Đề Câu Hỏi
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['science', 'history', 'culture'] as Category[]).map(cat => {
                  const cfg = CATEGORY_CONFIG[cat];
                  const isSelected = category === cat;
                  return (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-2 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? `${cfg.tagBg} ring-2 ring-amber-500/50`
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {cat === 'science' && <Atom className="w-4 h-4" />}
                      {cat === 'history' && <Landmark className="w-4 h-4" />}
                      {cat === 'culture' && <Sparkles className="w-4 h-4" />}
                      <span>{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Select */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Cấp Độ Khó
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['easy', 'medium', 'hard', 'expert'] as DifficultyLevel[]).map(diff => {
                  const cfg = DIFFICULTY_CONFIG[diff];
                  const isSelected = difficulty === diff;
                  return (
                    <button
                      type="button"
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`p-2 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? `${cfg.badgeBg} ring-2 ring-indigo-500/50 font-black`
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{cfg.label}</span>
                      <span className="text-[9px] text-amber-300/80 font-mono">+{cfg.pullBonus}m</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Question Text */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Nội Dung Câu Hỏi <span className="text-rose-400">*</span>
            </label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Ví dụ: Hành tinh nào lớn nhất trong Hệ Mặt Trời?"
              rows={3}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-slate-500"
            />
          </div>

          {/* 3. 4 Answer Options */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                4 Phương Án Trả Lời <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-amber-400 font-medium">
                👉 Nhấp vào chữ cái [A, B, C, D] để chọn đáp án đúng
              </span>
            </div>

            <div className="space-y-2">
              {options.map((opt, idx) => {
                const isCorrect = correctAnswerIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
                      isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500/80 ring-1 ring-emerald-500/50'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setCorrectAnswerIndex(idx)}
                      title="Chọn phương án này làm đáp án đúng"
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs transition-all cursor-pointer ${
                        isCorrect
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/40 scale-105'
                          : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {optionLetters[idx]}
                    </button>

                    <input
                      type="text"
                      value={opt}
                      onChange={e => handleOptionChange(idx, e.target.value)}
                      placeholder={`Nhập nội dung phương án ${optionLetters[idx]}...`}
                      className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-600"
                    />

                    {isCorrect && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Đáp án đúng
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Explanation */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Lời Giải Thích Thông Thái (Hiển thị sau khi người chơi trả lời) <span className="text-rose-400">*</span>
            </label>
            <textarea
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="Ví dụ: Sao Mộc (Jupiter) là hành tinh lớn nhất trong Hệ Mặt Trời với khối lượng gấp 2.5 lần tất cả các hành tinh khác cộng lại..."
              rows={2}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-slate-500"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
          >
            Hủy Bỏ
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {editingQuestion ? 'Cập Nhật Câu Hỏi' : 'Lưu Câu Hỏi Mới'}
          </button>
        </div>
      </div>
    </div>
  );
};
