(() => {
  const config = window.DISK_CACAMBA_CONFIG || {};
  const params = new URLSearchParams(window.location.search);

  const tracking = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    gclid: params.get('gclid') || '',
    gbraid: params.get('gbraid') || '',
    wbraid: params.get('wbraid') || ''
  };

  localStorage.setItem('disk_cacamba_tracking', JSON.stringify(tracking));

  function fireEvent(eventName, extra = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...tracking, ...extra });
  }

  function buildWhatsAppLink(message) {
    const number = String(config.whatsappNumber || '').replace(/\D/g, '');
    const campaignInfo = tracking.utm_campaign ? `\nCampanha: ${tracking.utm_campaign}` : '';
    return `https://wa.me/${number}?text=${encodeURIComponent(message + campaignInfo)}`;
  }

  document.querySelectorAll('.js-whatsapp').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const message = link.dataset.message || 'Olá! Quero um orçamento de caçamba.';
      fireEvent('click_whatsapp', { button_text: link.textContent.trim() });
      window.location.href = buildWhatsAppLink(message);
    });
  });

  document.querySelectorAll('.js-checkout').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const selectedSize = link.dataset.size || '';
      fireEvent('begin_checkout', { dumpster_size: selectedSize });

      const checkout = new URL(config.checkoutUrl || '/checkout', window.location.href);
      Object.entries(tracking).forEach(([key, value]) => value && checkout.searchParams.set(key, value));
      selectedSize && checkout.searchParams.set('tamanho', selectedSize);
      window.location.href = checkout.toString();
    });
  });

  document.querySelector('#year').textContent = new Date().getFullYear();

  document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', () => detail.open && fireEvent('faq_open', { question: detail.querySelector('summary').textContent }));
  });

  const modal = document.querySelector('#leadModal');
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));

  // Exibe uma alternativa de conversão após 35 segundos, apenas uma vez por sessão.
  setTimeout(() => {
    if (!sessionStorage.getItem('disk_modal_seen')) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      sessionStorage.setItem('disk_modal_seen', '1');
      fireEvent('conversion_choice_modal_view');
    }
  }, 35000);
})();
