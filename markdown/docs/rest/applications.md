# Applications
An application represents the call handling rules  to be applied to phone calls either made or received by the platform.  Applications can be created, queried, updated, and destroyed via the API by using your api key.

Applications have the following properties:

| property        | description |
| ------------- |------------- |
| account_sid | identifies the Account this application belongs to |
| application_sid | unique identifier for the application | 
| name | user-specified name of application |
| call_hook | web callback to invoke for new calls |
| call_status_hook | web callback to invoke for call status notifications |
| speech_recognizer_vendor | vendor to use for speech recognition.  Default: google|
| speech_recognizer_language | default language to use for speech recognition, if not specified in the 'gather' or 'transcribe' verbs.  Default: en-US |
| speech_synthesis_vendor | vendor to use for text to speech.  Default: google|
| speech_synthesis_voice | default voice to use for text to speech, if not specified in the 'say' verb.  Default: en-US-Wavenet-C |

### Retrieving an Application

**GET /v1/Applications/{ApplicationSid}**

```bash
curl -X GET "https://jambonz.cloud/v1/Applications/0e0681b0-d49f-4fb8-b973-b5a3c6758de1" \
  -H "accept: application/json" \
  -H "Authorization: Bearer 38700987-c7a4-4685-a5bb-af378f9734de"

200 response
{
	"application_sid": "0e0681b0-d49f-4fb8-b973-b5a3c6758de1",
	"name": "daveh test app",
	"account_sid": "fef61e75-cec3-496c-a7bc-8368e4d02a04",
	"speech_synthesis_vendor": "google",
	"speech_synthesis_voice": "en-US-Wavenet-C",
	"speech_recognizer_vendor": "google",
	"speech_recognizer_language": "en-US",
	"call_hook": {
		"webhook_sid": "f227508f-dbb0-4fe8-a7e8-2974f54e24a1",
		"url": "http://vibe-test.drachtio.org.ngrok.io",
		"method": "post",
		"username": "drachtio",
		"password": "3298fn238hf9n823hf93h24398gj93n84h"
	},
	"call_status_hook": {
		"webhook_sid": "8226d33c-6a46-40d4-8fb3-02ef01199085",
		"url": "http://vibe-test.drachtio.org.ngrok.io/callStatus",
		"method": "post",
		"username": "drachtio",
		"password": "3298fn238hf9n823hf93h24398gj93n84h"
	}
}
```

### Listing Applications

**GET /v1/Applications**

Lists all Applications an Account (if an account scope api token is used).

```bash
curl -X GET "https://api.jambonz.cloud/v1/Applications" \
-H  "accept: application/json" \
-H  "Authorization: Bearer 97b24a80-4908-4c23-8c47-e88b49193d3d"

[
  {
    "application_sid": "d91f18e3-252d-499e-bd6e-bd0e5668c6d2",
    "name": "dial time clock",
    "service_provider_sid": null,
    "account_sid": "9b0b47b7-0dc5-4c34-b4fb-b23fbc32b069",
    "speech_synthesis_vendor": "google",
    "speech_synthesis_language": "en-US",
    "speech_synthesis_voice": "en-US-Standard-C",
    "speech_recognizer_vendor": "google",
    "speech_recognizer_language": "en-US",
    "created_at": "2021-05-01T22:18:25.000Z",
    "call_hook": {
      "webhook_sid": "df2fc834-10e5-4355-96fb-1faf63c8b02b",
      "url": "https://jambonz-apps.drachtio.org/dial/time",
      "method": "POST",
      "username": null,
      "password": null
    },
    "call_status_hook": {
      "webhook_sid": "961dfbfd-a690-4e23-80b8-28ff1e1269ba",
      "url": "https://jambonz-apps.drachtio.org/call-status",
      "method": "POST",
      "username": null,
      "password": null
    }
  },
  {
    "application_sid": "39b8db72-7661-41c2-a9b6-202bbae0fe51",
    "name": "hello world",
    "service_provider_sid": null,
    "account_sid": "9b0b47b7-0dc5-4c34-b4fb-b23fbc32b069",
    "speech_synthesis_vendor": "google",
    "speech_synthesis_language": "en-US",
    "speech_synthesis_voice": "en-US-Standard-C",
    "speech_recognizer_vendor": "google",
    "speech_recognizer_language": "en-US",
    "created_at": "2021-05-01T22:12:40.000Z",
    "call_hook": {
      "webhook_sid": "ddde52a7-4176-4a9f-855b-2dd3c481976d",
      "url": "https://jambonz-apps.drachtio.org/tts-test",
      "method": "POST",
      "username": null,
      "password": null
    },
    "call_status_hook": {
      "webhook_sid": "fb50f822-01e4-4278-b396-80db62aa0e36",
      "url": "https://jambonz-apps.drachtio.org/call-status",
      "method": "POST",
      "username": null,
      "password": null
    }
  }
]
```

### Deleting an Application

**DELETE /v1/Applications/{ApplicationSid}**

Deletes a specific Application.

### Creating an Application

**POST /v1/Applications**

Creates a new Application.

Upon success, a 201 response is returned with a JSON body providing the account_sid ("sid") of the application that was created.

```xml
curl -X POST "https://jambonz.cloud/v1/Applications" \
-H "accept: application/json" \
-H "Authorization: Bearer 38700987-c7a4-4685-a5bb-af378f9734de" \
-H "Content-Type: application/json" \
-d "{\"name\":\"forward to mobile\",\"account_sid\":\"fef61e75-cec3-496c-a7bc-8368e4d02a04\",\"call_hook\":{\"url\":\"http://vibe-test.drachtio.org.ngrok.io/mobile\"},\"call_status_hook\":{\"url\":\"http://vibe-test.drachtio.org.ngrok.io/mobileStatus\"}}"

201 response
{
  "sid": "65cddc02-6cf8-476c-97a8-1941a96e143b"
}
```
