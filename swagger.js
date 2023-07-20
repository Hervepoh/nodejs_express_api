const swaggerAutogen = require('swagger-autogen')()

swaggerAutogen('./docs/swagger-output.json', ['./index.js','./apiRouter.js']);