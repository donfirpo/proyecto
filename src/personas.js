const express = require('express');
const conexion = require('./config/conexion');
const router =express.Router();
router.get('/', (req, res) => {
    let sql = 'CALL getPersonas()';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.json({ mensaje: 'Error al obtener personas' });
        } else {
            res.json(result[0]); 
        }
    });
});

router.post('/', function (req, res) {
    let { nombre, apellido_paterno, apellido_materno, direccion, ci, telefono_movil, correo, tipo_persona } = req.body;
    let sql = 'CALL pPersona(?, ?, ?, ?, ?, ?, ?, ?, ?)';

    conexion.execute(sql, [0, nombre, apellido_paterno, apellido_materno, direccion, ci, telefono_movil, correo, tipo_persona], function (err, results) {
        if (err) {
            console.log('Error en la consulta:', err.message);
            return res.json({ mensaje: 'Error no se adicionó' });
        } else {
            res.json(results);
            console.log('Positiva, se adicionó');
        }
    });
});


router.put('/:id', function (req, res) {
    let id = req.params.id;
    let { nombre, apellido_paterno, apellido_materno, direccion, ci, telefono_movil, correo, tipo_persona } = req.body;
    let sql = 'CALL updatePersona(?, ?, ?, ?, ?, ?, ?, ?, ?)';

    conexion.execute(sql, [id, nombre, apellido_paterno, apellido_materno, direccion, ci, telefono_movil, correo, tipo_persona], function (err, results) {
        if (err) {
            console.log('Error en la consulta:', err.message);
            return res.json({ mensaje: 'Error al actualizar la persona' });
        } else {
            res.json('Persona actualizada correctamente');
        }
    });
});


router.delete('/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'CALL deletePersona(?)';

    conexion.execute(sql, [id], function (err, results) {
        if (err) {
            console.log('Error en la consulta:', err.message);
            return res.json({ mensaje: 'Error al eliminar la persona' });
        } else {
            res.json('Persona eliminada correctamente');
        }
    });
});
module.exports = router; 


/*{
    "nombre": "Mica",
    "apellido_paterno": "Ramos",
    "apellido_materno": "Bonilla",
    "direccion":"Camacho",
    "ci":78946465,
    "telefono_movil":75249456,
    "correo":"mica@gmail.com",
    "tipo_persona":"Cliente"
    
  }*/