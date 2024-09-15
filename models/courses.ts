import { courseThemes } from "../styles/coursesDetails.styles";

export type Review = {
    id: string;
    reviewer: string;
    rating: number;
    text: string;
  };
  
  export type Author = {
    name: string;
    bio: string;
    profileImage: any;
  };
  export type Lesson = {
    id: string;
    title: string;
    videoUrl: string;
    isFromYoutube?:boolean;
    type?:'video' | 'file';
    file?:string;
  };
  
  export type Subsection = {
    title: string;
    lessons: Lesson[];
  };
  
  export type Section = {
    section: string;
    subsections?: Subsection[]; // Subsections are optional
    lessons?: Lesson[]; // Lessons are also optional for simpler courses
    resources?: { id: string; title: string; url: string }[]; 
  };
  
  export type Course = {
    id: string;
    title: string;
    description: string;
    image: any;
    type: string;
    days: string;
    time: string;
    sections?: Section[]; // Sections are optional
    lessons?: Section[]; // For simpler courses without sections
    reviews: Review[];
    author: Author;
    courseTheme?: keyof typeof courseThemes;
  };