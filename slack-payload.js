module.exports = {
	hotfix: {
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
						"image_url": "{{reporterImg}}",
						"alt_text": "{{reporterName}}"
					},
					{
						"type": "mrkdwn",
						"text": "*{{reporterName}}* reported this hotfix."
					}
				]
			},
		]
	}
}