import express from 'express';
import path from 'path';
import handleRender from './handleRender';

const app = express();

app.use((req, res, next) => { // https://enable-cors.org/server_expressjs.html
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', handleRender); // SPA default route

app.listen(3000, () => {
  console.log('listening on *:3000'); // eslint-disable-line no-console
});
