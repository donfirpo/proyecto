const express = require('express');
const conexion = require('./config/conexion');
const router =express.Router();

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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


router.post('/', (req, res) => {
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


router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
module.exports = router; 


/*{
    "ID_Venta":1, 
    "Entidad_Financiera":"Banco Fie", 
    "Monto_Financiado":50000.00, 
    "Tasa_Interes":3.2, 
    "Plazo_Meses":10, 
    "Cuota_Mensual":5000, 
    "Fecha_Inicio":"2025/01/15", 
    "Estado_Financiamiento":"Aprobado"
    }*/