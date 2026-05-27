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
import learningAiImg from "./assets/images/learning_ai.png";
import writingAiImg from "./assets/images/writing_ai.png";
import speakingAiImg from "./assets/images/speaking_ai.png";
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



  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Trang chủ" },
    { id: "courses", label: "Khóa học" },
    { id: "tai-lieu-hoc-tap", label: "Công nghệ độc quyền" },
    { id: "tai-nguyen-hoc-tap", label: "Tài nguyên học tập" },
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
      
      const sections = ["home", "courses", "tai-lieu-hoc-tap", "tai-nguyen-hoc-tap", "register"];
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
        <section id="home" className="relative w-full min-h-[80vh] md:min-h-[600px] bg-surface-variant overflow-hidden flex flex-col justify-center p-6 md:p-16 lg:p-24 scroll-mt-20">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Ảnh bìa Trung tâm Ngoại ngữ Nextgen" 
              className="w-full h-full object-cover" 
              src="https://i.postimg.cc/5NwT3txg/63d08b76-6a6d-4465-a854-45fd77e2556a.png"
              referrerPolicy="no-referrer"
            />
            {/* Reduced gradient overlay for better image clarity while maintaining text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent md:w-3/4"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col gap-4 md:gap-5 max-w-2xl mt-12 md:mt-0"
          >
            <div className="inline-flex items-center gap-2 bg-secondary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full w-fit shadow-sm">
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Nextgen English - Uông Bí</span>
            </div>
            <h1 className="font-lexend text-3xl md:text-4xl lg:text-5xl text-primary leading-snug font-black">
              Nextgen English.<br />Learn English, Lead the way
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant max-w-lg font-medium leading-relaxed">
              Cam kết môi trường học chất lượng cao – giúp học viên tự tin giao tiếp và bứt phá tương lai.
            </p>
            <button 
              onClick={() => scrollToSection("register")}
              className="bg-primary text-on-primary text-sm font-bold py-3.5 px-8 rounded-xl self-start mt-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
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
        <section id="about" className="py-16 md:py-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center bg-white rounded-[3rem] my-12 shadow-2xl shadow-primary/5 border border-outline-variant/30 overflow-hidden relative scroll-mt-20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          
          <motion.div 
            {...fadeInUp}
            className="w-full lg:w-1/2 flex flex-col gap-6 relative z-10 p-2 md:p-6"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm tracking-widest uppercase bg-secondary/10 px-5 py-2 rounded-full w-fit border border-secondary/20">
                Về chúng tôi
              </span>
              <h2 className="font-lexend text-3xl md:text-5xl text-on-surface font-bold leading-tight">
                Trung Tâm Ngoại Ngữ <br className="hidden md:block"/>
                <span className="text-primary">NextGen English</span>
              </h2>
              <div className="h-1.5 w-20 bg-secondary-container rounded-full mt-2"></div>
            </div>
            
            <div className="flex flex-col gap-5 text-on-surface-variant leading-relaxed text-base md:text-[17px] mt-2">
              <p className="font-semibold text-on-surface text-lg">
                Tại NextGen English, chúng tôi luôn ưu tiên lấy sự phát triển khả năng ngôn ngữ của học sinh làm trung tâm của mọi triết lý giáo dục.
              </p>
              <p>
                Khác biệt hoàn toàn với những phương pháp học truyền thống, NextGen tiên phong kiến tạo một <strong className="text-primary">môi trường học tiếng Anh mang tính thực hành cao</strong>. Chúng tôi không chỉ dạy ngôn ngữ, mà còn tạo ra một hệ sinh thái để các em được "sống" trong ngôn ngữ ấy mỗi ngày.
              </p>
              <p>
                Sự đầu tư bài bản vào <strong className="text-secondary">cơ sở vật chất hiện đại, ứng dụng công nghệ giáo dục tiên tiến</strong> kết hợp hoàn hảo cùng <strong className="text-primary">kỹ năng nghiệp vụ sư phạm chuyên sâu</strong> của đội ngũ giáo viên đã mang đến những giờ học tương tác, khơi gợi trí tò mò và niềm say mê khám phá.
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-5 rounded-2xl border-l-4 border-primary mt-2">
                <p className="italic font-semibold text-primary/90 leading-relaxed">
                  "Từ đó, chúng tôi nuôi dưỡng tình yêu tự nhiên với Tiếng Anh, giúp học sinh thực sự tự tin tuyệt đối với kiến thức và kỹ năng của mình trên hành trình trở thành công dân toàn cầu."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="w-full lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6 relative z-10 p-2 md:p-6"
          >
            <div className="flex flex-col gap-4 md:gap-6 mt-8 md:mt-16">
              <div className="rounded-[2rem] overflow-hidden shadow-lg border border-outline-variant/20 hover:shadow-2xl transition-all duration-500 group">
                <img 
                  alt="Không gian học tập Nextgen 1" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 aspect-square" 
                  src="https://i.postimg.cc/CxKyxgg1/1aca6c7a-7d7a-45b2-b4f7-3aa93adb81fb.png"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-lg border border-outline-variant/20 hover:shadow-2xl transition-all duration-500 group">
                <img 
                  alt="Không gian học tập Nextgen 2" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 aspect-[4/3]" 
                  src="https://i.postimg.cc/qv7fvTT7/86da9313-6459-4fea-9153-496801e40df5.png"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="rounded-[2rem] overflow-hidden shadow-lg border border-outline-variant/20 hover:shadow-2xl transition-all duration-500 group">
                <img 
                  alt="Cơ sở vật chất hiện đại" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 aspect-[3/4]" 
                  src="https://i.postimg.cc/g2092WWr/18730d34-9b61-43c6-9892-2a8be571a935-(1).png"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center gap-3 aspect-square border border-secondary/20 shadow-inner">
                <div className="w-14 h-14 bg-secondary text-white rounded-2xl flex items-center justify-center mb-1 shadow-lg shadow-secondary/30 rotate-3 hover:rotate-12 transition-transform duration-300">
                  <Star className="w-7 h-7" />
                </div>
                <h4 className="font-lexend font-black text-secondary text-lg md:text-xl leading-tight">Môi trường<br/>Thực hành</h4>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Người Sáng Lập Section */}
        <section className="py-16 md:py-28 px-6 bg-white scroll-mt-20 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
            {/* Section Header */}
            <motion.div {...fadeInUp} className="flex flex-col gap-4 items-center text-center">
              <span className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase bg-primary/10 px-5 py-2 rounded-full border border-primary/20">
                <Star className="w-4 h-4 fill-primary/30" />
                Người sáng lập
              </span>
              <h2 className="font-lexend text-3xl md:text-5xl text-on-surface font-bold tracking-tight">
                Đồng Sáng Lập <span className="text-primary">NextGen English</span>
              </h2>
              <div className="h-1.5 w-24 bg-secondary-container rounded-full mt-1"></div>
              <p className="text-on-surface-variant max-w-3xl mt-2 leading-relaxed text-base md:text-lg">
                NextGen English được sáng lập bởi hai nhà giáo tâm huyết, mang trong mình sứ mệnh thắp sáng tình yêu ngôn ngữ và kiến tạo thế hệ trẻ tự tin hội nhập quốc tế. Với hơn 20 năm kinh nghiệm cộng gộp, họ là những người truyền lửa đích thực trên hành trình chinh phục tiếng Anh của hàng nghìn học viên.
              </p>
            </motion.div>

            {/* Founder 1: Cô Vũ Thị Huyền Trang */}
            <motion.div 
              {...fadeInUp}
              className="bg-gradient-to-br from-white via-white to-primary/5 rounded-[2.5rem] border border-outline-variant/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Photo */}
                <div className="w-full lg:w-2/5 relative group">
                  <div className="aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden">
                    <img 
                      src="https://i.postimg.cc/7PWKYRSg/0e1fb43f-33b4-451e-9d31-dcf86f47a6c3.png" 
                      alt="Cô Vũ Thị Huyền Trang - Đồng sáng lập NextGen English" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#073a36]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/10"></div>
                  </div>
                  {/* Name overlay on mobile */}
                  <div className="absolute bottom-6 left-6 lg:hidden">
                    <span className="bg-primary text-white text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      Đồng sáng lập
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-3/5 p-8 md:p-12 flex flex-col justify-center gap-6">
                  <div className="flex flex-col gap-3">
                    <span className="hidden lg:inline-flex bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl w-fit border border-primary/15">
                      ★ Đồng sáng lập & CEO
                    </span>
                    <h3 className="font-lexend text-2xl md:text-3xl font-black text-on-surface leading-tight">
                      Cô Vũ Thị Huyền Trang
                    </h3>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed max-w-lg">
                      Một nhà giáo tận tâm, luôn cháy bỏng với sứ mệnh giúp học sinh chinh phục tiếng Anh một cách bài bản và vững chắc. Cô không chỉ truyền đạt kiến thức mà còn truyền cảm hứng, khơi dậy tinh thần vượt khó và ý chí chiến thắng trong mỗi học trò.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 bg-surface p-4 rounded-2xl border border-outline-variant/20">
                      <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-on-surface uppercase tracking-wide">Giáo viên dạy giỏi cấp Tỉnh</span>
                        <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5">Danh hiệu xuất sắc được công nhận bởi Sở Giáo dục & Đào tạo.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-surface p-4 rounded-2xl border border-outline-variant/20">
                      <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-on-surface uppercase tracking-wide">Hơn 10 năm kinh nghiệm giảng dạy</span>
                        <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5">Chuyên sâu ôn thi tiếng Anh vào lớp 10 THPT, luyện thi Đại học với tỷ lệ đỗ vượt trội.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-surface p-4 rounded-2xl border border-outline-variant/20">
                      <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <Star className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-on-surface uppercase tracking-wide">Bồi dưỡng Học sinh giỏi</span>
                        <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5">Dẫn dắt nhiều thế hệ học sinh đạt giải cao trong các kỳ thi học sinh giỏi các cấp.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 mt-2">
                    <p className="italic text-sm font-semibold text-primary leading-relaxed">
                      "Mỗi học sinh đều có một tiềm năng riêng – nhiệm vụ của tôi là giúp các em nhận ra và phát huy tối đa tiềm năng ấy. Tôi tin rằng, khi được dẫn dắt đúng phương pháp, bất kỳ ai cũng có thể tự tin làm chủ tiếng Anh."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Founder 2: Cô Đỗ Thị Phương Thảo */}
            <motion.div 
              {...fadeInUp}
              className="bg-gradient-to-bl from-white via-white to-secondary/5 rounded-[2.5rem] border border-outline-variant/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row-reverse">
                {/* Photo */}
                <div className="w-full lg:w-2/5 relative group">
                  <div className="aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden">
                    <img 
                      src="https://i.postimg.cc/wjPZR38v/dde35160-facb-4e15-a38e-8c107c896eb1.png" 
                      alt="Cô Đỗ Thị Phương Thảo - Đồng sáng lập NextGen English" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#073a36]/80 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-white/10"></div>
                  </div>
                  {/* Name overlay on mobile */}
                  <div className="absolute bottom-6 left-6 lg:hidden">
                    <span className="bg-secondary text-white text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      Đồng sáng lập
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-3/5 p-8 md:p-12 flex flex-col justify-center gap-6">
                  <div className="flex flex-col gap-3">
                    <span className="hidden lg:inline-flex bg-secondary/10 text-secondary text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl w-fit border border-secondary/15">
                      ★ Đồng sáng lập & CEO
                    </span>
                    <h3 className="font-lexend text-2xl md:text-3xl font-black text-on-surface leading-tight">
                      Cô Đỗ Thị Phương Thảo
                    </h3>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed max-w-lg">
                      Một người giáo viên giàu nhiệt huyết và trách nhiệm, cô dành trọn tình yêu thương cho từng lớp học nhỏ. Với triết lý "học mà chơi – chơi mà học", cô giúp các em nhỏ xây dựng nền tảng tiếng Anh vững chắc ngay từ những năm tháng đầu đời.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3 bg-surface p-4 rounded-2xl border border-outline-variant/20">
                      <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-on-surface uppercase tracking-wide">Giáo viên dạy giỏi cấp Tỉnh</span>
                        <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5">Được vinh danh nhờ năng lực sư phạm vượt trội và phương pháp giảng dạy sáng tạo.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-surface p-4 rounded-2xl border border-outline-variant/20">
                      <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <School className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-on-surface uppercase tracking-wide">Hơn 10 năm giảng dạy Tiểu học</span>
                        <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5">Chuyên sâu tiếng Anh cấp Tiểu học, xây dựng nền tảng ngôn ngữ vững chắc cho trẻ nhỏ.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-surface p-4 rounded-2xl border border-outline-variant/20">
                      <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <Zap className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-on-surface uppercase tracking-wide">Chuyên gia ôn thi HSG & IOE</span>
                        <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5">Bồi dưỡng Học sinh giỏi và luyện thi Olympic Tiếng Anh trên Internet (IOE) đạt thành tích cao.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 mt-2">
                    <p className="italic text-sm font-semibold text-rose-600 leading-relaxed">
                      "Tôi tin rằng mỗi đứa trẻ đều có khả năng tiếp thu ngôn ngữ phi thường. Điều quan trọng là tạo cho các con một môi trường đầy yêu thương, nơi các con được tự do khám phá và yêu thích tiếng Anh một cách tự nhiên nhất."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div 
              {...fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-[#073a36] rounded-3xl p-8 md:p-10 text-center shadow-xl"
            >
              <div className="flex flex-col gap-1">
                <div className="font-lexend text-3xl md:text-4xl font-black text-[#3fb9ae]"><Counter end={20} />+</div>
                <div className="text-[10px] md:text-xs uppercase font-bold text-white/60 tracking-widest">Năm kinh nghiệm cộng gộp</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-lexend text-3xl md:text-4xl font-black text-[#3fb9ae]"><Counter end={2000} />+</div>
                <div className="text-[10px] md:text-xs uppercase font-bold text-white/60 tracking-widest">Học viên thành công</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-lexend text-3xl md:text-4xl font-black text-[#3fb9ae]"><Counter end={10} />+</div>
                <div className="text-[10px] md:text-xs uppercase font-bold text-white/60 tracking-widest">Chương trình đào tạo</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-lexend text-3xl md:text-4xl font-black text-[#fcd400]">100%</div>
                <div className="text-[10px] md:text-xs uppercase font-bold text-white/60 tracking-widest">Tâm huyết & trách nhiệm</div>
              </div>
            </motion.div>
          </div>
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

          </div>
        </section>

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
                  image: learningAiImg,
                  desc: "Kho tài liệu thông minh & lộ trình cá nhân hóa từ AI giúp bạn nắm bắt kiến thức nhanh hơn 3 lần.",
                  color: "bg-blue-600",
                  shadow: "shadow-blue-500/30",
                  link: "https://nextgenstudy.vercel.app/"
                },
                { 
                  icon: PenTool, 
                  title: "Writing", 
                  image: writingAiImg,
                  desc: "Chấm chữa bài viết AI ngay lập tức, sửa lỗi ngữ pháp và gợi ý cách dùng từ vựng nâng cao.",
                  color: "bg-indigo-600",
                  shadow: "shadow-indigo-500/30",
                  link: "https://nextgenwrite.vercel.app/"
                },
                { 
                  icon: MicVocal, 
                  title: "Speaking", 
                  image: speakingAiImg,
                  desc: "Luyện phát âm chuẩn bản xứ với trí tuệ nhân tạo, phản hồi chính xác từng âm tiết trong thời gian thực.",
                  color: "bg-rose-600",
                  shadow: "shadow-rose-500/30",
                  link: "https://speaknextgen.vercel.app/"
                }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.link || "#"}
                  target={item.link ? "_blank" : undefined}
                  rel={item.link ? "noopener noreferrer" : undefined}
                  variants={fadeInUp}
                  whileHover={{ y: -12 }}
                  className="group relative bg-white rounded-[2rem] shadow-level-1 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-outline-variant/20 block"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={item.title}
                    />
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
                      <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all uppercase tracking-widest">
                        Kết nối AI ngay <ArrowRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all uppercase tracking-widest opacity-60">
                        Sắp ra mắt <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </motion.a>
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
            <div className="w-32 h-32 bg-white rounded-[2rem] p-4 border-4 border-[#3fb9ae] flex items-center justify-center shadow-2xl overflow-hidden">
              <img 
                src={logoImg} 
                alt="Nextgen English Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left mt-2">
              <h2 className="font-lexend text-2xl font-bold text-[#3fb9ae] tracking-wider uppercase">Nextgen English</h2>
              <p className="text-sm italic font-medium text-white/90">“Learn English , Lead the way”</p>
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
                “Learn English , Lead the way”
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

