"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, MessageSquare, Mail, FileText, ChevronRight, Star, GitBranch, MapPin, Send, User, Quote, Brain, Network, Eye, Zap, Smartphone, Cloud, Bot, Terminal, Palette, Code, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { sendEmail } from "@/lib/email";

import BackgroundAtmosphere from "@/components/BackgroundAtmosphere";

// --- Subcomponents for complex animations ---

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [texts]);

  return (
    <div className="h-10 md:h-12 overflow-hidden relative mb-8">
      {texts.map((text, i) => (
        <motion.div
          key={i}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: index === i ? 0 : -50, opacity: index === i ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute inset-0 text-xl md:text-3xl font-body font-light text-avior-slate tracking-wide"
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
};





const SkillSphere = ({ title, delay, children }: { title: string, delay: number, children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{ y: [0, -8, 0] }}
      transition={{
        y: { repeat: Infinity, duration: 4 + (delay * 10), ease: "easeInOut" },
        opacity: { delay },
        scale: { delay, type: "spring", stiffness: 200, damping: 20 },
        layout: { type: "spring", stiffness: 200, damping: 20 }
      }}
      whileHover={{ scale: 1.05, y: -10, rotate: expanded ? 0 : 2, transition: { delay: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className={`skeu-card p-6 md:p-8 flex flex-col items-center justify-center z-10 ${expanded ? 'col-span-full md:col-span-2 row-span-2' : ''}`}
    >
      <motion.h3 layout className="font-heading text-2xl text-avior-slate mb-2 text-center">{title}</motion.h3>
      {expanded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 text-sm font-body text-avior-slate/80 text-center space-y-2">
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

// --- Main Page Component ---

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Navbar scale down on scroll
  const navScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.9]);
  const navY = useTransform(scrollYProgress, [0, 0.05], [0, 10]);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const response = await sendEmail({
        subject: `New Portfolio Message from ${name}`,
        message: message,
        senderName: name,
        replyTo: email,
      });

      if (response.success) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error(response.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Portrait scroll tracking removed

  return (
    <main ref={containerRef} className="relative min-h-screen w-full selection:bg-avior-primary selection:text-white overflow-x-hidden">

      {/* Global 3D Background Removed */}

      {/* Floating Glass Navbar */}
      <motion.nav
        style={{ scale: navScale, y: navY }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-pill px-8 py-4 rounded-2xl flex items-center justify-between w-[95%] max-w-7xl"
      >
        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="Logo" className="w-8 h-8 object-cover rounded-lg overflow-hidden" />
          <span className="font-heading text-2xl font-bold tracking-widest text-avior-slate">ONKAR</span>
        </div>
        <div className="hidden md:flex gap-8 font-body text-sm font-medium text-avior-slate/70">
          <a href="#about" className="hover:text-avior-text transition-colors">About</a>
          <a href="#projects" className="hover:text-avior-text transition-colors">Projects</a>
          <a href="#skills" className="hover:text-avior-text transition-colors">Skills</a>
          <a href="#experience" className="hover:text-avior-text transition-colors">Experience</a>
        </div>
        <a href="#contact" className="hidden md:block skeu-button-primary px-6 py-2 rounded-full font-body text-sm font-semibold">Contact</a>
      </motion.nav>

      <div className="relative w-full">

        {/* Hero Section */}
        <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 pt-32 lg:pt-0 z-10 pointer-events-none">
          {/* Left: Content */}
          <div className="lg:w-1/2 flex flex-col items-start z-10 mb-20 lg:mb-0 pointer-events-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-2 mb-6">
              <span className="w-12 h-[1px] bg-avior-primary"></span>
              <span className="font-mono text-sm tracking-widest text-avior-primary uppercase">IIT Gandhinagar — Artificial Intelligence</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="font-heading text-3xl md:text-5xl text-avior-heading mb-2">
              Hello,
            </motion.h2>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="font-heading text-6xl md:text-8xl lg:text-9xl text-avior-heading tracking-tighter mb-4">
              I'm Onkar.
            </motion.h1>

            <Typewriter texts={["AI Undergraduate", "Software Engineer", "Full Stack Developer", "Machine Learning Enthusiast"]} />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="font-body text-lg md:text-xl text-avior-slate/80 max-w-lg mb-12 leading-relaxed text-left">
              I write code that lives at the intersection of AI and product design. I'm currently an undergrad at IIT Gandhinagar, focused on building full-stack applications that are smart, fast, and actually useful.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="flex flex-wrap gap-4">
              <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="#about" className="skeu-button-primary px-8 py-4 rounded-full flex items-center gap-3 font-medium group">
                Explore <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a title="Resume" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="/resume.pdf" className="skeu-button px-6 py-4 rounded-full flex items-center justify-center text-avior-text"><FileText size={20} /></motion.a>
              <motion.a title="GitHub" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="https://github.com/OnkarGaikwad-astro" className="skeu-button px-6 py-4 rounded-full flex items-center justify-center text-avior-text"><GitBranch size={20} /></motion.a>
              <motion.a title="LinkedIn" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="https://www.linkedin.com/in/onkar-gaikwad-b64851322" className="skeu-button px-6 py-4 rounded-full flex items-center justify-center text-avior-text"><Briefcase size={20} /></motion.a>
              <motion.a title="Email Me" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="mailto:onkargaikwad3319@gmail.com" className="skeu-button px-6 py-4 rounded-full flex items-center justify-center text-avior-text"><MessageSquare size={20} /></motion.a>
            </motion.div>
          </div>

          {/* Right: Static Portrait */}
          <div className="lg:w-1/2 relative w-full flex items-center justify-center pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ opacity: { duration: 1, delay: 0.5 }, scale: { duration: 1, delay: 0.5, type: "spring" } }}
              className="w-[80%] md:w-[60%] lg:w-[60%] aspect-[3/4] skeu-card rounded-[2rem] overflow-hidden relative shadow-2xl group"
            >
              {/* Colored gradient matching the contact section */}
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top_right,var(--color-avior-primary)_0%,transparent_60%)] z-10 mix-blend-screen"></div>
              {/* Vignette Overlay to dissolve edges */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.8)_120%)] z-10 pointer-events-none"></div>
              {/* Bottom gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 pointer-events-none opacity-90"></div>
              
              <img src="/Onkar_Proff.png" alt="Digital Portrait" className="absolute inset-0 w-full h-full object-cover opacity-90 contrast-125 transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 lg:px-24 relative z-10 pointer-events-none">
          {/* About Me Section (New) */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 pointer-events-auto mb-32">
            <div className="lg:w-3/5 flex flex-col space-y-6">
              <h2 className="font-heading text-5xl md:text-6xl text-avior-heading mb-4">About Me.</h2>
              <p className="font-body text-xl text-avior-slate/80 leading-relaxed">
                I'm an undergraduate student pursuing a <strong className="text-avior-white">B.Tech in Artificial Intelligence at IIT Gandhinagar</strong>. I enjoy taking an idea from a blank page to a working product—designing the experience, building the backend, and integrating intelligent systems until it feels complete.
              </p>
              <p className="font-body text-xl text-avior-slate/80 leading-relaxed">
                Working across the stack has taught me that good software isn't about a single technology; it's about understanding the problem and choosing the right tools. Whether I'm building financial tools, communication platforms, or computer vision systems, my focus is always on creating products that solve real problems.
              </p>
            </div>
            <div className="lg:w-2/5 flex flex-col">
              <div className="skeu-card p-8 rounded-3xl h-full flex flex-col justify-center border border-white/5 bg-white/[0.02]">
                <h3 className="font-heading text-3xl text-avior-heading mb-6">Highlights</h3>
                <ul className="space-y-4 font-body text-avior-slate/80 text-lg">
                  {[
                    "B.Tech in Artificial Intelligence, IIT Gandhinagar",
                    "Class of 2028",
                    "Building end-to-end AI applications",
                    "Full-stack and cloud engineering",
                    "Specializing in modern LLMs & computer vision"
                  ].map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-avior-primary shrink-0 mt-1" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* What I Enjoy Building Grid */}
          <div className="max-w-7xl mx-auto pointer-events-auto mb-32">
            <h2 className="font-heading text-4xl md:text-5xl text-avior-heading mb-10 text-center">What I Enjoy Building</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "AI Applications", icon: Brain },
                { name: "Machine Learning", icon: Network },
                { name: "Computer Vision", icon: Eye },
                { name: "Productivity Tools", icon: Zap },
                { name: "Full Stack Web", icon: Globe },
                { name: "Mobile Apps", icon: Smartphone },
                { name: "Cloud Software", icon: Cloud },
                { name: "Automation", icon: Bot },
                { name: "Developer Tools", icon: Terminal },
                { name: "Modern UI/UX", icon: Palette }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="skeu-inset p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 cursor-default">
                    <Icon className="w-6 h-6 text-avior-primary/50 mb-3 group-hover:text-avior-primary group-hover:scale-110 transition-all duration-300" />
                    <span className="font-body text-sm font-medium text-avior-slate group-hover:text-avior-white transition-colors">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The Journey Section */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 pointer-events-auto">
            {/* Left Highlight */}
            <div className="hidden lg:block lg:w-2/5">
              <div className="sticky top-32">
                <h2 className="font-heading text-5xl md:text-6xl text-avior-heading mb-6">Mindset.</h2>
                <p className="font-body text-xl text-avior-slate/70 leading-relaxed mb-12">
                  I believe that every project is an opportunity to become a better engineer, not only by learning new technologies but also by improving the way I think, design, and solve problems.
                </p>

                <div className="p-8 skeu-inset rounded-3xl border border-white/5 bg-white/[0.02]">
                  <Quote className="text-avior-primary/40 w-10 h-10 mb-6" />
                  <p className="font-heading text-2xl text-avior-white leading-relaxed tracking-wide">
                    "I don't chase every new technology. I follow the curiosity that leads me to understand it."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-3/5 flex flex-col justify-center space-y-8 pointer-events-auto">
              {[
                { title: "Simplicity & Reliability", text: "I focus on creating products that solve practical problems while maintaining clean architecture, intuitive interfaces, and reliable performance." },
                { title: "User-Centered Thinking", text: "I believe good software is measured not only by what it can do but by how naturally people can use it. Every technical decision should ultimately serve the user experience." },
                { title: "Beyond Programming", text: "Outside of engineering, my hobbies include photographing nature, animals, and interesting objects. I also enjoy learning about system architecture and distributed computing." }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -10, transition: { delay: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  className="skeu-card p-8 rounded-2xl group border border-white/5"
                >
                  <h3 className="font-heading text-2xl text-avior-heading mb-3 group-hover:text-avior-white transition-colors">{card.title}</h3>
                  <p className="font-body text-avior-slate/80 leading-relaxed text-lg">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 lg:px-24 pointer-events-none relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 pointer-events-auto">
          <div className="lg:w-1/3">
            <h2 className="font-heading text-5xl text-avior-heading mb-6">Education</h2>
            <div className="p-8 skeu-card rounded-3xl border border-white/5 h-full flex flex-col justify-center">
              <h3 className="font-heading text-2xl text-avior-white mb-2">B.Tech Artificial Intelligence</h3>
              <p className="font-body text-avior-primary font-medium mb-4">IIT Gandhinagar</p>
              <p className="font-body text-avior-slate/70">Expected Graduation: 2028</p>
            </div>
          </div>
          <div className="lg:w-2/3">
            <h3 className="font-heading text-3xl text-avior-heading mb-6">Relevant Coursework</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Machine Learning", "Data Structures", "Operating Systems", "Computer Networks",
                "Database Systems", "Artificial Intelligence", "Probability", "Linear Algebra"
              ].map((course, idx) => (
                <div key={idx} className="skeu-card py-6 px-4 rounded-2xl flex items-center justify-center text-center group hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-default">
                  <span className="font-body text-sm font-medium text-avior-slate group-hover:text-avior-white transition-colors">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 lg:px-24 pointer-events-none">
        <div className="max-w-7xl mx-auto text-center mb-20 pointer-events-auto">
          <h2 className="font-heading text-5xl md:text-7xl text-avior-heading mb-6">Capabilities</h2>
          <p className="font-body text-xl text-avior-slate/70 max-w-2xl mx-auto">A culmination of specialized knowledge across the modern software engineering stack.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pointer-events-auto">
          <SkillSphere title="Programming" delay={0}>
            <div className="flex flex-wrap justify-center gap-2">
              {['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Dart', 'SQL', 'HTML', 'CSS'].map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{s}</span>)}
            </div>
          </SkillSphere>
          <SkillSphere title="AI / ML" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2">
              {['Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP', 'Generative AI', 'Prompt Engineering', 'LLMs', 'Model Evaluation', 'Feature Engineering', 'RAG', 'AI Agents'].map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{s}</span>)}
            </div>
          </SkillSphere>
          <SkillSphere title="Frameworks" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-2">
              {['Flutter', 'React', 'Next.js', 'Flask', 'Firebase', 'Supabase', 'TensorFlow', 'PyTorch', 'OpenCV', 'Scikit-learn', 'NumPy', 'Pandas'].map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{s}</span>)}
            </div>
          </SkillSphere>
          <SkillSphere title="Cloud & Backend" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-2">
              {['REST APIs', 'Firebase', 'Supabase', 'Cloud Functions', 'Vercel', 'Cloudflare', 'Authentication'].map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{s}</span>)}
            </div>
          </SkillSphere>
          <SkillSphere title="Cybersecurity" delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2">
              {['Linux', 'Kali Linux', 'Networking', 'OSINT', 'Wireshark', 'Burp Suite', 'Nmap', 'Web Security'].map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{s}</span>)}
            </div>
          </SkillSphere>
          <SkillSphere title="Dev Tools" delay={0.5}>
            <div className="flex flex-wrap justify-center gap-2">
              {['Git', 'GitHub', 'Android Studio', 'VS Code', 'Jupyter', 'Docker', 'Postman', 'Linux Terminal'].map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{s}</span>)}
            </div>
          </SkillSphere>
          <SkillSphere title="Embedded Systems" delay={0.6}>
            <div className="flex flex-wrap justify-center gap-2">
              {['ESP32', 'IoT Architectures', 'Microcontrollers', 'Sensors', 'Hardware Integration', 'Edge Computing'].map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{s}</span>)}
            </div>
          </SkillSphere>
          <SkillSphere title="UI / UX Design" delay={0.7}>
            <div className="flex flex-wrap justify-center gap-2">
              {['Wireframing', 'Prototyping', 'Figma', 'Interaction Design', 'Responsive Design', 'User Research'].map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs">{s}</span>)}
            </div>
          </SkillSphere>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 lg:px-24 pointer-events-none">
        <div className="max-w-7xl mx-auto mb-20 pointer-events-auto">
          <h2 className="font-heading text-5xl md:text-7xl text-avior-heading">Crafted Works</h2>
        </div>

        <div className="space-y-32 pointer-events-auto">
          {[
            { id: 1, title: "Aera", desc: "A real-time messaging platform that integrates conversational AI directly into the chat. Built with secure authentication, cloud synchronization, and push notifications to make digital communication more intuitive.", img: "/miles_morales.jpg", tags: ["Flutter", "Supabase", "Gemini API", "Firebase"], problem: "Digital communication lacks deep contextual intelligence without switching apps.", solution: "Integrated a responsive AI agent natively into the chat flow.", architecture: "Flutter frontend communicating with a Supabase backend, utilizing Cloud Functions for async LLM inferences.", github: "https://github.com/OnkarGaikwad-astro/Aera", live: "https://aera.astronkar.in" },
            { id: 2, title: "Priora", desc: "An AI-powered productivity workspace that goes beyond basic task management. It generates smart notes, organizes ideas, and provides personalized workflows in a minimal, modern interface.", img: "/interstellar.jpg", tags: ["Flutter", "Firebase", "REST APIs"], problem: "Task managers are rigid and require high mental overhead to organize.", solution: "AI-driven automated note-taking and personalized, self-organizing workflows.", architecture: "Flutter UI layered over Firebase, using REST APIs for external NLP services.", github: "https://github.com/OnkarGaikwad-astro/Priora", live: "https://priora.astronkar.in" },
            { id: 3, title: "Skedio", desc: "An intelligent timetable generator that automates conflict-free class scheduling. It handles complex constraints via algorithmic optimization, featuring smart teacher allocation and drag-and-drop editing.", img: "/batman-face-of-chaos-qv.jpg", tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Algorithmic Scheduling"], problem: "Manual scheduling in schools is incredibly time-consuming and error-prone.", solution: "An automated scheduling engine that mathematically resolves constraints.", architecture: "Next.js frontend with a Node.js/PostgreSQL backend executing custom scheduling algorithms.", github: "https://github.com/OnkarGaikwad-astro/skedio", live: "https://skedio.astronkar.in" },
            { id: 4, title: "SmartSpend AI", desc: "A personal finance PWA for students and young professionals. It combines expense tracking with AI-driven insights to generate personalized budgeting analytics and recommendations.", img: "/Spiderman.jpg", tags: ["Next.js", "Supabase", "Tailwind CSS", "PWA"], problem: "Existing finance apps are too complex or lack actionable, personalized advice.", solution: "A minimal tracker that uses AI to analyze spending and suggest budgets.", architecture: "PWA built on Next.js and Supabase, utilizing LLMs for categorization and insights.", github: "https://github.com/OnkarGaikwad-astro/Smart-Spend", live: "https://smartspend.astronkar.in" },
            { id: 5, title: "Anar X", desc: "A computer vision platform that helps farmers identify crop diseases. It analyzes plant imagery and provides actionable, localized recommendations through a simple, farmer-friendly interface.", img: "/nature.jpg", tags: ["Python", "TensorFlow", "OpenCV", "Supabase", "Government API"], problem: "Farmers lack immediate, expert diagnosis for rapidly spreading crop diseases.", solution: "An offline-capable mobile interface that classifies plant diseases instantly.", architecture: "Python/TensorFlow model deployed via REST, consumed by a Supabase-backed frontend.", github: "https://github.com/OnkarGaikwad-astro/Anar-X", live: "https://anarx.astronkar.in" }
          ].map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -10, transition: { delay: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
              className={`w-full min-h-[80vh] skeu-card rounded-[3rem] p-8 md:p-16 flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 relative overflow-hidden`}
            >
              {/* Project Image Placeholder */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="lg:w-1/2 w-full h-[40vh] lg:h-[60vh] bg-white/5 rounded-3xl shadow-inner relative flex items-center justify-center overflow-hidden group"
              >
                <motion.img
                  animate={{ scale: [1.1, 1.15, 1.1], rotate: [0, 1, 0] }}
                  transition={{ duration: 20 + idx * 5, repeat: Infinity, ease: "linear" }}
                  src={project.img}
                  alt="Project Showcase"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                />
              </motion.div>

              {/* Project Details */}
              <div className="lg:w-1/2 flex flex-col items-start z-10 pointer-events-auto">
                <span className="font-mono text-sm tracking-widest text-white mb-4 block uppercase">Project {project.id}</span>
                <h3 className="font-heading text-5xl text-avior-heading mb-4">{project.title}</h3>
                <p className="font-body text-lg text-avior-slate/80 mb-8 leading-relaxed">
                  {project.desc}
                </p>

                {/* Deep Dive Case Study */}
                <div className="w-full space-y-4 mb-8 bg-black/20 p-6 rounded-2xl border border-white/5">
                  <div>
                    <h4 className="font-heading text-sm uppercase tracking-widest text-avior-primary mb-1">The Problem</h4>
                    <p className="font-body text-avior-slate/90 text-sm md:text-base">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-heading text-sm uppercase tracking-widest text-avior-primary mb-1">The Solution</h4>
                    <p className="font-body text-avior-slate/90 text-sm md:text-base">{project.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-heading text-sm uppercase tracking-widest text-avior-primary mb-1">Architecture</h4>
                    <p className="font-body text-avior-slate/90 text-sm md:text-base">{project.architecture}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map(tech => (
                    <span key={tech} className="skeu-inset px-4 py-2 rounded-full text-sm font-body text-avior-slate">{tech}</span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="skeu-button-primary px-8 py-4 rounded-full font-body font-semibold flex items-center gap-2">
                    Live Preview <ArrowRight size={18} />
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="skeu-button px-6 py-4 rounded-full font-body font-semibold text-avior-text flex items-center gap-2 hover:text-avior-primary transition-colors">
                    <Code size={18} /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* GitHub Activity */}
      <section className="py-24 px-6 lg:px-24 pointer-events-none relative z-10 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto pointer-events-auto text-center">
          <h2 className="font-heading text-4xl text-avior-heading mb-6">GitHub Activity</h2>
          <p className="font-body text-lg text-avior-slate/70 max-w-2xl mx-auto mb-12">Consistent contributions, open-source experiments, and a deep history of continuous deployment.</p>
          <div className="flex justify-center">
            <a href="https://github.com/OnkarGaikwad-astro" target="_blank" rel="noreferrer" className="skeu-card px-10 py-10 rounded-3xl border border-white/5 flex flex-col items-center hover:bg-white/5 transition-colors group">
              <GitBranch className="w-12 h-12 text-avior-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-2xl text-avior-white mb-2">View GitHub Profile</h3>
              <p className="font-body text-avior-slate/70 mb-8">@OnkarGaikwad-astro</p>
              <div className="skeu-button-primary px-6 py-3 rounded-full font-body font-semibold flex items-center gap-2">
                View on GitHub <ArrowRight size={16} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto skeu-card rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-16 lg:gap-24"
        >
          {/* Subtle background gradient */}
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_left,var(--color-avior-primary)_0%,transparent_60%)]"></div>

          {/* Left side: Text */}
          <div className="md:w-1/2 text-left relative z-10">
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-avior-heading mb-6 leading-tight">Let's build<br />something.</h2>
            <p className="font-body text-xl text-avior-slate/80 mb-12 max-w-md">
              My inbox is always open. Whether you have a question, a project idea, or just want to connect.
            </p>
            <div className="flex gap-4">
              <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} href="https://github.com/OnkarGaikwad-astro" target="_blank" rel="noopener noreferrer" className="w-14 h-14 skeu-inset rounded-full flex items-center justify-center text-avior-text hover:text-avior-primary transition-colors">
                <GitBranch size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} href="https://www.linkedin.com/in/onkar-gaikwad-b64851322" target="_blank" rel="noopener noreferrer" className="w-14 h-14 skeu-inset rounded-full flex items-center justify-center text-avior-text hover:text-avior-primary transition-colors">
                <Briefcase size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-14 h-14 skeu-inset rounded-full flex items-center justify-center text-avior-text hover:text-avior-primary transition-colors">
                <FileText size={24} />
              </motion.a>
            </div>
          </div>

          {/* Right side: Form */}
          <div className="md:w-1/2 w-full relative z-10">
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-6 w-full">

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-avior-slate/50 group-focus-within:text-avior-primary transition-colors">
                  <User size={20} />
                </div>
                <input required name="name" type="text" placeholder="Your Name" className="w-full skeu-inset bg-black/10 px-6 py-5 pl-14 rounded-2xl font-body text-avior-text placeholder:text-avior-slate/40 outline-none focus:ring-2 focus:ring-avior-primary/50 transition-all border border-white/5 focus:border-avior-primary/30" />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-avior-slate/50 group-focus-within:text-avior-primary transition-colors">
                  <Mail size={20} />
                </div>
                <input required name="email" type="email" placeholder="Your Email" className="w-full skeu-inset bg-black/10 px-6 py-5 pl-14 rounded-2xl font-body text-avior-text placeholder:text-avior-slate/40 outline-none focus:ring-2 focus:ring-avior-primary/50 transition-all border border-white/5 focus:border-avior-primary/30" />
              </div>

              <div className="relative group">
                <textarea required name="message" placeholder="How can I help you?" rows={5} className="w-full skeu-inset bg-black/10 px-6 py-6 rounded-2xl font-body text-avior-text placeholder:text-avior-slate/40 outline-none focus:ring-2 focus:ring-avior-primary/50 transition-all border border-white/5 focus:border-avior-primary/30 resize-none" />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full skeu-button-primary mt-2 py-5 rounded-2xl font-heading text-xl flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              </motion.button>

            </form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center border-t border-white/5 relative bg-black/20">
        <h2 className="font-heading text-4xl text-avior-slate/30 mb-8 tracking-widest hover:text-avior-primary/50 transition-colors cursor-default">ONKAR</h2>
        <p className="font-body text-lg text-avior-slate/80 mb-6 max-w-sm mx-auto leading-relaxed">
          Built with curiosity, coffee, and a lot of debugging.
        </p>
        <div className="flex justify-center gap-6 mb-8 text-avior-slate/50">
          <a href="https://github.com/OnkarGaikwad-astro" className="hover:text-avior-primary transition-colors"><GitBranch size={20} /></a>
          <a href="https://www.linkedin.com/in/onkar-gaikwad-b64851322" className="hover:text-avior-primary transition-colors"><Briefcase size={20} /></a>
          <a href="mailto:onkargaikwad3319@gmail.com" className="hover:text-avior-primary transition-colors"><Mail size={20} /></a>
          <a href="/resume.pdf" className="hover:text-avior-primary transition-colors"><FileText size={20} /></a>
        </div>
        <p className="font-mono text-xs text-avior-slate/40">
          © {new Date().getFullYear()} Onkar Gaikwad. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
