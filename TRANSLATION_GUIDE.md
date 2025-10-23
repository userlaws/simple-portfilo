# Translation System Guide

## How to Ensure All Content Gets Translated

This guide explains how to add new content to your portfolio and ensure it gets translated automatically.

## 🎯 Quick Start

### 1. Adding New Content

When you add new content to any page, follow these steps:

#### Step 1: Add to Translation File

Add your new content to `lib/translations.ts`:

```typescript
// In the 'en' section
newContentKey: 'Your English text here',

// In the 'es' section
newContentKey: 'Tu texto en español aquí',
```

#### Step 2: Use in Components

Use the translation in your components:

```tsx
import { useLanguage } from '@/contexts/language-context';

export default function MyComponent() {
  const { t } = useLanguage();

  return <h1>{t('newContentKey')}</h1>;
}
```

### 2. Content Types That Need Translation

#### ✅ Always Translate:

- **Page titles and headings**
- **Navigation menu items**
- **Button text**
- **Form labels**
- **Error messages**
- **Success messages**
- **Descriptions and subtitles**
- **Project descriptions**
- **Blog post titles and content**
- **Resume sections**

#### ❌ Don't Translate:

- **Technical terms** (React, Python, SQL)
- **Company names** (PowerSchool, Google)
- **Dates and numbers**
- **URLs and file paths**
- **Code snippets**

### 3. Adding Content to Specific Pages

#### Home Page (`app/page.tsx`)

```tsx
// Add to translations.ts
heroNewSection: 'New section content',
  (
    // Use in component
    <h2>{t('heroNewSection')}</h2>
  );
```

#### Work Page (`app/work/page.tsx`)

```tsx
// Add to translations.ts
newProjectTitle: 'New Project',
newProjectDesc: 'Project description',

// Use in component
<h3>{t('newProjectTitle')}</h3>
<p>{t('newProjectDesc')}</p>
```

#### Notes Page (`app/notes/page.tsx`)

```tsx
// Add to translations.ts
newNoteTitle: 'New Note Title',
newNoteDesc: 'Note description',

// Use in component
<h3>{t('newNoteTitle')}</h3>
<p>{t('newNoteDesc')}</p>
```

#### Resume Page (`app/resume/page.tsx`)

```tsx
// Add to translations.ts
newSectionTitle: 'New Section',
newSectionContent: 'Section content',

// Use in component
<h2>{t('newSectionTitle')}</h2>
<p>{t('newSectionContent')}</p>
```

### 4. Translation Workflow

#### For New Content:

1. **Add English text** to `translations.en`
2. **Add Spanish placeholder** to `translations.es` with `[TRANSLATE: English text]`
3. **Use in component** with `t('key')`
4. **Translate later** by replacing the placeholder

#### For Existing Content:

1. **Find the key** in `translations.ts`
2. **Update the Spanish translation** in `translations.es`
3. **Test the change** by switching languages

### 5. Translation Tools

#### Manual Translation:

- Use Google Translate for initial translation
- Review and refine for accuracy
- Consider cultural context

#### Professional Translation:

- Use services like DeepL or professional translators
- Maintain technical accuracy
- Keep consistent terminology

### 6. Best Practices

#### Naming Conventions:

```typescript
// Good: Descriptive and organized
workTitle: 'Work',
workSubtitle: 'Projects and case studies...',
projectNoteShare: 'NoteShare',
projectNoteShareDesc: 'Description...',

// Bad: Unclear or inconsistent
title1: 'Work',
desc: 'Description...',
```

#### Content Organization:

```typescript
// Group by page/section
// Work Page
workTitle: 'Work',
workSubtitle: 'Subtitle...',

// Notes Page
notesTitle: 'Notes',
notesSubtitle: 'Subtitle...',
```

#### Translation Quality:

- **Keep it natural** - Don't translate word-for-word
- **Maintain tone** - Professional and technical
- **Use consistent terms** - Same Spanish word for same English term
- **Test thoroughly** - Check all pages in both languages

### 7. Adding New Pages

#### Step 1: Create the page

```tsx
// app/new-page/page.tsx
import { useLanguage } from '@/contexts/language-context';

export default function NewPage() {
  const { t } = useLanguage();

  return (
    <main>
      <h1>{t('newPageTitle')}</h1>
      <p>{t('newPageContent')}</p>
    </main>
  );
}
```

#### Step 2: Add translations

```typescript
// In translations.ts
newPageTitle: 'New Page',
newPageContent: 'Page content here',
```

#### Step 3: Add to navigation

```tsx
// In components/navigation.tsx
const navLinks = [
  { href: '/', label: t('home') },
  { href: '/work', label: t('work') },
  { href: '/new-page', label: t('newPageTitle') }, // Add here
];
```

### 8. Testing Translations

#### Manual Testing:

1. **Switch languages** using the language toggle
2. **Navigate between pages** in both languages
3. **Check all content** appears correctly translated
4. **Verify no missing translations** (should show English fallback)

#### Automated Testing:

```typescript
// Use translation utilities
import { validateTranslations } from '@/lib/translation-utils';

const missing = validateTranslations();
console.log('Missing translations:', missing);
```

### 9. Common Issues & Solutions

#### Issue: Content not translating

**Solution:** Check that you're using `t('key')` instead of hardcoded text

#### Issue: Missing translation key

**Solution:** Add the key to both `en` and `es` sections in `translations.ts`

#### Issue: Translation not updating

**Solution:** Clear browser cache and restart the dev server

#### Issue: Inconsistent translations

**Solution:** Use the same key across all components for the same content

### 10. Future Enhancements

#### Planned Features:

- **Auto-translation** using AI services
- **Translation management** dashboard
- **Content validation** tools
- **Multi-language SEO** optimization

#### Adding More Languages:

```typescript
// Add new language to translations.ts
export const translations = {
  en: {
    /* English translations */
  },
  es: {
    /* Spanish translations */
  },
  fr: {
    /* French translations */
  }, // Add new language
};
```

## 🚀 Quick Reference

### Essential Files:

- `lib/translations.ts` - All translations
- `contexts/language-context.tsx` - Language management
- `lib/translation-utils.ts` - Helper functions

### Key Functions:

- `t('key')` - Get translation
- `useLanguage()` - Access language context
- `setLanguage('es')` - Change language

### Translation Keys:

- Use descriptive names
- Group by page/section
- Keep consistent naming
- Add comments for clarity

This system ensures all your content gets translated automatically when you add new pages or content! 🎉
