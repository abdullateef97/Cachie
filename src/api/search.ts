import { Request, Response } from 'express';
import * as helpers from '../helper';
import * as controllers from '../controllers';

export default function () {
  
  function POST(req: Request, res: Response) {
    const body = req.body;
    if (!body.search_query) return helpers.badRequestError(res, 'no search_query in request body');
    const response = controllers.search(body.search_query);
    helpers.successResponse(res, response);
  }

  POST.apiDoc = {
    summary: 'accepts a search query',
    operationId: 'search',
    parameters: [
      {
        in: 'body',
        name: 'search-body',
        schema: {
          $ref: '#/definitions/schema/SearchBody',
        },
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'search response',
        schema: {
          $ref: '#/definitions/schemas/Search',
        },
      },
    },
  };

  let operations = {
    POST,
  };

  return operations;
}