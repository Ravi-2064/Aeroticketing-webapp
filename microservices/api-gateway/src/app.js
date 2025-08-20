const Hapi = require('@hapi/hapi');
const Wreck = require('@hapi/wreck');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Route to proxy requests to flights service
    server.route({
        method: 'GET',
        path: '/flights',
        handler: async (request, h) => {
            try {
                const { payload } = await Wreck.get('http://localhost:8080/api/flights');
                return JSON.parse(payload.toString());
            } catch (error) {
                console.error('Error connecting to flights service:', error.message);
                return h.response({ error: 'Unable to fetch flights' }).code(500);
            }
        }
    });

    // Health check endpoint
    server.route({
        method: 'GET',
        path: '/health',
        handler: (request, h) => {
            return { status: 'API Gateway is running' };
        }
    });

    await server.start();
    console.log('API Gateway running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();