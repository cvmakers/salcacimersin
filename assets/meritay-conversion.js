/* Real form-to-WhatsApp enquiry, no backend, no false completed-order events. */
(()=>{'use strict';
const CONTACT='905425716844';
for(const form of document.querySelectorAll('[data-meritay-enquiry]')){
  form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    if(!form.reportValidity()) return;
    const fields=new FormData(form);
    const value=(k)=>String(fields.get(k)||'').trim();
    const page=String(document.body?.dataset.page || location.pathname).slice(0,80);
    const parts=[
      'Merhaba Meritay Botanik, çiçek siparişi için bilgi almak istiyorum.',
      'Çiçek tercihi: '+value('flower'),
      'Bütçem: '+value('budget'),
      'Teslimat bölgesi: '+value('area'),
      value('when') ? 'Tercih edilen tarih: '+value('when'):'',
      value('note') ? 'Not: '+value('note').slice(0,350):'',
      'Sayfa: '+page,
      'Stok, toplam fiyat ve teslimat uygunluğunu teyit edebilir misiniz?'
    ].filter(Boolean);
    window.gtag?.('event','teklif_formu_whatsapp_acilis',{event_category:'iletisim',event_label:page,contact_method:'whatsapp',engagement_type:'click',form_type:'flower_enquiry'});
    // An actual anchor click is used so the existing site.js tracking also runs.
    const a=document.createElement('a');
    a.href='https://wa.me/'+CONTACT+'?text='+encodeURIComponent(parts.join('\n'));
    a.target='_blank'; a.rel='noopener noreferrer';
    a.style.display='none'; a.textContent='WhatsApp sipariş bilgisi';
    document.body.append(a);a.click();a.remove();
  });
}
})();
