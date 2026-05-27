Link düzeltmesi yapıldı.

Sorun:
Ana sayfadaki linkler /orkide-siparisi-mersin gibi uzantısız gidiyordu.
Local serverda sadece .html dosyası olduğu için "Cannot GET /..." hatası veriyordu.

Çözüm:
Her sayfanın hem .html dosyası var hem de temiz URL klasörü var:
- mersin-orkide-siparisi.html
- mersin-orkide-siparisi/index.html

Bu yüzden şu linkler çalışır:
- /mersin-orkide-siparisi
- /mersin-orkide-siparisi.html

Not:
Tarayıcıda /orkide-siparisi-mersin yazarsan çalışmaz çünkü doğru sayfa adı:
- /mersin-orkide-siparisi
