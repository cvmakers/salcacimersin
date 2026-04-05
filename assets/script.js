
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
const form = document.getElementById('quickOrderForm');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const area = form.querySelector('[name="area"]').value.trim();
    const note = form.querySelector('[name="note"]').value.trim();
    if(!name || !phone){
      alert('Lütfen isim ve telefon alanlarını doldurun.');
      return;
    }
    const msg = [
      'Merhaba, Meritay Botanik üzerinden sipariş vermek istiyorum.',
      'İsim: ' + name,
      'Telefon: ' + phone,
      'Teslimat Bölgesi: ' + (area || 'Belirtilecek'),
      'Not: ' + (note || 'Aynı gün teslim için bilgi almak istiyorum.'),
      'Adresiniz: Menteş Mah. 9. Cadde No:30, 33150 Yenişehir / Mersin'
    ].join('
');
    window.open('https://wa.me/905425716844?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
}
