import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDescription(description: string) {
  const sections = [
    { title: 'Objective', content: '' },
    { title: 'Requirements', content: '' },
    { title: 'Acceptance Criteria', content: '' },
    { title: 'Testing Requirement', content: '' },
    { title: 'Documentation Update', content: '' },
    { title: '+Documentation+', content: '' },

  ];

  let currentSection = '';
  const lines = description.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    const sectionMatch = sections.find(section =>
      trimmedLine.toLowerCase() === section.title.toLowerCase() ||
      trimmedLine.toLowerCase() === `+${section.title.toLowerCase()}+`
    );

    if (sectionMatch) {
      currentSection = sectionMatch.title;
    } else if (currentSection) {
      const section = sections.find(s => s.title === currentSection);
      if (section) {
        section.content += line + '\n';
      }
    }
  }

  return sections.filter(section => section.content.trim() !== '');
}
