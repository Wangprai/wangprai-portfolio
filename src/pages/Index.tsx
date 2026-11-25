import About from "../components/About";
import Certificates from "../components/Certificates";
import Contact from "../components/Contact";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CustomCursor from "../components/motion/CustomCursor";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import { usePersonalData } from "../hooks/usePersonalData";

const Index = () => {
  const { t, transitioning } = usePersonalData();
  const tc = `lang-transition${transitioning ? " transitioning" : ""}`;

  return (
    <div id="top" className="min-h-screen bg-background text-foreground relative">
      <CustomCursor />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-medium focus:shadow-lg"
      >
        {t.nav.skipToContent}
      </a>
      <Navbar />
      <main id="main-content">
        <div className={tc}>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Certificates />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
