// Vercel Speed Insights for vanilla HTML
// This script initializes the Vercel Speed Insights tracking
(function() {
  // Initialize the queue for tracking events
  if (!window.si) {
    window.si = function(...params) {
      (window.siq = window.siq || []).push(params);
    };
  }

  // Check if script is already loaded
  const scriptSrc = '/_vercel/speed-insights/script.js';
  if (document.head.querySelector(`script[src*="${scriptSrc}"]`)) {
    return;
  }

  // Create and inject the Speed Insights script
  const script = document.createElement('script');
  script.src = scriptSrc;
  script.defer = true;
  script.dataset.sdkn = '@vercel/speed-insights';
  script.dataset.sdkv = '1.3.1';
  
  script.onerror = () => {
    console.log(
      '[Vercel Speed Insights] Failed to load script. Please check if any content blockers are enabled and try again.'
    );
  };
  
  document.head.appendChild(script);
})();
