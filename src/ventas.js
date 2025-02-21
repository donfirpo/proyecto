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

// Obtener todas las ventas
app.get('/ventas', (req, res) => {
    let sql = 'CALL pObtenerVentas()';
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al obtener las ventas' });
        } else {
            res.json(resultados[0]);
        }
    });
});

// Obtener una venta por ID
app.get('/ventas/:id', (req, res) => {
    let sql = 'CALL pObtenerVentaPorID(?)';
    conexion.execute(sql, [req.params.id], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al obtener la venta' });
        } else {
            res.json(resultados[0]);
        }
    });
});

// Insertar una nueva venta
app.post('/ventas', (req, res) => {
    let { ID_Cliente, ID_Vendedor, ID_Vehiculo, Precio_Venta, Tipo_Pago, Estado_Venta } = req.body;
    let sql = 'CALL pVenta(?, ?, ?, ?, ?, ?, ?)';

    conexion.execute(sql, [0, ID_Cliente, ID_Vendedor, ID_Vehiculo, Precio_Venta, Tipo_Pago, Estado_Venta], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al insertar la venta' });
        } else {
            res.json({ mensaje: 'Venta insertada correctamente' });
        }
    });
});

// Actualizar una venta
app.put('/ventas/:id', (req, res) => {
    let { ID_Cliente, ID_Vendedor, ID_Vehiculo, Precio_Venta, Tipo_Pago, Estado_Venta } = req.body;
    let sql = 'CALL pActualizarVenta(?, ?, ?, ?, ?, ?, ?)';

    conexion.execute(sql, [req.params.id, ID_Cliente, ID_Vendedor, ID_Vehiculo, Precio_Venta, Tipo_Pago, Estado_Venta], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al actualizar la venta' });
        } else {
            res.json({ mensaje: 'Venta actualizada correctamente' });
        }
    });
});

// Eliminar una venta
app.delete('/ventas/:id', (req, res) => {
    let sql = 'CALL pEliminarVenta(?)';

    conexion.execute(sql, [req.params.id], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al eliminar la venta' });
        } else {
            res.json({ mensaje: 'Venta eliminada correctamente' });
        }
    });
});

app.listen(puerto, function () {
    console.log('Servidor ejecutándose en el puerto: ' + puerto);
});
