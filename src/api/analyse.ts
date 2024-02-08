import { Request, Response } from 'express';
import * as helpers from '../helper';
import * as controllers from '../controllers';

export default function () {
  
  function GET(req: Request, res: Response) {
    const startTime = process.hrtime();
    const query: any = req.query;
    if (!query.analysis_token) return helpers.badRequestError(res, 'no analysis_token in request query');
    const response = controllers.analyze(query.analysis_token);
    const totalTime = process.hrtime(startTime);
    const totalTimeInMs = totalTime[0] * 1000 + totalTime[1] / 1e6;
    helpers.successResponse(res, {
      ...response,
      time: `${totalTimeInMs} ms`,
    });
  }

  GET.apiDoc = {
    summary: 'returns number of times a phrase was found',
    operationId: 'analyse',
    parameters: [
      {
        name: 'analysis_token',
        in: 'query',
        required: true,
        type: 'string',
      },
    ],
    responses: {
      200: {
        'application/json': {
          schema: {
            $ref: '#/definitions/schemas/Analyse',
          },
        },
      },
    },
  };

  let operations = {
    GET,
  };

  return operations;
}