import { SwaggerOptions } from 'swagger-jsdoc';

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight Reservation Management System API',
      version: '1.0.0',
      description: 'API documentation for the Flight Reservation Management System',
      contact: {
        name: 'API Support',
        email: 'support@flightreservation.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export default swaggerOptions; 