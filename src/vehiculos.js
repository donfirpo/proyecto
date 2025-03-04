const express = require('express');
const conexion = require('./config/conexion');
const router = express.Router();

router.get('/', (req, res) => {
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


router.get('/:id', (req, res) => {
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


router.post('/', (req, res) => {
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


router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
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

module.exports = router; 

/*{
    "Marca":"Toyota", 
    "Modelo":"Corolla", 
    "Anio":2022, 
    "Precio":200100, 
    "Kilometraje":100,
    "Color":"Negro", 
    "VIN":"SFS4D5F6SFS4SS4", 
    "Placa":"BOB-546"
  }*/