"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, MessageSquare, Mail, FileText, ChevronRight, Star, GitBranch, MapPin } from "lucide-react";
import AbstractArtwork from "@/components/AbstractArtwork";
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

  return (
    <main ref={containerRef} className="relative min-h-screen w-full selection:bg-avior-primary selection:text-white overflow-x-hidden">

      {/* Global 3D Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <AbstractArtwork />
      </div>

      {/* Floating Glass Navbar */}
      <motion.nav
        style={{ scale: navScale, y: navY }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-pill px-8 py-4 rounded-2xl flex items-center justify-between w-[95%] max-w-7xl"
      >
        <span className="font-heading text-2xl font-bold tracking-widest text-avior-slate">ONKAR</span>
        <div className="hidden md:flex gap-8 font-body text-sm font-medium text-avior-slate/70">
          <a href="#about" className="hover:text-avior-text transition-colors">About</a>
          <a href="#projects" className="hover:text-avior-text transition-colors">Projects</a>
          <a href="#skills" className="hover:text-avior-text transition-colors">Skills</a>
          <a href="#experience" className="hover:text-avior-text transition-colors">Experience</a>
        </div>
        <a href="#contact" className="hidden md:block skeu-button-primary px-6 py-2 rounded-full font-body text-sm font-semibold">Contact</a>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 pt-32 lg:pt-0 z-10 pointer-events-none">

        {/* Left: Content */}
        <div className="lg:w-1/2 flex flex-col items-start z-10 mb-20 lg:mb-0 pointer-events-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-2 mb-6">
            <span className="w-12 h-[1px] bg-avior-primary"></span>
            <span className="font-mono text-sm tracking-widest text-avior-primary uppercase">IIT Gandhinagar — AI & Embedded Systems</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="font-heading text-3xl md:text-5xl text-avior-heading mb-2"
          >
            Hello,
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl text-avior-heading tracking-tighter mb-4"
          >
            I'm Onkar.
          </motion.h1>

          <Typewriter texts={["Software Engineer", "AI Developer", "Machine Learning Enthusiast", "Problem Solver"]} />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="font-body text-lg md:text-xl text-avior-slate/80 max-w-lg mb-12 leading-relaxed text-left"
          >
            Centered around creating impactful AI-powered software, blending deep technical expertise with beautiful, tactile design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="#projects" className="skeu-button-primary px-8 py-4 rounded-full flex items-center gap-3 font-medium group">
              Explore <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="#" className="skeu-button px-6 py-4 rounded-full flex items-center justify-center text-avior-text"><FileText size={20} /></motion.a>
            <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="#" className="skeu-button px-6 py-4 rounded-full flex items-center justify-center text-avior-text"><Globe size={20} /></motion.a>
            <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} href="#" className="skeu-button px-6 py-4 rounded-full flex items-center justify-center text-avior-text"><MessageSquare size={20} /></motion.a>
          </motion.div>
        </div>

        {/* Right: Empty Placeholder to balance layout */}
        <div className="lg:w-1/2 relative h-[50vh] lg:h-[80vh] w-full flex items-center justify-center pointer-events-none"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="w-full aspect-[3/4] skeu-card rounded-3xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-avior-primary/30 z-10"></div>
              <img
                src="/tom.jpg"
                alt="Digital Portrait"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </motion.div>
          </div>

          <div className="lg:w-3/5 flex flex-col justify-center space-y-8 pointer-events-auto">
            <h2 className="font-heading text-5xl md:text-6xl text-avior-heading mb-4">The Journey.</h2>

            {[
              { title: "Origins", text: "It started with a curiosity for how things work, leading to a deep dive into computer science and artificial intelligence." },
              { title: "Vision", text: "To craft software that feels entirely human. I believe the best interfaces are those that don't feel like interfaces at all, but natural extensions of thought." },
              { title: "Passion", text: "Beyond the screen, I find inspiration in minimal architecture, soft lighting, and the calm of early mornings." }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, type: "spring" }}
                whileHover={{ scale: 1.05, y: -10, transition: { delay: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                className="skeu-card p-8 rounded-2xl group"
              >
                <h3 className="font-heading text-2xl text-avior-heading mb-3 group-hover:text-avior-white transition-colors">{card.title}</h3>
                <p className="font-body text-avior-slate/80 leading-relaxed text-lg">{card.text}</p>
              </motion.div>
            ))}
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
          <SkillSphere title="AI / ML" delay={0}>
            <p>PyTorch, TensorFlow, LLMs</p>
            <p className="font-medium text-white">Used in 12+ projects</p>
          </SkillSphere>
          <SkillSphere title="Frontend" delay={0.1}>
            <p>React, Next.js, Framer Motion</p>
            <p className="font-medium text-white">Expert Level</p>
          </SkillSphere>
          <SkillSphere title="Backend" delay={0.2}>
            <p>Node.js, Python, Go</p>
            <p className="font-medium text-white">Highly Scalable</p>
          </SkillSphere>
          <SkillSphere title="Cloud" delay={0.3}>
            <p>AWS, GCP, Vercel</p>
            <p className="font-medium text-white">Certified</p>
          </SkillSphere>
          <SkillSphere title="Databases" delay={0.4}>
            <p>PostgreSQL, Redis, MongoDB</p>
          </SkillSphere>
          <SkillSphere title="DevOps" delay={0.5}>
            <p>Docker, CI/CD, K8s</p>
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
            { id: 1, title: "Neural Insight Engine", img: "/miles_morales.jpg", tags: ["PyTorch", "Next.js", "Redis"] },
            { id: 2, title: "Cosmic Analytics", img: "/interstellar.jpg", tags: ["React", "WebGL", "Python"] },
            { id: 3, title: "Gotham Security Protocol", img: "/batman-face-of-chaos-qv.jpg", tags: ["Cybersecurity", "Go", "PostgreSQL"] }
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
                <h3 className="font-heading text-5xl text-avior-heading mb-6">{project.title}</h3>
                <p className="font-body text-xl text-avior-slate/80 mb-8 leading-relaxed">
                  A high-performance platform that processes massive datasets in real-time, providing actionable business intelligence through a perfectly fluid, skeuomorphic dashboard.
                </p>

                <div className="flex flex-wrap gap-3 mb-12">
                  {project.tags.map(tech => (
                    <span key={tech} className="skeu-inset px-4 py-2 rounded-full text-sm font-body text-avior-slate">{tech}</span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <a href="#" className="skeu-button-primary px-8 py-4 rounded-full font-body font-semibold flex items-center gap-2">
                    Live Preview <ArrowRight size={18} />
                  </a>
                  <a href="#" className="skeu-button px-6 py-4 rounded-full font-body font-semibold text-avior-text flex items-center gap-2">
                    <Globe size={18} /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-32 px-6 overflow-hidden pointer-events-none">
        <div className="max-w-7xl mx-auto text-center mb-20 pointer-events-auto">
          <h2 className="font-heading text-5xl md:text-7xl text-avior-heading">Milestones</h2>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-12 pb-16 pt-8 px-4 pointer-events-auto">
          {[
            { year: "2025", title: "Senior AI Engineer", comp: "TechNova", desc: "Leading the core machine learning infrastructure team." },
            { year: "2023", title: "Software Developer", comp: "Aurelix", desc: "Engineered scalable microservices handling 1M+ requests." },
            { year: "2021", title: "Data Scientist", comp: "InnovateLabs", desc: "Developed predictive models for healthcare analytics." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, y: -10, transition: { delay: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
              className="w-full skeu-card p-8 md:p-12 rounded-3xl group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full skeu-inset flex items-center justify-center text-white font-heading">
                  {item.year.slice(2)}
                </div>
                <h4 className="font-mono text-sm tracking-widest text-white">{item.year}</h4>
              </div>
              <h3 className="font-heading text-2xl text-avior-heading mb-2 group-hover:text-avior-white transition-colors">{item.title}</h3>
              <p className="font-body font-medium text-avior-slate mb-4">{item.comp}</p>
              <p className="font-body text-avior-slate/70 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto skeu-card rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden"
        >
          {/* Subtle floating leaves/particles placeholder via CSS */}
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,var(--color-avior-primary)_0%,transparent_50%)]"></div>

          <h2 className="font-heading text-5xl md:text-7xl text-avior-heading mb-6 relative z-10">Start a Conversation.</h2>
          <p className="font-body text-xl text-avior-slate/80 mb-16 relative z-10 max-w-2xl mx-auto">
            My inbox is always open. Whether you have a question, a project idea, or just want to connect.
          </p>

          <form className="flex flex-col gap-6 max-w-md mx-auto relative z-10">
            <input type="text" placeholder="Your Name" className="w-full skeu-inset bg-transparent px-6 py-4 rounded-xl font-body text-avior-text placeholder:text-avior-slate/50 outline-none focus:ring-2 focus:ring-avior-primary/50 transition-shadow" />
            <input type="email" placeholder="Your Email" className="w-full skeu-inset bg-transparent px-6 py-4 rounded-xl font-body text-avior-text placeholder:text-avior-slate/50 outline-none focus:ring-2 focus:ring-avior-primary/50 transition-shadow" />
            <textarea placeholder="Your Message" rows={4} className="w-full skeu-inset bg-transparent px-6 py-4 rounded-xl font-body text-avior-text placeholder:text-avior-slate/50 outline-none focus:ring-2 focus:ring-avior-primary/50 transition-shadow resize-none" />
            <button type="button" className="w-full skeu-button-primary mt-4 py-4 rounded-xl font-heading text-xl">
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-avior-border relative">
        <h2 className="font-heading text-4xl text-avior-slate/30 mb-8 tracking-widest">Onkar</h2>
        <p className="font-mono text-sm tracking-widest text-avior-slate/60 mb-6 uppercase">
          Crafted with intention
        </p>
        <p className="font-mono text-xs text-avior-slate/40">
          © {new Date().getFullYear()} Onkar. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
