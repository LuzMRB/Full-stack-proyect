// i18n.js — Bilingual support for Peg Jump (ES / EN)

(function () {
  'use strict';

  const STORAGE_KEY = 'pegjump-lang';

  function getCurrentLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
    return navigator.language.startsWith('es') ? 'es' : 'en';
  }

  let currentLang = getCurrentLang();

  function applyTranslations(lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;

    const t = window.TRANSLATIONS[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const attr = el.getAttribute('data-i18n-attr');
      const text = t[key];

      if (!text) return;

      if (attr) {
        el.setAttribute(attr, text);
      } else {
        el.textContent = text;
      }
    });

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.metaDescription) {
      metaDesc.setAttribute('content', t.metaDescription);
    }

    document.documentElement.setAttribute('lang', lang);
  }

  function setLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
    updateLangSelector(lang);
    updateOnboardingTooltip(lang);
  }

  function updateOnboardingTooltip(lang) {
    var tooltip = document.getElementById('onboarding-tooltip');
    if (!tooltip || !tooltip.classList.contains('is-visible') || tooltip.classList.contains('is-fadeout')) return;
    var phase = tooltip.getAttribute('data-onboarding-phase');
    var textEl = tooltip.querySelector('.onboarding-tooltip-text');
    if (!textEl || !phase) return;
    var t = window.TRANSLATIONS && window.TRANSLATIONS[lang];
    if (!t) return;
    var key = phase === 'goal' ? 'onboardingTooltipGoal' : 'onboardingTooltipStart';
    textEl.textContent = t[key] || textEl.textContent;
  }

  function updateLangSelector(lang) {
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
  }

  function getTranslatedAlert(key, params) {
    const t = window.TRANSLATIONS && window.TRANSLATIONS[currentLang];
    if (!t || !t[key]) return '';

    let text = t[key];
    if (params) {
      Object.keys(params).forEach(function (k) {
        text = text.replace('{' + k + '}', params[k]);
      });
    }
    return text;
  }

  window.i18n = {
    setLanguage: setLanguage,
    getLang: function () { return currentLang; },
    getTranslatedAlert: getTranslatedAlert
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    applyTranslations(currentLang);
    updateLangSelector(currentLang);

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        setLanguage(el.getAttribute('data-lang'));
      });
    });
  }
})();
