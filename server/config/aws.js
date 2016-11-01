import { aws } from './secrets';
import AWS from 'aws-sdk';

AWS.config = new AWS.Config();
AWS.config.accessKeyId = aws.aws_access_key_id;
AWS.config.secretAccessKey = aws.aws_secret_access_key;
AWS.config.update({region: 'us-east-1'});

export default AWS;