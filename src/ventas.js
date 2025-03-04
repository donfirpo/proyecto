const express = require('express');
const conexion = require('./config/conexion');
const router =express.Router();

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
module.exports = router; 


/*{
  "ID_Cliente":1, 
  "ID_Vendedor":2, 
  "ID_Vehiculo":1, 
  "Precio_Venta":200100.00, 
  "Tipo_Pago":"Efectivo", 
  "Estado_Venta":"Completada"
}*/