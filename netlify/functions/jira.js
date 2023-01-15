const axios = require('axios');

exports.handler = async function (event, context) {
  const body = event.body;
  const fields = body?.issue?.fields;
  const issueKey = fields?.key;
  const issueType = fields?.issuetype
  const summary = fields?.summary;
  const reporter = fields?.reporter;
  const {
    displayName,
    avatarUrls
  } = reporter;
  
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
      axios.post('https://hooks.slack.com/services/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', payload);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Sent to Slack" }),
      };
    } catch(e) {
      console.error(e);
    }
    return
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Not sent to Slack" }),
  };
};