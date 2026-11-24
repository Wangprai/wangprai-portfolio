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
      openMenu: "เปิดเมนูนำทาง",
      closeMenu: "ปิดเมนูนำทาง",
      switchThemeToLight: "เปลี่ยนเป็นธีมสว่าง",
      switchThemeToDark: "เปลี่ยนเป็นธีมมืด",
      switchLangLabel: "เปลี่ยนภาษาเป็นภาษาอังกฤษ",
      skipToContent: "ข้ามไปยังเนื้อหาหลัก",
    },
    hero: {
      greeting: "สวัสดีครับ ผม",
      name: "วังไพร จุลเพชร",
      tagline: "Software Engineer",
      subTagline: "พัฒนาเว็บแอปพลิเคชันทั้ง Frontend, Backend และ Full Stack พร้อมพื้นฐานด้าน Data Science และ AI",
      description:
        "บัณฑิตวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น มุ่งเน้นการพัฒนาเว็บแอปพลิเคชันทั้ง Frontend และ Backend จากประสบการณ์ฝึกงานจริง ผสานพื้นฐานด้าน Data Science และ AI พร้อมเรียนรู้เทคโนโลยีใหม่ ๆ อยู่เสมอ",
      focusAreas: ["Frontend", "Backend", "Full Stack", "Data Science & AI"],
      viewWork: "ดูผลงาน",
      getInTouch: "ช่องทางติดต่อ",
      viewResume: "เรซูเม่ (PDF)",
      scrollCue: "เลื่อนลงเพื่อดูเพิ่มเติม",
    },
    about: {
      title: "เกี่ยวกับผม",
      subtitle: "ประวัติและเส้นทางด้าน Software Engineering",
      p1: "สวัสดีครับ ผมชื่อ วังไพร จุลเพชร (บอส) นักศึกษาจบใหม่ เกียรตินิยมอันดับ 2 จากสาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น มีความสนใจในด้าน Software Development, Data Science และ Natural Language Processing (NLP)",
      p2: "ในระหว่างการศึกษา ผมมุ่งเน้นด้าน Data Science เป็นหลัก ทำให้มีความเข้าใจใน Machine Learning และ Deep Learning พร้อมทั้งได้พัฒนาโปรเจกต์ Automatic Speech Recognition for Thai (ASR) ซึ่งเป็นการนำ Deep Learning มาใช้ในการแปลงเสียงพูดเป็นข้อความ",
      p3: "จากประสบการณ์ฝึกงานและสหกิจศึกษาในตำแหน่ง Software Engineer เป็นระยะเวลา 6 เดือน ผมได้นำความรู้ด้าน Data Science มาประยุกต์ใช้กับงานจริง และได้พัฒนา Web Application โดยใช้เทคโนโลยี เช่น React, ElysiaJS (Bun) และ Socket.IO ประสบการณ์นี้ทำให้ผมสนใจและมุ่งมั่นที่จะพัฒนาตนเองในสาย Software Development อย่างจริงจัง",
      p4: "ผมมีความสนใจในการพัฒนาระบบที่สามารถนำ Data และ AI มาสร้างคุณค่าให้กับผู้ใช้งานจริง และพร้อมเรียนรู้เทคโนโลยีใหม่ ๆ อยู่เสมอ",
      snapshot: {
        title: "ข้อมูลโดยสรุป",
        degreeLabel: "การศึกษา",
        degreeValue: "วิทยาการคอมพิวเตอร์ เกียรตินิยมอันดับ 2 (มข.)",
        experienceLabel: "ประสบการณ์",
        experienceValue: "ฝึกงาน Software Engineer 6 เดือน @ Daikin",
        focusLabel: "ความถนัดหลัก",
        focusValue: "Frontend · Backend · Full Stack",
      },
    },
    certificates: {
      title: "ประกาศนียบัตรและความสำเร็จ",
      subtitle: "การอบรมและประกาศนียบัตร",
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
      subtitle: "พื้นฐานทางวิชาการ",
      degree: "ปริญญาตรี วิทยาศาสตร์บัณฑิต สาขาวิทยาการคอมพิวเตอร์ เกียรตินิยมอันดับ 2",
      university: "มหาวิทยาลัยขอนแก่น",
      graduation: "จบการศึกษาในปี 2025",
      honorsTag: "เกียรตินิยมอันดับ 2",
    },
    experience: {
      title: "ประสบการณ์การทำงาน",
      subtitle: "ประสบการณ์ฝึกงานและสหกิจศึกษา",
      internshipBadge: "ฝึกงาน / สหกิจศึกษา",
      highlightLabel: "ความแม่นยำโมเดล Donut (ใบแจ้งหนี้)",
      highlightValue: "87% → 92%",
      stackLabel: "เทคโนโลยีที่ใช้",
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
      subtitle: "เทคโนโลยีหลักด้าน Software Engineering และเครื่องมือสนับสนุน",
      languages: "Languages",
      devframeworks: "Development Frameworks",
      dsaiframeworks: "Data Analysis & AI Frameworks",
      tools: "Tools & Platforms",
      learning: "Currently Learning",
    },
    projects: {
      title: "โปรเจกต์",
      subtitle: "ผลงานด้าน Web Engineering และ Applied AI",
      viewDetails: "ดูรายละเอียด",
      closeModal: "ปิดรายละเอียดโปรเจกต์",
      techStackLabel: "เทคโนโลยีที่ใช้",
      highlightsLabel: "รายละเอียดและบทบาทสำคัญ",
      linksLabel: "ลิงก์ที่เปิดเผยได้",
      noPublicLinks: "โปรเจกต์ภายในองค์กร — ไม่มีลิงก์โค้ดสาธารณะ",
      openGithub: "ดูบน GitHub",
      openHuggingFace: "ดูบน Hugging Face",
      categories: {
        fullstack: "Full Stack Web",
        backendWeb: "Web & Backend",
        aiMl: "Deep Learning / AI",
        dataAnalysis: "Data Analysis",
      },
      donutmodel:
        "Document Understanding Transformer (Donut model) สำหรับการประมวลผลฟอร์มและการวิเคราะห์ใบแจ้งหนี้ เป็นการ fine-tune โมเดล Donut model ที่พัฒนาขึ้นโดย NAVER AI Lab เพื่อดึงข้อมูลที่มีโครงสร้างจากเอกสารภาพ โดยใช้สถาปัตยกรรม transformer ในการประมวลผลภาพเอกสารและสร้างผลลัพธ์ออกมาในรูปแบบของ json",
      iotmeetingroomreservation:
        "IOT Meeting Room Reservation เป็นเว็บแอปพลิเคชันสำหรับการจองห้องประชุม โดยมีการแสดงผลข้อมูลการจองแบบ real-time รวมไปถึงการมีเสียงแจ้งเตือนจากอุปกรณ์ IOT เมื่อใกล้ครบระยะเวลาการประชุม สร้างด้วย React, ElysiaJS และ WebSockets",
      daikinthai:
        "สร้าง control panel สำหรับการทำ CRUD content บนหน้าเว็บไซต์ (รูปภาพ, ข้อความ, อื่นๆ) เพื่อที่จะให้ แอดมิน สามารถแก้ไขข้อมูลบางส่วนได้โดยที่ไม่ต้องพึ่งแผนก IT",
      asrmodel:
        "Automatic Speech Recognition for Thai (ASR model) คือ โมเดลการเรียนรู้เชิงลึกสำหรับการแปลงภาษาพูดเป็นข้อความภาษาไทย โดยใช้สถาปัตยกรรม transformer เพื่อประมวลผลสัญญาณเสียงและสร้างผลลัพธ์ โดยเป็นการ fine-tune Wav2Vec2 โมเดลที่พัฒนาขึ้นโดย Facebook AI Research (FAIR) เพื่อให้สามารถประมวลผลและแปลงเสียงพูดภาษาไทยได้",
      salarygrowth:
        "mini project การวิเคราะห์ข้อมูล โดยวิเคราะห์ข้อมูลจากความสัมพันธ์ต่างๆ ในชุดข้อมูล และมีการทำ visualization เพื่อวิเคราะห์แนวโน้มของเงินเดือน และจัดอันดับงานในสายงาน data science รวมถึงการทดลองใช้ model machine learning ในขั้นเบื้องต้น",
      highlights: {
        iotmeetingroomreservation: [
          "พัฒนาเว็บแอปพลิเคชันสำหรับการจองห้องประชุมพร้อมแสดงข้อมูลการจองแบบ real-time",
          "รองรับการแจ้งเตือนผ่านอุปกรณ์ IoT เมื่อใกล้ถึงเวลาการประชุม",
          "พัฒนาด้วย React, TypeScript, ElysiaJS, Ant Design, Oracle และ Socket.io",
        ],
        daikinthai: [
          "สร้าง control panel สำหรับจัดการเนื้อหาเว็บไซต์แบบ CRUD (รูปภาพ ข้อความ และข้อมูลอื่น ๆ)",
          "ช่วยให้แอดมินสามารถแก้ไขข้อมูลบนเว็บไซต์ได้เองโดยไม่ต้องพึ่งแผนก IT",
          "พัฒนาด้วย PHP, Laravel, Bootstrap และ MySQL",
        ],
        donutmodel: [
          "ปรับแต่ง (fine-tune) โมเดล Document Understanding Transformer (Donut) สำหรับสแกนเอกสารใบแจ้งหนี้",
          "เพิ่มค่าความแม่นยำในการสแกนใบแจ้งหนี้จาก 87% เป็น 92% ระหว่างการฝึกงาน Software Engineer",
          "ประมวลผลภาพเอกสารเป็นข้อมูลโครงสร้าง JSON ด้วย Python, PyTorch, Transformers, Hugging Face และ Wandb",
        ],
        asrmodel: [
          "ปรับแต่งโมเดล Wav2Vec2 ของ Facebook AI Research (FAIR) สำหรับการแปลงเสียงพูดภาษาไทยเป็นข้อความ",
          "พัฒนาด้วย Python, PyTorch, PyThaiNLP, Transformers และ Hugging Face",
          "เผยแพร่โค้ดบน GitHub และโมเดลบน Hugging Face",
        ],
        salarygrowth: [
          "วิเคราะห์ความสัมพันธ์ในชุดข้อมูลและสร้าง visualization เพื่อวิเคราะห์แนวโน้มเงินเดือนและจัดอันดับสายงาน Data Science",
          "ทดลองสร้างโมเดล Machine Learning ในขั้นเบื้องต้น",
          "พัฒนาด้วย Python, Pandas, NumPy, Scikit-learn, Matplotlib และ Seaborn",
        ],
      },
    },
    contact: {
      subtitle: "ขั้นตอนต่อไป",
      title: "ติดต่อผม",
      description:
        "ผมกำลังมองหาโอกาสใหม่ ๆ และกล่องข้อความของผมเปิดรับเสมอ ไม่ว่าคุณจะมีคำถาม ไอเดียโปรเจกต์ หรือแค่อยากทักทาย — ผมจะพยายามตอบกลับให้เร็วที่สุด!",
      button: "ส่งข้อความ",
      callMe: "โทรหาผม",
      emailLabel: "อีเมล",
      phoneLabel: "โทรศัพท์",
      copyEmail: "คัดลอกอีเมล",
      copied: "คัดลอกแล้ว",
    },
    footer: {
      builtBy: "Built by Wangprai Jullapech",
      backToTop: "กลับขึ้นด้านบน",
      role: "Software Engineer",
    },
    notFound: {
      code: "404",
      title: "ไม่พบหน้านี้",
      description: "ไม่พบเส้นทางที่คุณต้องการ หรือหน้านี้อาจถูกย้ายไปแล้ว",
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
