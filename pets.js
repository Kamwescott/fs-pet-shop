import fs, { WriteStream } from 'fs';
import { readFile } from 'fs';

const subCommand = process.argv[2];
if(subCommand=== undefined){
    console.log("Usage: node pets.js [read | create | update | destroy]")
}
const readPetJSON = () =>{
    let index = process.argv[3];
        fs.readFile('pets.json', 'utf-8', (err, str) =>{
            let data = JSON.parse(str);
            if (err){
                consolelog()
            }
            console.log(data[index])
            return data[index]
        })
}

if (subCommand === 'create'){
    if ( process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined){
        console.log("Usage: node pets.js create AGE KIND NAME");

        let currentData = fs.readFileSync('pets.json');
        let currentObj = JSON.parse(currentData);
            let newDataObj = {
                age: parseInt(process.argv[3]), 
                kind: process.argv[4], 
                name: process.argv[5]
        }
    currentObj.push(newDataObj);
    let newJSON = JSON.stringify(currentObj);

    } else {
        fs.writeFile("pets.json", newJSON, (err) =>{
            if (err){
                console.log(err)
            } else{
                console.table(`data created --> ${JSON.stringify(newDataObj)}`)
            }
      })
    }
    } else if(subCommand === 'read'){
        if (process.argv[3] === undefined){
            console.log('Usage: node pets.js read INDEX');
        } else {
            readPetJSON();
        }
        }else if(subCommand === 'update'){
            if ( process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined){
                console.log("Usage: node pets.js create AGE KIND NAME");
            } 
            } else if(subCommand === 'destroy'){
                //do domething
                } else {
                    console.log('Usage: node pets.js [read | create | update | destroy]')
                }


// function createNewPet(age, kind, name ){
//     let newPet = {
//         "age": process.argv[3],
//         "kind": process.argv[4], 
//         "name": process.argv[5]
//     }
//}{"name":"Fido"}