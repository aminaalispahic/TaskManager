async function dajBroj() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            let odgovor = JSON.parse(ajax.responseText);
            document.getElementById('Ukupno').innerHTML = odgovor.broj;
            document.getElementById("Zavrseno").innerHTML=odgovor.zavrseni;
            document.getElementById("Aktivno").innerHTML=odgovor.brojAktivnih;
            let napredak=Math.round(((odgovor.zavrseni)/odgovor.broj)*100);
            document.querySelector('.postotak').innerHTML = `${napredak} %`;
            document.querySelector("progress").value=napredak;
        }
    };
    ajax.open('GET', 'http://localhost:8085/broj', true);
    ajax.send();
}

window.onload = function() {
    dajBroj();
   
}
let selectedPriority = '';

function setPriority(p) {
    selectedPriority = p;
    // ukloni active sa svih
    document.querySelectorAll('.tezina button').forEach(btn => btn.classList.remove('active'));
    
    // dodaj active na kliknuto
    document.querySelector('.' + p).classList.add('active');
}

function dodajUBazu() {
    let naziv = document.getElementById('naziv').value;
    if(naziv==''){
        alert("Niste unijeli naziv!!");
        return;
    }
    let opis = document.getElementById('opis').value;
    let rok = document.getElementById('rokObjava').value;
    if(!rok){
        alert("Unesite rok!!");
        return;
    }
    let prioritet = selectedPriority; // koristiš ovdje
    if(!prioritet){
        alert("Niste unijeli prioritet");
        return;
    }
  let status="aktivan";
    let obj = { naziv, opis, rok, prioritet,status };

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log('Zadatak dodan:', JSON.parse(ajax.responseText));
            // očisti formu
        document.getElementById('naziv').value = '';
        document.getElementById('opis').value = '';
        document.getElementById('rokObjava').value = '';
        selectedPriority = '';
        document.querySelectorAll('.tezina button').forEach(btn => btn.classList.remove('active'));
        }
    };
   
    ajax.open('POST', 'http://localhost:8085/dodaj', true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify(obj));
}

async function dajSve(){
 let ajax=new XMLHttpRequest();
 ajax.onreadystatechange=function(){
    if(ajax.readyState==4 && ajax.status==200){
        let sve = JSON.parse(ajax.responseText);
        console.log(ajax.responseText); 
         document.querySelectorAll('.zadaci button').forEach(btn => btn.classList.remove('active'));
    // dodaj active na kliknuto
    document.getElementById('sve').classList.add('active');
            let lista = document.getElementById('zadaciLista');
            lista.innerHTML = '';

            if (sve.length == 0) {
                document.querySelector('.poruka').style.display = 'block';
            } else {
                document.querySelector('.poruka').style.display = 'none';
                for (let s of sve) {
                    let div = document.createElement('div');
                    let rokFormat = new Date(s.rok).toLocaleDateString('hr-HR');
                    div.classList.add('zadatak');
                    div.innerHTML = ` <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
            <p>Naziv: ${s.naziv}</p>
            <p>Opis: ${s.opis}</p>
            <p>Rok: ${rokFormat}</p>
            <p>Prioritet: ${s.prioritet}</p>
        </div>
        <input type="checkbox" class="check" 
            ${s.status === 'zavrseno' ? 'checked disabled' : ''}
            onchange="promijeniStatus(${s.id}, this.checked)">
    </div>`;
                
                                     
                    lista.appendChild(div);
                }
            }
        }
    };
    ajax.open('GET', 'http://localhost:8085/sve', true);
    ajax.send();
}
async function Aktivni(){
    
    let ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
    if(ajax.readyState==4 && ajax.status==200){
         document.querySelectorAll('.zadaci button').forEach(btn => btn.classList.remove('active'));
   
    document.getElementById('aktivne').classList.add('active');
        let aktivno=JSON.parse(ajax.responseText);
        let lista=document.getElementById('zadaciLista');
        lista.innerHTML=' ';
         if (aktivno.length == 0) {
                document.querySelector('.poruka').style.display = 'block';
            } else {
                document.querySelector('.poruka').style.display = 'none';
                for (let a of aktivno) {
                    let div = document.createElement('div');
                    let rokFormat = new Date(a.rok).toLocaleDateString('hr-HR');
                    div.classList.add('zadatak');
                    div.innerHTML = ` <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
            <p>Naziv: ${a.naziv}</p>
            <p>Opis: ${a.opis}</p>
            <p>Rok: ${rokFormat}</p>
            <p>Prioritet: ${a.prioritet}</p>
        </div>
        <input type="checkbox" class="check" 
            ${a.status === 'zavrseno' ? 'checked disabled' : ''}
            onchange="promijeniStatus(${a.id}, this.checked)">
    </div>`;
                
                                     
                    lista.appendChild(div);
                }
            }
    }};
   ajax.open('GET', 'http://localhost:8085/aktivno', true)
   ajax.send();
}
async function Visok(){
    
    let ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
    if(ajax.readyState==4 && ajax.status==200){
         document.querySelectorAll('.zadaci button').forEach(btn => btn.classList.remove('active'));
   
    document.getElementById('visoko').classList.add('active');
        let aktivno=JSON.parse(ajax.responseText);
        let lista=document.getElementById('zadaciLista');
        lista.innerHTML=' ';
         if (aktivno.length == 0) {
                document.querySelector('.poruka').style.display = 'block';
            } else {
                document.querySelector('.poruka').style.display = 'none';
                for (let a of aktivno) {
                    let div = document.createElement('div');
                    let rokFormat = new Date(a.rok).toLocaleDateString('hr-HR');
                    div.classList.add('zadatak');
                    div.innerHTML = ` <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
            <p>Naziv: ${a.naziv}</p>
            <p>Opis: ${a.opis}</p>
            <p>Rok: ${rokFormat}</p>
            <p>Prioritet: ${a.prioritet}</p>
        </div>
        <input type="checkbox" class="check" 
            ${a.status === 'zavrseno' ? 'checked disabled' : ''}
            onchange="promijeniStatus(${a.id}, this.checked)">
    </div>`;
                
                                     
                    lista.appendChild(div);
                }
            }
    }};
   ajax.open('GET', 'http://localhost:8085/visok', true)
   ajax.send();
}
async function Zavrseno(){
     
    let ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
    if(ajax.readyState==4 && ajax.status==200){
         document.querySelectorAll('.zadaci button').forEach(btn => btn.classList.remove('active'));
   
    document.getElementById('zavrsene').classList.add('active');
        let aktivno=JSON.parse(ajax.responseText);
        let lista=document.getElementById('zadaciLista');
        lista.innerHTML=' ';
         if (aktivno.length == 0) {
                document.querySelector('.poruka').style.display = 'block';
            } else {
                document.querySelector('.poruka').style.display = 'none';
                for (let a of aktivno) {
                    let div = document.createElement('div');
                    let rokFormat = new Date(a.rok).toLocaleDateString('hr-HR');
                    div.classList.add('zadatak');
                    div.innerHTML = ` <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
            <p>Naziv: ${a.naziv}</p>
            <p>Opis: ${a.opis}</p>
            <p>Rok: ${rokFormat}</p>
            <p>Prioritet: ${a.prioritet}</p>
        </div>
        <input type="checkbox" class="check" 
            ${a.status === 'zavrseno' ? 'checked disabled' : ''}
            onchange="promijeniStatus(${a.id}, this.checked)">
    </div>`;
                
                                     
                    lista.appendChild(div);
                }
            }
    }};
   ajax.open('GET', 'http://localhost:8085/zavrsen', true)
   ajax.send();

}
async function promijeniStatus(id, zavrsen) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange=function(){
    if(ajax.status==200 && ajax.readyState==4){
        dajBroj();
    }}
    ajax.open('PUT', 'http://localhost:8085/status/' + id, true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify({ status: zavrsen ? 'zavrseno' : 'aktivno' }));
}