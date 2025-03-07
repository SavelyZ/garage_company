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
  Car.Kod_Car,
  Car.Kod_Box,
  Marka.Name AS Marka_Avto,
  Car.Model AS Model_Avto,
  Klient.Telephone_Number AS Telefon_Vladeltsa,
  Box.Status_Zanyatosti,
  Klient.FIO AS FIO_Vladeltsa
  FROM Car
    JOIN Box ON Car.Kod_Box = Box.Kod_Box
    JOIN Marka ON Car.Kod_Marki = Marka.Kod_Marki
    JOIN Klient ON Car.Kod_Klienta = Klient.Kod_Klienta;`;
  //   const sql = `
  //   SELECT
  //     b.Kod_Box,
  //     b.Status_Zanyatosti,
  //     c.Kod_Car,
  //     c.Model AS Model_Avto,
  //     k.FIO AS FIO_Vladeltsa,
  //     k.Telephone_Number AS Telefon_Vladeltsa,
  //     m.Name AS Marka_Avto
  //   FROM
  //     Garage_Company.Box AS b
  //   LEFT JOIN
  //     Garage_Company.Car AS c ON b.Kod_Box = c.Kod_Car
  //   LEFT JOIN
  //     Garage_Company.Klient k ON c.Kod_Klienta = k.Kod_Klienta
  //   LEFT JOIN
  //     Garage_Company.Marka m ON c.Kod_Marki = m.Kod_Marki;
  // `;
    db.query(sql, (err, result) => {
        if (err)
            return res.json({ Message: "Error server" });
        return res.json(result);
    })
});


// Получит список клиентов
app.get('/get-clients', (req, res) => {
  const sql = `SELECT * FROM Klient`;
  db.query(sql, (err, result) => {
      if (err)
          return res.json({ Message: "Error server" });
      return res.json(result);
  })
});

// Получит список боксов
app.get('/get-boxes', (req, res) => {
  const sql =  'SELECT * FROM Box WHERE Status_Zanyatosti = ?';
  const status = 'Свободен';
  db.query(sql,[status], (err, result) => {
      if (err)
          return res.json({ Message: "Error server" });
      return res.json(result);
  })
});

//получить список марок
app.get('/get-marks', (req, res) => {
  const sql = `SELECT * FROM Marka`;
  db.query(sql, (err, result) => {
      if (err)
          return res.json({ Message: "Error server" });
      return res.json(result);
  })
});

// добавить новый бокс 
app.post('/add-new-box', (req, res) => {
  const Status_Zanyatosti = 'Свободен'
  const sql = 'INSERT INTO Box (Status_Zanyatosti) VALUES (?)';
  db.query(sql,[Status_Zanyatosti], (err, result) => {
      if (err)
          return res.json({ Message: "Error server", err });
      return res.json({status: 200});
  })
});

// добавить нового клиента
app.post('/add-new-client', (req, res) => {
  const { FIO,Telephone_Number} = req.body;
  if (!FIO || !Telephone_Number) {
    return res.status(400).json({ error: 'FIO and Telephone_Number are required' });
  }
  const sql = 'INSERT INTO Klient (FIO, Telephone_Number) VALUES (?, ?)';
  db.query(sql,[FIO, Telephone_Number], (err, result) => {
      if (err)
          return res.json({ Message: "Error server", err });
      return res.json({status: 200});
  })
});

// добавить новоую марку
app.post('/add-new-mark', (req, res) => {
  const { Name} = req.body;
  if (!Name) {
    return res.status(400).json({ error: 'FIO and Telephone_Number are required' });
  }
  const sql = 'INSERT INTO Marka (Name) VALUES (?)';
  db.query(sql,[Name], (err, result) => {
      if (err)
          return res.json({ Message: "Error server", err });
      return res.json({status: 200});
  })
});

// добавить новоую запись в таблие car
app.post('/add-new-order', (req, res) => {

  const { Kod_Box, Kod_Klienta, Kod_Marki, Model } = req.body;
    // Проверка наличия обязательных полей
    if (!Kod_Box || !Kod_Klienta || !Kod_Marki || !Model) {
      return res.status(400).json({ error: 'Kod_Box, Kod_Klienta, Kod_Marki, and Model are required' });
    }
  const sql = 'INSERT INTO Car (Kod_Box, Kod_Klienta, Kod_Marki, Model) VALUES (?, ?, ?, ?)';
  db.query(sql,[Kod_Box, Kod_Klienta, Kod_Marki, Model], (err, result) => {
      if (err)
          return res.json({ Message: "Error server", err });
      return res.json({status: 200});
  })

  // const sqlUpdateBoxStatus = 'UPDATE Box SET Status_Zanyatosti = ? WHERE Kod_Box = ?';
  // const status = 'Занят';
  // db.query(sqlUpdateBoxStatus,[status, Kod_Box], (err, result) => {
  // })
});

// удалить запись в таблие car
app.post('/delete-order', (req, res) => {

  const { Kod_Car } = req.body;
    // Проверка наличия обязательных полей
    if (!Kod_Car) {
      return res.status(400).json({ error: 'Kod_Car not correct!' });
    }
  const sql = 'INSERT INTO Car (Kod_Box, Kod_Klienta, Kod_Marki, Model) VALUES (?, ?, ?, ?)';
  db.query(sql,[Kod_Box, Kod_Klienta, Kod_Marki, Model], (err, result) => {
      if (err)
          return res.json({ Message: "Error server", err });
      return res.json({status: 200});
  })

  const sqlUpdateBoxStatus = 'UPDATE Box SET Status_Zanyatosti = ? WHERE Kod_Box = ?';
  const status = 'Занят';
  db.query(sqlUpdateBoxStatus,[status, Kod_Box], (err, result) => {
      if (err)
          return res.json({ Message: "Error server", err });
      return res.json({status: 200});
  })
});

app.listen(8081, ()=>{
    console.log("listening...");
})