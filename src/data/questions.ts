import { Category, DifficultyLevel, Question } from '../types/game';

export const QUESTIONS: Question[] = [
  // ==================== KHOA HỌC (SCIENCE) ====================
  // DỄ (EASY)
  {
    id: 'sci_e_1',
    category: 'science',
    difficulty: 'easy',
    text: 'Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?',
    options: ['Sao Kim (Venus)', 'Sao Thủy (Mercury)', 'Sao Hỏa (Mars)', 'Trái Đất (Earth)'],
    correctAnswerIndex: 1,
    explanation: 'Sao Thủy (Mercury) là hành tinh nằm gần Mặt Trời nhất với khoảng cách trung bình khoảng 58 triệu km.',
  },
  {
    id: 'sci_e_2',
    category: 'science',
    difficulty: 'easy',
    text: 'Khí nào chiếm tỉ lệ phần trăm thể tích lớn nhất trong bầu khí quyển của Trái Đất?',
    options: ['Khí Oxy (Oxygen)', 'Khí Nitơ (Nitrogen)', 'Khí Cacbonic (CO2)', 'Khí Argon'],
    correctAnswerIndex: 1,
    explanation: 'Khí Nitơ (N2) chiếm khoảng 78% thể tích khí quyển Trái Đất, trong khi Oxy chỉ chiếm khoảng 21%.',
  },
  {
    id: 'sci_e_3',
    category: 'science',
    difficulty: 'easy',
    text: 'Nước đóng băng (chuyển sang thể rắn) ở bao nhiêu độ C ở áp suất tiêu chuẩn?',
    options: ['0°C', '100°C', '-10°C', '4°C'],
    correctAnswerIndex: 0,
    explanation: 'Ở áp suất khí quyển tiêu chuẩn (1 atm), nước tinh khiết đóng băng tại 0 độ C.',
  },
  {
    id: 'sci_e_4',
    category: 'science',
    difficulty: 'easy',
    text: 'Bộ phận nào trong tế bào thực vật chịu trách nhiệm thực hiện quá trình quang hợp?',
    options: ['Nhân tế bào', 'Lục lạp (Chloroplast)', 'Ti thể (Mitochondria)', 'Màng tế bào'],
    correctAnswerIndex: 1,
    explanation: 'Lục lạp chứa chất diệp lục giúp hấp thụ ánh sáng mặt trời để thực hiện quang hợp.',
  },
  {
    id: 'sci_e_5',
    category: 'science',
    difficulty: 'easy',
    text: 'Cơ quan nào trong cơ thể người có nhiệm vụ bơm máu đi khắp cơ thể?',
    options: ['Phổi', 'Gan', 'Tim', 'Thận'],
    correctAnswerIndex: 2,
    explanation: 'Tim hoạt động như một máy bơm tuần hoàn co bóp nhịp nhàng để vận chuyển máu giàu oxy và dưỡng chất.',
  },

  // TRUNG BÌNH (MEDIUM)
  {
    id: 'sci_m_1',
    category: 'science',
    difficulty: 'medium',
    text: 'Vận tốc ánh sáng trong chân không xấp xỉ bằng bao nhiêu?',
    options: ['30.000 km/s', '300.000 km/s', '3.000.000 km/s', '300.000 m/s'],
    correctAnswerIndex: 1,
    explanation: 'Vận tốc ánh sáng trong chân không ký hiệu là c, xấp xỉ 299.792 km/s, thường làm tròn là 300.000 km/s.',
  },
  {
    id: 'sci_m_2',
    category: 'science',
    difficulty: 'medium',
    text: 'Nguyên tố hóa học nào là chất lỏng duy nhất ở nhiệt độ phòng trong nhóm kim loại?',
    options: ['Brom (Bromine)', 'Thủy ngân (Mercury)', 'Gali (Gallium)', 'Chì (Lead)'],
    correctAnswerIndex: 1,
    explanation: 'Thủy ngân (Hg) là kim loại duy nhất ở dạng lỏng trong điều kiện nhiệt độ và áp suất tiêu chuẩn.',
  },
  {
    id: 'sci_m_3',
    category: 'science',
    difficulty: 'medium',
    text: 'Đơn vị đo cường độ dòng điện trong hệ đo lường quốc tế (SI) là gì?',
    options: ['Vôn (Volt)', 'Ohm (Ω)', 'Ampe (Ampere)', 'Oát (Watt)'],
    correctAnswerIndex: 2,
    explanation: 'Ampe (ký hiệu A) là đơn vị đo cường độ dòng điện trong hệ SI, đặt theo tên nhà vật lý André-Marie Ampère.',
  },
  {
    id: 'sci_m_4',
    category: 'science',
    difficulty: 'medium',
    text: 'Hiện tượng khúc xạ ánh sáng xảy ra khi nào?',
    options: [
      'Ánh sáng truyền qua một môi trường trong suốt duy nhất',
      'Ánh sáng truyền xiên góc qua mặt phân cách giữa hai môi trường trong suốt khác nhau',
      'Ánh sáng chạm vào gương phẳng và bật ngược lại',
      'Ánh sáng bị hấp thụ hoàn toàn bởi vật thể đen'
    ],
    correctAnswerIndex: 1,
    explanation: 'Khúc xạ là hiện tượng tia sáng bị đổi phương đột ngột khi truyền xiên góc qua mặt phân cách giữa hai môi trường trong suốt có chiết suất khác nhau.',
  },
  {
    id: 'sci_m_5',
    category: 'science',
    difficulty: 'medium',
    text: 'Động vật nào sau đây là động vật biến nhiệt (máu lạnh)?',
    options: ['Cá voi xanh', 'Chim cánh cụt', 'Cá sấu', 'Dơi'],
    correctAnswerIndex: 2,
    explanation: 'Cá sấu thuộc lớp bò sát và là động vật biến nhiệt, nhiệt độ cơ thể phụ thuộc vào nhiệt độ môi trường.',
  },

  // KHÓ (HARD)
  {
    id: 'sci_h_1',
    category: 'science',
    difficulty: 'hard',
    text: 'Định luật vạn vật hấp dẫn được nhà bác học Isaac Newton công bố trong tác phẩm kinh điển nào năm 1687?',
    options: ['Opticks', 'Philosophiae Naturalis Principia Mathematica', 'De Revolutionibus', 'Dialogue Concerning the Two Chief World Systems'],
    correctAnswerIndex: 1,
    explanation: 'Newton đã công bố định luật vạn vật hấp dẫn và ba định luật chuyển động trong tác phẩm "Principia" (Các nguyên lý toán học của triết học tự nhiên).',
  },
  {
    id: 'sci_h_2',
    category: 'science',
    difficulty: 'hard',
    text: 'Hạt quark nào có điện tích bằng +2/3 điện tích nguyên tố?',
    options: ['Down và Strange', 'Up và Charm', 'Bottom và Down', 'Strange và Top'],
    correctAnswerIndex: 1,
    explanation: 'Các hạt quark loại Up, Charm và Top có điện tích bằng +2/3 e, trong khi Down, Strange và Bottom có điện tích -1/3 e.',
  },
  {
    id: 'sci_h_3',
    category: 'science',
    difficulty: 'hard',
    text: 'Điểm Lagrange (L1 đến L5) trong cơ học thiên thể là gì?',
    options: [
      'Điểm mà vận tốc quỹ đạo của hành tinh đạt cực đại',
      'Các vị trí cân bằng hấp dẫn nơi lực hấp dẫn của hai thiên thể cân bằng với lực ly tâm',
      'Khoảng cách gần nhất giữa một sao chổi và Mặt Trời',
      'Ranh giới mà lỗ đen không cho ánh sáng thoát ra'
    ],
    correctAnswerIndex: 1,
    explanation: 'Các điểm Lagrange là 5 điểm trong không gian nơi lực hấp dẫn kết hợp của hai vật thể lớn tạo ra lực hướng tâm chính xác để giữ một vật thể nhỏ hơn ở vị trí tương đối ổn định.',
  },
  {
    id: 'sci_h_4',
    category: 'science',
    difficulty: 'hard',
    text: 'Kỹ thuật chỉnh sửa gen CRISPR-Cas9 đoạt giải Nobel Hóa học 2020 có nguồn gốc nguyên bản từ cơ chế sinh học nào?',
    options: [
      'Hệ thống miễn dịch thích ứng tự nhiên của vi khuẩn chống lại virus',
      'Quá trình phiên mã ngược của tế bào ung thư',
      'Cơ chế phân đôi của nấm men',
      'Quá trình đột biến sắc tố ở thực vật'
    ],
    correctAnswerIndex: 0,
    explanation: 'CRISPR-Cas9 ban đầu là cơ chế phòng thủ miễn dịch của vi khuẩn dùng để ghi nhớ và cắt đứt DNA của các virus thể thực khuẩn (bacteriophage) xâm nhập.',
  },

  // CỰC KHÓ / CHUYÊN GIA (EXPERT)
  {
    id: 'sci_x_1',
    category: 'science',
    difficulty: 'expert',
    text: 'Nguyên lý bất định Heisenberg phát biểu rằng không thể xác định đồng thời chính xác cặp đại lượng nào của một hạt vi mô?',
    options: [
      'Khối lượng và điện tích',
      'Vị trí và động lượng (tốc độ)',
      'Nhiệt độ và thể tích',
      'Spin và số khối'
    ],
    correctAnswerIndex: 1,
    explanation: 'Nguyên lý bất định Heisenberg (Δx · Δp ≥ ℏ/2) khẳng định độ bất định về vị trí và động lượng có mối quan hệ nghịch biến, không thể cùng lúc đo chính xác tuyệt đối cả hai.',
  },
  {
    id: 'sci_x_2',
    category: 'science',
    difficulty: 'expert',
    text: 'Nhiệt độ Không độ tuyệt đối (0 Kelvin) tương đương với bao nhiêu độ C?',
    options: ['-273.15°C', '-373.15°C', '-173.15°C', '-459.67°C'],
    correctAnswerIndex: 0,
    explanation: '0 Kelvin tương đương -273.15°C, là giới hạn nhiệt động lực học nơi động năng của các hạt hạ nguyên tử đạt mức tối thiểu tuyệt đối.',
  },
  {
    id: 'sci_x_3',
    category: 'science',
    difficulty: 'expert',
    text: 'Bức xạ Hawking là giả thuyết vật lý lý thuyết do Stephen Hawking đề xuất về hiện tượng gì?',
    options: [
      'Ánh sáng phát ra từ vụ nổ siêu tân tinh (Supernova)',
      'Bức xạ nhiệt lượng tử phát ra từ ranh giới chân trời sự kiện của lỗ đen',
      'Sóng hấp dẫn phát ra từ va chạm sao neutron',
      'Bức xạ nền vi sóng vũ trụ thời kỳ Big Bang'
    ],
    correctAnswerIndex: 1,
    explanation: 'Bức xạ Hawking là bức xạ nhiệt phát ra do hiệu ứng cơ học lượng tử gần chân trời sự kiện, dự đoán rằng các lỗ đen sẽ dần bốc hơi và mất khối lượng theo thời gian.',
  },

  // ==================== LỊCH SỬ (HISTORY) ====================
  // DỄ (EASY)
  {
    id: 'his_e_1',
    category: 'history',
    difficulty: 'easy',
    text: 'Chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu" diễn ra vào năm nào?',
    options: ['1945', '1954', '1975', '1968'],
    correctAnswerIndex: 1,
    explanation: 'Chiến dịch Điện Biên Phủ kết thúc thắng lợi ngày 7/5/1954, buộc thực dân Pháp phải ký Hiệp định Genève.',
  },
  {
    id: 'his_e_2',
    category: 'history',
    difficulty: 'easy',
    text: 'Vị vua đầu tiên của triều đại nhà Tiền Lý trong lịch sử Việt Nam là ai?',
    options: ['Lý Bí (Lý Nam Đế)', 'Lý Công Uẩn (Lý Thái Tổ)', 'Lý Thường Kiệt', 'Lý Nhân Tông'],
    correctAnswerIndex: 0,
    explanation: 'Lý Bí (Lý Nam Đế) dựng cờ khởi nghĩa, đánh đuổi quân đô hộ nhà Lương và lập nên nước Vạn Xuân năm 544.',
  },
  {
    id: 'his_e_3',
    category: 'history',
    difficulty: 'easy',
    text: 'Kim Tự Tháp Giza kỳ vĩ là công trình kiến trúc cổ đại nổi tiếng của quốc gia nào?',
    options: ['Hy Lạp', 'Ai Cập', 'La Mã', 'Lưỡng Hà'],
    correctAnswerIndex: 1,
    explanation: 'Đại Kim tự tháp Giza được xây dựng ở Ai Cập cổ đại làm lăng mộ cho Pharaoh Khufu.',
  },
  {
    id: 'his_e_4',
    category: 'history',
    difficulty: 'easy',
    text: 'Bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa được Chủ tịch Hồ Chí Minh đọc vào ngày nào?',
    options: ['19/08/1945', '02/09/1945', '30/04/1975', '22/12/1944'],
    correctAnswerIndex: 1,
    explanation: 'Ngày 2/9/1945 tại Quảng trường Ba Đình (Hà Nội), Bác Hồ đọc Tuyên ngôn Độc lập tuyên bố nước Việt Nam tự do, độc lập.',
  },
  {
    id: 'his_e_5',
    category: 'history',
    difficulty: 'easy',
    text: 'Ai là người lãnh đạo cuộc khởi nghĩa Lam Sơn đánh đuổi quân Minh xâm lược?',
    options: ['Nguyễn Trãi', 'Lê Lợi', 'Trần Hưng Đạo', 'Quang Trung'],
    correctAnswerIndex: 1,
    explanation: 'Lê Lợi (Lê Thái Tổ) xưng Bình Định Vương, lãnh đạo cuộc khởi nghĩa Lam Sơn (1418 - 1427) giành lại độc lập cho Đại Việt.',
  },

  // TRUNG BÌNH (MEDIUM)
  {
    id: 'his_m_1',
    category: 'history',
    difficulty: 'medium',
    text: 'Trận Bạch Đằng năm 938 do vị anh hùng dân tộc nào chỉ huy đánh tan quân Nam Hán?',
    options: ['Ngô Quyền', 'Trần Hưng Đạo', 'Lê Hoàn', 'Đinh Bộ Lĩnh'],
    correctAnswerIndex: 0,
    explanation: 'Ngô Quyền dùng kế cắm cọc gỗ nhọn bịt sắt trên sông Bạch Đằng, đánh tan quân Nam Hán năm 938, chấm dứt hơn 1000 năm Bắc thuộc.',
  },
  {
    id: 'his_m_2',
    category: 'history',
    difficulty: 'medium',
    text: 'Năm 1010, vua Lý Thái Tổ đã ban bố văn bản lịch sử nổi tiếng nào để chuyển đô từ Hoa Lư về Đại La (Hà Nội)?',
    options: ['Bình Ngô Đại Cáo', 'Chiếu Dời Đô (Thiên đô chiếu)', 'Hịch Tướng Sĩ', 'Nam Quốc Sơn Hà'],
    correctAnswerIndex: 1,
    explanation: 'Vua Lý Thái Tổ ban "Chiếu dời đô" năm 1010 chuyển kinh đô về thành Đại La và đổi tên thành Thăng Long.',
  },
  {
    id: 'his_m_3',
    category: 'history',
    difficulty: 'medium',
    text: 'Chiến tranh thế giới thứ hai (WWII) chính thức kết thúc vào năm nào?',
    options: ['1943', '1945', '1948', '1950'],
    correctAnswerIndex: 1,
    explanation: 'Chiến tranh thế giới thứ hai kết thúc năm 1945 sau khi phát xít Đức và quân phiệt Nhật Bản đầu hàng đồng minh vô điều kiện.',
  },
  {
    id: 'his_m_4',
    category: 'history',
    difficulty: 'medium',
    text: 'Cách mạng Pháp bùng nổ vào năm 1789 với sự kiện quân chúng phá ngục nào?',
    options: ['Ngục Bastille', 'Cung điện Versailles', 'Tháp London', 'Đấu trường Colosseum'],
    correctAnswerIndex: 0,
    explanation: 'Ngày 14/7/1789, nhân dân Paris nổi dậy phá ngục Bastille - biểu tượng chuyên chế của chế độ quân chủ Bourbon.',
  },
  {
    id: 'his_m_5',
    category: 'history',
    difficulty: 'medium',
    text: 'Bộ luật Hồng Đức - một trong những đỉnh cao lập pháp cổ truyền của Việt Nam - được ban hành dưới triều vua nào?',
    options: ['Lý Thánh Tông', 'Trần Thánh Tông', 'Lê Thánh Tông', 'Gia Long'],
    correctAnswerIndex: 2,
    explanation: 'Bộ luật Hồng Đức (Quốc triều hình luật) được ban hành và hoàn thiện dưới thời vua Lê Thánh Tông (niên hiệu Hồng Đức).',
  },

  // KHÓ (HARD)
  {
    id: 'his_h_1',
    category: 'history',
    difficulty: 'hard',
    text: 'Hội nghị Diên Hồng năm 1284 do Thượng hoàng Trần Thánh Tông triệu tập nhằm mục đích chủ yếu gì?',
    options: [
      'Chọn người kế vị ngai vàng',
      'Hỏi ý kiến các bô lão cả nước nên ĐÁNH hay nên HÒA trước quân Nguyên Mông',
      'Cải cách ruộng đất và phân phối lương thảo',
      'Định ra khoa cử thi trạng nguyên'
    ],
    correctAnswerIndex: 1,
    explanation: 'Hội nghị Diên Hồng tập hợp các bô lão đại diện cho ý chí toàn dân, muôn người đồng thanh hô vang "ĐÁNH!", tạo sức mạnh đại đoàn kết toàn dân.',
  },
  {
    id: 'his_h_2',
    category: 'history',
    difficulty: 'hard',
    text: 'Năm 1453 đánh dấu sự kiện lịch sử làm sụp đổ hoàn toàn Đế quốc Đông La Mã (Byzantine) là gì?',
    options: [
      'Cuộc viễn chinh của Alexander Đại đế',
      'Quân Ottoman do Sultan Mehmed II chỉ huy chiếm thành Constantinople',
      'Hiệp ước Westphalia được ký kết',
      'Dịch bệnh Cái chết Đen tàn phá Châu Âu'
    ],
    correctAnswerIndex: 1,
    explanation: 'Thành Constantinople thất thủ ngày 29/5/1453 trước quân Ottoman, chấm dứt hơn 1000 năm tồn tại của Đế chế Byzantine.',
  },
  {
    id: 'his_h_3',
    category: 'history',
    difficulty: 'hard',
    text: 'Đại thắng Ngọc Hồi - Đống Đa đại phá 29 vạn quân Mãn Thanh diễn ra vào mùa xuân năm nào?',
    options: ['Kỷ Dậu 1789', 'Mậu Tuất 1778', 'Quý Sửu 1793', 'Canh Tý 1780'],
    correctAnswerIndex: 0,
    explanation: 'Vua Quang Trung (Nguyễn Huệ) mở cuộc hành quân thần tốc đánh tan 29 vạn quân Thanh xâm lược vào dịp Tết Kỷ Dậu 1789.',
  },
  {
    id: 'his_h_4',
    category: 'history',
    difficulty: 'hard',
    text: 'Đế chế La Mã cổ đại có vị Hoàng đế đầu tiên mang danh hiệu "Augustus" là ai?',
    options: ['Julius Caesar', 'Octavian (Gaius Octavius)', 'Nero', 'Marcus Aurelius'],
    correctAnswerIndex: 1,
    explanation: 'Gaius Octavius (cháu và con nuôi của Julius Caesar) trở thành Hoàng đế đầu tiên của La Mã với danh hiệu Augustus năm 27 TCN.',
  },

  // CỰC KHÓ / CHUYÊN GIA (EXPERT)
  {
    id: 'his_x_1',
    category: 'history',
    difficulty: 'expert',
    text: 'Tác phẩm sử học kinh điển "Đại Việt sử ký toàn thư" do nhà sử học nào thời Hậu Lê biên soạn dựa trên nền tảng của Lê Văn Hưu và Phan Phu Tiên?',
    options: ['Ngô Sĩ Liên', 'Lê Quý Đôn', 'Phan Huy Chú', 'Ngô Thì Nhậm'],
    correctAnswerIndex: 0,
    explanation: 'Ngô Sĩ Liên là sử gia xuất sắc thời Lê sơ, người đã biên soạn bộ "Đại Việt sử ký toàn thư" gồm 15 quyển dâng lên vua Lê Thánh Tông năm 1479.',
  },
  {
    id: 'his_x_2',
    category: 'history',
    difficulty: 'expert',
    text: 'Hòa ước Westphalia năm 1648 có ý nghĩa bước ngoặt nào trong lịch sử ngoại giao thế giới?',
    options: [
      'Chấm dứt Chiến tranh Ba mươi năm và đặt nền móng cho hệ thống chủ quyền quốc gia hiện đại',
      'Thành lập Hội Quốc Liên đầu tiên',
      'Phân chia các thuộc địa châu Mỹ giữa Tây Ban Nha và Bồ Đào Nha',
      'Thống nhất các bang nước Đức lần đầu tiên'
    ],
    correctAnswerIndex: 0,
    explanation: 'Hòa ước Westphalia (1648) chấm dứt Chiến tranh Ba mươi năm ở châu Âu và xác lập nguyên tắc chủ quyền quốc gia độc lập (Westphalian Sovereignty).',
  },
  {
    id: 'his_x_3',
    category: 'history',
    difficulty: 'expert',
    text: 'Vua Hàm Nghi xuống Chiếu Cần Vương kêu gọi văn thân sĩ phu và nhân dân phò vua cứu nước vào năm nào, tại địa danh nào?',
    options: [
      'Năm 1885 tại sơn phòng Tân Sở (Quảng Trị)',
      'Năm 1883 tại kinh thành Huế',
      'Năm 1888 tại Hương Khê (Hà Tĩnh)',
      'Năm 1884 tại chiến khu Ba Đình (Thanh Hóa)'
    ],
    correctAnswerIndex: 0,
    explanation: 'Sau vụ biến kinh thành Huế, Tôn Thất Thuyết rước vua Hàm Nghi ra sơn phòng Tân Sở (Quảng Trị) và phát hịch Cần Vương vào tháng 7 năm 1885.',
  },

  // ==================== VĂN HÓA (CULTURE) ====================
  // DỄ (EASY)
  {
    id: 'cul_e_1',
    category: 'culture',
    difficulty: 'easy',
    text: 'Bánh chưng, bánh giầy trong phong tục cổ truyền người Việt tượng trưng cho điều gì theo quan niệm dân gian?',
    options: ['Trời tròn và Đất vuông', 'Mặt Trời và Mặt Trăng', 'Sông và Núi', 'Cha và Mẹ'],
    correctAnswerIndex: 0,
    explanation: 'Bánh chưng hình vuông tượng trưng cho Đất, bánh giầy hình tròn tượng trưng cho Trời, gắn liền với truyền thuyết Lang Liêu thời Hùng Vương.',
  },
  {
    id: 'cul_e_2',
    category: 'culture',
    difficulty: 'easy',
    text: 'Bức tranh nổi tiếng "Mona Lisa" với nụ cười bí ẩn là kiệt tác của danh họa nào thời Phục Hưng?',
    options: ['Leonardo da Vinci', 'Michelangelo', 'Vincent van Gogh', 'Pablo Picasso'],
    correctAnswerIndex: 0,
    explanation: 'Leonardo da Vinci là danh họa toàn năng người Ý đã vẽ bức kiệt tác Mona Lisa vào đầu thế kỷ 16.',
  },
  {
    id: 'cul_e_3',
    category: 'culture',
    difficulty: 'easy',
    text: 'Di sản nào của Việt Nam được UNESCO vinh danh là Di sản Thiên nhiên Thế giới đầu tiên vào năm 1994?',
    options: ['Vịnh Hạ Long', 'Vườn quốc gia Phong Nha - Kẻ Bàng', 'Quần thể danh thắng Tràng An', 'Cao nguyên đá Đồng Văn'],
    correctAnswerIndex: 0,
    explanation: 'Vịnh Hạ Long (Quảng Ninh) được UNESCO công nhận là Di sản Thiên nhiên Thế giới lần đầu tiên năm 1994 về giá trị cảnh quan thẩm mỹ.',
  },
  {
    id: 'cul_e_4',
    category: 'culture',
    difficulty: 'easy',
    text: 'Nhạc cụ dân tộc Việt Nam nào chỉ có DUY NHẤT một dây nhưng có thể phát ra âm thanh luyến láy phong phú?',
    options: ['Đàn Bầu (Độc huyền cầm)', 'Đàn Tranh', 'Đàn Tỳ Bà', 'Đàn Nguyệt'],
    correctAnswerIndex: 0,
    explanation: 'Đàn Bầu (độc huyền cầm) có một dây duy nhất gảy kết hợp với que rung để tạo nên những cung bậc cảm xúc da diết đặc sắc.',
  },
  {
    id: 'cul_e_5',
    category: 'culture',
    difficulty: 'easy',
    text: 'Lễ hội Đền Hùng được tổ chức định kỳ vào ngày âm lịch nào hàng năm?',
    options: ['Mùng 10 tháng 3', 'Rằm tháng Giêng', 'Mùng 5 tháng 5', 'Rằm tháng Tám'],
    correctAnswerIndex: 0,
    explanation: 'Câu ca dao lưu truyền ngàn đời: "Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba".',
  },

  // TRUNG BÌNH (MEDIUM)
  {
    id: 'cul_m_1',
    category: 'culture',
    difficulty: 'medium',
    text: 'Tác phẩm "Truyện Kiều" (Đoạn trường tân thanh) của Đại thi hào Nguyễn Du được sáng tác bằng chữ gì?',
    options: ['Chữ Hán', 'Chữ Nôm', 'Chữ Quốc ngữ Latinh', 'Chữ Phạn'],
    correctAnswerIndex: 1,
    explanation: 'Nguyễn Du viết Truyện Kiều bằng thể thơ lục bát truyền thống bằng chữ Nôm - đỉnh cao văn học cổ điển Việt Nam.',
  },
  {
    id: 'cul_m_2',
    category: 'culture',
    difficulty: 'medium',
    text: 'Không gian văn hóa Cồng chiêng Tây Nguyên của Việt Nam được UNESCO công nhận là di sản văn hóa thuộc loại hình nào?',
    options: [
      'Di sản tư liệu thế giới',
      'Kiệt tác di sản văn hóa phi vật thể và truyền khẩu của nhân loại',
      'Di sản thiên nhiên thế giới',
      'Di sản kiến trúc đô thị cổ'
    ],
    correctAnswerIndex: 1,
    explanation: 'Không gian văn hóa Cồng chiêng Tây Nguyên được UNESCO công nhận là Kiệt tác di sản văn hóa phi vật thể và truyền khẩu nhân loại năm 2005.',
  },
  {
    id: 'cul_m_3',
    category: 'culture',
    difficulty: 'medium',
    text: 'Điệu nhảy truyền thống Flamenco sôi động và quyến rũ có xuất xứ từ quốc gia nào?',
    options: ['Tây Ban Nha', 'Ý', 'Pháp', 'Argentina'],
    correctAnswerIndex: 0,
    explanation: 'Flamenco là hình thức nghệ thuật truyền thống đặc sắc gắn liền với vùng Andalusia ở miền nam Tây Ban Nha.',
  },
  {
    id: 'cul_m_4',
    category: 'culture',
    difficulty: 'medium',
    text: 'Trang phục truyền thống Kimono của đất nước Nhật Bản có ý nghĩa nguyên văn từ chữ Hán là gì?',
    options: ['Áo hoa anh đào', 'Đồ để mặc (Trứ vật)', 'Áo lụa quý tộc', 'Y phục mùa xuân'],
    correctAnswerIndex: 1,
    explanation: 'Kimono ghép từ chữ Ki (mặc) và Mono (đồ/vật), nghĩa đen ban đầu chỉ đơn giản là "quần áo để mặc".',
  },
  {
    id: 'cul_m_5',
    category: 'culture',
    difficulty: 'medium',
    text: 'Làng gốm Bát Tràng - một trong những làng nghề thủ công trứ danh của Việt Nam - nằm bên bờ con sông nào?',
    options: ['Sông Đà', 'Sông Hồng', 'Sông Đuống', 'Sông Đáy'],
    correctAnswerIndex: 1,
    explanation: 'Làng gốm Bát Tràng nằm ở tả ngạn sông Hồng, thuộc huyện Gia Lâm, thủ đô Hà Nội, có lịch sử hơn 500 năm.',
  },

  // KHÓ (HARD)
  {
    id: 'cul_h_1',
    category: 'culture',
    difficulty: 'hard',
    text: 'Hình thức nghệ thuật hát Ca trù của Việt Nam sử dụng nhạc cụ dây chính nào có ba dây và thùng đàn hình chữ nhật?',
    options: ['Đàn Đáy', 'Đàn Tam', 'Đàn Đoản', 'Đàn Nhị'],
    correctAnswerIndex: 0,
    explanation: 'Đàn Đáy (vô đề cầm) là nhạc cụ độc đáo chỉ có ở Việt Nam, có cần rất dài, ba dây tơ và thùng đàn hình chữ nhật đáy mở, chuyên dùng đệm cho đào nương hát Ca trù.',
  },
  {
    id: 'cul_h_2',
    category: 'culture',
    difficulty: 'hard',
    text: 'Sử thi "Mahabharata" và "Ramayana" là hai bộ sử thi vĩ đại thuộc nền văn minh cổ đại nào?',
    options: ['Ấn Độ', 'Hy Lạp', 'Ba Tư', 'Lưỡng Hà'],
    correctAnswerIndex: 0,
    explanation: 'Mahabharata và Ramayana là hai pho sử thi đồ sộ viết bằng tiếng Phạn (Sanskrit) của nền văn minh Ấn Độ cổ đại.',
  },
  {
    id: 'cul_h_3',
    category: 'culture',
    difficulty: 'hard',
    text: 'Lối kiến trúc Gothic thời Trung cổ tại châu Âu nổi bật với đặc trưng kết cấu nào sau đây?',
    options: [
      'Vòm cuốn tròn thấp và tường rất dày ít cửa sổ',
      'Vòm nhọn (pointed arch), sườn vòm có gân và cuốn bay (flying buttress)',
      'Mái vòm củ hành nhiều màu sắc',
      'Cột tròn trơn đơn giản không có hoa văn trang trí'
    ],
    correctAnswerIndex: 1,
    explanation: 'Kiến trúc Gothic (thế kỷ 12-16) nổi danh với vòm nhọn, cuốn bay trợ lực ngoài tường, cho phép mở rộng cửa sổ kính màu khổng lồ đón ánh sáng.',
  },
  {
    id: 'cul_h_4',
    category: 'culture',
    difficulty: 'hard',
    text: 'Trống đồng Đông Sơn tiêu biểu của Văn hóa Đông Sơn thường khắc họa hình tượng loài chim thần thoại nào bay ngược chiều kim đồng hồ?',
    options: ['Chim Lạc', 'Chim Phượng hoàng', 'Chim Hạc trắng', 'Chim Công'],
    correctAnswerIndex: 0,
    explanation: 'Hình tượng đàn chim Lạc mỏ dài sải cánh bay quanh mặt trời trên mặt trống đồng Đông Sơn là biểu tượng văn hóa cội nguồn thiêng liêng của người Việt cổ.',
  },

  // CỰC KHÓ / CHUYÊN GIA (EXPERT)
  {
    id: 'cul_x_1',
    category: 'culture',
    difficulty: 'expert',
    text: 'Lễ hội Ka-tê là lễ hội dân gian truyền thống thiêng liêng nhất của cộng đồng dân tộc nào ở Việt Nam?',
    options: ['Người Chăm theo đạo Bà La Môn', 'Người Khmer Nam Bộ', 'Người Ê Đê', 'Người Mường'],
    correctAnswerIndex: 0,
    explanation: 'Lễ hội Ka-tê (Katé) là lễ hội lớn nhất trong năm của đồng bào Chăm theo đạo Bà La Môn để tưởng nhớ các vị thần linh, vua chúa và tổ tiên.',
  },
  {
    id: 'cul_x_2',
    category: 'culture',
    difficulty: 'expert',
    text: 'Thang âm "Ngũ cung" (Pentatonic scale) truyền thống trong âm nhạc cổ truyền phương Đông và Việt Nam bao gồm 5 nốt nào?',
    options: [
      'Cung - Thương - Giốc - Chủy - Vũ (Hò, Xự, Xang, Xê, Cống)',
      'Đô - Rê - Mi - Pha - Son',
      'Thanh - Trầm - Huyền - Bổng - Tản',
      'Kim - Mộc - Thủy - Hỏa - Thổ'
    ],
    correctAnswerIndex: 0,
    explanation: 'Hệ thống ngũ cung cổ điển gồm 5 âm: Cung (Gong), Thương (Shang), Giốc (Jiao), Chủy (Zhi), Vũ (Yu); trong âm nhạc Nam Bộ tương ứng các âm Hò, Xự, Xang, Xê, Cống.',
  },
  {
    id: 'cul_x_3',
    category: 'culture',
    difficulty: 'expert',
    text: 'Triết lý "Wabi-Sabi" trong văn hóa thẩm mỹ truyền thống Nhật Bản tôn vinh vẻ đẹp của điều gì?',
    options: [
      'Sự đối xứng tuyệt đối và hoàn mỹ không tì vết',
      'Vẻ đẹp của sự bất toàn, vô thường và mộc mạc tự nhiên',
      'Sự tráng lệ, xa hoa và rực rỡ sắc màu',
      'Sự tối tân của máy móc công nghệ hiện đại'
    ],
    correctAnswerIndex: 1,
    explanation: 'Wabi-Sabi là quan niệm thẩm mỹ sâu sắc của Nhật Bản tìm thấy vẻ đẹp trong những điều không hoàn hảo, vô thường, mộc mạc và giản dị theo quy luật thời gian.',
  },
];

// Helper functions
export const DIFFICULTY_ORDER: DifficultyLevel[] = ['easy', 'medium', 'hard', 'expert'];

export const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; color: string; badgeBg: string; scoreMultiplier: number; pullBonus: number }
> = {
  easy: {
    label: 'Dễ',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    scoreMultiplier: 1,
    pullBonus: 8,
  },
  medium: {
    label: 'Trung Bình',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    scoreMultiplier: 1.5,
    pullBonus: 12,
  },
  hard: {
    label: 'Khó',
    color: 'text-rose-400',
    badgeBg: 'bg-rose-500/20 border-rose-500/40 text-rose-300',
    scoreMultiplier: 2,
    pullBonus: 16,
  },
  expert: {
    label: 'Chuyên Gia',
    color: 'text-purple-400',
    badgeBg: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    scoreMultiplier: 3,
    pullBonus: 20,
  },
};

export const CATEGORY_CONFIG: Record<
  Category,
  { label: string; icon: string; color: string; tagBg: string }
> = {
  science: {
    label: 'Khoa Học',
    icon: 'Atom',
    color: 'text-cyan-400',
    tagBg: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
  },
  history: {
    label: 'Lịch Sử',
    icon: 'Landmark',
    color: 'text-amber-400',
    tagBg: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
  },
  culture: {
    label: 'Văn Hóa',
    icon: 'Sparkles',
    color: 'text-purple-400',
    tagBg: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
  },
};

export function getNextDifficulty(current: DifficultyLevel): DifficultyLevel {
  const currentIndex = DIFFICULTY_ORDER.indexOf(current);
  if (currentIndex < DIFFICULTY_ORDER.length - 1) {
    return DIFFICULTY_ORDER[currentIndex + 1];
  }
  return 'expert';
}

/**
 * Lấy câu hỏi tiếp theo không bị trùng lặp
 */
export function getNextQuestion(
  categories: Category[],
  difficulty: DifficultyLevel,
  usedQuestionIds: Set<string>,
  customPool: Question[] = QUESTIONS
): Question | null {
  const pool = customPool && customPool.length > 0 ? customPool : QUESTIONS;

  // Ưu tiên: cùng độ khó và thuộc các chủ đề đã chọn, chưa dùng
  const candidatePool = pool.filter(
    q =>
      categories.includes(q.category) &&
      q.difficulty === difficulty &&
      !usedQuestionIds.has(q.id)
  );

  if (candidatePool.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidatePool.length);
    return candidatePool[randomIndex];
  }

  // Nếu hết câu hỏi ở độ khó hiện tại, thử tìm ở độ khó lân cận chưa dùng
  const fallbackPool = pool.filter(
    q => categories.includes(q.category) && !usedQuestionIds.has(q.id)
  );

  if (fallbackPool.length > 0) {
    const randomIndex = Math.floor(Math.random() * fallbackPool.length);
    return fallbackPool[randomIndex];
  }

  // Nếu đã dùng hết tất cả câu hỏi, lấy ngẫu nhiên 1 câu (reset vòng lặp)
  const allInCategory = pool.filter(q => categories.includes(q.category));
  if (allInCategory.length > 0) {
    return allInCategory[Math.floor(Math.random() * allInCategory.length)];
  }

  return pool[0] || null;
}
