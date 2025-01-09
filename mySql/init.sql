USE garage_company;
/*Создание*/
CREATE TABLE Box (
  Kod_Box INT PRIMARY KEY,
  Status_Zanyatosti VARCHAR(20)
);

CREATE TABLE Car (
  Kod_Car INT PRIMARY KEY,
  Kod_Box INT,
  Kod_Klienta INT,
  Kod_Marki INT,
  Model VARCHAR(50),
  FOREIGN KEY (Kod_Box) REFERENCES Box(Kod_Box),
  FOREIGN KEY (Kod_Klienta) REFERENCES Klient(Kod_Klienta),
  FOREIGN KEY (Kod_Marki) REFERENCES Marka(Kod_Marki)
);

CREATE TABLE Klient (
  Kod_Klienta INT PRIMARY KEY,
  FIO VARCHAR(100),
  Telephone_Number VARCHAR(20)
);	

CREATE TABLE Marka (
  Kod_Marki INT PRIMARY KEY,
  Name VARCHAR(50)
);
/*Наполнение*/
INSERT INTO Box (Kod_Box, Status_Zanyatosti)
VALUES
  (3, 'Занят'),
  (4, 'Свободен');
  
INSERT INTO Car (Kod_Car, Kod_Box, Kod_Klienta, Kod_Marki, Model)
VALUES
  (1, 1, 1, 1, 'Toyota Camry'),
  (2, 2, 2, 2, 'BMW 5 Series'),
  (3, 3, 3, 3, 'Mercedes-Benz E-Class');
  
  INSERT INTO Klient (Kod_Klienta, FIO, Telephone_Number)
VALUES
  (1, 'Иванов Иван Иванович', '+79211234567'),
  (2, 'Петров Петр Петрович', '+79115678901'),
  (3, 'Сидоров Сидор Сидорович', '+79012345678');
  
  INSERT INTO Marka (Kod_Marki, Name)
VALUES
  (1, 'Toyota'),
  (2, 'BMW'),
  (3, 'Mercedes-Benz');
  
  SELECT VERSION();
  
  /* чинит ошибку при подключении клиента */
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; 