const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());
const puerto = 4000;

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'VentaVehiculos'
});

conexion.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Conexión exitosa a la base de datos VentaVehiculos');
    }
});

// Obtener todos los vehículos
app.get('/vehiculos', (req, res) => {
    let sql = 'CALL pObtenerVehiculos()';
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al obtener los vehículos' });
        } else {
            res.json(resultados[0]);
        }
    });
});

// Obtener un vehículo por ID
app.get('/vehiculos/:id', (req, res) => {
    let sql = 'CALL pObtenerVehiculoPorID(?)';
    conexion.execute(sql, [req.params.id], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al obtener el vehículo' });
        } else {
            res.json(resultados[0]);
        }
    });
});

// Insertar un nuevo vehículo
app.post('/vehiculos', (req, res) => {
    let { Marca, Modelo, Anio, Precio, Kilometraje, Color, VIN, Placa } = req.body;
    let sql = 'CALL pVehiculo(?, ?, ?, ?, ?, ?, ?, ?, ?)';

    conexion.execute(sql, [0, Marca, Modelo, Anio, Precio, Kilometraje, Color, VIN, Placa], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al insertar el vehículo' });
        } else {
            res.json({ mensaje: 'Vehículo insertado correctamente' });
        }
    });
});

// Actualizar un vehículo
app.put('/vehiculos/:id', (req, res) => {
    let { Marca, Modelo, Anio, Precio, Kilometraje, Color, VIN, Placa } = req.body;
    let sql = 'CALL pActualizarVehiculo(?, ?, ?, ?, ?, ?, ?, ?, ?)';

    conexion.execute(sql, [req.params.id, Marca, Modelo, Anio, Precio, Kilometraje, Color, VIN, Placa], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al actualizar el vehículo' });
        } else {
            res.json({ mensaje: 'Vehículo actualizado correctamente' });
        }
    });
});

// Eliminar un vehículo
app.delete('/vehiculos/:id', (req, res) => {
    let sql = 'CALL pEliminarVehiculo(?)';

    conexion.execute(sql, [req.params.id], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al eliminar el vehículo' });
        } else {
            res.json({ mensaje: 'Vehículo eliminado correctamente' });
        }
    });
});

app.listen(puerto, function () {
    console.log('Servidor ejecutándose en el puerto: ' + puerto);
});
