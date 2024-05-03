require('dotenv').config();
import http from 'http';
import express from 'express';
const app =express();
const server = http.createServer(app);
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({
    extended:true,
}

));
import '@config/database'
import cors from 'cors';
import { CONFIG } from '@helpers/constant';
app.use(cors({
    origin:"*",
    optionsSuccessStatus:200,
}));
import morgan from 'morgan';
app.use(
    morgan('dev', {
      skip(req, res) {
        // eslint-disable-next-line no-empty
        if (res) {}
        if (req.originalUrl.indexOf('path') >= 0) {
          return true;
        }
        return false;
      },
    }),
  );
const api = express.Router();
api.use(
    express.urlencoded({
        limit:'100mb',
        extended:true
    })
);
api.use(
    express.json({
        limit:'100mb',
    })
);
app.use('/api',api);
require('@apis/api')(api);
setTimeout(()=>{
server.listen(CONFIG.PORT);
console.log("server is running on port http://localhost:4223");
},300);