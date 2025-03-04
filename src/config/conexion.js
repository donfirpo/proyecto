const mysql = require('mysql2');


const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'VentaVehiculos'
});

conexion.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Conexión exitosa a la base de datos VentaVehiculos');
    }
});


module.exports=conexion;