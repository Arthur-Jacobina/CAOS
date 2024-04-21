CREATE DATABASE Orca_db;
use Orca_db;

CREATE TABLE Managers (
    managerID INT AUTO_INCREMENT PRIMARY KEY,
    wallet VARCHAR(255) NOT NULL,
);

CREATE TABLE Properties (
    propertyID INT AUTO_INCREMENT PRIMARY KEY,
    propertyName VARCHAR(255) NOT NULL,
    Rent VARCHAR(255) NOT NULL,
    Bills VARCHAR(255) NOT NULL,
    Maintenance VARCHAR(255) NOT NULL,
    Event VARCHAR(255) NOT NULL,
    ERC VARCHAR(255) NOT NULL,
    managerID INT NOT NULL,
    FOREIGN KEY(managerID) REFERENCES Managers(managerID)
);

CREATE TABLE Residents (
    residentID INT AUTO_INCREMENT PRIMARY KEY,
    propertyID INT NOT NULL,
    FOREIGN KEY(propertyID) REFERENCES Properties(propertyID)
    wallet VARCHAR(255) NOT NULL, 
);

CREATE TABLE ResidentsTransactions (
    resitrID INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    value INT NOT NULL,
    residentID INT NOT NULL,
    FOREIGN KEY(residentID) REFERENCES Residents(residentID),
    date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE PropertyTransactions (
    proptrID INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    value INT NOT NULL,
    propertytID INT NOT NULL,
    FOREIGN KEY(propertytID) REFERENCES Properties(propertytID),
    date TIMESTAMP NOT NULL DEFAULT NOW()
);