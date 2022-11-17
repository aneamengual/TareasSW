const express = require('express');
const app=express();
const path = require('path');


// app.get('/', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let tareasJson=[];


app.post('/', (req, res) =>{
    console.log(req.body);
    tareasJson= tareasJson || [];
    req.body.forEach(item => tareasJson.push(item));
    res.send(JSON.stringify(req.body));
});

app.get('/json', (req, res) =>{
    console.log(JSON.stringify(tareasJson))
    res.send(JSON.stringify(tareasJson));
})

app.listen(3000, function(){console.log("Servidor lanzado en el puerto 3000")})