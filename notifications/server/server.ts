import http from 'http';
import { app } from './api/app';
import { sockets } from './utils';

  // Define Sockets Application port
  const port = process.env.PORT || 5000;

  // Defining the Host Name
  const host: any = process.env.HOST || '0.0.0.0';

  // Environment State Variable
  const env = process.env.NODE_ENV;

  // Creating Sockets Microservice Server
  const server = http.createServer(app);

  // Initializing the sockets
  sockets.init(server);

  // Exposing the server to the desired port
  server.listen(port, host, () => {
    console.log(`
    
  ⚙️  Saifco Sockets server running at: \n\t http://${host}:${port}
  
  🌏 Environment: \n\t ${env}
  `);
  });