
import About from "../components/About";
import Contact from "../components/Contact";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import { PersonalDataProvider, usePersonalData } from "../hooks/usePersonalData";

const PortfolioContent = () => {
  const { transitioning } = usePersonalData();
  const tc = `lang-transition${transitioning ? " transitioning" : ""}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className={tc}>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Index = () => (
  <PersonalDataProvider>
    <PortfolioContent />
  </PersonalDataProvider>
);

export default Index;
