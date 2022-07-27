import express, { json } from 'express';
import { writeFile } from 'fs/promises';
import fs from 'fs';

const app = express();
const PORT = 8000;

app.use(express.json())




app.get('/pets', (req, res,next)=>{
    fs.readFile('pets.json', 'utf-8', (err, data) =>{
    if(err) {
        console.log('err in pets')
        next(err)
    } else{
        const pets = JSON.parse(data)
        res.send(pets);
    }
    })
 

});

app.get('/pets/:id', (req, res, next)=>{
    fs.readFile('pets.json', 'utf-8', (err, data) =>{
        const pets = JSON.parse(data)
        let id = req.params.id
        if (!pets[id]){
            next(err)
        } else{
            res.set('Content-Type', 'application/json')
                res.send(pets[id]);
        }
        
    })
 

});

app.post('/pets', (req, res) =>{
    fs.readFile('pets.json', 'utf-8')
        .then(pets)
    
 })
 
 app.use((req, res, next ) => {
   if(req.url === '/'){
    res.set("Content-Type", 'text/plain')
    res.status(404).send("sorry homepage has not been created")
    } else{
        res.set("Content-Type", 'text/plain')
        res.status(500).send(`${req.url} is not valid, please enter a valid url, ex. .../pets/0`)
    }
  })


app.listen(PORT, () =>{
    
    console.log(`Server is running on port ${PORT}`);
})

