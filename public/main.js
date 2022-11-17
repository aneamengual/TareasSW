let input= document.getElementById('atazaBerria');
let borrar= document.getElementById('ezabatu');
let subir= document.getElementById('igo');
let bajar= document.getElementById('jaitsi');
let ul= document.createElement('ul');
document.body.appendChild(ul);

let ls=[];
let miLocalHost='http://localhost:3000'

function kargatu(){

    recargarPag();

    input.addEventListener('keypress', (event) =>{
        if(event.key=='Enter'){
            let palNueva= input.value;
            let list=document.createElement('li');
            list.innerText=palNueva;
            input.value='';
            ul.appendChild(list);
            let guardar={
                text: palNueva
            };
            ls = JSON.parse(localStorage.getItem('atazak')) || [];
            ls.push(guardar);
            localStorage.setItem('atazak', JSON.stringify(ls));
        }

    })

    borrar.addEventListener('click', (event) =>{
        while(ul.firstChild) ul.removeChild(ul.firstChild);
        localStorage.clear();
    })

    subir.addEventListener('click', async event =>{
        const raw = await fetch(miLocalHost,{
            method:'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: localStorage.getItem('atazak') || []
        })
    })

    bajar.addEventListener('click', async event =>{
        const raw = await fetch('http://localhost:3000/json',{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(r=> r.json());
        ls = JSON.parse(localStorage.getItem('atazak')) || [];
        raw.forEach(item => ls.push(item));
        localStorage.setItem('atazak', JSON.stringify(ls));
        recargarPag();
    })
}

function recargarPag(){
    ls = JSON.parse(localStorage.getItem('atazak')) || [];
    ls.forEach(i => {
        let list=document.createElement('li');
        list.innerText=i.text;
        ul.appendChild(list);
    })
}

window.onload = kargatu;