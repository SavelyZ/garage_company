import  express  from 'express';
import mysql from 'mysql';
import cors from 'cors'

const app = express();
app.use(cors());

// принудительное преобразование данных в json
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'garage_company',
});


db.connect(function(err){
    if(err)
        console.log(err);
    else{
        console.log('succesful connetion to database...');
        db.query('show tables', (err, res)=>{console.log(res)});
    } 
})

//api

app.listen(8081, ()=>{
    console.log("listening...");
})