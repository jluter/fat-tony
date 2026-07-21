(function () {

  // Automatically resolves the base URL from wherever this script is hosted.
  // Works as long as the script is not loaded with defer/async.
  var BASE = (function () {
    var el = document.currentScript;
    if (el && el.src) {
      var url = new URL(el.src);
      return url.origin;
    }
    return '';
  })();

  // innerHTML does not execute <script> tags for security reasons.
  // This function replaces each parsed script node with a freshly created one
  // so the browser treats it as new and executes it.
  function reExecuteScripts(container) {
    var scripts = container.querySelectorAll('script');
    scripts.forEach(function (oldScript) {
      var newScript = document.createElement('script');

      // Copy all attributes (src, type, async, defer, etc.)
      Array.from(oldScript.attributes).forEach(function (attr) {
        newScript.setAttribute(attr.name, attr.value);
      });

      // Copy inline script body
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }

      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  document.querySelectorAll('[data-fat-tony]').forEach(function (el) {
    var path = el.getAttribute('data-fat-tony');

    fetch(BASE + path)
      .then(function (r) {
        if (!r.ok) throw new Error('[fat-tony] Failed to load snippet: ' + path + ' (' + r.status + ')');
        return r.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        reExecuteScripts(el);
      })
      .catch(function (err) {
        console.error(err);
      });
  });

})();
