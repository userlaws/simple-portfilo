/**
 * Resume Parser Script
 * This script helps extract and structure resume data for the translation system
 */

// Sample resume data structure - replace with your actual resume content
const resumeData = {
  personalInfo: {
    name: 'Your Name',
    title: 'Backend & Full-Stack Engineer',
    location: 'NYC',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/yourprofile',
    github: 'github.com/yourusername',
  },

  summary:
    'Building reliable software with Python/Java, SQL, and React. CS & InfoSec student available FT Jan 2026.',

  skills: {
    languages: ['Python', 'Java', 'TypeScript', 'SQL', 'JavaScript'],
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Express',
      'Docker',
    ],
    tools: ['Git', 'Docker', 'CI/CD', 'Linux', 'AWS', 'Vercel'],
    focusAreas: [
      'Backend APIs',
      'Data Quality',
      'Security',
      'Full-Stack Development',
    ],
  },

  experience: [
    {
      title: 'Data Assessment Intern',
      company: 'PowerSchool',
      location: 'Remote',
      duration: 'Summer 2024',
      description:
        'HTML/SQL reports + a safe import runbook; a tiny Python validator to flag cohort/grad-year mismatches.',
      achievements: [
        'Developed automated data validation scripts',
        'Created comprehensive import runbooks',
        'Identified and resolved data quality issues',
      ],
    },
  ],

  projects: [
    {
      name: 'NoteShare',
      type: 'Full-stack note-taking application',
      description:
        'REST APIs, auth, Postgres schema, and CI/CD with guardrails. Small app, production habits.',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
      link: '/work/noteshare',
    },
    {
      name: 'Security Labs',
      type: 'Network security and cryptography',
      description:
        'Telnet vs SSH analysis, Metasploit validation, AES encryption modes comparison.',
      technologies: ['Metasploit', 'tcpdump', 'AES', 'Network Analysis'],
      link: '/work/security-labs',
    },
  ],

  education: {
    degree: 'Bachelor of Science in Computer Science & Information Security',
    institution: 'Your University',
    location: 'NYC',
    graduationDate: 'Expected December 2025',
    gpa: '3.8/4.0',
    relevantCourses: [
      'Data Structures & Algorithms',
      'Database Systems',
      'Network Security',
      'Software Engineering',
    ],
  },

  certifications: [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2024',
    },
  ],

  achievements: [
    '20+ successful deployments with zero rollbacks',
    '100+ data quality issues identified and resolved',
    '0 rollbacks in last 90 days',
  ],
};

// Function to generate translation keys
function generateTranslationKeys(data) {
  const translations = {
    en: {},
    es: {},
  };

  // Personal Info
  translations.en.personalName = data.personalInfo.name;
  translations.es.personalName = data.personalInfo.name; // Names usually don't translate

  translations.en.personalTitle = data.personalInfo.title;
  translations.es.personalTitle = 'Ingeniero Backend y Full-Stack';

  translations.en.personalLocation = data.personalInfo.location;
  translations.es.personalLocation = data.personalInfo.location;

  // Summary
  translations.en.heroTitle = data.summary;
  translations.es.heroTitle =
    'Construyendo software confiable con Python/Java, SQL y React. Estudiante de CS e InfoSec disponible FT enero 2026.';

  // Skills
  translations.en.languages = data.skills.languages.join(', ');
  translations.es.languages = data.skills.languages.join(', ');

  translations.en.technologies = data.skills.technologies.join(', ');
  translations.es.technologies = data.skills.technologies.join(', ');

  translations.en.tools = data.skills.tools.join(', ');
  translations.es.tools = data.skills.tools.join(', ');

  translations.en.focusAreas = data.skills.focusAreas.join(', ');
  translations.es.focusAreas =
    'APIs Backend, Calidad de Datos, Seguridad, Desarrollo Full-Stack';

  // Experience
  data.experience.forEach((exp, index) => {
    const key = `experience${index + 1}`;
    translations.en[`${key}Title`] = exp.title;
    translations.es[`${key}Title`] = exp.title; // Job titles often stay the same

    translations.en[`${key}Company`] = exp.company;
    translations.es[`${key}Company`] = exp.company;

    translations.en[`${key}Duration`] = exp.duration;
    translations.es[`${key}Duration`] = exp.duration;

    translations.en[`${key}Description`] = exp.description;
    translations.es[
      `${key}Description`
    ] = `Informes HTML/SQL + un manual de importación seguro; un pequeño validador Python para detectar discrepancias de cohorte/año de graduación.`;
  });

  // Projects
  data.projects.forEach((project, index) => {
    const key = `project${index + 1}`;
    translations.en[`${key}Name`] = project.name;
    translations.es[`${key}Name`] = project.name;

    translations.en[`${key}Type`] = project.type;
    translations.es[`${key}Type`] = project.type;

    translations.en[`${key}Description`] = project.description;
    translations.es[`${key}Description`] = project.description;
  });

  // Education
  translations.en.educationDegree = data.education.degree;
  translations.es.educationDegree =
    'Licenciatura en Ciencias de la Computación y Seguridad de la Información';

  translations.en.educationInstitution = data.education.institution;
  translations.es.educationInstitution = data.education.institution;

  translations.en.educationLocation = data.education.location;
  translations.es.educationLocation = data.education.location;

  translations.en.educationGraduation = data.education.graduationDate;
  translations.es.educationGraduation = 'Esperado diciembre 2025';

  return translations;
}

// Generate the translation data
const translationData = generateTranslationKeys(resumeData);

// Output the results
console.log('=== TRANSLATION KEYS TO ADD ===');
console.log(JSON.stringify(translationData, null, 2));

console.log('\n=== INSTRUCTIONS ===');
console.log('1. Copy the translation keys above');
console.log('2. Add them to lib/translations.ts');
console.log('3. Update your resume page to use these keys');
console.log('4. Test the translations by switching languages');

module.exports = { resumeData, translationData };
