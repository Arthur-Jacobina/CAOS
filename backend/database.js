import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getManagers(){
    const [result] = await pool.query("SELECT * FROM Managers")
    return result
}

export async function getManager(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM Managers
    WHERE managerID = ?
    `, [id])
    return result[0]
}


export async function addManager(wallet){
    const [result] = await pool.query(`
    INSERT INTO Managers (wallet)
    VALUES(?)
    `, [wallet])
    const id = result.insertId
    return getManager(id)
}

export async function getResidents(){
    const [result] = await pool.query("SELECT * FROM Residents")
    return result
}

export async function getResident(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM Residents
    WHERE residentID = ?
    `, [id])
    return result[0]
}

export async function addResident(wallet, propertyID){
    const [result] = await pool.query(`
    INSERT INTO Residents (wallet, propertyID)
    VALUES(?, ?)
    `, [wallet, propertyID])
    const id = result.insertId
    return getResident(id)
}

export async function getProperties(){
    const [result] = await pool.query("SELECT * FROM Properties")
    return result
}

export async function getProperty(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM Properties
    WHERE propertyID = ?
    `, [id])
    return result[0]
}

export async function getPropertyByManagerId(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM Properties
    WHERE managerID = ?
    `, [id])
    return result[0]
} 

export async function addProperty(propertyName, Rent, Bills, Maintenance, Event, ERC, managerID){
    const [result] = await pool.query(`
    INSERT INTO Properties (propertyName, Rent, Bills, Maintenance, Event, ERC, managerID)
    VALUES(?, ?,?,?,?,?,?)
    `, [propertyName, Rent, Bills, Maintenance, Event, ERC, managerID])
    const id = result.insertId
    return getProperty(id)
}

export async function getResidentsTransactions(){
    const [result] = await pool.query("SELECT * FROM ResidentsTransactions")
    return result
}

export async function getResidentTransaction(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM ResidentsTransactions
    WHERE resitrID = ?
    `, [id])
    return result[0]
}

export async function addResidentTransaction(value, type, residentID){
    const [result] = await pool.query(`
    INSERT INTO ResidentsTransactions (value, type, residentID)
    VALUES(?,?,?)
    `, [value, type, residentID])
    const id = result.insertId
    return getResidentTransaction(id)
}

export async function getPropertiesTransactions(){
    const [result] = await pool.query("SELECT * FROM PropertiesTransactions")
    return result
}

export async function getPropertyTransaction(id) {
    const [result] = await pool.query(`
    SELECT *
    FROM PropertiesTransactions
    WHERE resitrID = ?
    `, [id])
    return result[0]
}

export async function addPropertyTransaction(value, type, propertyID){
    const [result] = await pool.query(`
    INSERT INTO PropertiesTransactions (value, type, propertyID)
    VALUES(?,?,?)
    `, [value, type, propertyID])
    const id = result.insertId
    return getPropertyTransaction(id)
}