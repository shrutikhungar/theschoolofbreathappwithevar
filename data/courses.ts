// courses.ts

import { Course } from "../models/courses";
import { BLISS_COURSE } from "./courses/blissCourse";
import { BREATH_WORK_COURSE } from "./courses/breathWork";
import { MEDITATION_COURSE } from "./courses/meditation";
import { SLEEP_COURSE } from "./courses/sleep";
import { SWARA_COURSE } from "./courses/swara";


  
  export const courses: Course[] = [
    BREATH_WORK_COURSE,
    MEDITATION_COURSE,
    BLISS_COURSE,
    SWARA_COURSE ,
    SLEEP_COURSE
    
  ];
  
  export const pastelColors = [
    '#d7edf1', // Light blue
    '#E8F5E9', // Light green
    '#fff1df', // Light orange
    '#e2d3d3', // Light orange
  ];
  