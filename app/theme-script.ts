export const themeScript = `
  (function() {
    const storedTheme = localStorage.getItem('theme');
    const theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
    document.documentElement.classList.add(theme);
  })();
`;
