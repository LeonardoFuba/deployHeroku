import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';
import errorHandler from './errors/handler';

import 'express-async-errors'
import 'dotenv/config';

const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'http://alira.vercel.app',
  'https://df2a9c27470d.ngrok.io'
];

app.use(cors({
  origin: (origin='http://alira:3000', callback) => {

    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));

// [
//   'http://localhost:3000',
//   'http://alira.vercel.app',
//   'http://aliranotes.com.br',
//   'http://743d62eba705.ngrok.io'
// ]

// app.use(cors({ origin: 'http://localhost:3000'          }));
// app.use(cors({ origin: 'http://743d62eba705.ngrok.io'   }));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(morgan('dev'));
app.use('/files', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(process.env.PORT || 3333);
