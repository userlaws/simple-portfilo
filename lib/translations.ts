export const translations = {
  en: {
    // Navigation
    home: 'Home',
    projects: 'Projects',
    blog: 'Blog',
    portfolio: 'Portfolio',

    // Hero
    heroTitle: 'Building reliable software with Python/Java, SQL, and React.',
    heroSubtitle:
      'CS & InfoSec student (NYC). I ship APIs, schemas, and data tools with tests, telemetry, and runbooks.',
    viewMyProjects: 'View My Projects',
    downloadResume: 'Download Résumé',

    // Proof Strip
    cicd: 'CI/CD',
    cicdValue: '20+ deploys w/ checks',
    authProviders: 'Auth providers in prod',
    authProvidersValue: '2 (Google, Discord on NoteShare)',
    dbsShipped: 'Databases shipped',
    dbsShippedValue: 'PostgreSQL (Supabase)',
    ciPipelines: 'CI pipelines',
    ciPipelinesValue: 'GitHub Actions (lint/tests/build)',
    osMaintained: 'OS you maintain',
    osMaintainedValue: 'Arch Linux (home server)',
    dataIssues: 'Data issues flagged',
    dataIssuesValue: '100+',
    rollbacks: 'Rollbacks',
    rollbacksValue: '0 (last 90 days)',

    // What I Do
    whatIDo: 'What I do',
    backendAPIs: 'Backend APIs',
    backendAPIsDesc:
      'REST endpoints with auth, validation, and idempotent writes. I add tests, logs/metrics, and rate-limit/retry patterns so requests are safe and debuggable.\nSee: NoteShare API → schema + CI job.',
    dataQuality: 'Data Quality & Reporting',
    dataQualityDesc:
      'SQL queries and validators that catch issues early, plus a safe import runbook (backup → dry run → full import → reconcile) so changes are reversible.\nSee: Internship case study → HTML/SQL report + Python validator.',
    fullStack: 'Full-Stack (Next.js)',
    fullStackDesc:
      'React components, server actions, and type-safe APIs. CI/CD with GitHub Actions, guarded rollouts, and a small a11y checklist.\nSee: NoteShare UI → auth flow + API docs',

    // Work Page
    workTitle: 'Work',
    workSubtitle:
      'Projects and case studies showcasing backend APIs, data quality, and full-stack development.',
    memorableProjects: 'Memorable Projects',
    memorableProjectsSubtitle:
      'A collection of projects that showcase my journey as a developer, from Discord bots to full-stack applications.',
    caseStudies: 'Case Studies',
    viewProject: 'View Project',
    projectNoteShare: 'NoteShare',
    projectNoteShareDesc:
      'A small, production-style app with auth, REST endpoints, and a documented pipeline.',
    projectDataAssessment: 'Data Assessment Internship',
    projectDataAssessmentDesc:
      'HTML/SQL reports + a safe import runbook; a tiny Python validator to flag cohort/grad-year mismatches.',
    projectSecurityLabs: 'Security Labs',
    projectSecurityLabsDesc:
      'Selected security labs demonstrating network analysis, exploit validation, and cryptographic implementations.',

    // Blog Page
    blogTitle: 'Blog',
    blogSubtitle:
      'Technical blog posts on backend development, data quality, and reliability.',
    technicalNotes: 'Technical Notes',
    showingNotes: 'Showing',
    note: 'post',
    notePlural: 'posts',
    clearFilter: 'Clear filter',
    noNotesFound: 'No posts found in the selected category.',
    rateLimitingTitle: 'Rate limiting 101: token bucket in 25 lines',
    rateLimitingDesc:
      'A simple TypeScript implementation of token bucket rate limiting.',
    idempotentTitle: 'Idempotent POSTs: request keys + retries',
    idempotentDesc:
      'How to handle duplicate requests safely with idempotency keys.',
    schemaMigrationsTitle: 'Schema migrations: 5 guardrails I use',
    schemaMigrationsDesc:
      'Best practices for safe database schema changes in production.',
    importRunbooksTitle: 'How I write import runbooks',
    importRunbooksDesc:
      'A practical checklist for safe data imports and migrations.',

    // Resume Page
    resumeTitle: 'Résumé',
    resumeSubtitle: 'U.S. citizen (clearance-eligible) • FT Jan 2026',
    download: 'Download PDF',
    skills: 'Skills',
    languages: 'Languages',
    languagesValue: 'JavaScript, TypeScript, Python, Java, C#, SQL, HTML, CSS',
    technologies: 'Technologies',
    technologiesValue: 'Next.js, React, Node.js, Express, Tailwind CSS',
    tools: 'Tools',
    toolsValue:
      'Git, GitHub Actions, Docker, VS Code, Figma, Adobe Photoshop, Adobe Premiere',
    security: 'Security',
    focusAreasValue:
      'SSH, Metasploit, tcpdump, OpenSSL, Network Hardening, OAuth, MFA, Row Level Security',
    experience: 'Experience',
    education: 'Education',
    educationDegree:
      'Bachelor of Science in Computer Science & Information Security',
    educationInstitution: 'John Jay College of Criminal Justice',
    educationLocation: 'Manhattan, NY',
    educationDetails: 'June 2023 – Dec 2025 • GPA: 3.0/4.0',
    experience1Title: 'IT Help Desk Technician',
    experience1Company: 'Guttman Community College',
    experience1Duration: 'Nov 2022 – Current',
    experience1Desc:
      'Resolve more than forty hardware software and network tickets each week achieving a first call resolution rate of ninety five percent. Image and deploy over two hundred Windows laptops and computers using SCCM.',

    experience2Title: 'IT Help Desk Intern',
    experience2Company: 'Progress Technology Solutions, Inc',
    experience2Duration: 'June 2023 – Aug 2023',
    experience2Desc:
      'Conducted comprehensive review of Office 365 and administered portal functionalities. Successfully obtained certification within a one-week timeframe and set up a server using Ubuntu OS.',

    project1Name: 'Gift Whisper',
    project1Type: 'Anonymous gift exchange platform',
    project1Desc:
      'Anonymous gift-exchange web platform that lets friends and family create private groups, build wishlists, claim gifts, and track participation while keeping givers secret until the reveal.',

    project2Name: 'NoteShare',
    project2Type: 'Collaborative study hub',
    project2Desc:
      'Collaborative study hub where students upload lecture notes and study guides, discover resources through intelligent search and tagging, and discuss material in real-time community threads.',

    // Personal Information
    personalInfo: 'Personal Information',
    personalName: 'Imanol Aracena',
    personalTitle: 'Computer Science & Information Security Student',
    personalLocation: 'New York, NY 10022',
    personalEmail: 'imanol.aracena@jjay.cuny.edu',
    personalPhone: '718-414-5770',
    personalLinkedIn: 'linkedin.com/in/imanolaracena',
    personalGithub: 'github.com/userlaws',

    // Metrics Section
    performanceMetrics: 'Performance Metrics',
    performanceMetricsDesc:
      'Key performance indicators from my work in IT support, development, and infrastructure management.',
    metricsVerified:
      'All metrics verified and current as of latest reporting period',

    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    close: 'Close',
    open: 'Open',
    next: 'Next',
    previous: 'Previous',
    more: 'More',
    less: 'Less',
  },
  es: {
    // Navigation
    home: 'Inicio',
    projects: 'Proyectos',
    blog: 'Blog',
    portfolio: 'Portafolio',

    // Hero
    heroTitle: 'Construyendo software confiable con Python/Java, SQL y React.',
    heroSubtitle:
      'Estudiante de CS e InfoSec (NYC). Desarrollo APIs, esquemas y herramientas de datos con pruebas, telemetría y manuales.',
    viewMyProjects: 'Ver Mis Proyectos',
    downloadResume: 'Descargar Currículum',

    // Proof Strip
    cicd: 'CI/CD',
    cicdValue: '20+ despliegues con verificaciones',
    authProviders: 'Proveedores de autenticación en producción',
    authProvidersValue: '2 (Google, Discord en NoteShare)',
    dbsShipped: 'Bases de datos desplegadas',
    dbsShippedValue: 'PostgreSQL (Supabase)',
    ciPipelines: 'Pipelines de CI',
    ciPipelinesValue: 'GitHub Actions (lint/tests/build)',
    osMaintained: 'SO que mantienes',
    osMaintainedValue: 'Arch Linux (servidor doméstico)',
    dataIssues: 'Problemas de datos detectados',
    dataIssuesValue: '100+',
    rollbacks: 'Reversiones',
    rollbacksValue: '0 (últimos 90 días)',

    // What I Do
    whatIDo: 'Lo que hago',
    backendAPIs: 'APIs Backend',
    backendAPIsDesc:
      'Endpoints REST con autenticación, validación y escrituras idempotentes. Agrego pruebas, logs/métricas y patrones de límite de velocidad/reintento para que las solicitudes sean seguras y depurables.\nVer: API de NoteShare → esquema + trabajo CI.',
    dataQuality: 'Calidad de Datos e Informes',
    dataQualityDesc:
      'Consultas SQL y validadores que detectan problemas temprano, más un manual de importación seguro (respaldo → ejecución en seco → importación completa → conciliación) para que los cambios sean reversibles.\nVer: Estudio de caso de pasantía → informe HTML/SQL + validador Python.',
    fullStack: 'Full-Stack (Next.js)',
    fullStackDesc:
      'Componentes React, acciones del servidor y APIs con tipos seguros. CI/CD con GitHub Actions, despliegues protegidos y una pequeña lista de verificación de accesibilidad.\nVer: UI de NoteShare → flujo de autenticación + documentación de API',

    // Work Page
    workTitle: 'Trabajo',
    workSubtitle:
      'Proyectos y estudios de caso que muestran APIs backend, calidad de datos y desarrollo full-stack.',
    memorableProjects: 'Proyectos Memorables',
    memorableProjectsSubtitle:
      'Una colección de proyectos que muestran mi viaje como desarrollador, desde bots de Discord hasta aplicaciones full-stack.',
    caseStudies: 'Estudios de Caso',
    viewProject: 'Ver Proyecto',
    projectNoteShare: 'NoteShare',
    projectNoteShareDesc:
      'Una aplicación pequeña estilo producción con autenticación, endpoints REST y una canalización documentada.',
    projectDataAssessment: 'Pasantía de Evaluación de Datos',
    projectDataAssessmentDesc:
      'Informes HTML/SQL + un manual de importación seguro; un pequeño validador Python para detectar discrepancias de cohorte/año de graduación.',
    projectSecurityLabs: 'Laboratorios de Seguridad',
    projectSecurityLabsDesc:
      'Laboratorios de seguridad seleccionados que demuestran análisis de red, validación de exploits e implementaciones criptográficas.',

    // Blog Page
    blogTitle: 'Blog',
    blogSubtitle:
      'Publicaciones técnicas sobre desarrollo backend, calidad de datos y confiabilidad.',
    technicalNotes: 'Notas Técnicas',
    showingNotes: 'Mostrando',
    note: 'publicación',
    notePlural: 'publicaciones',
    clearFilter: 'Limpiar filtro',
    noNotesFound: 'No se encontraron publicaciones en la categoría seleccionada.',
    rateLimitingTitle: 'Limitación de velocidad 101: token bucket en 25 líneas',
    rateLimitingDesc:
      'Una implementación simple en TypeScript de limitación de velocidad con token bucket.',
    idempotentTitle: 'POSTs idempotentes: claves de solicitud + reintentos',
    idempotentDesc:
      'Cómo manejar solicitudes duplicadas de forma segura con claves de idempotencia.',
    schemaMigrationsTitle:
      'Migraciones de esquema: 5 barreras de protección que uso',
    schemaMigrationsDesc:
      'Mejores prácticas para cambios seguros de esquema de base de datos en producción.',
    importRunbooksTitle: 'Cómo escribo manuales de importación',
    importRunbooksDesc:
      'Una lista de verificación práctica para importaciones y migraciones de datos seguras.',

    // Resume Page
    resumeTitle: 'Currículum',
    resumeSubtitle:
      'Ciudadano estadounidense (elegible para autorización) • Tiempo completo enero 2026',
    download: 'Descargar PDF',
    skills: 'Habilidades',
    languages: 'Lenguajes',
    languagesValue: 'JavaScript, TypeScript, Python, Java, C#, SQL, HTML, CSS',
    technologies: 'Tecnologías',
    technologiesValue: 'Next.js, React, Node.js, Express, Tailwind CSS',
    tools: 'Herramientas',
    toolsValue:
      'Git, GitHub Actions, Docker, VS Code, Figma, Adobe Photoshop, Adobe Premiere',
    security: 'Seguridad',
    focusAreasValue:
      'SSH, Metasploit, tcpdump, OpenSSL, Endurecimiento de Red, OAuth, MFA, Seguridad a Nivel de Fila',
    experience: 'Experiencia',
    education: 'Educación',
    educationDegree:
      'Licenciatura en Ciencias de la Computación y Seguridad de la Información',
    educationInstitution: 'John Jay College of Criminal Justice',
    educationLocation: 'Manhattan, NY',
    educationDetails: 'Junio 2023 – Dic 2025 • GPA: 3.0/4.0',

    experience1Title: 'Técnico de Mesa de Ayuda de TI',
    experience1Company: 'Guttman Community College',
    experience1Duration: 'Nov 2022 – Actual',
    experience1Desc:
      'Resuelvo más de cuarenta tickets de hardware, software y red cada semana logrando una tasa de resolución en primera llamada del noventa y cinco por ciento. Imagen y despliego más de doscientos laptops y computadoras Windows usando SCCM.',

    experience2Title: 'Pasante de Mesa de Ayuda de TI',
    experience2Company: 'Progress Technology Solutions, Inc',
    experience2Duration: 'Junio 2023 – Ago 2023',
    experience2Desc:
      'Realicé una revisión integral de Office 365 y administré funcionalidades del portal. Obtuve exitosamente la certificación en un plazo de una semana y configuré un servidor usando Ubuntu OS.',

    project1Name: 'Gift Whisper',
    project1Type: 'Plataforma de intercambio de regalos anónima',
    project1Desc:
      'Plataforma web de intercambio de regalos anónima que permite a amigos y familiares crear grupos privados, construir listas de deseos, reclamar regalos y rastrear participación mientras mantiene a los donantes en secreto hasta la revelación.',

    project2Name: 'NoteShare',
    project2Type: 'Centro de estudio colaborativo',
    project2Desc:
      'Centro de estudio colaborativo donde los estudiantes suben notas de conferencias y guías de estudio, descubren recursos a través de búsqueda inteligente y etiquetado, y discuten material en hilos de comunidad en tiempo real.',

    // Personal Information
    personalInfo: 'Información Personal',
    personalName: 'Imanol Aracena',
    personalTitle:
      'Estudiante de Ciencias de la Computación y Seguridad de la Información',
    personalLocation: 'Nueva York, NY 10022',
    personalEmail: 'imanol.aracena@jjay.cuny.edu',
    personalPhone: '718-414-5770',
    personalLinkedIn: 'linkedin.com/in/imanolaracena',
    personalGithub: 'github.com/userlaws',

    // Metrics Section
    performanceMetrics: 'Métricas de Rendimiento',
    performanceMetricsDesc:
      'Indicadores clave de rendimiento de mi trabajo en soporte de TI, desarrollo y gestión de infraestructura.',
    metricsVerified:
      'Todas las métricas verificadas y actuales al último período de reporte',

    // Common
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    close: 'Cerrar',
    open: 'Abrir',
    next: 'Siguiente',
    previous: 'Anterior',
    more: 'Más',
    less: 'Menos',
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
