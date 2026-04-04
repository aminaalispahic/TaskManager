const sequelize = require('./js/baza.js');
const Zadaci = require('./js/zadaci.js')(sequelize);
let http=require('http');
let fs=require('fs');
let express=require('express');
let app=express();
let mysql=require('mysql2');
let path=require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.get('/',function(req,res){
     const filePath = path.join(__dirname, 'html', 'taskManager.html'); // Koristimo path.join za ispravnu putanju
    res.sendFile(filePath, function(err) {
        if (err) {
            console.log("Greška pri slanju fajla:", err);
            res.status(500).send("Greška pri slanju fajla");
        }
    });
})
app.post('/dodaj',async function(req,res){
   let naziv1=String(req.body.naziv);
   let opis1=String(req.body.opis);
   let rok1=String(req.body.rok);
   let prioritet1=String(req.body.prioritet);
   let status=String(req.body.status);

   try{
   const task = await Zadaci.create({ naziv: naziv1, opis: opis1, rok: rok1, prioritet: prioritet1,status:status });
    res.status(200).json({ message: 'Task added successfully', task });

   }catch(error){
    res.status(400).send({poruka:'Greska pri dodavanju u bazu'});
   }
})
app.get('/sve',async function(req,res){
   try{
   const sve= await Zadaci.findAll();
   res.status(200).json(sve);
   }catch(error){
    console.log(error); // dodaj ovo
        
      res.status(400).send({poruka:'Greska pri konekciji'});
   }
})
app.get('/aktivno',async function(req,res){
    try{
     const aktivno=await Zadaci.findAll({ where: { status: 'aktivan' } })
     res.status(200).json(aktivno);
    }catch(error){
        res.status(400).send('Greska pri konekciji aktivno');
    }
})
app.get('/visok',async function(req,res){
    try{
     let v=await Zadaci.findAll({ where: { prioritet:'visok' } });
     res.status(200).json(v);
    }catch(error){
        res.status(400).send("Greska pri dohvacanju iz baze");
    }
})
app.get('/broj', async function(req, res) {
    try {
        const broj = await Zadaci.count();
        const brojAktivnih = await Zadaci.count({ where: { status: 'aktivan' } });
        const zavrseni = await Zadaci.count({ where: { status: 'zavrseno' } });
        res.status(200).json({ broj: broj ,brojAktivnih: brojAktivnih, zavrseni:zavrseni});
    } catch(error) {
        console.log(error);
        res.status(400).send({ poruka: 'Greska' });
    }
});

app.put('/status/:id', async function(req, res) {
    try {
        await Zadaci.update(
            { status: req.body.status },
            { where: { id: req.params.id } }
        );
        res.status(200).json({ poruka: 'Status promijenjen' });
    } catch(error) {
        console.log(error);
        res.status(400).send({ poruka: 'Greska' });
    }
});
app.get('/zavrsen',async function(req,res){
    try{
     let v=await Zadaci.findAll({ where: { status:'zavrseno' } });
     res.status(200).json(v);
    }catch(error){
        res.status(400).send("Greska pri dohvacanju iz baze");
    }
})
// ZAMIJENI app.listen sa ovim
async function pokreniServer() {
    await Zadaci.sync();
    console.log("Tabela kreirana");
    app.listen(8085, () => {
        console.log("Pokrenut server");
    });
}
pokreniServer();