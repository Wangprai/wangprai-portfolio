import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Lang = "en" | "th";

const translations = {
  en: {
    nav: { about: "About", education: "Education", certificates: "Certificates", experience: "Experience", skills: "Skills", projects: "Projects", contact: "Contact", resume: "Resume" },
    hero: {
      greeting: "Hi, my name is",
      name: "Wangprai Jullapech",
      tagline: "Software Engineering / Data Science",
      description: "I am a recent graduate in Computer Science from Khon Kaen University, interested in software development and data science. I desire to apply the knowledge gained throughout my studies to create innovative projects and am always ready to learn new technologies.",
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
    },
    about: {
      title: "About Me",
      p1: "Hello, my name is Wangprai Jullapech (Boss), a recent graduate with Second-Class Honors in Computer Science from Khon Kaen University. I am passionate about Software Development, Data Science, and Natural Language Processing (NLP).",
      p2: "During my studies, I focused primarily on Data Science, gaining a strong foundation in Machine Learning and Deep Learning. I also developed a project on Automatic Speech Recognition for Thai (ASR), applying deep learning techniques to convert speech into text.",
      p3: "Through a 6-month internship and cooperative education experience as a Software Engineer, I applied my data science knowledge to real-world projects and developed web applications using technologies such as React, ElysiaJS (Bun), and Socket.IO. This experience strengthened my interest in pursuing a career in software development.",
      p4: "I am passionate about building systems that leverage data and AI to create real value for users, and I am always eager to learn and adopt new technologies.",
    },
    certificates: { 
      title: "Certificates", 
      items: [
        { name: "Super AI Engineer Season 5: AI Innovator", 
          issuer: "Artificial Intelligence Association of Thailand (AIAT)", 
          date: "2025" 
        },
        { name: "Hackathon in Boot Camp Training", 
          issuer: "Data Universe", 
          date: "2025" 
        },
      ]
    },
    education: {
      title: "Education",
      degree: "Bachelor of Science in Computer Science, Second-Class Honors",
      university: "Khon Kaen University",
      graduation: "Graduated in 2025",
    },
    experience: {
      title: "Work Experience",
      jobs: {
        intern: {
          role: "Software Engineer Intern",
          period: "Apr 2025 — Oct 2025",
          bullets: [
            "Developed a control panel for editing website content on DaikinThai using PHP and Laravel.",
            "Fine-tuned the Document Understanding Transformer (Donut model) model for invoice scanning, improving accuracy from 87% to 92%.",
            "Developed internal web applications using TypeScript, React, ElysiaJS, Oracle, and PostgreSQL.",
          ],
        },
      },
    },
    skills: {
      title: "Skills & Technologies",
      languages: "Languages",
      devframeworks: "Development Frameworks",
      dsaiframeworks: "Data Analysis & AI Frameworks",
      tools: "Tools & Platforms",
      learning: "Currently Learning",
    },
    projects: {
      title: "Projects",
      donutmodel: "Document Understanding Transformer (Donut model) is a deep learning model for extracting structured information from documents. It uses a transformer architecture to process document images and generate text-based outputs, enabling applications like form processing and invoice analysis.",
      iotmeetingroomreservation: "IOT Meeting Room Reservation is a web application for booking meeting rooms, displaying real-time booking information, and providing IoT device notifications when meetings are approaching. Built with React, ElysiaJS, and WebSockets.",
      daikinthai: "Created a control panel for CRUD operations on website content(image, text, etc.), allowing admins to edit information without relying on the IT department.",
      asrmodel: "Automatic Speech Recognition for Thai (ASR model) is a deep learning model for converting spoken Thai language into text. It uses a transformer architecture to process audio inputs and generate accurate text outputs. Fine-tuned from the Wav2Vec2 model developed by Facebook AI Research (FAIR) to specifically handle Thai speech recognition.",
      salarygrowth: "A mini project for data analysis, examining relationships within a dataset and creating visualizations to analyze salary trends and rank data science jobs, along with initial machine learning model experimentation.",
    },
    contact: {
      subtitle: "What's Next?",
      title: "Get In Touch",
      description: "I'm currently looking for new opportunities and my inbox is always open. Whether you have a question, a project idea, or just want to say hi — I'll do my best to get back to you!",
      button: "Say Hello",
    },
    footer: { builtBy: "Built by Wangprai Jullapech" },
  },
  th: {
    nav: { about: "เกี่ยวกับ", education: "การศึกษา", experience: "ประสบการณ์", skills: "ทักษะ", projects: "โปรเจกต์", contact: "ติดต่อ", resume: "เรซูเม่" },
    hero: {
      greeting: "สวัสดีครับ ผม",
      name: "วังไพร จุลเพชร",
      tagline: "Software Engineering / Data Science",
      description: "ผมเป็นนักศึกษาจบใหม่จากสาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น ที่มีความสนใจทางด้าน software development และ data science โดยที่มีความต้องการความรู้ที่ได้รับตลอดการศึกษาไปใช้ในการสร้างสรรค์ผลงาน และพร้อมที่จะเรียนรู้เทคโนโลยีใหม่ ๆ อยู่เสมอ",
      viewWork: "ดูผลงาน",
      getInTouch: "ช่องทางติดต่อ",
    },
    about: {
      title: "เกี่ยวกับผม",
      p1: "สวัสดีครับ ผมชื่อ วังไพร จุลเพชร (บอส) นักศึกษาจบใหม่ เกียรตินิยมอันดับ 2 จากสาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น มีความสนใจในด้าน Software Development, Data Science และ Natural Language Processing (NLP)",
      p2: "ในระหว่างการศึกษา ผมมุ่งเน้นด้าน Data Science เป็นหลัก ทำให้มีความเข้าใจใน Machine Learning และ Deep Learning พร้อมทั้งได้พัฒนาโปรเจกต์ Automatic Speech Recognition for Thai (ASR) ซึ่งเป็นการนำ Deep Learning มาใช้ในการแปลงเสียงพูดเป็นข้อความ",
      p3: "จากประสบการณ์ฝึกงานและสหกิจศึกษาในตำแหน่ง Software Engineer เป็นระยะเวลา 6 เดือน ผมได้นำความรู้ด้าน Data Science มาประยุกต์ใช้กับงานจริง และได้พัฒนา Web Application โดยใช้เทคโนโลยี เช่น React, ElysiaJS (Bun) และ Socket.IO ประสบการณ์นี้ทำให้ผมสนใจและมุ่งมั่นที่จะพัฒนาตนเองในสาย Software Development อย่างจริงจัง",
      p4: "ผมมีความสนใจในการพัฒนาระบบที่สามารถนำ Data และ AI มาสร้างคุณค่าให้กับผู้ใช้งานจริง และพร้อมเรียนรู้เทคโนโลยีใหม่ ๆ อยู่เสมอ",
    },
    certificates: { 
      title: "Certificates", 
      items: [
        { name: "Super AI Engineer Season 5: AI Innovator", 
          issuer: "สมาคมปัญญาประดิษฐ์ประเทศไทย (AIAT)", 
          date: "2025" 
        },
        { name: "Hackathon in Boot Camp Training", 
          issuer: "Data Universe", 
          date: "2025" 
        },
      ]
    },
    education: {
      title: "การศึกษา",
      degree: "ปริญญาตรี วิทยาศาสตร์บัณฑิต สาขาวิทยาการคอมพิวเตอร์ เกียรตินิยมอันดับ 2", 
      university: "มหาวิทยาลัยขอนแก่น",
      graduation: "จบการศึกษาในปี 2025",
    },
    experience: {
      title: "ประสบการณ์การทำงาน",
      jobs: {
        intern: {
          role: "นักศึกษาฝึกงาน Software Engineer",
          period: "เม.ย. 2025 — ต.ค. 2025",
          bullets: [
            "พัฒนา control panel สำหรับแก้ไขเนื้อหาบนเว็บไซต์ DaikinThai ด้วย PHP และ Laravel",
            "พัฒนา ปรับแต่งโมเดล Document Understanding Transformer (Donut model) สำหรับแสกนเอกสารใบแจ้งหนี้ โดยมีค่าความแม่นยำจาก 87% เป็น 92%",
            "พัฒนา web application สำหรับระบบภายในด้วย TypeScript, React, ElysiaJS, Oracle และ PostgreSQL",
          ],
        },
      },
    },
    skills: {
      title: "ทักษะและเทคโนโลยีที่ใช้",
      languages: "Languages",
      devframeworks: "Development Frameworks",
      dsaiframeworks: "Data Analysis & AI Frameworks",
      tools: "Tools & Platforms",
      learning: "Currently Learning",
    },
    projects: {
      title: "โปรเจกต์",
      donutmodel:"Document Understanding Transformer (Donut model) สำหรับการประมวลผลฟอร์มและการวิเคราะห์ใบแจ้งหนี้ เป็นการ fine-tune โมเดล Donut model ที่พัฒนาขึ้นโดย NAVER AI Lab เพื่อดึงข้อมูลที่มีโครงสร้างจากเอกสารภาพ โดยใช้สถาปัตยกรรม transformer ในการประมวลผลภาพเอกสารและสร้างผลลัพธ์ออกมาในรูปแบบของ json",
      iotmeetingroomreservation: "IOT Meeting Room Reservation เป็นเว็บแอปพลิเคชันสำหรับการจองห้องประชุม โดยมีการแสดงผลข้อมูลการจองแบบ real-time รวมไปถึงการมีเสียงแจ้งเตือนจากอุปกรณ์ IOT เมื่อใกล้ครบระยะเวลาการประชุม สร้างด้วย React, ElysiaJS และ WebSockets",
      daikinthai: "สร้าง control panel สำหรับการทำ CRUD content บนหน้าเว็บไซต์ (รูปภาพ, ข้อความ, อื่นๆ) เพื่อที่จะให้ แอดมิน สามารถแก้ไขข้อมูลบางส่วนได้โดยที่ไม่ต้องพึ่งแผนก IT",
      asrmodel: "Automatic Speech Recognition for Thai (ASR model) คือ โมเดลการเรียนรู้เชิงลึกสำหรับการแปลงภาษาพูดเป็นข้อความภาษาไทย โดยใช้สถาปัตยกรรม transformer เพื่อประมวลผลสัญญาณเสียงและสร้างผลลัพธ์ โดยเป็นการ fine-tune Wav2Vec2 โมเดลที่พัฒนาขึ้นโดย Facebook AI Research (FAIR) เพื่อให้สามารถประมวลผลและแปลงเสียงพูดภาษาไทยได้",
      salarygrowth: "mini project การวิเคราะห์ข้อมูล โดยวิเคราะห์ข้อมูลจากความสัมพันธ์ต่างๆ ในชุดข้อมูล และมีการทำ visualization เพื่อวิเคราะห์แนวโน้มของเงินเดือน และจัดอันดับงานในสายงาน data science รวมถึงการทดลองใช้ model machine learning ในขั้นเบื้องต้น",
    },
    contact: {
      subtitle: "ขั้นตอนต่อไป",
      title: "ติดต่อผม",
      description: "ผมกำลังมองหาโอกาสใหม่ ๆ และกล่องข้อความของผมเปิดรับเสมอ ไม่ว่าคุณจะมีคำถาม ไอเดียโปรเจกต์ หรือแค่อยากทักทาย — ผมจะพยายามตอบกลับให้เร็วที่สุด!",
      button: "ส่งข้อความ",
    },
    footer: { builtBy: "Built by Wangprai Jullapech" },
  },
} as const;

type Translations = (typeof translations)[Lang];

interface PersonalDataContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  transitioning: boolean;
}

const PersonalDataContext = createContext<PersonalDataContextType | null>(null);

export const PersonalDataProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setTransitioning(true);
    setTimeout(() => {
      setLang((l) => (l === "en" ? "th" : "en"));
      setTimeout(() => setTransitioning(false), 50);
    }, 200);
  };

  return (
    <PersonalDataContext.Provider value={{ lang, t: translations[lang], toggleLang, transitioning }}>
      {children}
    </PersonalDataContext.Provider>
  );
};

export const usePersonalData = () => {
  const ctx = useContext(PersonalDataContext);
  if (!ctx) throw new Error("usePersonalData must be used within PersonalDataProvider");
  return ctx;
};
