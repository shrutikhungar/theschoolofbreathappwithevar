// useCourseAccess.ts

import { useEffect, useState } from 'react';

import { Course } from '../data/courses';
import { combinedAccessRules, fullAccessTags, limitedAccessRules } from '../data/accessRules';


export const useCourseAccess = (userTags: string[], courses: Course[]) => {
  const [accessibleCourses, setAccessibleCourses] = useState<string[]>([]);

  useEffect(() => {
    if (userTags.length > 0) {
      let accessible = new Set<string>();

      // Check for full access
      if (userTags.some(tag => fullAccessTags.includes(tag))) {
        courses.forEach(course => accessible.add(course.id));
      } else {
        // Check limited access rules
        userTags.forEach(tag => {
          if (limitedAccessRules[tag]) {
            limitedAccessRules[tag].forEach(courseId => accessible.add(courseId));
          }
        });

        // Check combined access rules
        combinedAccessRules.forEach(rule => {
          if (rule.tags.every(tag => userTags.includes(tag))) {
            rule.courses.forEach(courseId => accessible.add(courseId));
          }
        });
      }

      setAccessibleCourses(Array.from(accessible));
    }
  }, [userTags, courses]);

  return accessibleCourses;
};
