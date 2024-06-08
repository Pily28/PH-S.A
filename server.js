const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const dbConfig = {
    user: 'tu_usuario',
    password: 'tu_contraseña',
    server: 'tu_servidor', // e.g. 'localhost' o una dirección IP
    database: 'PHSA',
    options: {
        encrypt: true, // Usar en caso de Azure
        trustServerCertificate: true // Cambiar a true para desarrollo local y self-signed certs
    }
};

sql.connect(dbConfig, err => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
    } else {
        console.log('Conectado a la base de datos.');
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const request = new sql.Request();
        request.input('Username', sql.NVarChar, username);
        request.input('Email', sql.NVarChar, email);
        request.input('PasswordHash', sql.NVarChar, hashedPassword);

        const result = await request.query(`
            INSERT INTO Users (Username, Email, PasswordHash)
            VALUES (@Username, @Email, @PasswordHash)
        `);

        res.status(200).send('Registro exitoso');
    } catch (err) {
        console.error('Error registrando al usuario: ', err);
        res.status(500).send('Error en el registro');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const request = new sql.Request();
        request.input('Email', sql.NVarChar, email);

        const result = await request.query(`
            SELECT * FROM Users WHERE Email = @Email
        `);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Comparar la contraseña
            const match = await bcrypt.compare(password, user.PasswordHash);
            if (match) {
                res.status(200).send('Inicio de sesión exitoso');
            } else {
                res.status(401).send('Contraseña incorrecta');
            }
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        console.error('Error en el inicio de sesión: ', err);
        res.status(500).send('Error en el inicio de sesión');
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
