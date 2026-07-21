(function () {

  // Automatically resolves the base URL from wherever this script is hosted.
  // Works as long as the script is not loaded with defer/async.
  var BASE = (function () {
    var el = document.currentScript;
    if (el && el.src) return new URL(el.src).origin;
    return '';
  })();

  // Checks whether an external script with the given src is already in the document,
  // preventing duplicate loads when multiple snippets share a dependency (e.g. Splide).
  function isScriptLoaded(src) {
    return !!document.querySelector('script[src="' + src + '"]');
  }

  // Appends an external script to <head> and calls onLoad/onError when settled.
  function loadExternalScript(src, onLoad, onError) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = onLoad;
    s.onerror = onError;
    document.head.appendChild(s);
  }

  // Executes an inline script body.
  // Before running, patches document.addEventListener so that any DOMContentLoaded
  // registrations fire immediately — DOMContentLoaded has already fired by the time
  // snippets are injected dynamically, so the callbacks would otherwise never run.
  function runInlineScript(textContent) {
    var orig = document.addEventListener.bind(document);
    document.addEventListener = function (type, fn, opts) {
      if (type === 'DOMContentLoaded') {
        setTimeout(fn, 0);
        return;
      }
      orig(type, fn, opts);
    };
    var s = document.createElement('script');
    s.textContent = textContent;
    document.head.appendChild(s);
    document.addEventListener = orig;
  }

  // Processes an ordered list of script nodes sequentially.
  // External scripts are awaited before moving on, ensuring dependencies (e.g. a Splide
  // extension) are fully loaded before the inline init script runs.
  function processScripts(scripts, index) {
    if (index >= scripts.length) return;
    var script = scripts[index];
    var src = (script.getAttribute('src') || '').trim();

    if (src) {
      if (isScriptLoaded(src)) {
        // Already in the document — skip loading, continue to next
        processScripts(scripts, index + 1);
      } else {
        loadExternalScript(
          src,
          function () { processScripts(scripts, index + 1); },
          function () {
            console.error('[fat-tony] Failed to load external script: ' + src);
            processScripts(scripts, index + 1);
          }
        );
      }
    } else {
      runInlineScript(script.textContent);
      processScripts(scripts, index + 1);
    }
  }

  function injectSnippet(el, html) {
    // Parse the fetched HTML into a temporary container
    var temp = document.createElement('div');
    temp.innerHTML = html;

    // Pull out all script tags before setting innerHTML on the real element.
    // Scripts must be re-created as new DOM nodes to be executed — parsed ones are inert.
    var scripts = Array.from(temp.querySelectorAll('script'));
    scripts.forEach(function (s) { s.parentNode.removeChild(s); });

    // Inject markup and styles (style blocks work fine via innerHTML)
    el.innerHTML = temp.innerHTML;

    // Load and execute scripts in order
    processScripts(scripts, 0);
  }

  document.querySelectorAll('[data-fat-tony]').forEach(function (el) {
    var path = el.getAttribute('data-fat-tony');

    fetch(BASE + path)
      .then(function (r) {
        if (!r.ok) throw new Error('[fat-tony] Failed to load snippet: ' + path + ' (' + r.status + ')');
        return r.text();
      })
      .then(function (html) { injectSnippet(el, html); })
      .catch(function (err) { console.error(err); });
  });

})();
