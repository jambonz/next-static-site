# Text-to-speech API

jambonz provides native support for lots of speech recognition vendors, but if you want to integrate with a vendor we don't yet support you can easily do this by writing to our API.  

The TTS API is a simple http-based api.  

jambonz sends an HTTP POST containing the text to be synthesized and associated properties such as language and voice.  Your server is responsible for implementing the interface to your chosen speech vendor and returning an mp3 file containing the audio.  Easy-peasy!

## Authentication

An Authorization header is sent by jambonz on the HTTP request.  The Authorization header contains an api key, e.g.

```js
Authorization: Bearer <apiKey>
```

When you create a custom speech vendor in the jambonz portal you will specify an api key which is then then provided in the Authorization header whenever that custom speech vendor is used in yourj application.

## Request body attributes

| property | type | description  |
| ---------|-------------| -----|
| language | String | ISO language code (e.g. "en-US") |
| voice | String | Name of voice to use |
| format | String | Defines audio format to return.  Currently will always be "audio/mpeg" |
| type | String | "text" or "ssml"|
| text | String | text to be synthesized (if type=ssml should be enclosed in <speak> tags) |

## Response body attributes

Your server should return a 200 OK containing a body with synthesized speech in mp3 format in case of success, or an HTTP error code in case of a failure.