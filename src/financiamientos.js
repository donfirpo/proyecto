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

// Obtener todos los financiamientos
app.get('/financiamientos', (req, res) => {
    let sql = 'CALL pObtenerFinanciamientos()';
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al obtener los financiamientos' });
        } else {
            res.json(resultados[0]);
        }
    });
});

// Obtener un financiamiento por ID
app.get('/financiamientos/:id', (req, res) => {
    let sql = 'CALL pObtenerFinanciamientoPorID(?)';
    conexion.execute(sql, [req.params.id], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al obtener el financiamiento' });
        } else {
            res.json(resultados[0]);
        }
    });
});

// Insertar un nuevo financiamiento
app.post('/financiamientos', (req, res) => {
    let { ID_Venta, Entidad_Financiera, Monto_Financiado, Tasa_Interes, Plazo_Meses, Cuota_Mensual, Fecha_Inicio, Estado_Financiamiento } = req.body;
    let sql = 'CALL pFinanciamiento(?, ?, ?, ?, ?, ?, ?, ?, ?)';

    conexion.execute(sql, [0, ID_Venta, Entidad_Financiera, Monto_Financiado, Tasa_Interes, Plazo_Meses, Cuota_Mensual, Fecha_Inicio, Estado_Financiamiento], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al insertar el financiamiento' });
        } else {
            res.json({ mensaje: 'Financiamiento insertado correctamente' });
        }
    });
});

// Actualizar un financiamiento
app.put('/financiamientos/:id', (req, res) => {
    let { ID_Venta, Entidad_Financiera, Monto_Financiado, Tasa_Interes, Plazo_Meses, Cuota_Mensual, Fecha_Inicio, Estado_Financiamiento } = req.body;
    let sql = 'CALL pActualizarFinanciamiento(?, ?, ?, ?, ?, ?, ?, ?, ?)';

    conexion.execute(sql, [req.params.id, ID_Venta, Entidad_Financiera, Monto_Financiado, Tasa_Interes, Plazo_Meses, Cuota_Mensual, Fecha_Inicio, Estado_Financiamiento], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al actualizar el financiamiento' });
        } else {
            res.json({ mensaje: 'Financiamiento actualizado correctamente' });
        }
    });
});

// Eliminar un financiamiento
app.delete('/financiamientos/:id', (req, res) => {
    let sql = 'CALL pEliminarFinanciamiento(?)';

    conexion.execute(sql, [req.params.id], (err, resultados) => {
        if (err) {
            console.log(err);
            res.status(500).json({ mensaje: 'Error al eliminar el financiamiento' });
        } else {
            res.json({ mensaje: 'Financiamiento eliminado correctamente' });
        }
    });
});

app.listen(puerto, function () {
    console.log('Servidor ejecutándose en el puerto: ' + puerto);
});
