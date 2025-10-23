export const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(theme);
  })();
`;
