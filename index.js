// Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter.js').router;
const swaggerJsdoc = require("swagger-jsdoc"),
 swaggerUi = require("swagger-ui-express");

// Constante
const DOMAIN   = 'localhost';
const PORT     = 5000;
const BASE_URL = `http://${DOMAIN}:${PORT}` 
const NAME     = "/api";

// Swagger Setting
const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Perace API documentation",
            version: "0.1.0",
            description:
                "API application made with Node + Express and documented with Swagger",
            license: {
                name: "",
                url: "",
            },
            contact: {
                name: "ENEO CAMEROON",
                url: "",
                email: "DigitalApplication.Team@eneo.cm",
            },
        },
        servers: [
            {
                url: `${BASE_URL}`,
            },
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
            },
        },
    },
    
    apis: ["./routes/*.js", "./apiRouter.js",  "./index.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);


// Instanciate server
const app = express();


// Body Paeser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(`${NAME}`, apiRouter);


app.listen(PORT, () => console.log(`Server running on port: ${BASE_URL}`));