//import bodyParser from 'body-parser';
import express, { application, json } from 'express';
//import morgan from 'morgan';
import fs from "fs"
const app = express()
const PORT = 8080;

app.use(express.json());

app.post('/pets', (req, res) =>{
    let newPet = req.body; 
    fs.readFile("pets.json", "utf-8", (err, data)=>{
       let pets = JSON.parse(data);
       pets.push(newPet);
       pets = JSON.stringify(pets)
       fs.writeFile("pets.json",pets, (err, data) =>{
        console.log('updated')
       } )
    })
})


app.get("/pets/:id",  (req,res,next) =>{
    fs.readFile("pets.json", "utf-8", (err, data) =>{
        let pets = JSON.parse(data); 
        res.send(pets[req.params.id])
       
    })
});

app.patch("/pets/:id", (req, res) =>{
    let pets; 
    let newInfo = req.body; 
    
    fs.readFile("pets.json", "utf-8", (err, data)=>{
        if (err){
            res.status(400);
            res.send('error')
        }
        pets = JSON.parse(data);
        let id = req.params.id
        pets[id].name = req.body.name
        console.log(pets);
        pets = JSON.stringify(pets); 
        fs.writeFile('pets.json', pets, (err,data) =>{
            if (err){
                res.status(400);
                res.send('error')
            } else{

                console.log('patched')
            }
        })
         

    });

})
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
}); 


//{ "name": "Cornflake", "age": 3, "kind": "parakeet" }
