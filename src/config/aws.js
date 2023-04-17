require('../env')(process.argv[3])

module.exports = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: 'sa-east-1',
}
