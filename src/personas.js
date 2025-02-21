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
        console.log('Conexión exitosa !!!');
    }
});

// Obtener todas las personas
app.get('/personas', (req, res) => {
    let sql = 'CALL getPersonas()';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.json({ mensaje: 'Error al obtener personas' });
        } else {
            res.json(result[0]); // result[0] contiene el resultado de la llamada al procedimiento almacenado
        }
    });
});

// Insertar persona
app.post('/personas', function (req, res) {
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

// Actualizar persona
app.put('/personas/:id', function (req, res) {
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

// Eliminar persona
app.delete('/personas/:id', function (req, res) {
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

app.listen(puerto, function () {
    console.log('Servidor OK en puerto: ' + puerto);
});
