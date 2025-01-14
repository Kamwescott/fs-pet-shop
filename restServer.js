//import bodyParser from 'body-parser';
import express from 'express';
import pg from 'pg';

const app = express()
const PORT = 8080;
const {Pool} = pg;

const pool = new Pool({
    database: 'petshop',

}); 

app.use(express.json());

app.post('/pets', (req, res) =>{
    const{name, age, kind} = req.body;

    pool.query('INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3) RETURNING *', [name, age, kind],  (err, data) =>{
        if (err || name === undefined || age - age != 0 || kind === undefined){
            res.status(400);
            res.set('Content-Type', 'text/plain')
            res.send('Bad Request')
        } else{
            res.send(data.rows[0]);
        }
    })
} )

app.get('/pets', (req, res) =>{
    pool.query('SELECT * FROM pets', (err, data) =>{
        console.log(data.rows)
        res.send(data.rows);
    });
});

// app.get('/pets/:id', (req, res) =>{
//     const id = parseInt(req.params.id); 
//     pool.query(`SELECT * FROM pets WHERE id = ${id}`, (err, data) =>{
//         res.send(data.rows)
//     })
// });  -----> This is a security concern ... SQL injection

// fix might be 'paramatarized query', adding placeholders to query
app.get('/pets/:id', (req, res) =>{
    const id = parseInt(req.params.id); 
    pool.query('SELECT * FROM pets WHERE id =$1',[id],  (err, data) =>{
    // $1 = placeholder , can contain more than 1,  ex. $1, $2, $3;   
        if (err || data.rowCount === 0){
            res.status(500)
            res.send('Invalid input')
        } 
        res.status(200)
        res.send(data.rows)
    })
});

app.patch('/pets/:id', (req, res) =>{
    const {id} = req.params; 
    const{name, age, kind} = req.body; 

    pool.query(
        `
        UPDATE pets
        SET name = COALESCE($1, name), 
            age = COALESCE($2, age), 
            kind = COALESCE($3, kind)
        WHERE id = $4
        RETURNING *
    
        `, [name, age, kind, id], (err, data) =>{
            res.send(data.rows)
        }
    )

})

app.delete('/pets/:id', (req, res) =>{
    const id = parseInt(req.params.id); 
    console.log(res.body)
    pool.query('delete FROM pets WHERE id =$1 RETURNING *;',[id],(err, data) =>{  
        //RETURNING returns result                                                  
    res.send(data.rows)
    })
});



app.use((err, req, res, next) => {
    res.sendStatus(500)
  }); 
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
}); 