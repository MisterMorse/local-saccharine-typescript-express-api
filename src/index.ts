import http from 'http';

// It's so counterintuitive, but I have to import all of my TypeScript files
// with this JS signature to match the compiled pattern from the configuration.
import app from './app.js';

// First, I have to normalize a port into a number, string, or boolean.
const normalizePort = (val: string): number | string | boolean => {
    const port = parseInt(val, 10);

    // If it's not a number, I assume it is a named pipe and return it.
    if (isNaN(port)) {
        return val;
    }

    // If it passes a comparison check, it is a valid port number.
    if (port >= 0) {
        return port;
    }

    // I leave this fallback to communicate inability to normalize.
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// After the app is configured with a port, I can create a server from it.
const server = http.createServer(app);

// Now that I established a server, I create a listener for the "error" event.
const onError = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // I create a bind string to communicate the server's address in detail. I
    // should see the above pipe/port possibilities reflected here.
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // Handle specific listen errors with friendly messages.
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges!`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use!`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Now that the errors are handled, I create a listener for a successful listening event.
const onListening = (): void => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    console.log(`🚀 Server safely listening on ${bind}!`);
};

// Now that the standard listeners are defined, I tell the server to listen and
// attach the two defined listeners to their corresponding events.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
