export const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
      document.documentElement.classList.add(theme);
      if (document.body) {
        document.body.setAttribute('data-theme', theme);
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          document.body.setAttribute('data-theme', theme);
        });
      }
    } catch (e) {}
  })();
`;
