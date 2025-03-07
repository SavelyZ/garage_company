create database garage_company;
USE garage_company;
/*Создание*/
CREATE TABLE Box (
  Kod_Box INT AUTO_INCREMENT PRIMARY KEY,
  Status_Zanyatosti VARCHAR(20)
);

CREATE TABLE Car (
  Kod_Car INT AUTO_INCREMENT PRIMARY KEY,
  Kod_Box INT,
  Kod_Klienta INT,
  Kod_Marki INT,
  Model VARCHAR(50),
  FOREIGN KEY (Kod_Box) REFERENCES Box(Kod_Box),
  FOREIGN KEY (Kod_Klienta) REFERENCES Klient(Kod_Klienta),
  FOREIGN KEY (Kod_Marki) REFERENCES Marka(Kod_Marki)
);

CREATE TABLE Klient (
  Kod_Klienta INT AUTO_INCREMENT PRIMARY KEY,
  FIO VARCHAR(100),
  Telephone_Number VARCHAR(20)
);	

CREATE TABLE Marka (
  Kod_Marki INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50)
);
/*Наполнение*/
INSERT INTO Box (Status_Zanyatosti) VALUES
('Свободен'),  -- Kod_Box = 1
('Занят'),     -- Kod_Box = 2
('Свободен'),  -- Kod_Box = 3
('Занят');     -- Kod_Box = 4

-- Заполнение таблицы Marka
INSERT INTO Marka (Name) VALUES
('Toyota'),  -- Kod_Marki = 1
('BMW'),     -- Kod_Marki = 2
('Audi'),    -- Kod_Marki = 3
('Lada');    -- Kod_Marki = 4

-- Заполнение таблицы Klient
INSERT INTO Klient (FIO, Telephone_Number) VALUES
('Иванов Иван Иванович', '+79123456789'),      -- Kod_Klienta = 1
('Петров Петр Петрович', '+79234567890'),      -- Kod_Klienta = 2
('Сидоров Сидор Сидорович', '+79345678901'),   -- Kod_Klienta = 3
('Кузнецов Алексей Владимирович', '+79456789012'); -- Kod_Klienta = 4

-- Заполнение таблицы Car
INSERT INTO Car (Kod_Box, Kod_Klienta, Kod_Marki, Model) VALUES
(1, 1, 1, 'Corolla'),  -- Автомобиль Toyota Corolla в боксе 1, клиент 1
(2, 2, 2, 'X5'),       -- Автомобиль BMW X5 в боксе 2, клиент 2
(3, 3, 3, 'A4'),       -- Автомобиль Audi A4 в боксе 3, клиент 3
(4, 4, 4, 'Vesta');    -- Автомобиль Lada Vesta в боксе 4, клиент 4
  
  SELECT VERSION();
  
  /* чинит ошибку при подключении клиента */
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; 