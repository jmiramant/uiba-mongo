import mongoose, {
  Schema
} from 'mongoose';
import _ from 'lodash';
import request from 'request';

export function post(req, res) {
  const data = {
    "profile_ids": req.body.profile_ids,
    "job_filter": req.body.job_filters
  }

  // url: 'https://nisn4kwnfb.execute-api.us-east-1.amazonaws.com/multiends/score/v1/test' + process.env.NODE_ENV,
  request({
    url: 'https://nisn4kwnfb.execute-api.us-east-1.amazonaws.com/multiends/score/v1/test',
    json: JSON.parse(JSON.stringify(data).replace(/'/g, '"')),
    method: 'POST'
  }, (err, response, body) => {
    if (err) return res.status(404).send({err: err});
    return res.json(body['body-json']['results']);
  });
}

export default {
  post,
};