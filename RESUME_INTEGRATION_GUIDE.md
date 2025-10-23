# Resume Integration Guide

## 🎯 How to Add Your Resume Data

This guide shows you how to integrate your actual resume data into the translation system.

## 📋 Step 1: Update Your Resume Data

### Edit the Resume Extractor Script

Open `scripts/resume-extractor.js` and replace the sample data with your actual information:

```javascript
const yourResumeData = {
  personalInfo: {
    name: 'Your Actual Name', // Replace with your name
    title: 'Your Actual Title', // Replace with your title
    location: 'Your City, State', // Replace with your location
    email: 'your.actual.email@example.com', // Replace with your email
    phone: '+1 (555) 123-4567', // Replace with your phone
    linkedin: 'linkedin.com/in/yourprofile', // Replace with your LinkedIn
    github: 'github.com/yourusername', // Replace with your GitHub
    website: 'yourwebsite.com', // Replace with your website
  },

  summary: 'Your actual professional summary here...',

  skills: {
    languages: ['Python', 'Java', 'TypeScript', 'SQL'], // Your actual languages
    frameworks: ['React', 'Next.js', 'Node.js'], // Your actual frameworks
    databases: ['PostgreSQL', 'MySQL'], // Your actual databases
    tools: ['Git', 'Docker', 'AWS'], // Your actual tools
    methodologies: ['CI/CD', 'Agile', 'Scrum'], // Your actual methodologies
  },

  experience: [
    {
      title: 'Your Job Title',
      company: 'Your Company',
      location: 'City, State',
      duration: 'Start Date - End Date',
      description: 'Your job description...',
      achievements: ['Achievement 1', 'Achievement 2'],
      technologies: ['Technology 1', 'Technology 2'],
    },
    // Add more experience entries
  ],

  projects: [
    {
      name: 'Your Project Name',
      type: 'Project type',
      description: 'Project description...',
      technologies: ['Tech 1', 'Tech 2'],
      link: 'https://github.com/yourusername/project',
      features: ['Feature 1', 'Feature 2'],
    },
    // Add more projects
  ],

  education: {
    degree: 'Your Degree',
    institution: 'Your University',
    location: 'City, State',
    graduationDate: 'Expected Month Year',
    gpa: '3.8/4.0', // Your actual GPA
    relevantCourses: ['Course 1', 'Course 2'],
    honors: ['Honor 1', 'Honor 2'],
  },

  certifications: [
    {
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      date: 'Year',
      credentialId: 'ID-123456',
    },
    // Add more certifications
  ],

  achievements: ['Achievement 1', 'Achievement 2'],

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
```

## 🔄 Step 2: Generate Translation Data

After updating your resume data, run the extractor:

```bash
node scripts/resume-extractor.js
```

This will generate:

- Translation keys for both English and Spanish
- A JSON file with all the data
- Instructions for integration

## 📝 Step 3: Update Translation Files

### Add New Keys to `lib/translations.ts`

Copy the generated translation keys and add them to your translations file:

```typescript
// Add to the 'en' section
personalName: 'Your Actual Name',
personalTitle: 'Your Actual Title',
// ... other keys

// Add to the 'es' section
personalName: 'Your Actual Name',
personalTitle: 'Ingeniero Backend y Full-Stack',
// ... other keys
```

## 🎨 Step 4: Update Resume Page

### Add Personal Information Section

Add a personal information section to your resume page:

```tsx
// Add this section after the title
<section className='space-y-4'>
  <h2 className='text-xl sm:text-2xl font-bold'>{t('personalInfo')}</h2>
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
    <div>
      <h3 className='font-semibold'>{t('personalName')}</h3>
      <p className='text-muted-foreground'>{t('personalTitle')}</p>
      <p className='text-sm text-muted-foreground'>{t('personalLocation')}</p>
    </div>
    <div className='space-y-2'>
      <p className='text-sm'>
        <span className='font-medium'>Email:</span> {t('personalEmail')}
      </p>
      <p className='text-sm'>
        <span className='font-medium'>Phone:</span> {t('personalPhone')}
      </p>
      <p className='text-sm'>
        <span className='font-medium'>LinkedIn:</span> {t('personalLinkedIn')}
      </p>
      <p className='text-sm'>
        <span className='font-medium'>GitHub:</span> {t('personalGithub')}
      </p>
    </div>
  </div>
</section>
```

### Add More Experience Entries

If you have multiple experience entries, add them:

```tsx
// Add more experience sections
{
  data.experience.map((exp, index) => (
    <div key={index} className='space-y-2'>
      <h3 className='font-semibold text-lg'>
        {t(`experience${index + 1}Title`)}
      </h3>
      <p className='text-sm text-muted-foreground'>
        {t(`experience${index + 1}Company`)} •{' '}
        {t(`experience${index + 1}Duration`)}
      </p>
      <p className='text-sm sm:text-base'>
        {t(`experience${index + 1}Description`)}
      </p>
    </div>
  ));
}
```

## 🧪 Step 5: Test Translations

### Test Language Switching

1. **Start your development server:**

   ```bash
   npm run dev
   ```

2. **Navigate to the resume page:**

   - Go to `http://localhost:3000/resume`

3. **Test language switching:**
   - Click the language toggle in the navigation
   - Verify all content translates correctly
   - Check that personal information displays properly

### Verify All Content

Make sure these sections are translated:

- ✅ Personal information
- ✅ Skills and technologies
- ✅ Work experience
- ✅ Projects
- ✅ Education
- ✅ Certifications
- ✅ Achievements

## 🔧 Step 6: Customize Styling

### Add Personal Information Styling

```css
/* Add to your CSS file */
.personal-info {
  @apply bg-white rounded-lg border border-slate-200 p-6 shadow-sm;
}

.contact-info {
  @apply space-y-2 text-sm;
}

.contact-info p {
  @apply flex items-center gap-2;
}
```

### Add Icons for Contact Information

```tsx
import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';

// In your contact info section
<div className='space-y-2'>
  <p className='text-sm flex items-center gap-2'>
    <Mail className='w-4 h-4' />
    {t('personalEmail')}
  </p>
  <p className='text-sm flex items-center gap-2'>
    <Phone className='w-4 h-4' />
    {t('personalPhone')}
  </p>
  <p className='text-sm flex items-center gap-2'>
    <Linkedin className='w-4 h-4' />
    {t('personalLinkedIn')}
  </p>
  <p className='text-sm flex items-center gap-2'>
    <Github className='w-4 h-4' />
    {t('personalGithub')}
  </p>
</div>;
```

## 📊 Step 7: Add Resume Download

### Create PDF Download Function

```tsx
const handleDownloadResume = () => {
  // Add your resume PDF to the public folder
  const link = document.createElement('a');
  link.href = '/resume.pdf'; // Your resume PDF file
  link.download = 'Your-Name-Resume.pdf';
  link.click();
};

// Update the download button
<Button
  variant='outline'
  size='sm'
  className='w-full sm:w-auto'
  onClick={handleDownloadResume}
>
  <Download className='w-4 h-4 mr-2' />
  {t('download')}
</Button>;
```

## 🎯 Step 8: Final Checklist

### Before Going Live

- [ ] All personal information is accurate
- [ ] All experience entries are complete
- [ ] All projects are described properly
- [ ] Education information is correct
- [ ] Skills and technologies are up-to-date
- [ ] Spanish translations are accurate
- [ ] Language switching works on all pages
- [ ] Resume PDF is downloadable
- [ ] All links work correctly
- [ ] Mobile responsiveness is good

### Testing Checklist

- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Test language switching on all pages
- [ ] Test resume download functionality
- [ ] Verify all external links work
- [ ] Check for any console errors

## 🚀 Step 9: Deploy

### Build and Deploy

```bash
# Build the project
npm run build

# Deploy to your hosting platform
npm run deploy
```

### Post-Deploy Testing

1. **Test the live site:**

   - Navigate to your deployed resume page
   - Test language switching
   - Test resume download
   - Verify all content displays correctly

2. **Test on different devices:**
   - Desktop browsers
   - Mobile devices
   - Tablet devices

## 🎉 Success!

Your resume is now fully integrated with the translation system!

### What You've Accomplished

✅ **Resume data is structured** and ready for translation  
✅ **All content is translatable** between English and Spanish  
✅ **Personal information** is properly displayed  
✅ **Experience and projects** are well-organized  
✅ **Skills and technologies** are comprehensive  
✅ **Education and certifications** are included  
✅ **Language switching** works seamlessly  
✅ **Mobile responsiveness** is maintained

### Next Steps

- **Update your resume data** regularly as you gain experience
- **Add new projects** as you complete them
- **Update skills** as you learn new technologies
- **Keep translations current** when you add new content

Your portfolio now has a professional, fully-translated resume that showcases your skills and experience in both English and Spanish! 🌟
