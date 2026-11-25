import type { ComponentType, SVGProps } from "react";
import { BrainCircuit, Code2, Database, Layers, Wrench } from "lucide-react";
import { FaDatabase, FaJava } from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGo,
  SiHuggingface,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  ElysiaIcon,
  GoFiberIcon,
  MatplotlibIcon,
  OracleIcon,
  SeabornIcon,
} from "./SkillIcons";

export type SkillIconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string }
>;

export interface Skill {
  /** Visible label (also the React key). */
  name: string;
  icon: SkillIconComponent;
  /** Brand color tuned for the dark / light themes. */
  color: { dark: string; light: string };
}

/** Keys of `t.skills` used for a category's card title and filter label. */
export type SkillTranslationKey =
  | "languages"
  | "devframeworks"
  | "tools"
  | "databases"
  | "dsaiframeworks";
export type SkillFilterKey =
  | "languages"
  | "filterFrameworks"
  | "filterTools"
  | "databases"
  | "filterDsai";

export interface SkillCategory {
  id: string;
  titleKey: SkillTranslationKey;
  filterKey: SkillFilterKey;
  icon: SkillIconComponent;
  /** Column span of the card in the "All" view (12-column grid). */
  colSpan: string;
  featured: boolean;
  accentBar: string;
  skills: Skill[];
}

const c = (dark: string, light = dark) => ({ dark, light });
// Brands that are black/white by design follow the theme's foreground color.
const MONO = c("#f4f1ff", "#1a1033");

/** Add or edit categories/skills here; the UI is fully data-driven. */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    titleKey: "languages",
    filterKey: "languages",
    icon: Code2,
    colSpan: "md:col-span-5",
    featured: true,
    accentBar: "from-primary via-violet-400 to-transparent",
    skills: [
      { name: "Python", icon: SiPython, color: c("#5ba3e0", "#3776ab") },
      { name: "JavaScript", icon: SiJavascript, color: c("#f7df1e", "#b89f00") },
      { name: "TypeScript", icon: SiTypescript, color: c("#4b9bec", "#3178c6") },
      { name: "Java (Basic)", icon: FaJava, color: c("#fdba74", "#d4650a") },
      { name: "PHP", icon: SiPhp, color: c("#8993be", "#5f6499") },
      { name: "SQL", icon: FaDatabase, color: c("#7dd3fc", "#0b7bb5") },
    ],
  },
  {
    id: "frameworks",
    titleKey: "devframeworks",
    filterKey: "filterFrameworks",
    icon: Layers,
    colSpan: "md:col-span-7",
    featured: true,
    accentBar: "from-accent via-primary to-sky-400/70",
    skills: [
      { name: "React", icon: SiReact, color: c("#61dafb", "#0a8fb5") },
      { name: "Next.js", icon: SiNextdotjs, color: MONO },
      { name: "Node.js", icon: SiNodedotjs, color: c("#6cc24a", "#3f8a2f") },
      { name: "Express.js", icon: SiExpress, color: MONO },
      { name: "Elysia.js (Bun)", icon: ElysiaIcon, color: c("#b69cff", "#7c3aed") },
      { name: "NestJS", icon: SiNestjs, color: c("#ea2845", "#d11a3c") },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: c("#38bdf8", "#0891b2") },
      { name: "FastAPI", icon: SiFastapi, color: c("#10b9a5", "#00796b") },
    ],
  },
  {
    id: "tools",
    titleKey: "tools",
    filterKey: "filterTools",
    icon: Wrench,
    colSpan: "md:col-span-6 lg:col-span-4",
    featured: false,
    accentBar: "from-primary/70 via-border to-transparent",
    skills: [
      { name: "Git", icon: SiGit, color: c("#f4623f", "#d7391a") },
      { name: "Docker", icon: SiDocker, color: c("#3ea5f5", "#1b7fc9") },
      { name: "Hugging Face", icon: SiHuggingface, color: c("#ffd21e", "#b88f00") },
      { name: "JWT", icon: SiJsonwebtokens, color: c("#e45cff", "#b012d6") },
    ],
  },
  {
    id: "databases",
    titleKey: "databases",
    filterKey: "databases",
    icon: Database,
    colSpan: "md:col-span-6 lg:col-span-4",
    featured: false,
    accentBar: "from-sky-400/70 via-primary/60 to-transparent",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: c("#6b94e8", "#336791") },
      { name: "Oracle", icon: OracleIcon, color: c("#f44336", "#c74634") },
      { name: "MongoDB", icon: SiMongodb, color: c("#4fb355", "#2f8a32") },
    ],
  },
  {
    id: "dsai",
    titleKey: "dsaiframeworks",
    filterKey: "filterDsai",
    icon: BrainCircuit,
    colSpan: "md:col-span-12 lg:col-span-4",
    featured: false,
    accentBar: "from-sky-400/70 via-primary/50 to-transparent",
    skills: [
      { name: "NumPy", icon: SiNumpy, color: c("#4dabcf", "#2b7da0") },
      { name: "Pandas", icon: SiPandas, color: c("#e9559f", "#150458") },
      { name: "Scikit-learn", icon: SiScikitlearn, color: c("#f7931e", "#d97706") },
      { name: "Matplotlib", icon: MatplotlibIcon, color: c("#5aa9d6", "#11557c") },
      { name: "Seaborn", icon: SeabornIcon, color: c("#7d9fd6", "#3a5a8c") },
      { name: "PyTorch", icon: SiPytorch, color: c("#ee4c2c", "#d6381a") },
    ],
  },
];

export const LEARNING_SKILLS: Skill[] = [
  { name: "Go", icon: SiGo, color: c("#29beb0", "#00849c") },
  { name: "Go-fiber", icon: GoFiberIcon, color: c("#00acd7", "#0086a8") },
];
