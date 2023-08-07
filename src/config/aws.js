require('../env')(process.argv[3])

module.exports = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : process.env.aws_access_key_id,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID ? process.env.AWS_SECRET_ACCESS_KEY_ID : process.env.aws_secret_access_key,
  sessionToken: process.env.AWS_SESSION_TOKEN ? process.env.AWS_SESSION_TOKEN : process.env.aws_session_token,
  region: 'sa-east-1',
}