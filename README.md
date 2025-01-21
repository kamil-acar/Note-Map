# Note Map



 <h2>Note Map</h2>
1. **Yer Belirleme ve Not Ekleme**
   - Harita üzerinde gidilecek yerleri (örneğin ev, ofis, gezi noktası) seçebiliyorsunuz.
   - Her nokta için:
     - Yer adı: Nereye gideceğinizi.
     - Tarih: Ne zaman gideceğinizi.
     - Amaç: Neden gideceğinizi ifade ediyorsunuz.
   - Bu bilgiler, özel emojilerle görselleştiriliyor:
     - 🏠 Ev: Kişisel veya özel yaşam alanı.
     - 🌍 Gezi: Tatil, seyahat noktaları.
     - 🏢 Ofis: İş veya resmi işler.

2. Canlı Konum Gösterme Yok
   - Projenizde, harita üzerinde sadece önceden belirlediğiniz notlar gösteriliyor.
   - Haritanın basit ve not odaklı olması için canlı konum takip özelliği bulunmuyor.

3. Kullanıcı Deneyimi
   - Harita üzerinde bir yer işaretlediğinizde, o noktaya özel bir emoji veya simgeyle işaretleniyor.
   - İşaretçiye tıklandığında gidilecek yerin detayları (isim, tarih, sebep) gösteriliyor.

<h2>Nasıl Çalışır?/h2>
1. Harita Eklentisi: 
   - Harita API'si (örneğin, Google Maps API veya Leaflet.js) ile bir harita eklenir.
   - Kullanıcı harita üzerinde noktalar seçebilir.

2. Marker'lar: 
   - Haritada belirlediğiniz yerleri ifade eden işaretçiler (marker) yerleştirilir.
   - Marker'lar, seçilen yere göre 🏠, 🌍, 🏢 gibi emojilerle özelleştirilir.

3. Bilgi Penceresi (Popup):
   - Marker'a tıklanıldığında, bir bilgi penceresi açılarak gidilecek yerin detayları gösterilir.

4. Veri Kaydetme:
   - Kullanıcıdan alınan bilgiler ya bir JSON dosyasında, ya yerel depolamada (localStorage), ya da bir veritabanında tutulur.

 <h2>Uygulama Örneği/h2>
Bir kullanıcı, İstanbul'da bir gezi planlıyorsa:
1. Harita üzerinde İstanbul'u işaretler.
2. Yer adı: İstanbul
3. Tarih: 01 Şubat 2025
4. Amaç: 🌍 Gezi
5. Haritada, İstanbul konumunda bir 🌍 ikonu belirir ve detayları görmek için kullanıcı bu ikona tıklayabilir.


![](noteMap.gif)
