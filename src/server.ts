import http from 'http'
import express, { Express } from 'express'
import morgan from 'morgan'
import routes from './routes/QuoteRouter'
import {local_port} from '../config';

const router: Express = express();

// "logging"
router.use(morgan('dev'));
// request parsing
router.use(express.urlencoded({ extended: false }));
// json data
router.use(express.json());

// API rules
router.use((req, res, next) => {
    // CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

// routes
router.use('/', routes);

// TODO: improve error handling
// error handling
router.use((req, res, query) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message
    });
});

// Server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? local_port;
httpServer.listen(PORT, () => console.log('The server is running. Port:', PORT));