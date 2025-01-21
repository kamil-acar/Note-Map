//! farklı dosyalardan gelen veriler
import { setStorage, getStorage, icons, userIcon } from "./helper.js";

//! html elemanlarını cağırma 
const form = document.querySelector("form")
const noteList= document.querySelector("ul")

//! GLOBAL DEGİSKENLER:
let coords;
let notes = getStorage() || [] // veriler null yerine boş dizi olsun
let markerLayer=[]
let map;


// Haritayı ekrana basan fonksıyon
function loadmap(coords) {
     map = L.map('map').setView(coords, 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // imleçleri tutucağımız ayrı bir katman oluşturma
    markerLayer= L.layerGroup().addTo(map)

    // kullanıcının konumuna imleç bas
    L.marker(coords, {icon:userIcon}).addTo(map)

    // lokalden gelen verileri ekrana bas
    renderNoteList(notes)

    //* Haritadaki tıklanma olaylarını izle
    map.on("click", onMapClick)
}

//*  kullanıcının konumunu alma
navigator.geolocation.getCurrentPosition(
    // konumu alırsa çalışacak fonksiyon
    (e) => {
        loadmap(e.coords.latitude, e.coords.longitude)
    },
    // konumu alamazsa çalışacak fonksiyon
    (e) => {
        loadmap([38.28, 27.13])
    }
)

//* Haritadaki tıklanma olaylarında çalışır
function onMapClick(event) {
    // Tıklanan yerin konumuna eriş global değişken aktardım
    coords = ([event.latlng.lat, event.latlng.lng])
    //* tıklanan yerın konumuna erişme
    form.style.display = "flex"
    //* ilk inputa odaklar

    form[0].focus()
}

//* iptal butonuna tıklanırsa formu temizle ve kapat
form[3].addEventListener("click", () => {
    // formu temizle
    form.reset()
    // formu kapat
    form.style.display = "none"
})

// form gönderilirse yeni bir not oluşrut ve stroge'a kaydet
form.addEventListener("submit", (e) => {

    //1) yenilemeyi engelle
    e.preventDefault()

    //2) inputlardan verilerden bir note objesi oluştur
    const newNote = {
        id: new Date().getTime(),
        title: form[0].value,
        date: form[1].value,
        status: form[2].value,
        coords: coords
    }
    //3) dizinin başına yeni notu eklemek
    notes.unshift(newNote)
    console.log(notes)

    //4) notları ekrana bas
    renderNoteList(notes)


    //5) local stroge güncelle
    setStorage(notes)


    //6) formu kapat
    form.style.display="none"
    form.reset()
})

// ekrana notları basar
function renderNoteList(items){
    // önceden eklenen elemanları temizle
    noteList.innerHTML=``
    markerLayer.clearLayers()
    // dizideki her bir obje için note kartı bas
    items.forEach((note) => {
        // liste elemanı oluştur
        const listEle=document.createElement("li")

        // data-id ekle
        listEle.dataset.id=note.id

        // içeriğini belirle
        listEle.innerHTML=`
        <div class="info">
                        <p>${note.title}</p>
                        <p>
                            <span>${note.date}</span>
                        </p>
                        <p>
                            <span>Durum:</span>
                            <span>${note.status}</span>
                        </p>
                    </div>
                    <div class="icons">
                        <i id="fly" class="bi bi-airplane-fill"></i>
                        <i id="delete"class="bi bi-trash3-fill"></i>
                    </div>
        `     
        // elemanı listeye ekle
        noteList.appendChild(listEle)

        // elemanı haritaya ekle
        renderMarker(note)
    });
}
// not için imleç katmanına yenı bir imleç ekler
function renderMarker(note){
    // imleç oluştur
    L.marker(note.coords,{icon: icons[note.status]})
    // imleci katmana ekle
    .addTo(markerLayer)
    .bindPopup(note.title)
}

// silme-uçuş
noteList.addEventListener("click",(e)=>{

    // tıklanılan elemanın id'sine erişme
    const found_id =e.target.closest("li").dataset.id

    if(e.target.id=="delete" && confirm("silme işlemini onaylıyor musunuz?")){
        // id'sini bilidiğin elelmanı diziden çıkart
    notes=notes.filter((note)=> note.id !=found_id)
    // lokali güncelle
    setStorage(notes)
    // ekranı güncelle
    renderNoteList(notes)
    }
    if(e.target.id=="fly"){
    // id'sini bilidiğimiz elemanı dizideki haline erişme
    const note =notes.find((note)=> note.id==found_id)
    // notun kordinatlarına git 
        map.flyTo(note.coords)
    }
})