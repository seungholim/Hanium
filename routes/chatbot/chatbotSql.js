//module dependencies
const dialogflow = require('dialogflow');
const uuid = require('uuid');

exports.getChatbot = async(keyword) => {
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename:"./routes/config/refrigerator-9jsl-9e9e6761edd2.json"
  });
  const sessionPath = sessionClient.sessionPath('refrigerator-9jsl', sessionId);

  // The text query request.
  const request = {
      session: sessionPath,
      queryInput: {
      text: {
          // The query to send to the dialogflow agent
          text: keyword,
          // The language used by the client (en-US)
          languageCode: 'ko',
      },
    },
  };

  responses = await sessionClient.detectIntent(request);
  result = responses[0].queryResult.fulfillmentText;

  return result;
}