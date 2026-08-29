(() => {
  'use strict';

  const CONSENT_KEY = 'cicekci_site_consent_v1';
  const pageLabel = document.body?.dataset.page || window.location.pathname || '/';

  function updateConsent(choice) {
    const granted = choice === 'accepted' ? 'granted' : 'denied';
    window.gtag?.('consent', 'update', {
      ad_storage: granted,
      analytics_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted
    });
  }

  function readConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (_) {
      return null;
    }
  }

  function saveConsent(choice) {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch (_) {
      // Depolama kapalıysa seçim bu oturumda yine uygulanır.
    }
    updateConsent(choice);
    document.querySelector('.consent-panel')?.remove();
  }

  function showConsentPanel() {
    if (readConsent()) return;

    const panel = document.createElement('aside');
    panel.className = 'consent-panel';
    panel.setAttribute('aria-label', 'Çerez tercihleri');
    panel.innerHTML = `
      <p>Site deneyimi ile reklam ve iletişim ölçümü için çerezleri kullanıyoruz.
        <a href="/gizlilik-politikasi.html">Ayrıntılar</a>
      </p>
      <div class="consent-actions">
        <button type="button" data-consent="rejected">Reddet</button>
        <button type="button" class="consent-accept" data-consent="accepted">Kabul et</button>
      </div>`;

    panel.addEventListener('click', (event) => {
      const button = event.target.closest('[data-consent]');
      if (button) saveConsent(button.dataset.consent);
    });
    document.body.append(panel);
  }

  const savedConsent = readConsent();
  if (savedConsent) updateConsent(savedConsent);

  window.gtag?.('js', new Date());
  window.gtag?.('config', 'G-2559CJDC1P');
  window.gtag?.('config', 'G-93SH8FZ00H');
  window.gtag?.('config', 'AW-17558342041');
  window.gtag?.('config', 'AW-17558342041/M7OACImbmbocEJmTvLRB', {
    phone_conversion_number: '0542 571 68 44'
  });

  function sendInteraction(eventName, params = {}) {
    window.gtag?.('event', eventName, {
      event_category: 'iletisim',
      event_label: pageLabel,
      page_path: window.location.pathname,
      transport_type: 'beacon',
      ...params
    });
    return true;
  }

  window.trackCall = () => sendInteraction('telefon_tiklama');
  window.trackWhatsApp = () => sendInteraction('whatsapp_tiklama');
  window.trackOrder = () => sendInteraction('cicek_siparisi_tiklama', {
    event_category: 'siparis'
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showConsentPanel, { once: true });
  } else {
    showConsentPanel();
  }
})();
