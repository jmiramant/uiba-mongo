import mongoose, {
  Schema
} from 'mongoose';
import _ from 'lodash';
import {
  arkhamApi,
} from '../../config/secrets';
import request from 'request';

export function post(req, res) {
  const data = {
    "profile_ids": req.body.profile_ids,
    "job_filter": req.body.job_filters
  }

  request({
    url: arkhamApi.score_url,
    headers: {
      "x-api-key": arkhamApi.access_token
    },
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

  request({
    url: arkhamApi.sync_url,
    headers: {
      "x-api-key": arkhamApi.access_token
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