const request = require('request');
require('./config/keys.env');

const imageUrl = 'https://dgutierrezd.now.sh/static/_MG_2390%20(1).jpg';

// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion'
    // 'age,gender,headPose,smile,facialHair,glasses,' +
        // 'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

const options = {
    uri: process.env.uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : process.env.subscriptionKey
    }
};

const getMax = object => {
  return Object.keys(object).filter(x => {
       return object[x] == Math.max.apply(null, 
       Object.values(object));
 });
};

request.post(options, (error, response, body) => {
  let jsonResponse = JSON.parse(body);
  if(jsonResponse.error) {
    console.log('No se puede leer la imagen');
    return;
  } else {
    let emotions = jsonResponse[0].faceAttributes.emotion;
    let emotion = getMax(emotions)

    console.log(`The person is ${emotion}`)
  }
  
});