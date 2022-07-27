import pg from 'pg'
const {Client} = pg; 
const {Pool} = pg;
const client = new Client()

const pool = new Pool({
    database: 'petshop',

}); 

pool.query('SELECT * FROM pets', (err, res) =>{
    console.log(res.rows);
    pool.end()
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  }); 