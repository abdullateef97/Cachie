import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import yamlJS from 'yamljs';
import path from 'path';

import * as middlewares from './middlewares';
import api from './api';

require('dotenv').config();

const app = express();

const swaggerDoc = yamlJS.load(path.resolve(__dirname, 'api-definition.yml'));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
