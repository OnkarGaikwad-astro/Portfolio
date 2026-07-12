"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code, CheckCircle2, ChevronRight, Brain, Smartphone, Database, BarChart3, LineChart } from "lucide-react";
import Link from "next/link";

export default function AnarXProject() {
  return (
    <main className="min-h-screen w-full selection:bg-avior-primary selection:text-white overflow-x-hidden pt-24 pb-32 px-6 lg:px-24">
      
      {/* Floating Back Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-pill px-6 py-4 rounded-2xl flex items-center justify-between w-[95%] max-w-7xl"
      >
        <Link href="/#projects" className="flex items-center gap-2 font-body text-sm font-medium text-avior-slate/80 hover:text-avior-text transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
      </motion.nav>

      <div className="max-w-4xl mx-auto relative z-10 mt-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-avior-primary uppercase block mb-4">Case Study</span>
          <h1 className="font-heading text-5xl md:text-7xl text-avior-heading mb-6 tracking-tight">Anar X</h1>
          <h2 className="font-body text-2xl md:text-3xl text-avior-slate/90 mb-12 font-light">
            AI-Powered Pomegranate Intelligence Platform
          </h2>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="https://anarx.astronkar.in" target="_blank" rel="noopener noreferrer" className="skeu-button-primary px-8 py-4 rounded-full font-body font-semibold flex items-center gap-2">
              <ExternalLink size={18} /> Live Preview 
            </a>
            <a href="https://github.com/OnkarGaikwad-astro/Anar-X" target="_blank" rel="noopener noreferrer" className="skeu-button px-8 py-4 rounded-full font-body font-semibold text-avior-text flex items-center gap-2 hover:text-avior-primary transition-colors">
              <Code size={18} /> Source Code
            </a>
          </div>

          <div className="w-full h-[300px] md:h-[500px] skeu-card rounded-3xl overflow-hidden relative mb-16">
             <img src="/anarx_project.png" alt="Anar X" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        </motion.div>

        {/* Overview */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="skeu-card p-8 md:p-12 rounded-3xl">
            <h3 className="font-heading text-3xl text-avior-heading mb-6">Overview</h3>
            <div className="space-y-6 font-body text-lg text-avior-slate/80 leading-relaxed">
              <p>
                Anar X is an AI-driven agriculture platform developed to help pomegranate farmers make informed decisions throughout the crop lifecycle. The platform combines computer vision, machine learning, and real-time agricultural data to provide intelligent disease diagnosis alongside current market insights.
              </p>
              <p>
                At the core of Anar X is a custom-trained deep learning model built using a curated dataset of real pomegranate plant images. The dataset includes healthy crops along with multiple disease classes, enabling the model to recognize visual symptoms and accurately classify plant diseases from smartphone images.
              </p>
              <p>
                Once an image is captured or uploaded, the application preprocesses it, performs inference using the trained model, predicts the disease with a confidence score, and presents the farmer with detailed information about the disease, recommended treatments, and preventive measures.
              </p>
              <p>
                To make the platform more practical beyond disease diagnosis, Anar X also integrates official government agricultural market APIs to retrieve real-time pomegranate market prices from different mandis. Farmers can monitor current market rates, compare prices across locations, and make more informed decisions about when and where to sell their produce.
              </p>
              <p>
                By combining AI-powered crop health analysis with live market intelligence, Anar X provides a single platform that supports both cultivation and post-harvest decision-making.
              </p>
            </div>
          </div>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Key Features */}
          <motion.section 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="skeu-card p-8 rounded-3xl h-full">
              <h3 className="font-heading text-2xl text-avior-heading mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-avior-primary" /> Key Features
              </h3>
              <ul className="space-y-4 font-body text-avior-slate/80">
                {[
                  "Custom-trained deep learning model for pomegranate disease classification",
                  "Disease detection using real crop images",
                  "Image preprocessing and AI inference pipeline",
                  "Prediction confidence score",
                  "Disease information and treatment recommendations",
                  "Preventive farming guidance",
                  "Real-time pomegranate market prices from official Government APIs",
                  "Market comparison across agricultural mandis",
                  "Farmer-friendly mobile interface",
                  "Regional language support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-avior-primary/70 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Technologies */}
          <motion.section 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="skeu-card p-8 rounded-3xl h-full">
              <h3 className="font-heading text-2xl text-avior-heading mb-6 flex items-center gap-3">
                <Code className="text-avior-primary" /> Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Python", "TensorFlow", "Keras", "OpenCV", "Flutter", 
                  "NumPy", "Pandas", "REST APIs", "AGMARKNET (Gov API)", 
                  "Computer Vision", "Deep Learning"
                ].map((tech) => (
                  <span key={tech} className="skeu-inset px-4 py-2 rounded-full text-sm font-body text-avior-slate">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Development Process */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="skeu-card p-8 md:p-12 rounded-3xl">
            <h3 className="font-heading text-3xl text-avior-heading mb-8">Development Process</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {[
                { title: "Data Collection", desc: "Collected and organized real-world pomegranate disease images.", icon: Database },
                { title: "Data Preparation", desc: "Cleaned, labeled, and augmented the dataset.", icon: BarChart3 },
                { title: "Model Training", desc: "Trained and evaluated a convolutional neural network for disease classification.", icon: Brain },
                { title: "Optimization", desc: "Optimized the model for accurate predictions.", icon: LineChart },
                { title: "Integration", desc: "Integrated the trained model into a Flutter application.", icon: Smartphone },
                { title: "Market Data", desc: "Connected official government agricultural market APIs to fetch live mandi prices.", icon: Database },
                { title: "UI/UX Design", desc: "Designed an intuitive mobile experience focused on accessibility and ease of use for farmers.", icon: CheckCircle2 }
              ].map((step, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/50 text-avior-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(255,255,255,0.02)] relative z-10">
                    <step.icon size={18} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl skeu-inset group-hover:border-avior-primary/30 transition-colors">
                    <h4 className="font-heading text-lg text-avior-white mb-1">{step.title}</h4>
                    <p className="font-body text-sm text-avior-slate/70">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* What I Learned */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <div className="p-8 md:p-12 skeu-inset rounded-3xl border border-white/5 bg-white/[0.02]">
            <h3 className="font-heading text-3xl text-avior-heading mb-6 flex items-center gap-3">
              <Brain className="text-avior-primary" /> What I Learned
            </h3>
            <p className="font-body text-xl text-avior-slate/80 leading-relaxed italic">
              "Anar X allowed me to experience the complete lifecycle of building an AI-powered product, from preparing datasets and training deep learning models to integrating external government APIs, deploying intelligent inference pipelines, and designing a production-oriented mobile application. The project reinforced the importance of combining machine learning with reliable real-world data to build software that delivers practical value to its users."
            </p>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
