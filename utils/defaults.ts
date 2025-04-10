// components/resume/utils/defaults.ts
import type { ResumeData } from './types';

export const getEmptyResumeData = (): ResumeData => ({
  name: "Your Name",
  title: "Your Title",
  contact: { email: "", phone: "", location: "", linkedin: "", github: "", blogs: "" },
  summary: "Enter your professional summary here. Click to edit.",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  achievements: [],
});