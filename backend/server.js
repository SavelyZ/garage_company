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

// Получит список ТС
app.get('/get-boxes', (req, res) => {
    const sql = `
    SELECT
      b.Kod_Box,
      b.Status_Zanyatosti,
      c.Kod_Car,
      c.Model AS Model_Avto,
      k.FIO AS FIO_Vladeltsa,
      k.Telephone_Number AS Telefon_Vladeltsa,
      m.Name AS Marka_Avto
    FROM
      Garage_Company.Box AS b
    LEFT JOIN
      Garage_Company.Car AS c ON b.Kod_Box = c.Kod_Car
    LEFT JOIN
      Garage_Company.Klient k ON c.Kod_Klienta = k.Kod_Klienta
    LEFT JOIN
      Garage_Company.Marka m ON c.Kod_Marki = m.Kod_Marki;
  `;
    db.query(sql, (err, result) => {
        if (err)
            return res.json({ Message: "Error server" });
        return res.json(result);
    })
});

app.listen(8081, ()=>{
    console.log("listening...");
})