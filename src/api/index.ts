import express from 'express';
import * as controllers from '../controllers';
import * as helpers from '../helper';
const router = express.Router();

router.post('/search', (req, res) => {
  const body = req.body;
  if (!body.search_query) return helpers.badRequestError(res, 'no search_query in request body');
  const response = controllers.search(body.search_query);
  helpers.successResponse(res, response);
});

router.get('/analyse', (req, res) => {
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
});


export default router;
