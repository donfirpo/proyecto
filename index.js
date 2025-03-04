    const express= require ('express');
    const app = express();
    app.use(express.json());
    const puerto =4000;

    const personas = require('./src/personas');
    app.use("/personas",personas);

    const vehiculos = require('./src/vehiculos');
    app.use("/vehiculos",vehiculos);

    const ventas = require('./src/ventas');
    app.use("/ventas",ventas);

    const financiamientos = require('./src/financiamientos');
    app.use("/financiamientos",financiamientos);

    app.listen(puerto, function () {
        console.log('Servidor OK en puerto: ' + puerto);
    });
