import { createContext } from "react";

export type Lang = "en" | "th";

export const translations = {
  en: {
    nav: {
      about: "About",
      education: "Education",
      certificates: "Certificates",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      switchThemeToLight: "Switch to light theme",
      switchThemeToDark: "Switch to dark theme",
      switchLangLabel: "Switch language to Thai",
      skipToContent: "Skip to main content",
    },
    hero: {
      greeting: "Hi, my name is",
      name: "Wangprai Jullapech",
      tagline: "Software Engineer",
      subTagline: "Frontend, Backend & Full Stack Development — with a foundation in Data Science & AI",
      description:
        "Computer Science graduate from Khon Kaen University focused on building reliable web applications across frontend and backend stacks, backed by hands-on internship experience and applied Data Science & AI projects.",
      focusAreas: ["Frontend", "Backend", "Full Stack", "Data Science & AI"],
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
      viewResume: "Resume PDF",
      scrollCue: "Scroll to explore",
    },
    about: {
      title: "About Me",
      subtitle: "Background & Engineering Path",
      p1: "Hello, my name is Wangprai Jullapech (Boss), a recent graduate with Second-Class Honors in Computer Science from Khon Kaen University. I am passionate about Software Development, Data Science, and Natural Language Processing (NLP).",
      p2: "During my studies, I focused primarily on Data Science, gaining a strong foundation in Machine Learning and Deep Learning. I also developed a project on Automatic Speech Recognition for Thai (ASR), applying deep learning techniques to convert speech into text.",
      p3: "Through a 6-month internship and cooperative education experience as a Software Engineer, I applied my data science knowledge to real-world projects and developed web applications using technologies such as React, ElysiaJS (Bun), and Socket.IO. This experience strengthened my interest in pursuing a career in software development.",
      p4: "I am passionate about building systems that leverage data and AI to create real value for users, and I am always eager to learn and adopt new technologies.",
      snapshot: {
        title: "Profile Snapshot",
        degreeLabel: "Education",
        degreeValue: "B.S. Computer Science (2nd-Class Honors), KKU",
        experienceLabel: "Experience",
        experienceValue: "6-Month Software Engineer Intern @ Daikin",
        focusLabel: "Focus",
        focusValue: "Frontend · Backend · Full Stack",
      },
    },
    certificates: {
      title: "Certificates & Achievements",
      subtitle: "Verified Programs & Training",
      items: [
        {
          name: "Super AI Engineer Season 5: AI Innovator",
          issuer: "Artificial Intelligence Association of Thailand (AIAT)",
          date: "2025",
        },
        {
          name: "Hackathon in Boot Camp Training",
          issuer: "Data Universe",
          date: "2025",
        },
      ],
    },
    education: {
      title: "Education",
      subtitle: "Academic Foundation",
      degree: "Bachelor of Science in Computer Science, Second-Class Honors",
      university: "Khon Kaen University",
      graduation: "Graduated in 2025",
      honorsTag: "Second-Class Honors",
    },
    experience: {
      title: "Work Experience",
      subtitle: "Industry & Cooperative Experience",
      internshipBadge: "Internship",
      highlightLabel: "Donut Invoice Accuracy",
      highlightValue: "87% → 92%",
      stackLabel: "Technologies Used",
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
      subtitle: "Core Engineering Stack & Supporting Tools",
      languages: "Languages",
      devframeworks: "Development Frameworks",
      dsaiframeworks: "Data Analysis & AI Frameworks",
      tools: "Tools & Platforms",
      learning: "Currently Learning",
    },
    projects: {
      title: "Projects",
      subtitle: "Selected Web Engineering & Applied AI Work",
      viewDetails: "View details",
      closeModal: "Close project details",
      techStackLabel: "Technology Stack",
      highlightsLabel: "Key Details & Contribution",
      linksLabel: "Verified Links",
      noPublicLinks: "Internal / private project — no public repository link available.",
      openGithub: "View on GitHub",
      openHuggingFace: "View on Hugging Face",
      categories: {
        fullstack: "Full Stack Web",
        backendWeb: "Web & Backend",
        aiMl: "Deep Learning / AI",
        dataAnalysis: "Data Analysis",
      },
      donutmodel:
        "Document Understanding Transformer (Donut model) is a deep learning model for extracting structured information from documents. It uses a transformer architecture to process document images and generate text-based outputs, enabling applications like form processing and invoice analysis.",
      iotmeetingroomreservation:
        "IOT Meeting Room Reservation is a web application for booking meeting rooms, displaying real-time booking information, and providing IoT device notifications when meetings are approaching. Built with React, ElysiaJS, and WebSockets.",
      daikinthai:
        "Created a control panel for CRUD operations on website content(image, text, etc.), allowing admins to edit information without relying on the IT department.",
      asrmodel:
        "Automatic Speech Recognition for Thai (ASR model) is a deep learning model for converting spoken Thai language into text. It uses a transformer architecture to process audio inputs and generate accurate text outputs. Fine-tuned from the Wav2Vec2 model developed by Facebook AI Research (FAIR) to specifically handle Thai speech recognition.",
      salarygrowth:
        "A mini project for data analysis, examining relationships within a dataset and creating visualizations to analyze salary trends and rank data science jobs, along with initial machine learning model experimentation.",
      highlights: {
        iotmeetingroomreservation: [
          "Web application for booking meeting rooms with real-time booking updates.",
          "Integrated IoT device notifications when scheduled meetings are approaching.",
          "Built full-stack architecture with React, TypeScript, ElysiaJS, Ant Design, Oracle, and Socket.io.",
        ],
        daikinthai: [
          "Developed a web content management control panel supporting CRUD operations for images, text, and site content.",
          "Enabled administrators to update website information independently without relying on the IT department.",
          "Implemented with PHP, Laravel, Bootstrap, and MySQL.",
        ],
        donutmodel: [
          "Fine-tuned the Document Understanding Transformer (Donut) model for invoice scanning and form processing.",
          "Improved invoice scanning accuracy from 87% to 92% during the Software Engineer internship.",
          "Processed document images directly into structured text outputs using Python, PyTorch, Transformers, Hugging Face, and Wandb.",
        ],
        asrmodel: [
          "Fine-tuned Facebook AI Research's Wav2Vec2 transformer architecture specifically for Thai speech recognition.",
          "Converts spoken Thai audio inputs into text outputs using Python, PyTorch, PyThaiNLP, and Hugging Face.",
          "Published source code on GitHub and trained model weights on Hugging Face.",
        ],
        salarygrowth: [
          "Analyzed dataset relationships and built visualizations for salary trends and job rankings in data science.",
          "Conducted initial machine learning model experimentation.",
          "Implemented using Python, Pandas, NumPy, Scikit-learn, Matplotlib, and Seaborn.",
        ],
      },
    },
    contact: {
      subtitle: "What's Next?",
      title: "Get In Touch",
      description:
        "I'm currently looking for new opportunities and my inbox is always open. Whether you have a question, a project idea, or just want to say hi — I'll do my best to get back to you!",
      button: "Say Hello",
      callMe: "Call Me",
      emailLabel: "Email",
      phoneLabel: "Phone",
      copyEmail: "Copy email",
      copied: "Copied",
    },
    footer: {
      builtBy: "Built by Wangprai Jullapech",
      backToTop: "Back to top",
      role: "Software Engineer",
    },
    notFound: {
      code: "404",
      title: "Page not found",
      description: "The route you requested does not exist or has been moved.",
      returnHome: "Return to Home",
    },
  },
  th: {
    nav: {
      about: "เกี่ยวกับ",
      education: "การศึกษา",
      certificates: "ประกาศนียบัตร",
      experience: "ประสบการณ์",
      skills: "ทักษะ",
      projects: "โปรเจกต์",
      contact: "ติดต่อ",
      resume: "เรซูเม่",
      openMenu: "เปิดเมนู",
      closeMenu: "ปิดเมนู",
      switchThemeToLight: "เปลี่ยนเป็นธีมสว่าง",
      switchThemeToDark: "เปลี่ยนเป็นธีมมืด",
      switchLangLabel: "เปลี่ยนเป็นภาษาอังกฤษ",
      skipToContent: "ข้ามไปยังเนื้อหาหลัก",
    },
    hero: {
      greeting: "สวัสดีครับ ผมชื่อ",
      name: "วังไพร จุลเพชร",
      tagline: "Software Engineer",
      subTagline: "พัฒนาเว็บแอปพลิเคชันทั้ง Frontend, Backend และ Full Stack พร้อมพื้นฐานด้าน Data Science และ AI",
      description:
        "บัณฑิตวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น มุ่งพัฒนาเว็บแอปพลิเคชันที่เชื่อถือได้ทั้งฝั่ง Frontend และ Backend ต่อยอดจากประสบการณ์ฝึกงานจริงและโปรเจกต์ด้าน Data Science และ AI พร้อมเรียนรู้เทคโนโลยีใหม่ ๆ อยู่เสมอ",
      focusAreas: ["Frontend", "Backend", "Full Stack", "Data Science & AI"],
      viewWork: "ดูผลงาน",
      getInTouch: "ติดต่อผม",
      viewResume: "เรซูเม่ (PDF)",
      scrollCue: "เลื่อนลงเพื่อดูต่อ",
    },
    about: {
      title: "เกี่ยวกับผม",
      subtitle: "ประวัติและเส้นทางสู่สายงาน Software Engineering",
      p1: "สวัสดีครับ ผมวังไพร จุลเพชร (บอส) บัณฑิตจบใหม่สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น เกียรตินิยมอันดับ 2 สนใจด้าน Software Development, Data Science และ Natural Language Processing (NLP)",
      p2: "ระหว่างเรียน ผมโฟกัสด้าน Data Science เป็นหลัก จึงมีพื้นฐานที่แข็งแรงทั้ง Machine Learning และ Deep Learning และได้พัฒนาโปรเจกต์ Automatic Speech Recognition for Thai (ASR) ที่นำ Deep Learning มาใช้แปลงเสียงพูดเป็นข้อความ",
      p3: "จากการฝึกงานและสหกิจศึกษาในตำแหน่ง Software Engineer เป็นเวลา 6 เดือน ผมได้นำความรู้ด้าน Data Science มาใช้กับงานจริง และพัฒนาเว็บแอปพลิเคชันด้วยเทคโนโลยีอย่าง React, ElysiaJS (Bun) และ Socket.IO ประสบการณ์นี้ทำให้ผมตั้งใจเติบโตในสายงาน Software Development อย่างจริงจัง",
      p4: "ผมสนใจพัฒนาระบบที่นำข้อมูลและ AI มาสร้างคุณค่าให้ผู้ใช้งานได้จริง และพร้อมเรียนรู้เทคโนโลยีใหม่ ๆ อยู่เสมอ",
      snapshot: {
        title: "ข้อมูลโดยย่อ",
        degreeLabel: "การศึกษา",
        degreeValue: "วท.บ. วิทยาการคอมพิวเตอร์ (เกียรตินิยมอันดับ 2) มข.",
        experienceLabel: "ประสบการณ์",
        experienceValue: "ฝึกงานตำแหน่ง Software Engineer 6 เดือน @ Daikin",
        focusLabel: "สายงานหลัก",
        focusValue: "Frontend · Backend · Full Stack",
      },
    },
    certificates: {
      title: "ประกาศนียบัตรและความสำเร็จ",
      subtitle: "โครงการและการอบรม",
      items: [
        {
          name: "Super AI Engineer Season 5: AI Innovator",
          issuer: "สมาคมปัญญาประดิษฐ์ประเทศไทย (AIAT)",
          date: "2025",
        },
        {
          name: "Hackathon in Boot Camp Training",
          issuer: "Data Universe",
          date: "2025",
        },
      ],
    },
    education: {
      title: "การศึกษา",
      subtitle: "พื้นฐานการศึกษา",
      degree: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์ (เกียรตินิยมอันดับ 2)",
      university: "มหาวิทยาลัยขอนแก่น",
      graduation: "สำเร็จการศึกษาปี 2025",
      honorsTag: "เกียรตินิยมอันดับ 2",
    },
    experience: {
      title: "ประสบการณ์ทำงาน",
      subtitle: "ฝึกงานและสหกิจศึกษา",
      internshipBadge: "ฝึกงาน / สหกิจศึกษา",
      highlightLabel: "ความแม่นยำโมเดล Donut (สแกนใบแจ้งหนี้)",
      highlightValue: "87% → 92%",
      stackLabel: "เทคโนโลยีที่ใช้",
      jobs: {
        intern: {
          role: "นักศึกษาฝึกงาน ตำแหน่ง Software Engineer",
          period: "เม.ย. 2025 — ต.ค. 2025",
          bullets: [
            "พัฒนา Control Panel สำหรับแก้ไขเนื้อหาบนเว็บไซต์ DaikinThai ด้วย PHP และ Laravel",
            "Fine-tune โมเดล Document Understanding Transformer (Donut) สำหรับสแกนใบแจ้งหนี้ เพิ่มความแม่นยำจาก 87% เป็น 92%",
            "พัฒนาเว็บแอปพลิเคชันสำหรับใช้งานภายในองค์กรด้วย TypeScript, React, ElysiaJS, Oracle และ PostgreSQL",
          ],
        },
      },
    },
    skills: {
      title: "ทักษะและเทคโนโลยี",
      subtitle: "เทคโนโลยีหลักด้าน Software Engineering และเครื่องมือที่ใช้งาน",
      languages: "ภาษาโปรแกรม",
      devframeworks: "เฟรมเวิร์กสำหรับพัฒนาแอปพลิเคชัน",
      dsaiframeworks: "เฟรมเวิร์กด้าน Data Analysis และ AI",
      tools: "เครื่องมือและแพลตฟอร์ม",
      learning: "กำลังศึกษาเพิ่มเติม",
    },
    projects: {
      title: "โปรเจกต์",
      subtitle: "ผลงานด้าน Web Engineering และ Applied AI",
      viewDetails: "ดูรายละเอียด",
      closeModal: "ปิดรายละเอียดโปรเจกต์",
      techStackLabel: "เทคโนโลยีที่ใช้",
      highlightsLabel: "รายละเอียดและงานที่รับผิดชอบ",
      linksLabel: "ลิงก์ที่เกี่ยวข้อง",
      noPublicLinks: "โปรเจกต์ภายในองค์กร จึงไม่มีลิงก์ซอร์สโค้ดสาธารณะ",
      openGithub: "ดูบน GitHub",
      openHuggingFace: "ดูบน Hugging Face",
      categories: {
        fullstack: "Full Stack Web",
        backendWeb: "Web & Backend",
        aiMl: "Deep Learning / AI",
        dataAnalysis: "Data Analysis",
      },
      donutmodel:
        "Document Understanding Transformer (Donut model) เป็นโมเดล Deep Learning สำหรับดึงข้อมูลเชิงโครงสร้างจากภาพเอกสาร โดย fine-tune จากโมเดล Donut ของ NAVER AI Lab ใช้สถาปัตยกรรม Transformer ประมวลผลภาพเอกสารและให้ผลลัพธ์ในรูปแบบ JSON เหมาะกับงานประมวลผลแบบฟอร์มและวิเคราะห์ใบแจ้งหนี้",
      iotmeetingroomreservation:
        "IOT Meeting Room Reservation คือเว็บแอปพลิเคชันสำหรับจองห้องประชุม แสดงข้อมูลการจองแบบ Real-time และมีเสียงแจ้งเตือนจากอุปกรณ์ IoT เมื่อใกล้ครบเวลาประชุม พัฒนาด้วย React, ElysiaJS และ WebSockets",
      daikinthai:
        "พัฒนา Control Panel สำหรับจัดการเนื้อหาเว็บไซต์แบบ CRUD (รูปภาพ ข้อความ และอื่น ๆ) ช่วยให้แอดมินแก้ไขข้อมูลบางส่วนได้เอง โดยไม่ต้องพึ่งแผนก IT",
      asrmodel:
        "Automatic Speech Recognition for Thai (ASR model) คือโมเดล Deep Learning สำหรับแปลงเสียงพูดภาษาไทยเป็นข้อความ ใช้สถาปัตยกรรม Transformer ประมวลผลสัญญาณเสียง โดย fine-tune จากโมเดล Wav2Vec2 ของ Facebook AI Research (FAIR) ให้รองรับเสียงพูดภาษาไทยโดยเฉพาะ",
      salarygrowth:
        "Mini Project ด้านการวิเคราะห์ข้อมูล ศึกษาความสัมพันธ์ภายในชุดข้อมูล สร้าง Visualization เพื่อวิเคราะห์แนวโน้มเงินเดือนและจัดอันดับตำแหน่งงานสาย Data Science รวมถึงทดลองใช้โมเดล Machine Learning เบื้องต้น",
      highlights: {
        iotmeetingroomreservation: [
          "พัฒนาเว็บแอปพลิเคชันจองห้องประชุม พร้อมอัปเดตข้อมูลการจองแบบ Real-time",
          "รองรับการแจ้งเตือนผ่านอุปกรณ์ IoT เมื่อใกล้ถึงเวลาประชุม",
          "พัฒนาแบบ Full Stack ด้วย React, TypeScript, ElysiaJS, Ant Design, Oracle และ Socket.io",
        ],
        daikinthai: [
          "พัฒนา Control Panel สำหรับจัดการเนื้อหาเว็บไซต์แบบ CRUD ทั้งรูปภาพ ข้อความ และข้อมูลอื่น ๆ",
          "ช่วยให้แอดมินอัปเดตข้อมูลบนเว็บไซต์ได้เอง โดยไม่ต้องพึ่งแผนก IT",
          "พัฒนาด้วย PHP, Laravel, Bootstrap และ MySQL",
        ],
        donutmodel: [
          "Fine-tune โมเดล Document Understanding Transformer (Donut) สำหรับสแกนใบแจ้งหนี้",
          "เพิ่มความแม่นยำในการสแกนใบแจ้งหนี้จาก 87% เป็น 92% ระหว่างฝึกงานตำแหน่ง Software Engineer",
          "แปลงภาพเอกสารเป็นข้อมูลเชิงโครงสร้าง (JSON) ด้วย Python, PyTorch, Transformers, Hugging Face และ Wandb",
        ],
        asrmodel: [
          "Fine-tune โมเดล Wav2Vec2 ของ Facebook AI Research (FAIR) สำหรับแปลงเสียงพูดภาษาไทยเป็นข้อความ",
          "พัฒนาด้วย Python, PyTorch, PyThaiNLP, Transformers และ Hugging Face",
          "เผยแพร่ซอร์สโค้ดบน GitHub และโมเดลบน Hugging Face",
        ],
        salarygrowth: [
          "วิเคราะห์ความสัมพันธ์ในชุดข้อมูล และสร้าง Visualization แสดงแนวโน้มเงินเดือนและอันดับตำแหน่งงานสาย Data Science",
          "ทดลองสร้างโมเดล Machine Learning เบื้องต้น",
          "พัฒนาด้วย Python, Pandas, NumPy, Scikit-learn, Matplotlib และ Seaborn",
        ],
      },
    },
    contact: {
      subtitle: "ก้าวต่อไป",
      title: "ติดต่อผม",
      description:
        "ผมกำลังมองหาโอกาสใหม่ ๆ และยินดีรับข้อความเสมอ ไม่ว่าจะเป็นคำถาม ไอเดียโปรเจกต์ หรือแค่อยากทักทาย ผมจะตอบกลับโดยเร็วที่สุดครับ",
      button: "ส่งอีเมลหาผม",
      callMe: "โทรหาผม",
      emailLabel: "อีเมล",
      phoneLabel: "โทรศัพท์",
      copyEmail: "คัดลอกอีเมล",
      copied: "คัดลอกแล้ว",
    },
    footer: {
      builtBy: "พัฒนาโดย วังไพร จุลเพชร",
      backToTop: "กลับขึ้นด้านบน",
      role: "Software Engineer",
    },
    notFound: {
      code: "404",
      title: "ไม่พบหน้านี้",
      description: "ไม่พบหน้าที่คุณต้องการ หรือหน้านี้อาจถูกย้ายไปแล้ว",
      returnHome: "กลับสู่หน้าหลัก",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];

export interface PersonalDataContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  transitioning: boolean;
}

export const PersonalDataContext = createContext<PersonalDataContextType | null>(null);
