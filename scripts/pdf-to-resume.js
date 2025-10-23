/**
 * PDF Resume Parser
 * This script helps you extract text from your PDF resume
 * and structure it for the translation system
 */

const fs = require('fs');
const path = require('path');

// Instructions for manual PDF text extraction
console.log('=== PDF RESUME PARSING INSTRUCTIONS ===');
console.log('');
console.log(
  "Since we can't directly parse PDF files, here's how to extract your resume data:"
);
console.log('');
console.log('1. OPEN YOUR PDF RESUME');
console.log('   - Open your Resume.pdf file');
console.log('   - Copy all the text content');
console.log('');
console.log('2. STRUCTURE THE DATA');
console.log('   - Organize the content into sections:');
console.log('     • Personal Information (name, contact, location)');
console.log('     • Professional Summary');
console.log('     • Skills (languages, technologies, tools)');
console.log('     • Work Experience (title, company, dates, description)');
console.log('     • Projects (name, description, technologies)');
console.log('     • Education (degree, institution, dates)');
console.log('     • Certifications (if any)');
console.log('     • Achievements (if any)');
console.log('');
console.log('3. UPDATE THE RESUME EXTRACTOR');
console.log('   - Open scripts/resume-extractor.js');
console.log('   - Replace the sample data with your actual information');
console.log('   - Run: node scripts/resume-extractor.js');
console.log('');
console.log('4. INTEGRATE THE TRANSLATIONS');
console.log('   - Copy the generated translation keys');
console.log('   - Add them to lib/translations.ts');
console.log('   - Update your resume page to use the keys');
console.log('');
console.log('=== SAMPLE RESUME STRUCTURE ===');
console.log('');

// Sample structure for reference
const sampleStructure = {
  personalInfo: {
    name: 'John Doe',
    title: 'Backend & Full-Stack Engineer',
    location: 'New York, NY',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  },

  summary:
    'Experienced software engineer with 3+ years building scalable web applications...',

  skills: {
    languages: ['Python', 'Java', 'TypeScript', 'SQL'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express'],
    tools: ['Git', 'Docker', 'AWS', 'Linux'],
  },

  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      location: 'New York, NY',
      duration: '2022 - Present',
      description: 'Led development of microservices architecture...',
      achievements: [
        'Improved system performance by 40%',
        'Reduced deployment time by 60%',
      ],
    },
  ],

  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration...',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    },
  ],

  education: {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University Name',
    location: 'City, State',
    graduationDate: '2020',
    gpa: '3.8/4.0',
  },
};

console.log('Sample structure:');
console.log(JSON.stringify(sampleStructure, null, 2));

console.log('');
console.log('=== QUICK START GUIDE ===');
console.log('');
console.log('1. Copy your resume text from the PDF');
console.log('2. Open scripts/resume-extractor.js');
console.log('3. Replace the sample data with your information');
console.log('4. Run: node scripts/resume-extractor.js');
console.log('5. Copy the generated translations to lib/translations.ts');
console.log('6. Update your resume page to use the translation keys');
console.log('');
console.log(
  'Your resume will then be fully integrated with the translation system! 🎉'
);

module.exports = { sampleStructure };
