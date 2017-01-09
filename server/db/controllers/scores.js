import mongoose, {
  Schema
} from 'mongoose';
import _ from 'lodash';
import {
  arkhamApi
} from '../../config/secrets';
import request from 'request';

export function post(req, res) {
  const data = {
    "profile_ids": req.body.profile_ids,
    "job_filter": req.body.job_filters
  }
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  // url: 'https://nisn4kwnfb.execute-api.us-east-1.amazonaws.com/multiends/score/v1/test' + process.env.NODE_ENV,
  request({
    url: 'https://nisn4kwnfb.execute-api.us-east-1.amazonaws.com/multiends/score/v1/test',
    json: JSON.parse(JSON.stringify(data).replace(/'/g, '"')),
    method: 'POST'
  }, (err, response, body) => {
    if (err) return res.status(404).send({
      err: err
    });
    return res.json(body['body-json']['results']);
  });
}


export function sync(req, res) {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  // url: 'https://sjkzjyzd44.execute-api.us-east-1.amazonaws.com/test/synchronize/v1/test' + process.env.NODE_ENV,
  request({
    url: 'https://sjkzjyzd44.execute-api.us-east-1.amazonaws.com/test/synchronize/v1/test',
    headers: {
      "x-api-key": arkhamApi.arkham_access_token
    },
    method: 'GET'
  }, (err, response, body) => {
    const resp = JSON.parse(body)["body"]["results"]
    if (err || !resp.updated) return res.status(404).send({
      err: err
    });
    return res.json(resp.status);
  });
}

export default {
  post,
  sync
};