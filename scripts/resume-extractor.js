/**
 * Resume Data Extractor
 * This script helps you extract and structure your resume data
 * Replace the sample data with your actual resume information
 */

const fs = require('fs');
const path = require('path');

// Imanol Aracena's Resume Data
const yourResumeData = {
  personalInfo: {
    name: 'Imanol Aracena',
    title: 'Computer Science & Information Security Student',
    location: 'New York, NY 10022',
    email: 'imanol.aracena@jjay.cuny.edu',
    phone: '718-414-5770',
    linkedin: 'linkedin.com/in/imanolaracena',
    github: 'github.com/userlaws',
    website: 'imanol-aracena.dev',
  },

  summary:
    'Computer Science & Information Security student with hands-on experience in full-stack development, IT support, and cybersecurity. Building reliable software with modern technologies and maintaining 99.9% uptime systems.',

  skills: {
    languages: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C#',
      'SQL',
      'HTML',
      'CSS',
    ],
    frameworks: ['Next.js', 'React', 'Node.js', 'Express', 'Tailwind CSS'],
    databases: ['PostgreSQL', 'MySQL', 'Supabase', 'Prisma ORM'],
    tools: [
      'Git',
      'GitHub Actions',
      'Docker',
      'VS Code',
      'Figma',
      'Adobe Photoshop',
      'Adobe Premiere',
    ],
    cloud: ['AWS EC2', 'AWS S3', 'Vercel', 'Ubuntu Server'],
    security: [
      'SSH',
      'Metasploit',
      'tcpdump',
      'OpenSSL',
      'Network Hardening',
      'OAuth',
      'MFA',
      'Row Level Security',
    ],
    operatingSystems: ['Arch Linux', 'Ubuntu Server', 'Windows', 'macOS'],
  },

  experience: [
    {
      title: 'IT Help Desk Technician',
      company: 'Guttman Community College',
      location: 'New York, NY',
      duration: 'Nov 2022 – Current',
      description:
        'Resolve more than forty hardware software and network tickets each week achieving a first call resolution rate of ninety five percent. Image and deploy over two hundred Windows laptops and computers using SCCM.',
      achievements: [
        '95% first call resolution rate for 40+ tickets weekly',
        'Deployed 200+ Windows laptops using SCCM',
        'Maintained classroom technology and equipment',
        'Monitored spam/phishing emails for security',
        'Supported ID card printing and equipment requests',
      ],
      technologies: ['SCCM', 'Windows', 'Network Security', 'Hardware Support'],
    },
    {
      title: 'IT Help Desk Intern',
      company: 'Progress Technology Solutions, Inc',
      location: 'New York, NY',
      duration: 'June 2023 – Aug 2023',
      description:
        'Conducted comprehensive review of Office 365 and administered portal functionalities. Successfully obtained certification within a one-week timeframe and set up a server using Ubuntu OS.',
      achievements: [
        'Completed certification within one week',
        'Set up Ubuntu server on virtual machine',
        'Developed user-friendly local database website',
        'Implemented self-registration features',
        'Administered Office 365 portal functionalities',
      ],
      technologies: [
        'Office 365',
        'Ubuntu',
        'Database Management',
        'Web Development',
      ],
    },
  ],

  projects: [
    {
      name: 'Gift Whisper',
      type: 'Anonymous gift exchange platform',
      description:
        'Anonymous gift-exchange web platform that lets friends and family create private groups, build wishlists, claim gifts, and track participation while keeping givers secret until the reveal.',
      technologies: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'Prisma ORM',
        'PostgreSQL',
      ],
      link: 'https://github.com/userlaws/gift-whisper',
      features: [
        'Anonymous gift exchange system',
        'Private group management',
        'Wishlist creation and claiming',
        'Encrypted session management',
        'Invite-code workflow',
      ],
      duration: 'May 2025 – July 2025',
    },
    {
      name: 'NoteShare',
      type: 'Collaborative study hub',
      description:
        'Collaborative study hub where students upload lecture notes and study guides, discover resources through intelligent search and tagging, and discuss material in real-time community threads.',
      technologies: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Supabase',
        'PostgreSQL',
        'Google OAuth',
        'Discord OAuth',
        'Vercel',
        'GitHub Actions',
      ],
      link: 'https://github.com/userlaws/noteshare',
      features: [
        'Document upload and management',
        'Intelligent search and tagging',
        'Real-time community discussions',
        'Google and Discord OAuth',
        'Role-based access control',
        '99.9% uptime with CI/CD',
      ],
      duration: 'Mar 2025 – Current',
    },
  ],

  education: {
    degree: 'Bachelor of Science in Computer Science & Information Security',
    institution: 'John Jay College of Criminal Justice',
    location: 'Manhattan, NY',
    graduationDate: 'June 2023 – Dec 2025',
    gpa: '3.0/4.0',
    relevantCourses: [
      'Computer Architecture',
      'Cryptography and Cryptanalysis',
      'Advanced Data Structures',
      'Operating Systems',
      'Computer Algorithms',
      'Computer Networks',
      'Network Security and Forensics',
    ],
    honors: ["Dean's List - 2023", 'Certified - JumpCloud 2023'],
  },

  previousEducation: {
    degree: 'Associates of Science Information Technology',
    institution: 'Guttman Community College',
    location: 'Manhattan, NY',
    graduationDate: 'Aug 2021 – June 2023',
    relevantCourses: [
      'Hardware & Software',
      'Networking & Data Communications',
      'Database Management & Design',
      'Introduction to Management Information Systems',
      'Programming I & II',
      'Web Technologies & Multimedia',
      'Systems Analysis & Design',
    ],
    honors: ["Dean's List - 2023", 'Certified - JumpCloud 2023'],
  },

  certifications: [
    {
      name: 'JumpCloud Certification',
      issuer: 'JumpCloud',
      date: '2023',
    },
  ],

  achievements: [
    '95% first call resolution rate for IT support tickets',
    'Deployed 200+ Windows laptops using SCCM',
    'Built responsive web applications with 99.9% uptime',
    'Completed certification within one week timeframe',
    'Developed secure authentication systems with OAuth',
  ],

  languages: [
    {
      language: 'English',
      proficiency: 'Native',
    },
    {
      language: 'Spanish',
      proficiency: 'Fluent',
    },
  ],
};

// Function to generate translation keys from resume data
function generateResumeTranslations(data) {
  const translations = {
    en: {},
    es: {},
  };

  // Personal Information
  translations.en.personalName = data.personalInfo.name;
  translations.es.personalName = data.personalInfo.name;

  translations.en.personalTitle = data.personalInfo.title;
  translations.es.personalTitle = 'Ingeniero Backend y Full-Stack';

  translations.en.personalLocation = data.personalInfo.location;
  translations.es.personalLocation = data.personalInfo.location;

  translations.en.personalEmail = data.personalInfo.email;
  translations.es.personalEmail = data.personalInfo.email;

  translations.en.personalPhone = data.personalInfo.phone;
  translations.es.personalPhone = data.personalInfo.phone;

  translations.en.personalLinkedIn = data.personalInfo.linkedin;
  translations.es.personalLinkedIn = data.personalInfo.linkedin;

  translations.en.personalGithub = data.personalInfo.github;
  translations.es.personalGithub = data.personalInfo.github;

  // Summary
  translations.en.heroTitle = data.summary;
  translations.es.heroTitle =
    'Construyendo software confiable con Python/Java, SQL y React. Estudiante de CS e InfoSec disponible FT enero 2026.';

  // Skills
  translations.en.languagesValue = data.skills.languages.join(', ');
  translations.es.languagesValue = data.skills.languages.join(', ');

  translations.en.technologiesValue = data.skills.frameworks.join(', ');
  translations.es.technologiesValue = data.skills.frameworks.join(', ');

  translations.en.toolsValue = data.skills.tools.join(', ');
  translations.es.toolsValue = data.skills.tools.join(', ');

  translations.en.focusAreasValue = data.skills.security.join(', ');
  translations.es.focusAreasValue =
    'SSH, Metasploit, tcpdump, OpenSSL, Endurecimiento de Red, OAuth, MFA, Seguridad a Nivel de Fila';

  // Experience
  data.experience.forEach((exp, index) => {
    const key = `experience${index + 1}`;
    translations.en[`${key}Title`] = exp.title;
    translations.es[`${key}Title`] = exp.title;

    translations.en[`${key}Company`] = exp.company;
    translations.es[`${key}Company`] = exp.company;

    translations.en[`${key}Duration`] = exp.duration;
    translations.es[`${key}Duration`] = exp.duration;

    translations.en[`${key}Description`] = exp.description;
    translations.es[`${key}Description`] = exp.description;
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

// Generate translations
const resumeTranslations = generateResumeTranslations(yourResumeData);

// Output the results
console.log('=== RESUME TRANSLATION DATA ===');
console.log(JSON.stringify(resumeTranslations, null, 2));

console.log('\n=== INSTRUCTIONS ===');
console.log(
  '1. Replace the sample data above with your actual resume information'
);
console.log('2. Copy the generated translation keys');
console.log('3. Add them to lib/translations.ts');
console.log('4. Update your resume page to use these keys');
console.log('5. Test the translations by switching languages');

// Save to file
const outputPath = path.join(__dirname, 'resume-translations.json');
fs.writeFileSync(outputPath, JSON.stringify(resumeTranslations, null, 2));
console.log(`\nTranslation data saved to: ${outputPath}`);

module.exports = { yourResumeData, resumeTranslations };
