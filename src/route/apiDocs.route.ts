import path from 'path';
import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import openapiDoc from '../schema/openapi.json';

const apiDocsRouter = Router();

apiDocsRouter.use('/', swaggerUi.serve);
apiDocsRouter.get('/', swaggerUi.setup(openapiDoc));

// (optional) serve the OpenAPI specification
apiDocsRouter.use(
  '/openapi.json',
  express.static(path.join(__dirname, '../../schema/openapi.json'))
);

export default apiDocsRouter;