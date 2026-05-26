/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import logoImg from "./assets/images/logo.jpg";
import lobbyImg from "./assets/images/lobby.png";
import heroImg from "./assets/images/hero_cover.jpg";
import trangImg from "./assets/images/founder_trang.png";
import thaoImg from "./assets/images/founder_thao.png";
import { 
  Menu, 
  Globe, 
  GraduationCap, 
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  Baby, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail,
  Facebook,
  School,
  Sparkles,
  Brain,
  PenTool,
  MicVocal,
  Cpu,
  User,
  Smartphone,
  CheckCircle2,
  Play,
  BookOpen,
  Headphones,
  Music,
  Video,
  Gamepad2,
  Languages,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  Percent,
  Award,
  Info,
  Calendar,
  Coins,
  Wallet,
  FileText,
  X
} from "lucide-react";

export default function App() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };

  const [activePricingTab, setActivePricingTab] = useState<"standard" | "private" | "policies" | "rules">("standard");
  const [tuitionViewTerm, setTuitionViewTerm] = useState<"monthly" | "quad" | "yearly">("quad");
  const [expandedRule, setExpandedRule] = useState<number | null>(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<any | null>(null);

  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Trang chủ" },
    { id: "courses", label: "Khóa học" },
    { id: "tai-lieu-hoc-tap", label: "Công nghệ độc quyền" },
    { id: "tai-nguyen-hoc-tap", label: "Tài nguyên học tập" },
    { id: "video-gioi-thieu", label: "Tin tức" },
    { id: "register", label: "Liên hệ" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection("register");
        return;
      }

      const scrollPosition = window.scrollY + 120; // sticky header buffer offset
      
      const sections = ["home", "courses", "tai-lieu-hoc-tap", "tai-nguyen-hoc-tap", "video-gioi-thieu", "register"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Counter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
      if (isInView) {
        let startTime: number;
        let animationFrame: number;

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) {
            animationFrame = requestAnimationFrame(step);
          }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
      }
    }, [isInView, end, duration]);

    return <span ref={nodeRef}>{count}</span>;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-surface border-b border-outline-variant w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-6 h-20 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="Nextgen English Logo" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm border border-outline-variant/30"
            />
            <div className="font-lexend text-xl md:text-2xl font-bold text-primary leading-none">Nextgen English</div>
          </div>
          
          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-bold text-sm transition-colors cursor-pointer pb-1 ${
                  activeSection === item.id 
                    ? "text-primary border-b-2 border-secondary-container" 
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button 
            onClick={() => scrollToSection("tai-nguyen-hoc-tap")}
            className="hidden md:flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-900 transition-colors bg-amber-50 hover:bg-amber-100/70 border border-amber-200 px-3.5 py-1.5 rounded-full cursor-pointer shadow-sm hover:shadow"
          >
            <BookOpen className="w-4 h-4 text-amber-600 animate-pulse" />
            Bộ sách nổi tiếng
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-surface border-t border-outline-variant px-6 py-4 flex flex-col gap-3 shadow-lg"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left font-bold text-sm py-2 px-3 rounded-xl transition-all ${
                  activeSection === item.id 
                    ? "bg-secondary-container/20 text-primary border-l-4 border-primary pl-4" 
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-variant/10"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                scrollToSection("tai-nguyen-hoc-tap");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between font-bold text-sm py-2.5 px-3 rounded-xl transition-all text-amber-800 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 mt-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                Bộ sách nổi tiếng
              </span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>
          </motion.div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative w-full min-h-[80vh] md:min-h-[600px] bg-surface-variant overflow-hidden flex flex-col justify-end p-6 md:p-12 scroll-mt-20">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Ảnh bìa Trung tâm Ngoại ngữ Nextgen" 
              className="w-full h-full object-cover opacity-95" 
              src={heroImg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col gap-4 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-1.5 rounded-full w-fit shadow-sm">
              <span className="text-sm font-bold">Nextgen English - Uông Bí</span>
            </div>
            <h1 className="font-lexend text-4xl md:text-6xl text-primary leading-tight font-bold">
              Nextgen English.<br />Learn English - Lead the way
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl">
              Cam kết môi trường học chất lượng cao – giúp học viên tự tin giao tiếp và bứt phá tương lai.
            </p>
            <button 
              onClick={() => scrollToSection("register")}
              className="bg-primary text-on-primary text-sm font-bold py-4 px-8 rounded-lg self-start mt-4 shadow-lg hover:bg-primary-container transition-all active:scale-95 cursor-pointer"
            >
              Nhận tư vấn miễn phí
            </button>
          </motion.div>
        </section>

        {/* Commitment Section */}
        <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto flex flex-col gap-8">
          <motion.div {...fadeInUp} className="flex flex-col gap-2">
            <h2 className="font-lexend text-2xl md:text-3xl text-on-surface font-bold">Cam kết của chúng tôi</h2>
            <div className="h-1.5 w-16 bg-secondary-container rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: GraduationCap, title: "Chất lượng giảng dạy", desc: "Giáo viên tâm huyết, phương pháp hiện đại, tối ưu hóa quá trình tiếp thu." },
              { icon: Heart, title: "Môi trường truyền cảm hứng", desc: "Học tập không áp lực, kích thích sự sáng tạo và yêu thích học tiếng Anh." },
              { icon: ShieldCheck, title: "Đầu ra chuẩn quốc tế", desc: "Lộ trình rõ ràng, cam kết đạt kết quả cao trong các kỳ thi chứng chỉ." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="bg-surface p-6 rounded-2xl shadow-level-1 border border-outline-variant/30 flex gap-4 items-start hover:border-primary/30 transition-colors"
              >
                <div className="bg-primary-container/10 p-3 rounded-xl text-primary shrink-0">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-on-surface">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* About Center Section */}
        <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center bg-white rounded-3xl my-12 shadow-level-1 border border-outline-variant/20 overflow-hidden">
          <motion.div 
            {...fadeInUp}
            className="w-full md:w-1/2 aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden relative"
          >
            <img 
              alt="Sảnh lễ tân Trung tâm Ngoại ngữ Nextgen" 
              className="w-full h-full object-cover" 
              src={lobbyImg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-primary text-white text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                TT Ngoại Ngữ Nextgen - Uông Bí
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            {...fadeInUp}
            className="w-full md:w-1/2 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="text-secondary font-bold text-sm tracking-widest uppercase">Về chúng tôi</span>
              <h2 className="font-lexend text-3xl md:text-4xl text-on-surface font-bold">Trung Tâm Ngoại Ngữ Nextgen</h2>
              <div className="h-1.5 w-16 bg-secondary-container rounded-full"></div>
            </div>
            
            <div className="flex flex-col gap-4 text-on-surface-variant leading-relaxed">
              <p className="text-lg font-medium text-primary">
                "Learn English - Lead the way - Học tiếng Anh, dẫn lối tương lai."
              </p>
              <p>
                Nextgen English tự hào là trung tâm ngoại ngữ hàng đầu tại Uông Bí, chuyên cung cấp các chương trình đào tạo tiếng Anh chất lượng cao cho mọi lứa tuổi. Chúng tôi luôn ưu tiên lấy sự phát triển khả năng ngôn ngữ của học sinh làm trung tâm, hướng đến việc tạo ra một môi trường học tập mang tính thực hành cao.
              </p>
              <p>
                Với đội ngũ giáo viên giàu kinh nghiệm và tâm huyết, Nextgen giúp học sinh yêu thích tiếng Anh, tự tin làm chủ kiến thức và kĩ năng của mình để bứt phá tương lai.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 text-center">
                <div className="text-2xl font-bold text-primary"><Counter end={10} />+</div>
                <div className="text-xs uppercase font-bold text-on-surface-variant opacity-60">Chương trình học</div>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-outline-variant/30 text-center">
                <div className="text-2xl font-bold text-primary"><Counter end={2000} />+</div>
                <div className="text-xs uppercase font-bold text-on-surface-variant opacity-60">Học viên thành công</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Programs Section */}
        <section id="courses" className="py-16 md:py-24 px-6 bg-surface-variant/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            
            {/* Header */}
            <motion.div {...fadeInUp} className="flex flex-col gap-3 items-center text-center">
              <span className="text-primary font-extrabold text-sm tracking-widest uppercase bg-primary/10 px-4 py-1 rounded-full">
                CÔNG TY TNHH NABLA VIỆT NAM
              </span>
              <h2 className="font-lexend text-xl sm:text-2xl md:text-3xl lg:text-4xl text-on-surface font-black leading-snug tracking-tight max-w-4xl text-center">
                CHƯƠNG TRÌNH ĐÀO TẠO
              </h2>
              <div className="h-1.5 w-24 bg-secondary-container rounded-full mt-2"></div>
            </motion.div>

            {/* Admission Info */}
            <div className="flex flex-col gap-4 text-center items-center mt-4">
              <span className="text-secondary font-bold text-sm tracking-widest uppercase bg-secondary/10 px-4 py-1.5 rounded-full w-fit">
                Năm học 2026 - 2027
              </span>
              <h3 className="font-lexend text-2xl md:text-4xl text-[#073a36] font-bold leading-tight">
                Thông Báo Tuyển Sinh Năm Học Mới
              </h3>
              <div className="h-1 w-20 bg-primary rounded-full mb-2"></div>
              <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
                Trung tâm Ngoại ngữ Nextgen xin gửi lời chào trân trọng đến Quý phụ huynh cùng các em học sinh. Chúng tôi chính thức tuyển sinh các chương trình Anh ngữ chất lượng cao cho năm học mới:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Program 1 */}
              <motion.div 
                {...fadeInUp}
                className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all flex flex-col gap-4"
              >
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0">
                  🐣
                </div>
                <div>
                  <h3 className="font-lexend font-black text-lg text-[#073a36]">Mầm non (4 - 5 tuổi)</h3>
                  <p className="text-xs text-primary font-bold uppercase mt-1">Học mà chơi - chơi mà học</p>
                </div>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  Làm quen tiếng Anh qua hình ảnh sinh động, âm thanh rộn ràng và vận động trực quan. Hình thành phản xạ tự nhiên nhất cho trẻ ngay từ thuở sơ khai.
                </p>
              </motion.div>

              {/* Program 2 */}
              <motion.div 
                {...fadeInUp}
                className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all flex flex-col gap-4"
              >
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0">
                  🎒
                </div>
                <div>
                  <h3 className="font-lexend font-black text-lg text-[#073a36]">Tiểu học (Lớp 1 - 5)</h3>
                  <p className="text-xs text-primary font-bold uppercase mt-1">Xây nền tảng vững chắc</p>
                </div>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  Phát triển đồng đều 4 kỹ năng: Nghe - Nói - Đọc - Viết. Giúp các em xây dựng rễ từ vựng và ngữ pháp vững vàng, tự tin giao tiếp và bứt phá điểm số ở trường.
                </p>
              </motion.div>

              {/* Program 3 */}
              <motion.div 
                {...fadeInUp}
                className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all flex flex-col gap-4"
              >
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0">
                  📚
                </div>
                <div>
                  <h3 className="font-lexend font-black text-lg text-[#073a36]">THCS (Lớp 6 - 9)</h3>
                  <p className="text-xs text-primary font-bold uppercase mt-1">Lộ trình rõ ràng</p>
                </div>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  Củng cố, nâng cao kiến thức bám sát khung SGK mới và chuẩn Cambridge. Lộ trình ôn thi học thuật rõ ràng để con tự tin học tập và vượt trội mục tiêu điểm số.
                </p>
              </motion.div>

              {/* Program 4 */}
              <motion.div 
                {...fadeInUp}
                className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all flex flex-col gap-4"
              >
                <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0">
                  🎓
                </div>
                <div>
                  <h3 className="font-lexend font-black text-lg text-[#073a36]">Luyện thi IELTS / 4 Kỹ Năng</h3>
                  <p className="text-xs text-primary font-bold uppercase mt-1">Lộ trình học bài bản</p>
                </div>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  Chương trình chuẩn hóa học thuật cao, phát triển toàn diện tư duy ngôn ngữ. Lộ trình giảng dạy khoa học giúp học viên tự tin nâng cao trình độ, đạt mục tiêu chứng chỉ.
                </p>
              </motion.div>
            </div>

            {/* Why Nextgen Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 md:p-12 rounded-[3rem] border border-primary/10 shadow-sm">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <h3 className="font-lexend text-2xl font-black text-[#073a36]">Vì sao ba mẹ lựa chọn NEXTGEN?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Lộ trình học rõ ràng, phù hợp từng độ tuổi",
                    "Giáo viên theo sát, quan tâm học sinh",
                    "Học chắc - hiểu sâu - tiến bộ bền vững",
                    "Kiểm tra đầu vào MIỄN PHÍ 100%"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 bg-surface p-4 rounded-2xl border border-outline-variant/20 shadow-sm">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">✓</span>
                      <span className="text-xs font-bold text-[#073a36]">{benefit}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-semibold text-on-surface-variant italic leading-relaxed">
                  * NextGen cam kết kiểm tra đầu vào 100% miễn phí nhằm đánh giá chính xác nhất năng lực ban đầu của con để xếp lớp và xây dựng lộ trình rèn luyện phù hợp nhất.
                </p>
              </div>

              <div className="lg:col-span-5 bg-surface p-6 rounded-[2.5rem] border-2 border-secondary/20 shadow-sm flex flex-col gap-4 text-center items-center">
                <span className="bg-red-500 text-white font-extrabold uppercase text-[10px] tracking-wider px-4 py-1.5 rounded-full animate-bounce">
                  Thông tin tuyển sinh
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-on-surface-variant uppercase">Hạn cuối đăng ký</span>
                  <span className="font-lexend text-2xl font-black text-secondary mt-1">31 / 05 / 2026</span>
                </div>
                <div className="w-full h-px bg-outline-variant/30"></div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="text-left w-full text-xs font-bold text-on-surface-variant flex flex-col gap-1">
                    <span className="text-[10px] uppercase text-primary tracking-wider">Hotline tư vấn liên hệ:</span>
                    <span className="text-sm font-black text-[#073a36]">0986 197 229 / 0334 141 989</span>
                  </div>
                  <div className="text-left w-full text-xs font-bold text-on-surface-variant flex flex-col gap-1 mt-1">
                    <span className="text-[10px] uppercase text-primary tracking-wider">Địa chỉ trung tâm:</span>
                    <span className="text-xs font-black text-[#073a36]">Số 32 Tổ 31B K9, Quang Trung, Phường Uông Bí, Quảng Ninh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Divider */}
            <div className="h-px bg-outline-variant/30 my-6"></div>

            {/* Sub-heading for details */}
            <div className="flex flex-col gap-2 text-center items-center">
              <h3 className="font-lexend text-xl md:text-2xl font-black text-on-surface">CHI TIẾT CHƯƠNG TRÌNH HỌC & HỌC PHÍ</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest bg-secondary-container/20 px-4 py-1 rounded-full w-fit">
                Vui lòng chọn hình thức bên dưới để xem biểu phí
              </p>
            </div>

            {/* Tab Navigations */}
            <motion.div 
              {...fadeInUp}
              className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-3xl shadow-lg border border-outline-variant/30 max-w-4xl mx-auto w-full"
            >
              {[
                { id: "standard", label: "Chương Trình Học Kỳ", icon: GraduationCap },
                { id: "private", label: "Học Phí Kèm Riêng", icon: Coins },
                { id: "policies", label: "Chính Sách Ưu Đãi", icon: Award },
                { id: "rules", label: "Quy Định & Nội Quy", icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePricingTab(tab.id as any)}
                  className={`flex items-center gap-2 font-lexend font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-300 flex-1 min-w-[180px] justify-center ${
                    activePricingTab === tab.id
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                      : "text-on-surface-variant hover:bg-surface-variant/30 hover:text-primary"
                  }`}
                >
                  <tab.icon className="w-5 h-5 shrink-0" />
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* TAB CONTENT: STANDARD COURSES */}
            {activePricingTab === "standard" && (
              <div className="flex flex-col gap-10">
                {/* Tuition View Period Toggle */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <span className="text-xs uppercase font-extrabold text-on-surface-variant flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" /> Chọn hình thức đóng học phí để nhận ưu đãi:
                  </span>
                  <div className="inline-flex bg-white rounded-2xl p-1.5 border border-outline-variant/30 shadow-sm relative z-10">
                    <button
                      onClick={() => setTuitionViewTerm("monthly")}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        tuitionViewTerm === "monthly"
                          ? "bg-secondary-container text-primary shadow-level-1"
                          : "text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      Đóng theo Tháng
                    </button>
                    <button
                      onClick={() => setTuitionViewTerm("quad")}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all relative ${
                        tuitionViewTerm === "quad"
                          ? "bg-primary text-white shadow-level-1"
                          : "text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      Kỳ 4 Tháng
                      <span className="absolute -top-3.5 -right-2 bg-pink-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full rotate-6 animate-pulse border border-white">
                        Giảm 3%
                      </span>
                    </button>
                    <button
                      onClick={() => setTuitionViewTerm("yearly")}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all relative ${
                        tuitionViewTerm === "yearly"
                          ? "bg-amber-600 text-white shadow-level-1"
                          : "text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      Kỳ 12 Tháng / 1 Năm
                      <span className="absolute -top-3.5 -right-3 bg-[#fcd400] text-primary text-[9px] font-extrabold px-1.5 py-0.5 rounded-full -rotate-6 border border-primary">
                        Giảm 7%
                      </span>
                    </button>
                  </div>
                </motion.div>

                {/* Courses Grid */}
                <motion.div 
                  variants={stagger}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {[
                    {
                      id: "gvvn-regular",
                      name: "Chương Trình Tiêu Chuẩn (7 GVVN + 1 GVNN)",
                      vietnameseLessons: 7,
                      nativeLessons: 1,
                      duration: "90 phút",
                      maxStudents: 35,
                      pricing: {
                        monthly: 550000,
                        quad: 2134000,
                        yearly: 6138000
                      },
                      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800",
                      badge: "Vững kiến thức trường lớp",
                      desc: "Dành cho học sinh bám sát chương trình sách giáo khoa Global Success của Bộ GD&ĐT, giúp học sinh nắm vững ngữ pháp, từ vựng và lấy lại gốc nhanh chóng, đạt điểm số cao trên lớp.",
                      color: "border-pink-500/30",
                      tag: "7 GVVN + 1 GVNN"
                    },
                    {
                      id: "mixed-3gvnn-5gvvn",
                      name: "Chương Trình Tăng Cường (3 GVNN + 5 GVVN)",
                      vietnameseLessons: 5,
                      nativeLessons: 3,
                      duration: "90 phút",
                      maxStudents: 25,
                      pricing: {
                        monthly: 650000,
                        quad: 2522000,
                        yearly: 7254000
                      },
                      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
                      badge: "Cambridge & Sách Giáo Khoa",
                      desc: "Sự kết hợp tối ưu: GVVN giảng dạy chương trình Global Success đảm bảo thành tích ở trường, GVNN dạy chuẩn Cambridge rèn luyện 4 kỹ năng nghe, nói, đọc, viết, tạo phản xạ nhạy bén.",
                      color: "border-primary/30",
                      tag: "3 GVNN + 5 GVVN",
                      popular: true
                    },
                    {
                      id: "prep-thpt",
                      name: "Chương Trình Kết Hợp GVNN + Ôn Thi THPT Quốc Gia",
                      vietnameseLessons: 4,
                      nativeLessons: 4,
                      duration: "90 phút",
                      maxStudents: 20,
                      pricing: {
                        monthly: 800000,
                        quad: 3104000,
                        yearly: 8928000
                      },
                      image: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?auto=format&fit=crop&q=80&w=800",
                      badge: "Cam kết bứt phá điểm số thi THPT",
                      desc: "Dành riêng cho học sinh trung học chuẩn bị bước vào cuộc thi quan trọng bậc nhất. Ôn thi THPT Quốc Gia rốt ráo cùng các thầy cô Việt Nam đồng thời rèn luyện phản xạ học thuật cùng GVNN.",
                      color: "border-orange-500/30",
                      tag: "4 GVNN + 4 Ôn Thi"
                    },
                    {
                      id: "cambridge",
                      name: "Chương Trình Quốc Tế Cambridge GVNN (Starters-Movers-Flyers)",
                      vietnameseLessons: 0,
                      nativeLessons: 8,
                      duration: "90 phút",
                      maxStudents: 20,
                      pricing: {
                        monthly: 800000,
                        quad: 3104000,
                        yearly: 8928000
                      },
                      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
                      badge: "100% Khung chuẩn Cambridge",
                      desc: "Khóa luyện thi chứng chỉ quốc tế Starters, Movers, Flyers học hoàn toàn với giáo viên nước ngoài. Rèn luyện phản xạ nghe nói độc lập, nâng cao từ vựng và bổ khuyết tư duy trực diện.",
                      color: "border-indigo-500/30",
                      tag: "8 GVNN (Cam) - Starter"
                    },
                    {
                      id: "communication",
                      name: "Chương Trình Giao Tiếp Chuyên Sâu (8 Buổi GVNN)",
                      vietnameseLessons: 0,
                      nativeLessons: 8,
                      duration: "90 phút",
                      maxStudents: 20,
                      pricing: {
                        monthly: 800000,
                        quad: 3104000,
                        yearly: 8928000
                      },
                      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
                      badge: "100% Bản Xứ Giao Tiếp",
                      desc: "Tập trung phá vỡ định kiến rụt rè, bồi dưỡng phản xạ nghe và nói trôi chảy. Giáo viên nước ngoài rèn chuẩn ngữ âm, phản xạ thực tế ứng dụng đắc lực vào cả đời sống lẫn công việc tương lai.",
                      color: "border-rose-500/30",
                      tag: "8 GVNN Giao Tiếp"
                    },
                    {
                      id: "preschool",
                      name: "Chương Trình Tiếng Anh Mầm Non (4 Buổi GVNN)",
                      vietnameseLessons: 0,
                      nativeLessons: 4,
                      duration: "60 phút",
                      maxStudents: 15,
                      pricing: {
                        monthly: 400000,
                        quad: 1552000,
                        yearly: 4464000
                      },
                      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800",
                      badge: "3 - 6 Tuổi - Học Mà Chơi vui nhộn",
                      desc: "Đánh thức niềm đam mê tiếng Anh của trẻ ngay từ nhỏ bằng trò chơi tương tác, bài hát rộn ràng, giáo cụ thiết thực cùng thầy cô bản xứ thân thiện giúp kích thích tư duy phát âm tự nhiên.",
                      color: "border-emerald-500/30",
                      tag: "4 GVNN Mầm Non"
                    }
                  ].map((course) => {
                    const activePrice = 
                      tuitionViewTerm === "monthly" 
                        ? course.pricing.monthly 
                        : tuitionViewTerm === "quad" 
                        ? course.pricing.quad 
                        : course.pricing.yearly;
                    
                    const displayUnit = 
                      tuitionViewTerm === "monthly" 
                        ? "/ Tháng" 
                        : tuitionViewTerm === "quad" 
                        ? "/ Khóa 4 Tháng" 
                        : "/ Năm (12 Tháng)";

                    return (
                      <motion.div
                        key={course.id}
                        variants={fadeInUp}
                        onClick={() => setSelectedCourseDetail(course)}
                        className={`bg-white rounded-[2.5rem] border ${course.color} hover:border-primary/60 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden relative group cursor-pointer`}
                      >
                        {course.popular && (
                          <div className="absolute top-5 right-5 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full z-10 shadow-lg">
                            Khuyên học nhiều nhất
                          </div>
                        )}
                        
                        <div className="aspect-[16/10] relative overflow-hidden bg-surface-variant">
                          <img 
                            src={course.image} 
                            alt={course.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <span className="absolute bottom-4 left-6 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-black uppercase tracking-wide border border-white/10">
                            {course.tag}
                          </span>
                        </div>

                        <div className="p-8 flex flex-col gap-4 flex-grow">
                          <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/5 py-1 px-3.5 rounded-lg w-fit">
                            {course.badge}
                          </span>
                          <h3 className="font-lexend text-lg font-black text-on-surface leading-snug group-hover:text-primary transition-colors min-h-[56px] line-clamp-2">
                            {course.name}
                          </h3>
                          <p className="text-xs font-semibold text-on-surface-variant leading-relaxed line-clamp-3">
                            {course.desc}
                          </p>

                          <div className="mt-auto pt-6 border-t border-outline-variant/30 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant opacity-70">
                                Học phí niêm yết
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="font-lexend text-2xl font-black text-secondary">
                                  {activePrice.toLocaleString("vi-VN")}
                                </span>
                                <span className="text-xs font-bold text-on-surface-variant">{displayUnit}</span>
                              </div>
                            </div>
                            <button className="w-10 h-10 rounded-2xl bg-secondary-container/30 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                              <ArrowRight className="w-5 h-5 shrink-0" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            )}

            {/* TAB CONTENT: PRIVATE COACHING */}
            {activePricingTab === "private" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-10"
              >
                <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary-container/20 px-4 py-1.5 rounded-full w-fit mx-auto">
                    Kèm 1-1 hoặc Nhóm nhỏ
                  </span>
                  <h3 className="font-lexend text-2xl md:text-3xl font-black text-on-surface">Biểu phí nhóm kèm riêng trực tiếp & Online</h3>
                  <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
                    Lựa chọn lộ trình tối đa tương tác, học tập chủ động linh khí, bám sát và phát huy năng lực đột phá riêng biệt của học viên.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                  {[
                    {
                      name: "Chương Trình GVVN trực tiếp",
                      subtitle: "Trực tiếp tạị Trung Tâm / Offline",
                      desc: "Chương Trình Mầm Non, Tiểu Học, THCS, THPT trực tiếp với Giáo viên Việt Nam.",
                      color: "border-pink-500/20 hover:border-pink-500/50",
                      badgeColor: "bg-pink-100 text-pink-700",
                      price1: "200.000 VNĐ / HS / Buổi",
                      price2: "150.000 VNĐ / HS / Buổi",
                      price3: "120.000 VNĐ / HS / Buổi",
                      icon: User
                    },
                    {
                      name: "Chương Trình GVNN trực tiếp",
                      subtitle: "Chuẩn phát âm thực chiến / Offline",
                      desc: "Chương Trình Mầm Non, Tiểu Học, THCS, THPT trực tiếp với Giáo viên Nước Ngoài.",
                      color: "border-primary/20 hover:border-primary/50 shadow-lg shadow-primary/10",
                      badgeColor: "bg-primary-container text-primary",
                      price1: "500.000 VNĐ / HS / Buổi",
                      price2: "300.000 VNĐ / HS / Buổi",
                      price3: "250.000 VNĐ / HS / Buổi",
                      icon: Sparkles,
                      popular: true
                    },
                    {
                      name: "Chương Trình Online qua Zoom",
                      subtitle: "Mọi lúc mọi nơi / GVVN hoặc GVNN",
                      desc: "Chương Trình Mầm Non, Tiểu Học, THCS, THPT giảng dạy trực tuyến qua ứng dụng Zoom.",
                      color: "border-blue-500/20 hover:border-blue-500/50",
                      badgeColor: "bg-blue-100 text-blue-700",
                      price1: "200.000 VNĐ / HS / Giờ",
                      price2: "125.000 VNĐ / HS / Giờ",
                      price3: "90.000 VNĐ / HS / Giờ",
                      icon: Globe
                    }
                  ].map((tier, idx) => (
                    <div 
                      key={idx}
                      className={`bg-white rounded-3xl border ${tier.color} p-8 flex flex-col gap-6 hover:shadow-xl transition-all duration-300 relative ${
                        tier.popular ? "md:-translate-y-2 border-primary/50" : ""
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                          Ưu đãi tốc độ phản xạ
                        </span>
                      )}

                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tier.badgeColor}`}>
                          <tier.icon className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-lexend text-sm font-extrabold text-on-surface-variant tracking-tight uppercase">
                            {tier.subtitle}
                          </h4>
                          <span className="text-xs font-black text-on-surface opacity-60">Kèm chuyên biệt</span>
                        </div>
                      </div>

                      <div className="border-b border-outline-variant/30 pb-4">
                        <h3 className="font-lexend text-lg font-black text-on-surface leading-snug">
                          {tier.name}
                        </h3>
                        <p className="text-xs text-on-surface-variant font-medium mt-2 leading-relaxed opacity-85">
                          {tier.desc}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 flex-grow">
                        <div className="flex justify-between items-center bg-surface-variant/20 p-4 rounded-2xl border border-outline-variant/10">
                          <span className="text-xs font-bold text-on-surface-variant">Kèm riêng nhóm 1 Học Sinh</span>
                          <span className="font-lexend text-sm font-black text-secondary">{tier.price1}</span>
                        </div>
                        <div className="flex justify-between items-center bg-surface-variant/20 p-4 rounded-2xl border border-outline-variant/10">
                          <span className="text-xs font-bold text-on-surface-variant">Kèm riêng nhóm 2 Học Sinh</span>
                          <span className="font-lexend text-sm font-black text-secondary">{tier.price2}</span>
                        </div>
                        <div className="flex justify-between items-center bg-surface-variant/25 p-4 rounded-2xl border border-primary/10">
                          <span className="text-xs font-extrabold text-primary">Kèm riêng nhóm từ 3 Học Sinh trở lên</span>
                          <span className="font-lexend text-sm font-black text-primary">{tier.price3}</span>
                        </div>
                      </div>

                      <div className="pt-2 text-center">
                        <span className="text-[10px] text-on-surface-variant italic font-semibold">
                          * Đơn giá phí trên được tính trực tiếp dựa theo số lượng học sinh thực tế theo mỗi buổi học.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: MERIT POLICIES / OFFERS */}
            {activePricingTab === "policies" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-10"
              >
                <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full w-fit mx-auto">
                    Cam kết vì cộng đồng
                  </span>
                  <h3 className="font-lexend text-2xl md:text-3xl font-black text-on-surface">Chính sách ưu đãi & Miễn giảm đặc biệt</h3>
                  <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
                    Trung tâm chúng tôi tự hào đồng hành để gia tăng cơ hội đón nhận tri thức của tất cả các em học sinh có tinh thần vượt khó.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
                  {/* Orphan & Hardship Policies */}
                  <div className="bg-white rounded-3xl border border-primary/15 p-8 md:p-10 shadow-md flex flex-col gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Heart className="w-8 h-8 filter drop-shadow" />
                      </div>
                      <div>
                        <h4 className="font-lexend text-lg font-black text-on-surface">Đối tượng Hoàn cảnh Đặc biệt</h4>
                        <span className="text-xs font-bold text-on-surface-variant/70">Cam kết chia sẻ gánh nặng tài chính</span>
                      </div>
                    </div>

                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                      Chính sách an sinh giáo dục của Nextgen English nhằm hỗ trợ các trường hợp gia đình không có hoàn cảnh đầy đủ, đồng hành bền vững cùng nuôi dưỡng ước mơ hiếu học đầu đời của con.
                    </p>

                    <div className="flex flex-col gap-4 mt-2">
                      <div className="flex items-start gap-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                        <div className="bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs tracking-wider uppercase shrink-0">
                          GIẢM 20%
                        </div>
                        <div>
                          <p className="font-lexend font-black text-sm text-on-surface">Đóng phí giảm 20% học phí</p>
                          <p className="text-xs font-bold text-on-surface-variant opacity-80 mt-1">
                            Áp dụng cho học sinh mất bố / mẹ hoặc có hoàn cảnh gia đình khó khăn.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 bg-red-50/50 p-5 rounded-2xl border border-red-100">
                        <div className="bg-pink-600 text-white font-extrabold px-3 py-1.5 rounded-xl text-xs tracking-wider uppercase shrink-0">
                          MIỄN 100%
                        </div>
                        <div>
                          <p className="font-lexend font-black text-sm text-[#0a4223]">Miễn đóng 100% trọn khóa học</p>
                          <p className="text-xs font-bold text-on-surface-variant opacity-80 mt-1">
                            Hỗ trợ đồng hành hoàn toàn miễn học phí dành riêng cho học sinh mồ côi cả cha lẫn mẹ.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-surface-variant/30 p-4 rounded-xl flex items-start gap-2 border border-outline-variant/30 text-xs text-on-surface-variant font-bold italic mt-auto">
                      <Info className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                      <span>Trường hợp này, phụ huynh hoặc người bảo hộ nộp các giấy tờ chứng nhận có liên quan gửi văn phòng Trung Tâm xét duyệt khi đăng ký nhập học.</span>
                    </div>
                  </div>

                  {/* Sibling Discounts */}
                  <div className="bg-white rounded-3xl border border-secondary/15 p-8 md:p-10 shadow-md flex flex-col gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16"></div>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-secondary-container rounded-2xl flex items-center justify-center text-primary">
                        <Baby className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-lexend text-lg font-black text-on-surface">Hội viên Thân thiết (Anh / Chị / Em ruột)</h4>
                        <span className="text-xs font-bold text-on-surface-variant/70">Ưu đãi kép cho thành viên cùng nhà</span>
                      </div>
                    </div>

                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                      Để tri ân các gia đình hoàn toàn tin tưởng trao gửi thế hệ trẻ thứ hai thứ ba theo học, Nextgen English áp dụng chính sách giảm trừ khóa học lũy tiến trực tiếp:
                    </p>

                    <div className="flex flex-col gap-4 mt-2">
                      <div className="bg-[#f2faf5] p-5 rounded-2xl border border-primary/10 flex flex-col gap-3">
                        <p className="font-lexend font-black text-sm text-[#0a4223] uppercase tracking-wider">
                          GIA ĐÌNH CÓ 2 ANH / CHỊ / EM RUỘT:
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded-xl border border-[#b4dbbf]">
                            <span className="text-[10px] text-on-surface-variant font-extrabold uppercase py-0.5">Khóa 4 Tháng</span>
                            <p className="font-lexend font-black text-primary text-sm">Giảm 100.000 VNĐ</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-[#b4dbbf]">
                            <span className="text-[10px] text-on-surface-variant font-extrabold uppercase py-0.5">Khóa 1 Năm / Khóa 12 Tháng</span>
                            <p className="font-lexend font-black text-secondary text-sm">Giảm 300.000 VNĐ</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/50 flex flex-col gap-3">
                        <p className="font-lexend font-black text-sm text-amber-800 uppercase tracking-wider">
                          GIA ĐÌNH CÓ 3 ANH / CHỊ / EM RUỘT:
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded-xl border border-amber-200">
                            <span className="text-[10px] text-on-surface-variant font-extrabold uppercase py-0.5 font-bold">Khóa 4 Tháng</span>
                            <p className="font-lexend font-black text-primary text-sm">Giảm 150.000 VNĐ</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-amber-200">
                            <span className="text-[10px] text-on-surface-variant font-extrabold uppercase py-0.5 font-bold">Khóa 1 Năm / Khóa 12 Tháng</span>
                            <p className="font-lexend font-black text-[#fcd400] text-sm text-stroke-primary">Giảm 450.000 VNĐ</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10.5px] text-on-surface-variant/80 font-semibold italic mt-auto">
                      * Ưu đãi áp dụng cộng dồn cho tổng số lượng học sinh trong cùng gia đình đóng học phí theo khóa 4 tháng trở lên.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: CENTER RULES & TERMS */}
            {activePricingTab === "rules" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-10"
              >
                <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest bg-surface-variant/30 px-4 py-1.5 rounded-full w-fit mx-auto">
                    Quy định tuyển sinh chính yếu
                  </span>
                  <h3 className="font-lexend text-2xl md:text-3xl font-black text-on-surface">QUY ĐỊNH CHUNG & THỦ TỤC THANH TOÁN</h3>
                  <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
                    Phụ huynh học viên vui lòng đọc kỹ các quy chuẩn thanh toán, hình thức đào tạo và nội quy quản lý lớp học tại trung tâm:
                  </p>
                </div>

                <div className="max-w-4xl mx-auto w-full flex flex-col gap-3">
                  {[
                    {
                      title: "1. QUY ĐỊNH HỌC PHÍ",
                      icon: Wallet,
                      content: (
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-sm text-on-surface-variant font-bold">
                          <li>Trung Tâm thu học phí theo kỳ, Phụ huynh có quyền lựa chọn nộp học phí theo <strong>1 tháng, 4 tháng, hoặc 1 năm</strong>.</li>
                          <li>Khi có thay đổi về mức học phí, Phụ huynh sẽ luôn được thông báo chính thức trước khi bắt đầu khóa học mới.</li>
                          <li>Tất cả các chính sách ưu đãi chỉ được áp dụng đầy đủ khi Phụ huynh hoàn thành đóng học phí đúng thời gian quy định lịch trình.</li>
                          <li>Mặc định: Trường hợp hết thời gian quy định đóng khóa học mà Phụ huynh học sinh chưa đóng, Trung Tâm sẽ tự động mặc định tính đóng theo từng tháng với mức học phí theo Mục I của chương trình học hiện thời.</li>
                        </ul>
                      )
                    },
                    {
                      title: "2. CƠ CHẾ CHƯƠNG TRÌNH HỌC",
                      icon: BookOpen,
                      content: (
                        <div className="flex flex-col gap-3 text-sm text-on-surface-variant font-semibold leading-relaxed">
                          <p>Chương trình đào tạo tại Nextgen English được phối kết hợp chặt chẽ:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div className="bg-surface-variant/35 p-4 rounded-xl border border-outline-variant/20">
                              <h5 className="font-bold text-primary mb-1">Đối với lớp Giáo Viên Việt Nam (GVVN):</h5>
                              <p className="text-xs">Dạy chuẩn hóa theo chương trình sách giáo khoa Global Success mới nhất, giúp học sinh nắm chắc kiến thức căn bản tại lớp, củng cố rễ ngữ pháp chắc chắn và giành số điểm tối đa tại các kì thi chính khóa trên trường.</p>
                            </div>
                            <div className="bg-surface-variant/35 p-4 rounded-xl border border-outline-variant/20">
                              <h5 className="font-bold text-secondary mb-1">Đối với lớp 3 buổi Giáo Viên Nước Ngoài (GVNN):</h5>
                              <p className="text-xs">GVVN dạy chương trình Global Success đảm bảo kết quả chính khóa của con; đồng thời GVNN dạy định hướng Cambridge quốc tế toàn diện để con phát triển từ vựng, rèn đầy đủ nghe nói đọc viết độc lập để lên cấp 3 có thể tự tin theo học chương trình IELTS chuyên nghiệp.</p>
                            </div>
                            <div className="bg-surface-variant/35 p-4 rounded-xl border border-outline-variant/20">
                              <h5 className="font-bold text-amber-600 mb-1">Đối với lớp GVNN 100% Quốc Tế:</h5>
                              <p className="text-xs">Giảng dạy hoàn toàn theo giáo trình Cambridge quốc tế nâng cao, tập trung rèn luyện phản xạ ngữ điệu tự nhiên, phản ứng nghe nói độc lập. Bố mẹ nên cho con theo lớp định hướng này ngay từ trình độ Starter để bồi đắp tư duy tiếng Anh sớm nhất.</p>
                            </div>
                            <div className="bg-surface-variant/35 p-4 rounded-xl border border-outline-variant/20">
                              <h5 className="font-bold text-teal-600 mb-1">Đối với lớp GVNN Giao Tiếp:</h5>
                              <p className="text-xs">Tập trung chuyên biệt hóa sâu vào kỹ năng Nghe và Nói. Học viên phát triển vượt bậc sự nhạy bén, tự nhiên sửa lỗi phát âm và tự tin áp dụng trực chỉ vào thế giới công việc hay giao tiếp đời thường.</p>
                            </div>
                          </div>
                        </div>
                      )
                    },
                    {
                      title: "3. THỜI GIAN ĐÓNG HỌC PHÍ",
                      icon: Calendar,
                      content: (
                        <div className="text-sm text-on-surface-variant font-bold leading-relaxed flex flex-col gap-3">
                          <p>Phụ huynh đóng học phí nghiêm túc theo quy chuẩn kỳ đóng lịch trình:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-sm">
                              <span className="text-[10px] font-extrabold uppercase bg-primary/10 text-primary px-3 py-1 rounded-full w-fit block mb-2">Đóng theo khóa</span>
                              <p className="text-xs mb-1">Yêu cầu hoàn tất học phí <strong>trước 1 ngày</strong> thời gian bắt đầu khóa học mới.</p>
                              <p className="text-xs text-secondary-container bg-primary font-black px-2 py-1.5 rounded-lg text-white mt-2">
                                Khóa 4 tháng: Trước ngày 25/4; 25/9 và 25/12 hàng năm.<br />
                                Khóa 1 năm: Trước ngày 25/4 hàng năm.
                              </p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-sm relative">
                              <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full w-fit block mb-2">Đóng theo tháng</span>
                              <p className="text-xs mt-4">Phụ huynh nộp hoàn tất học phí <strong>trước khi tháng đó bắt đầu học</strong>.</p>
                            </div>
                          </div>
                        </div>
                      )
                    },
                    {
                      title: "4. PHÍ ĐỒNG PHỤC",
                      icon: Award,
                      content: (
                        <p className="text-sm text-on-surface-variant font-bold leading-relaxed">
                          Yêu cầu bắt buộc mua áo đồng phục của Trung tâm khi học sinh bắt đầu làm thủ tục nhập học mới chính thức (đơn giá: <strong>170.000 VNĐ / áo</strong>). 
                          Phụ huynh học viên có thể tự nguyện lựa chọn mua bổ sung thêm khi con cần thiết.
                        </p>
                      )
                    },
                    {
                      title: "5. PHÍ HỌC LIỆU / SÁCH GIÁO KHOA",
                      icon: PenTool,
                      content: (
                        <p className="text-sm text-on-surface-variant font-bold leading-relaxed">
                          Tùy theo chương trình sách giáo khoa hoặc giáo án khác nhau của từng lớp học ở mỗi cấp bậc sẽ có mức giá sách khác nhau. 
                          Phụ huynh có quyền tự đầu tư mua bên ngoài theo đúng đầu sách do giáo viên yêu cầu, hoặc tự nguyện đăng ký mua sách trực tiếp tại văn phòng Trung Tâm.
                        </p>
                      )
                    },
                    {
                      title: "6. HỌC SINH NHẬP HỌC GIỮA KỲ",
                      icon: User,
                      content: (
                        <p className="text-sm text-on-surface-variant font-bold leading-relaxed">
                          Trường hợp học sinh hoàn tất đăng ký nhập học giữa chừng khi khóa học đang diễn ra, mức phí đóng sẽ được tính trừ lùi và bắt đầu thu tính kể từ buổi con vào học chính thức cho đến khi hết khóa.
                        </p>
                      )
                    },
                    {
                      title: "7. QUY CHẾ THÔI HỌC VÀ HOÀN TRẢ PHÍ",
                      icon: ShieldCheck,
                      content: (
                        <p className="text-sm text-[#0a4223] font-extrabold leading-relaxed bg-[#f2faf5] p-5 rounded-2xl border border-[#b4dbbf]">
                          Trung Tâm sẽ <strong>không hoàn lại học phí</strong> trong bất kỳ trường hợp nào xuất phát từ các lý do khách quan phía gia đình: nhà xa trung tâm, thay đổi thời gian biểu cá nhân, chuyển trường, chuyển lớp học mà không phải do lỗi của trung tâm.
                        </p>
                      )
                    },
                    {
                      title: "8. CHUYỂN NHƯỢNG VÀ BẢO LƯU PHÍ",
                      icon: Zap,
                      content: (
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-sm text-on-surface-variant font-bold">
                          <li>Chỉ thực hiện chuyển nhượng kỳ học phí trong trường hợp Học sinh có anh/chị em ruột đang cùng theo học thực tế trong hệ thống Nextgen English. Mức phí quy định: Học sinh chỉ cần học bất kỳ ngày nào trong tháng đó thì Trung tâm tính là đã học hết tháng đó và không áp dụng chuyển nhượng số dư của tháng học đó.</li>
                          <li>Trong thời gian học giữa khóa các lớp, con hoàn toàn được đổi sang lớp học khác nếu phù hợp năng lực học thuật. Khi đổi từ lớp GVVN sang lớp GVNN, phụ huynh sẽ nộp thêm học phí thiếu; ngược lại nếu đổi từ lớp GVNN sang lớp GVVN thì số tiền dư dôi sẽ được bảo lưu hoàn phí và tự động chuyển giao hoàn tất chuyển sang khóa tiếp theo.</li>
                        </ul>
                      )
                    },
                    {
                      title: "9. TRƯỜNG HỢP KHÔNG ÁP DỤNG TRỪ HỌC PHÍ / HỌC BÙ",
                      icon: Heart,
                      content: (
                        <p className="text-sm text-on-surface-variant font-bold leading-relaxed">
                          Trung Tâm không áp dụng bảo lưu, không có trách nhiệm hoàn trả học phí hoặc tổ chức lớp học bù đối với các trường hợp học sinh nghỉ học vì lý do cá nhân ngoài tầm kiểm soát của trung tâm (ví dụ: bận việc đột xuất của gia đình, bận đi du lịch cùng bố mẹ, trùng lịch học các môn học khác ngoài trung tâm, nghỉ học do thời tiết mưa bão không thuận lợi...).
                        </p>
                      )
                    },
                    {
                      title: "10. NỘI QUY KỶ LUẬT (CÁC TRƯỜNG HỢP TỪ CHỐI NHẬN HỌC SINH)",
                      icon: MessageCircle,
                      content: (
                        <div className="flex flex-col gap-3 text-sm text-on-surface-variant font-bold leading-relaxed">
                          <p className="text-red-700 italic font-black">Các trường hợp đặc biệt Trung Tâm xin phép dừng tiếp nhận giảng dạy Học Sinh:</p>
                          <ul className="list-decimal pl-5 flex flex-col gap-2 font-bold">
                            <li>Học sinh có thái độ vô lễ với giáo viên đứng lớp hoặc nhân viên trung tâm, nói trống không vô kỷ luật.</li>
                            <li>Học sinh có hành vi bạo lực học đường, xâm phạm bạn cùng lớp gây ra thương tích cơ thể.</li>
                            <li>Học sinh liên tục lười biếng, không học bài cũ và không hoàn thành các bài tập về nhà được giao nhiều lần.</li>
                            <li>Điểm thi khảo sát trung bình trong 2 tháng liên tục của học sinh đạt dưới mức 5.0 điểm. Trường hợp này học sinh bắt buộc phải chuyển lớp xuống lớp mất gốc rèn luyện cơ bản hoặc tham gia lớp kèm trực tiếp riêng biệt để cải thiện nâng điểm.</li>
                          </ul>
                        </div>
                      )
                    },
                    {
                      title: "11. HÌNH THỨC THANH TOÁN (QUÉT MÃ QR KHÔNG THAY ĐỔI NỘI DUNG)",
                      icon: Cpu,
                      content: (
                        <div className="bg-emerald-50 text-on-surface-variant p-5 rounded-2xl border border-primary/20 flex flex-col gap-3">
                          <p className="text-sm font-black text-primary">Nâng cao trải nghiệm đóng học phí bằng QR Code Thông Minh:</p>
                          <p className="text-xs font-bold leading-relaxed">
                            Học phí và các khoản phí khác được thanh toán bằng tiền Việt Nam Đồng (VNĐ) theo hình thức đóng tiền mặt trực tiếp tại văn phòng trung tâm hoặc <strong>chuyển khoản ngân hàng theo đúng nội dung hóa đơn tự động Trung tâm gửi về cho Phụ huynh học sinh qua Zalo</strong>.
                          </p>
                          <p className="text-xs bg-white p-4 rounded-xl border border-primary/30 text-rose-700 font-extrabold shadow-sm leading-relaxed">
                            ⚠️ QUAN TRỌNG: Phụ huynh chỉ cần quét mã QR được gửi về zalo và giữ nguyên, TUYỆT ĐỐI KHÔNG THAY ĐỔI NỘI DUNG CHUYỂN KHOẢN. Sau khi chuyển khoản thành công hoàn tất, hệ thống tự động ghi nhận, xuất thông báo đã hoàn thành học phí và tự động xuất hóa đơn điện tử tự động gửi trả về điện thoại.
                          </p>
                          <p className="text-[11px] font-semibold text-on-surface-variant italic opacity-85">
                            * Trung Tâm không chịu trách nhiệm đối với các trường hợp bị chậm trễ hoặc hoãn chuyển khoản do sai thông tin chuyển khoản hoặc phát sinh do lỗi từ phía hệ thống ngân hàng Phụ huynh.
                          </p>
                        </div>
                      )
                    }
                  ].map((rule, idx) => {
                    const isExpanded = expandedRule === idx;
                    return (
                      <div 
                        key={idx}
                        className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 shadow-sm"
                      >
                        <button
                          onClick={() => setExpandedRule(isExpanded ? null : idx)}
                          className={`w-full px-6 py-4 flex items-center justify-between text-left font-lexend font-black text-sm md:text-base transition-colors ${
                            isExpanded ? "bg-primary text-white" : "text-on-surface hover:bg-surface-variant/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <rule.icon className={`w-5 h-5 shrink-0 ${isExpanded ? "text-white" : "text-primary"}`} />
                            <span>{rule.title}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-white shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-on-surface-variant shrink-0" />
                          )}
                        </button>

                        <div 
                          className={`transition-all duration-300 overflow-hidden ${
                            isExpanded ? "max-h-[800px] border-t border-outline-variant/30" : "max-h-0"
                          }`}
                        >
                          <div className="p-6 md:p-8 bg-surface-variant/10">
                            {rule.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

          </div>
        </section>

        {/* DETAILED INTERACTIVE COURSE MODAL */}
        {selectedCourseDetail && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden text-on-surface flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCourseDetail(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/20 text-white hover:bg-black/40 flex items-center justify-center transition-all z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-48 relative shrink-0">
                <img 
                  src={selectedCourseDetail.image} 
                  alt={selectedCourseDetail.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-5 left-8 text-white">
                  <span className="text-xs bg-pink-500 text-white font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-pink-400">
                    {selectedCourseDetail.tag}
                  </span>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest font-black mt-1">Lớp định khóa</p>
                </div>
              </div>

              <div className="p-8 flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
                <div className="flex flex-col gap-2">
                  <h3 className="font-lexend text-2xl font-black text-on-surface">
                    {selectedCourseDetail.name}
                  </h3>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>

                <p className="text-sm font-bold text-on-surface-variant/95 leading-relaxed">
                  {selectedCourseDetail.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 bg-surface-variant/20 p-5 rounded-3xl border border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-extrabold uppercase tracking-wider opacity-60">Thời lượng học</span>
                    <span className="text-sm font-black text-primary">{selectedCourseDetail.duration} / buổi</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-extrabold uppercase tracking-wider opacity-60">Sỹ số lớp học tối đa</span>
                    <span className="text-sm font-black text-primary">{selectedCourseDetail.maxStudents} HS / Lớp</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-xs font-black text-on-surface uppercase tracking-wider">Lựa chọn kỳ đóng phí học sinh:</span>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-outline-variant/40 shadow-sm">
                      <div>
                        <span className="text-xs font-extrabold text-on-surface">Đóng phí theo Tháng</span>
                      </div>
                      <span className="font-lexend text-lg font-black text-secondary">
                        {selectedCourseDetail.pricing.monthly.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-[#f2faf5] p-4 rounded-2xl border border-primary/20 shadow-sm relative overflow-hidden">
                      <div className="absolute right-0 top-0 bg-pink-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl rotate-0 uppercase">Giảm 3%</div>
                      <div>
                        <span className="text-xs font-black text-[#0a4223]">Đóng phí Kỳ 4 Tháng</span>
                      </div>
                      <span className="font-lexend text-lg font-black text-primary">
                        {selectedCourseDetail.pricing.quad.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-amber-50/50 p-4 rounded-2xl border border-amber-300 shadow-sm relative overflow-hidden">
                      <div className="absolute right-0 top-0 bg-amber-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl rotate-0 uppercase">Giảm 7%</div>
                      <div>
                        <span className="text-xs font-black text-amber-900">Đóng phí Kỳ 1 KHÓA 12 THÁNG</span>
                      </div>
                      <span className="font-lexend text-lg font-black text-amber-700">
                        {selectedCourseDetail.pricing.yearly.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-4 pt-4 border-t border-outline-variant/30">
                  <button 
                    onClick={() => {
                      setSelectedCourseDetail(null);
                      const registerSection = document.getElementById("register");
                      if (registerSection) registerSection.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-primary-container hover:-translate-y-0.5 transition-all text-sm text-center"
                  >
                    Đăng ký tư vấn khóa học này
                  </button>
                  <button 
                    onClick={() => setSelectedCourseDetail(null)}
                    className="bg-surface-variant/40 text-on-surface font-black py-4 px-6 rounded-2xl hover:bg-surface-variant/60 transition-all text-sm"
                  >
                    Đóng lại
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* AI Smart Learning Section */}
        <section id="tai-lieu-hoc-tap" className="py-20 px-6 relative overflow-hidden scroll-mt-20">
          {/* Decorative AI Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <motion.div {...fadeInUp} className="flex flex-col gap-4 items-center text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20">
                <Cpu className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">Công nghệ AI tiên phong</span>
              </div>
              <h2 className="font-lexend text-3xl md:text-5xl text-on-surface font-bold tracking-tight">
                Ứng dụng công nghệ độc quyền <br className="hidden md:block" /> chỉ có tại <span className="text-primary">Nextgen English</span>
              </h2>
              <p className="text-on-surface-variant max-w-2xl leading-relaxed">
                Trải nghiệm hệ sinh thái học tập hiện đại, giúp tối ưu hóa thời gian và nâng cao hiệu quả kỹ năng tiếng Anh vượt trội.
              </p>
            </motion.div>

            <motion.div 
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { 
                  icon: Brain, 
                  title: "Learning", 
                  image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800",
                  desc: "Kho tài liệu thông minh & lộ trình cá nhân hóa từ AI giúp bạn nắm bắt kiến thức nhanh hơn 3 lần.",
                  color: "bg-blue-600",
                  shadow: "shadow-blue-500/30",
                  link: "https://mrsdung.vercel.app/"
                },
                { 
                  icon: PenTool, 
                  title: "Writing", 
                  image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
                  desc: "Chấm chữa bài viết AI ngay lập tức, sửa lỗi ngữ pháp và gợi ý cách dùng từ vựng nâng cao.",
                  color: "bg-indigo-600",
                  shadow: "shadow-indigo-500/30",
                  link: "https://writingpro.vercel.app/"
                },
                { 
                  icon: MicVocal, 
                  title: "Speaking", 
                  image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=800",
                  desc: "Luyện phát âm chuẩn bản xứ với trí tuệ nhân tạo, phản hồi chính xác từng âm tiết trong thời gian thực.",
                  color: "bg-rose-600",
                  shadow: "shadow-rose-500/30",
                  link: "https://mrsdungspeak.vercel.app/"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -12 }}
                  className="group relative bg-white rounded-[2rem] shadow-level-1 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-outline-variant/20"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        <img 
                          src={item.image} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={item.title}
                          referrerPolicy="no-referrer"
                        />
                      </a>
                    ) : (
                      <img 
                        src={item.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={item.title}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    <div className={`absolute top-4 left-4 w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg ${item.shadow} pointer-events-none`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                    
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all uppercase tracking-widest"
                      >
                        Kết nối AI ngay <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all uppercase tracking-widest opacity-60">
                        Sắp ra mắt <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Special AI Bonus Section: Sesame AI Speaking */}
        <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              {...fadeInUp}
              className="bg-white rounded-[4rem] p-8 md:p-16 shadow-2xl border-4 border-primary/10 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
              
              <div className="w-full md:w-1/3 flex justify-center order-2 md:order-1 relative">
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=800" 
                    alt="AI Buddy Illustration"
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[3rem] shadow-2xl border-8 border-white"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-[#fcd400] p-4 rounded-full shadow-lg border-4 border-white">
                    <Sparkles className="w-8 h-8 text-primary shadow-sm" />
                  </div>
                </motion.div>
              </div>

              <div className="w-full md:w-2/3 flex flex-col gap-6 order-1 md:order-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-secondary-container text-primary px-4 py-2 rounded-full w-fit mx-auto md:mx-0">
                  <Star className="w-5 h-5 fill-secondary" />
                  <span className="text-sm font-bold uppercase tracking-widest">Tính năng đặc biệt</span>
                </div>
                <h2 className="font-lexend text-3xl md:text-5xl font-bold text-on-surface leading-tight">
                  Tự tin giao tiếp cùng <br className="hidden md:block" /> <span className="text-primary italic">AI Buddy</span> miễn phí!
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
                  Bạn lo lắng khi nói tiếng Anh? Đừng sợ! Hãy luyện tập cùng người bạn AI siêu thông minh và ngộ nghĩnh này mỗi ngày để phản xạ nói tự nhiên, lưu loát hơn mỗi ngày. 
                </p>
                <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-2xl border border-outline-variant/30 text-sm font-bold text-primary">
                    <CheckCircle2 className="w-4 h-4" /> Hoàn toàn miễn phí
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-2xl border border-outline-variant/30 text-sm font-bold text-primary">
                    <Zap className="w-4 h-4" /> Phản hồi 1-1 tức thì
                  </div>
                </div>
                <a 
                  href="https://app.sesame.com/?_gl=1*18kgknd*_ga*MTEyNTA0MjA3OS4xNzc4MDgxNzYy*_ga_ZZLPJBMBEN*czE3NzgxMTE2NzkkbzIkZzAkdDE3NzgxMTE2NzkkajYwJGwwJGgw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 bg-primary text-white font-bold py-5 px-10 rounded-2xl self-center md:self-start shadow-xl shadow-primary/30 hover:bg-primary-container hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center gap-3 text-lg group"
                >
                  Bắt đầu luyện nói ngay <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Us Video Section */}
        <section id="video-gioi-thieu" className="py-24 px-6 bg-white overflow-hidden scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <motion.div {...fadeInUp} className="flex flex-col gap-4 text-center items-center">
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Giới thiệu về chúng tôi</span>
              <h2 className="font-lexend text-3xl md:text-5xl text-on-surface font-bold">
                Trung tâm ngoại ngữ <span className="text-primary font-bold">Nextgen English</span>
              </h2>
              <div className="h-1.5 w-24 bg-secondary-container rounded-full mb-4"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Inspiring Introduction Text */}
              <motion.div 
                {...fadeInUp}
                className="lg:col-span-5 flex flex-col gap-6 text-left"
              >
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                  <span>Sứ mệnh truyền cảm hứng phát triển</span>
                </div>
                
                <h3 className="font-lexend text-2xl lg:text-3xl font-bold text-on-surface leading-snug">
                  Nơi tiếng Anh bắt nguồn từ <span className="text-primary font-semibold">Sự Tận Tâm</span> & bứt phá bằng <span className="text-secondary font-semibold">Phương pháp</span>
                </h3>

                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                  Tại <strong className="text-primary">Nextgen English</strong>, chúng tôi hướng tới triết lý giáo dục toàn diện – nơi tiếng Anh không chỉ dừng lại là một môn học học thuật, mà là chiếc chìa khóa vạn năng cho sự sẻ chia, óc sáng tạo và những trải nghiệm thực tế đầy giá trị. Bằng sự chuẩn hóa vượt bậc và sự đồng hành chặt chẽ cùng học sinh, trung tâm cam kết khơi dậy tối đa tiềm lực và tình yêu học tập của thế hệ tương lai.
                </p>

                <div className="space-y-4 mt-2">
                  <div className="flex gap-4 items-start p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/30 hover:border-primary/20 transition-all">
                    <div className="p-3 rounded-xl bg-primary-container text-primary">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-lexend font-bold text-base text-on-surface">Giảng dạy từ Trái tim (English with Heart)</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                        Mỗi học viên đều được kiên nhẫn dẫn dắt, lắng nghe và sẻ chia chân thành nhằm tái tạo niềm cảm hứng tự nhiên nhất với tiếng Anh, đặc biệt vượt qua rào cản sợ sai.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/30 hover:border-secondary/20 transition-all">
                    <div className="p-3 rounded-xl bg-secondary-container text-secondary">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-lexend font-bold text-base text-on-surface">Đào Tạo Chất Lượng Cao & Thực Tiễn</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                        Hệ thống đào tạo được chuẩn hóa sâu sắc dựa trên lộ trình quốc tế Cambridge & IELTS, giải quyết triệt để khuyết điểm "mất gốc", hình thành nền tảng ngữ pháp và phát âm vững chắc.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/30 hover:border-primary/20 transition-all">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-lexend font-bold text-base text-on-surface">Môi trường Giáo dục Khai phóng & Sáng tạo</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                        Kết hợp phương pháp tương tác trực quan cao độ, ứng dụng công nghệ hội thoại AI độc quyền và các hoạt động trải nghiệm thực tiễn giúp khai mở tư duy đa ngôn ngữ.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Intro Video */}
              <motion.div 
                {...fadeInUp}
                className="lg:col-span-7 flex flex-col gap-4"
              >
                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-surface-variant/30 group">
                  <iframe 
                    src="https://drive.google.com/file/d/1KQEJU-ep7ctweubYBDYhrK7A0BcTISO9/preview" 
                    className="w-full h-full"
                    allow="autoplay"
                    title="Giới thiệu Nextgen English"
                  ></iframe>
                  <div className="absolute top-6 left-6 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-xl backdrop-blur-sm pointer-events-none">
                    <Play className="w-4 h-4 fill-current animate-pulse" /> Video giới thiệu
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant/70 italic text-center">
                  * Nhấp vào nút Play trên video để khám phá câu chuyện truyền cảm hứng gieo mầm Anh ngữ của chúng tôi.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      {/* Registration Section (Moved above footer) */}
      <section id="register" className="py-16 md:py-20 px-6 bg-surface-variant/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-8 right-8 text-primary/10">
              <Sparkles className="w-16 h-16" />
            </div>
            
            <div className="flex flex-col gap-8 relative z-10">
              <div className="flex flex-col gap-2 text-center items-center">
                <h3 className="font-lexend text-3xl md:text-4xl font-bold text-on-surface">Để lại thông tin tư vấn</h3>
                <p className="text-on-surface-variant max-w-md italic">Nhận lộ trình cá nhân hóa và ưu đãi học phí đặc biệt ngay hôm nay.</p>
                <div className="h-1.5 w-20 bg-secondary-container rounded-full mt-2"></div>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 group">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest px-1">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                    <input className="w-full rounded-2xl border border-outline-variant/40 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-surface-container-lowest py-4 pl-12 pr-4 outline-none transition-all" placeholder="Nguyễn Văn A" type="text" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 group">
                  <label className="text-xs font-bold text-primary uppercase tracking-widest px-1">Số điện thoại</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                    <input className="w-full rounded-2xl border border-outline-variant/40 focus:border-primary focus:ring-4 focus:ring-primary/5 bg-surface-container-lowest py-4 pl-12 pr-4 outline-none transition-all" placeholder="09xx xxx xxx" type="tel" />
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <button className="bg-primary text-white font-bold py-5 rounded-2xl w-full shadow-xl shadow-primary/30 hover:bg-primary-container hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center justify-center gap-3" type="submit">
                    Nhận tư vấn miễn phí <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Resources Section */}
      <section id="tai-nguyen-hoc-tap" className="py-24 px-6 bg-white overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <motion.div {...fadeInUp} className="flex flex-col gap-4 text-center items-center">
            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-2">Tăng tốc kỹ năng</span>
            <h2 className="font-lexend text-3xl md:text-5xl text-on-surface font-bold">
              Tài nguyên <span className="text-secondary">Học tập Miễn phí</span>
            </h2>
            <div className="h-1.5 w-24 bg-secondary-container rounded-full mb-4"></div>
            <p className="text-on-surface-variant max-w-3xl text-lg leading-relaxed text-center">
              Khám phá kho tàng kiến thức khổng lồ được Nextgen English tuyển chọn kỹ lưỡng, giúp bạn tự tin làm chủ tiếng Anh mỗi ngày.
            </p>
          </motion.div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {[
              { 
                title: "TÀI LIỆU ÔN LUYỆN CAMBRIDGE", 
                subtitle: "Tổng hợp đề thi, học liệu & hướng dẫn chuẩn quốc tế",
                link: "https://www.cambridgeenglish.org/educators-organisations/resources-for-teachers/?utm_id=97758_v0_s00_e233_tv2_tp2_a1demoo56kjbni&fbclid=iwy2xjawsaxhzlehrua2flbqixmabicmlketf1uk9hvmrlqljuedg0whfwc3j0ywzhchbfawqqmjiymdm5mtc4odiwmdg5mgabhmyiiaghrseio9vzc40ip-uufinesokfkphan9t4gzww3_ksagyox5_rdnfb_aem_v3is7jcsp6b0akf2k4pztg", 
                image: "https://i.postimg.cc/WzCpbp3L/tai-xuong-(4).jpg",
                color: "bg-blue-600",
                icon: BookOpen
              },
              { 
                title: "READING A-Z KIDS", 
                subtitle: "Bộ sách nổi tiếng đầy đủ học liệu ôn luyện",
                link: "https://drive.google.com/drive/folders/1CPnjizRBjQ5PEUhAzSwDKq-ZTZcJ_q6r?usp=sharing", 
                image: "https://i.postimg.cc/3JGH8VRH/tai-xuong.jpg",
                color: "bg-amber-600",
                icon: BookOpen
              },
              { 
                title: "BỘ TRUYỆN NỔI TIẾNG LITTLE FOX", 
                subtitle: "Luyện nghe & đọc qua các câu chuyện hoạt họa sinh động",
                link: "https://www.littlefox.com/en/readers", 
                image: "https://i.postimg.cc/FsywKs1n/tai-xuong-(3).jpg",
                color: "bg-amber-500",
                icon: BookOpen
              },
              { 
                title: "MỎ VÀNG MIỄN PHÍ GIÚP BẠN LUYỆN LISTENING -READING- SPEAKING- VOCABULARY MỖI NGÀY ĐÂY", 
                link: "https://newsinlevels.com/", 
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
                color: "bg-amber-500",
                icon: Sparkles
              },
              { 
                title: "❓❓Tại sao lại có web đọc sách MIỄN PHÍ hay như thế này", 
                link: "https://readalong.google.com/book/GLOBAL_sw_24768", 
                image: "https://images.unsplash.com/photo-1512820790803-73c7e9cb5531?auto=format&fit=crop&q=80&w=800",
                color: "bg-blue-500",
                icon: BookOpen
              },
              { 
                title: "WEBSITE LUYỆN CHÉP CHÍNH TẢ & LUYỆN ĐỌC TIẾNG ANH RẤT HAY CHO NGƯỜI MỚI BẮT ĐẦU", 
                link: "https://breakingnewsenglish.com/", 
                image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
                color: "bg-emerald-500",
                icon: PenTool
              },
              { 
                title: "lUYỆN FULL 4 KỸ NĂNG", 
                link: "https://www.eslfast.com/", 
                image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
                color: "bg-rose-500",
                icon: Zap
              },
              { 
                title: "LUYỆN ĐỌC TIẾNG ANH TỪ A1 ĐẾN C1 XỨNG ĐÁNG 10 ĐIỂM KHÔNG CÓ NHƯNG", 
                subtitle: "Luyện shadowing đầy đủ level từ A1 đến C1",
                link: "https://shadowingenglish.com", 
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
                color: "bg-purple-500",
                icon: Headphones
              },
              { 
                title: "KHO LUYỆN WRITING TỪ A1 ĐẾN C1", 
                subtitle: "Phát triển kỹ năng viết chuẩn xác & tự tin",
                link: "https://test-english.com/writing/?fbclid=IwY2xjawSAZ8pleHRuA2FlbQIxMABicmlkETF1Uk9hVmRlQlJUeDg0WHFWc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnzCFvH_2PMTIepm0L-Pd70MHh-ywtF8bkL2yqknWYG4TfKBa_ehPhTTnLkF_aem_6DtvxzMGUKxFo9W2myzHaA", 
                image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=800",
                color: "bg-cyan-500",
                icon: PenTool
              },
              { 
                title: "HỌC GIAO TIẾP TỪ A ĐẾN Z", 
                link: "https://luyengiaotiep.com", 
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
                color: "bg-indigo-500",
                icon: MessageCircle
              },
              { 
                title: "LUYỆN NGHE CHÉP CHÍNH TẢ HÀNG NGÀY", 
                subtitle: "Daily Dictation Exercises - Phương pháp hiệu quả nhất",
                link: "https://dailydictation.com/exercises", 
                image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800",
                color: "bg-teal-500",
                icon: Headphones
              },
              { 
                title: "KHO TÀI NGUYÊN LUYỆN NGHE CỰC LỚN", 
                subtitle: "Từ A1 → C1 - Hàng ngàn bài nghe miễn phí",
                link: "https://elllo.org/", 
                image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
                color: "bg-orange-500",
                icon: Headphones
              }
            ].map((res, i) => (
              <motion.a
                key={i}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group flex flex-col bg-surface rounded-[2.5rem] shadow-level-1 hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 overflow-hidden"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img 
                    src={res.image} 
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute top-6 left-6 w-14 h-14 ${res.color} rounded-2xl flex items-center justify-center text-white shadow-xl border-4 border-white/20`}>
                    <res.icon className="w-8 h-8" />
                  </div>
                </div>
                
                <div className="p-8 flex flex-col gap-4 flex-grow">
                  <h3 className="font-lexend text-base md:text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors line-clamp-3">
                    {res.title}
                  </h3>
                  {'subtitle' in res && (
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest -mt-2">
                      {res.subtitle}
                    </p>
                  )}
                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all uppercase tracking-widest pt-4">
                    Truy cập ngay <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

            {/* Main Footer - Dark Teal Design */}
      <footer id="footer" className="bg-[#073a36] text-white pt-20 pb-12 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-start">
          
          {/* Column 1: Logo & Tagline */}
          <motion.div {...fadeInUp} className="flex flex-col items-center md:items-start gap-4">
            <div className="w-32 h-32 bg-white rounded-[2rem] p-4 border-4 border-[#3fb9ae] flex items-center justify-center shadow-2xl rotate-3 overflow-hidden">
              <img 
                src={logoImg} 
                alt="Nextgen English Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left mt-2">
              <h2 className="font-lexend text-2xl font-bold text-[#3fb9ae] tracking-wider uppercase">Nextgen English</h2>
              <p className="text-sm italic font-medium text-white/90">“Learn English - Lead the way”</p>
            </div>
          </motion.div>

          {/* Column 2: Contact Information */}
          <motion.div {...fadeInUp} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 pb-2">
              <h3 className="font-lexend text-xl font-bold text-[#3fb9ae] uppercase tracking-widest">Liên hệ</h3>
              <div className="h-0.5 w-full bg-white/10 relative">
                <div className="absolute left-0 top-0 h-full w-12 bg-[#3fb9ae]"></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 group">
                <span className="shrink-0 p-1.5 rounded-lg bg-[#3fb9ae]/20 text-[#3fb9ae]">
                  <MapPin className="w-5 h-5" />
                </span>
                <p className="text-sm font-bold leading-relaxed group-hover:text-[#3fb9ae] transition-colors">
                  Số 32 Tổ 31B K9, Quang Trung, Phường Uông Bí, Quảng Ninh
                </p>
              </div>
              
              <div className="flex items-start gap-3 group">
                <span className="shrink-0 p-1.5 rounded-lg bg-[#3fb9ae]/20 text-[#3fb9ae]">
                  <Phone className="w-5 h-5" />
                </span>
                <p className="text-sm font-bold group-hover:text-[#3fb9ae] transition-colors">
                  Hotline: 0986 197 229 / 0334 141 989
                </p>
              </div>

              <div className="flex items-start gap-3 group">
                <span className="shrink-0 p-1.5 rounded-lg bg-[#3fb9ae]/20 text-[#3fb9ae]">
                  <Mail className="w-5 h-5" />
                </span>
                <p className="text-sm font-bold group-hover:text-[#3fb9ae] transition-colors">
                  nextgen.uongbi@gmail.com
                </p>
              </div>

              <div className="flex items-start gap-3 group">
                <span className="shrink-0 p-1.5 rounded-lg bg-[#3fb9ae]/20 text-[#3fb9ae]">
                  <Globe className="w-5 h-5" />
                </span>
                <a href="https://www.facebook.com/profile.php?id=61575042515566" target="_blank" rel="noopener noreferrer" className="text-sm font-bold underline group-hover:text-[#3fb9ae] transition-colors">
                  Fanpage Facebook
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Slogan Box */}
          <motion.div {...fadeInUp} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 pb-2">
              <h3 className="font-lexend text-xl font-bold text-[#3fb9ae] uppercase tracking-widest">Slogan</h3>
              <div className="h-0.5 w-full bg-white/10 relative">
                <div className="absolute left-0 top-0 h-full w-12 bg-[#3fb9ae]"></div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col gap-4 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
              <p className="text-lg italic font-bold text-white relative z-10 leading-relaxed">
                “Learn English - Lead the way”
              </p>
              <p className="text-sm font-bold text-[#3fb9ae] uppercase tracking-widest relative z-10">
                Học Tiếng Anh . Dẫn Lối Tương Lai.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
          <p>© 2026 Nextgen English. Môi trường Anh ngữ chuyên nghiệp & hiện đại.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

