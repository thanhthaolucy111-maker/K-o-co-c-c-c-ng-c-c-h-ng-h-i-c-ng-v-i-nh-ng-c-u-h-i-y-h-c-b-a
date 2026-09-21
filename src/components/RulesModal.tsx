import React from 'react';
import { X, Clock, TrendingUp, Trophy, Layers, CheckCircle2, Keyboard } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-lg text-white">Luật Chơi Kéo Co Tri Thức</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4 text-sm text-slate-300">
          {/* Mục 1: Kéo co */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
            <h4 className="font-bold text-amber-300 flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-black">1</span>
              Mục Tiêu & Cơ Chế Kéo Dây
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hai đội (Đội Đỏ và Đội Xanh) thi đấu kéo co bằng trí tuệ. Trả lời đúng câu hỏi sẽ tạo lực kéo dây về phía đội mình. Đội nào kéo dải cờ đỏ vượt qua vạch chiến thắng trước (hoặc có ưu thế khoảng cách lớn hơn khi hết giờ hiệp đấu) sẽ giành thắng lợi hiệp đó!
            </p>
          </div>

          {/* Mục Phím Tắt Bàn Phím */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 ring-1 ring-cyan-500/20">
            <h4 className="font-bold text-cyan-300 flex items-center gap-2 mb-1.5">
              <Keyboard className="w-4 h-4 text-cyan-400" />
              Điều Khiển Bằng Phím Máy Tính (Phím A, B, C, D)
            </h4>
            <p className="text-xs text-slate-300 mb-2 leading-relaxed">
              Bạn có thể nhấn trực tiếp các phím trên bàn phím máy tính để trả lời siêu tốc mà không cần dùng chuột:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-black">A</kbd>
                <span className="text-slate-300">hoặc [1]: Chọn đáp án A</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-black">B</kbd>
                <span className="text-slate-300">hoặc [2]: Chọn đáp án B</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-black">C</kbd>
                <span className="text-slate-300">hoặc [3]: Chọn đáp án C</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-400 font-black">D</kbd>
                <span className="text-slate-300">hoặc [4]: Chọn đáp án D</span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>⚡ Phím</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono font-bold">Enter</kbd>
              <span>hoặc</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 font-mono font-bold">Phím Cách (Space)</kbd>
              <span>: Chuyển ngay sang câu tiếp theo</span>
            </div>
          </div>

          {/* Mục 2: Các ô đếm thời gian */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
            <h4 className="font-bold text-cyan-300 flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-cyan-400" />
              Hệ Thống Ô Đếm Thời Gian
            </h4>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Ô đếm thời gian hiệp đấu:</strong> Nằm ở chính giữa, đếm ngược thời gian thi đấu của hiệp (mặc định 90s).</li>
              <li><strong className="text-slate-200">Ô thời gian trả lời của mỗi đội:</strong> Nằm ở hai bên tương ứng của từng đội, đếm ngược thời gian suy nghĩ cho mỗi câu hỏi (mặc định 15s). Khi thời gian dưới 5s sẽ phát chuông cảnh báo khẩn cấp!</li>
            </ul>
          </div>

          {/* Mục 3: Tự động tăng độ khó */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/30">
            <h4 className="font-bold text-amber-400 flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Tự Động Tăng Độ Khó Khi Thắng Hiệp
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Khi một đội chơi giành chiến thắng ở một vòng đấu, hệ thống sẽ <strong>tự động tăng mức độ khó</strong> của các câu hỏi dành cho đội đó ở các hiệp đấu tiếp theo theo thang bậc: <span className="text-emerald-400 font-bold">Dễ</span> ➔ <span className="text-amber-400 font-bold">Trung Bình</span> ➔ <span className="text-rose-400 font-bold">Khó</span> ➔ <span className="text-purple-400 font-bold">Chuyên Gia</span>.
            </p>
            <p className="text-[11px] text-amber-300/80 mt-1">
              ⭐ Độ khó càng cao, lực kéo thưởng khi trả lời đúng càng mạnh mẽ!
            </p>
          </div>

          {/* Mục 4: Đa dạng lĩnh vực và không trùng lặp */}
          <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
            <h4 className="font-bold text-purple-300 flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-purple-400" />
              Kho Câu Hỏi Không Trùng Lặp & Linh Thú Đại Diện
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Các câu hỏi được tuyển chọn kỹ lưỡng thuộc các chủ đề: <strong className="text-slate-200">Khoa học</strong>, <strong className="text-slate-200">Lịch sử</strong>, và <strong className="text-slate-200">Văn hóa</strong>. Hệ thống đảm bảo các câu hỏi trong cùng một trận đấu <strong className="text-emerald-400">hoàn toàn không bị trùng lặp</strong>.
            </p>
            <p className="text-xs text-amber-300/90 mt-1.5 leading-relaxed">
              🐾 <strong>Chế độ Linh thú đại diện:</strong> Người chơi có thể tự do lựa chọn linh thú động vật dũng mãnh (Hổ, Cáo, Voi, Đại bàng, Sói, Cú mèo...) dẫn dắt và chỉ huy kéo co cho từng đội!
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-amber-500/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            Đã Hiểu, Tiếp Tục Đấu!
          </button>
        </div>
      </div>
    </div>
  );
};
