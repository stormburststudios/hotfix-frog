const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express()
const port = 8080
const slack = require('./slack-payload.js');


app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.post('/', async (req, res) => {
  console.log('post')

  const body = req.body;
  const fields = body?.issue?.fields;
  const issueKey = fields?.key;
  const issueType = fields?.issuetype
  const summary = fields?.summary;
  const reporter = fields?.reporter;
  const {
    displayName,
    avatarUrls
  } = reporter;

  console.log(fields);

  
  if (issueType?.name === 'Bug') {
    try {
      const payload = {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "plain_text",
              "text": "Oops! Somebody's broken production 🐸",
              "emoji": true
            }
          },
          {
            "type": "image",
            "block_id": "image4",
            "image_url": "https://i.ibb.co/T82bzd6/image-56.png",
            "alt_text": "An incredibly cute kitten."
          },
          {
            "type": "context",
            "elements": [
              {
                "type": "image",
                "image_url": avatarUrls['32x32'],
                "alt_text": displayName
              },
              {
                "type": "mrkdwn",
                "text": `*${displayName}* reported this hotfix.`
              }
            ]
          },
        ]
      }
      const sm = axios.post('https://hooks.slack.com/services/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', payload);
      console.log(sm);
      res.send('sent to Slack')
    } catch(e) {
      console.error(e);
    }
    return
  }

  console.log('Not a bug');

  res.send('success')
})

app.get('/', (req, res) => {
  console.log('get')
  console.log(req)
  res.send('success')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})