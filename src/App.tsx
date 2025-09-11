import React, { useEffect, useState } from 'react';
import { 
  ChevronDown, Download, Mail, Phone, Linkedin, Github, 
  ExternalLink, MapPin, Calendar, Award, Code, Database,
  Brain, Zap, Star, Quote
} from 'lucide-react';

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TypingAnimation = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

const SkillBar = ({ skill, level, delay = 0 }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-medium">{skill}</span>
        <span className="text-blue-400 text-sm">{level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-1000 ease-out ${
            animate ? `w-[${level}%]` : 'w-0'
          }`}
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, tech, accuracy, link }) => {
  return (
    <div className="group relative bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
        </div>
        
        <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t, index) => (
            <span key={index} className="px-3 py-1 bg-gray-800 text-blue-400 text-sm rounded-full border border-blue-500/20">
              {t}
            </span>
          ))}
        </div>
        
        {accuracy && (
          <div className="flex items-center gap-2 text-green-400 font-medium">
            <Star className="w-4 h-4" />
            <span>{accuracy}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const TimelineItem = ({ title, company, period, description, icon: Icon }) => {
  return (
    <div className="relative flex items-start gap-4 group">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex-1 pb-8">
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <span className="font-medium">{company}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 text-sm">{period}</span>
          </div>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showQuote, setShowQuote] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = [
    { name: 'Python', level: 90 },
    { name: 'Machine Learning', level: 85 },
    { name: 'Deep Learning', level: 80 },
    { name: 'Data Science', level: 88 },
    { name: 'PyTorch', level: 75 },
    { name: 'SQL', level: 85 },
    { name: 'NLP', level: 70 },
    { name: 'Data Visualization', level: 85 }
  ];

  const projects = [
    {
      title: "Exploratory Data Analysis Suite",
      description: "Comprehensive EDA toolkit with rich visualizations and automated insights generation for complex datasets.",
      tech: ["Python", "Pandas", "Seaborn", "Plotly"],
      accuracy: "Rich Insights Generated"
    },
    {
      title: "Titanic Survival Prediction",
      description: "Advanced ML model with feature engineering and ensemble methods to predict passenger survival rates.",
      tech: ["Scikit-learn", "XGBoost", "Pandas"],
      accuracy: "80%+ Accuracy"
    },
    {
      title: "EV Charging Demand Prediction",
      description: "Real-time ML dashboard predicting electric vehicle charging demand with interactive visualizations.",
      tech: ["ML", "Streamlit", "Python"],
      accuracy: "89% R² Score"
    },
    {
      title: "Fake News Detection System",
      description: "Final year project: ML-powered fake news classifier with Flask deployment and real-time analysis.",
      tech: ["NLP", "Flask", "ML", "Python"],
      accuracy: "Production Ready"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Hire Me Button */}
      <a
        href="mailto:dimpu.b2085@gmail.com"
        className="fixed right-6 bottom-6 z-50 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <Zap className="w-5 h-5" />
        Hire Me
      </a>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <button
              onClick={() => setShowQuote(!showQuote)}
              className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-teal-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              Dimpu Narasimha Sai Bachupati
            </button>
            
            {showQuote && (
              <div className="mt-4 p-4 bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl max-w-md mx-auto">
                <Quote className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-gray-300 italic">
                  "Data is the new oil, but insights are the refined fuel that powers innovation."
                </p>
              </div>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-6">
            AI & Data Enthusiast | ML Engineer in the Making
          </h1>
          
          <div className="text-xl sm:text-2xl text-blue-400 mb-8 h-8">
            <TypingAnimation text="Turning data into stories, and models into impact." />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/Dimpu CVv.pdf (3).pdf"
              download="Dimpu_Narasimha_Sai_Bachupati_Resume.pdf"
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
            
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              Learn More
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">Academic Excellence</h3>
                <p className="text-gray-300 leading-relaxed">
                  BTech CSE student with a stellar <span className="text-blue-400 font-semibold">8.0 CGPA</span>, 
                  specializing in AI/ML, Data Science, and advanced algorithms. I combine theoretical knowledge 
                  with practical implementation to solve complex real-world problems.
                </p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">Personal Philosophy</h3>
                <p className="text-gray-300 leading-relaxed">
                  I love solving real-world problems with data and I'm always curious about the next big thing in AI. 
                  My passion lies in transforming raw data into actionable insights that drive meaningful impact.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Brain, title: "AI Enthusiast", desc: "Deep learning & neural networks" },
                { icon: Database, title: "Data Scientist", desc: "Statistical analysis & visualization" },
                { icon: Code, title: "ML Engineer", desc: "Production-ready models" },
                { icon: Zap, title: "Problem Solver", desc: "Innovative solutions" }
              ].map((item, index) => (
                <div key={index} className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6">Core Competencies</h3>
              {skills.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  skill={skill.name} 
                  level={skill.level} 
                  delay={index * 200}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { category: "Languages", items: ["Python", "SQL", "HTML", "CSS"] },
                { category: "Frameworks", items: ["PyTorch", "Scikit-learn", "Flask", "Streamlit"] },
                { category: "Data & Viz", items: ["Pandas", "NumPy", "Seaborn", "Matplotlib", "Power BI", "Tableau"] },
                { category: "Tools", items: ["GitHub", "Docker", "Jupyter", "VS Code"] }
              ].map((group, index) => (
                <div key={group.category} className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-400 mb-4">{group.category}</h4>
                  <div className="space-y-2">
                    {group.items.map((item, i) => (
                      <div key={i} className="text-gray-300 text-sm py-1 px-3 bg-gray-800 rounded-full">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Python Essentials", issuer: "CISCO", icon: Award },
              { title: "Machine Learning Specialization", issuer: "Andrew Ng – Coursera", icon: Award }
            ].map((cert, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                <cert.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
                <p className="text-blue-400 font-medium">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>
          
          <div className="space-y-8">
            <TimelineItem
              title="ML Intern"
              company="TechnoHacks"
              period="2024"
              description="Specialized in Exploratory Data Analysis (EDA) and advanced data visualization techniques to extract meaningful insights from complex datasets."
              icon={Brain}
            />
            
            <TimelineItem
              title="AI Intern"
              company="Edunet x Shell x AICTE"
              period="2024"
              description="Developed EV demand prediction dashboard with interactive visualizations and machine learning models, achieving significant accuracy improvements."
              icon={Zap}
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">BTech in Computer Science Engineering</h3>
                  <p className="text-blue-400 font-medium">Mohanbabu University</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>2022 – 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">CGPA: 8.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full" />
            <p className="text-gray-300 mt-4 text-lg">Ready to turn data into impact? Let's build something amazing together.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Mail, label: "Email", value: "dimpu.b2085@gmail.com", href: "mailto:dimpu.b2085@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91-9177041001", href: "tel:+919177041001" },
              { icon: Linkedin, label: "LinkedIn", value: "dimpubachupati", href: "https://linkedin.com/in/dimpubachupati" },
              { icon: Github, label: "GitHub", value: "Bumb1eBee20", href: "https://github.com/Bumb1eBee20" },
              { icon: Code, label: "LeetCode", value: "bumb1ebee20", href: "https://leetcode.com/u/bumb1ebee20" }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group"
              >
                <contact.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors" />
                <h3 className="font-semibold text-white mb-2">{contact.label}</h3>
                <p className="text-gray-300 group-hover:text-white transition-colors">{contact.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Dimpu Narasimha Sai Bachupati. Built with React & Tailwind CSS.
          </p>
          <p className="text-gray-500 mt-2">
            "Building data-driven futures, one model at a time."
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;