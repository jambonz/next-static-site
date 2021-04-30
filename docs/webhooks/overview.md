# Webhooks 

jambonz uses JSON payloads that are exchanged in HTTP messages to control calls.  

When an incoming call for your account is received, jambonz makes an HTTP request to a URL that you have configured and your response will contain a JSON body that indicates how you want the call handled.

When you want to launch an outbound call it works similarly: you will make an HTTP request using the [REST API](/docs/api/rest) and in it you will specify a URL or application identifier that will be invoked once the call is answered.  Once again, your response to that HTTP request will contain a JSON body that indicates how you want the call handled.

Simple enough, right?

## Basic JSON message structure
The JSON payload that you provide in response to an HTTP request must be an array with each item describing a task that the platform shall perform.  These tasks are executed sequentially in the order they appear in the array.  Each task is identified by a verb (e.g. "dial", "gather", "hangup" etc) with associated detail to configure how the action should be carried out.

If the caller hangs up during the execution of an application for that call, the current task is allowed to complete and any remaining tasks in the application are ignored.

```json
[
  {
    "verb": "say",
    "text": "Hi there!  Please leave a message at the tone.",
    "synthesizer": {
      "vendor": "Google",
      "language": "en-US",
      "gender": "FEMALE"
    }
  },
  {
    /* ..next verb */
  }
]
```

Some verbs allow other verbs to be nested; e.g. "gather" can have a nested "say" command in order to play a prompt and collect a response in one command:

```json
{
  "verb": "gather",
  "actionHook": "/gatherCardNumber",
  "input": ["speech", "dtmf"],
  "timeout": 16,
  "numDigits": 6,
  "recognizer": {
    "vendor": "Google",
    "language": "en-US"
  },
  "say": {
    "text": "Please say or enter your six digit card number now",
    "synthesizer": {
      "vendor": "Google",
      "language": "en-US",
      "gender": "FEMALE"
    }
  }
}
```

Altogether then, a simple voicemail application could look like this:
```json
[
  {
    "verb": "say",
    "text": "Hi there!  Please leave a message at the tone and we will get back to you shortly."
  },
  {
    "verb": "listen",
    "actionHook": "http://example.com/voicemail",
    "url": "wss://example.com/my-recorder",
    "finishOnKey": "#",
    "metadata": {
      "topic": "voicemail"
    },
    "playBeep": true,
    "timeout": 20
  },
  {
    "verb": "say",
    "text": "Thanks for your message.  We'll get back to you"
  }
]
```

## HTTP connection details
Each HTTP request that jambonz makes to one of your callbacks will include (at least) the following information either as query arguments (in a GET request) or in the body of the response as a JSON payload (in a POST request):

- call_sid: a unique identifier for the call.
- application_sid: a unique identifier for the jambonz application controlling this call
- account_sid: a unique identifier for the jambonz account associated with the application
- direction: the direction of the call: inbound or outbound
- from: the calling party number
- to: the called party number
- caller_id: the caller name, if known
- call_status: current status of the call, see table below
- sip_status: the most recent sip status code received or generated for the call

Additionally, the request **MAY** include

- parent_call_sid: the call_sid of a parent call to this call, if this call is a child call

And the initial webhook for a new incoming call will have:

- originating_sip_trunk_name: name of the SIP trunk that originated the call to the platform
- originating_sip_ip: the ip address and port of the sip gateway that originated the call

Finally, if you specify to use a POST method for the initial webhook for an incoming call, the JSON payload in that POST will also contain the entire incoming SIP INVITE request details in a 'sip' property (this is not provided if a GET request is used).  This can be useful if you need a detailed look at all of the SIP headers, or the Session Description Protocol being offered.

> Note also that you can add arbitrary information of your own into the payloads that jambonz sends you by using the [tag](/docs/webhooks/tag/) verb early in your application flow.  Data elements that you provide in that verb will then come back to you in further webhook callbacks for that call.  This can be useful for managing stateful information during a call that you may want to drive decision logic later in the call.

| call_status value  | description | 
| ------------- |-------------| 
| trying | a new incoming call has arrived or an outbound call has just been sent|
| ringing | a 180 Ringing response has been sent or received |
| early-media | an early media connection has been established prior to answering the call (183 Session Progress) |
| in-progress | call has been answered |
| completed | an answered call has ended |
| failed | a call attempt failed |
| busy | a call attempt failed because the called party returned a busy status |
| no-answer | a call attempt failed because it was not answered in time |

## Securing your HTTP Endpoints
Before we go any further, let's talk about how to properly secure your endpoints.

This is important because your response to HTTP webhook requests will contain information that must be kept private between you and the jambonz platform. We recommend that you use HTTPS connections secured with TLS certificates for your endpoints, and that you additionally takes steps to verify that the incoming request was actually sent by jambonz, and not an imposter.

For the latter, you have two options:
- You can use HTTP basic authentication to secure your endpoint with a username and password.
- On the hosted platform, you can verify the signature of the HTTP request to know that it was sent by jambonz.

#### Verifying a signed request
The HTTP requests sent to you from the hosted platform will include a Jambonz-Signature header, which is a hash of the request payload signed with your webhook secret, which you can view (and when desired, change) in the self-service portal.  Using that secret, you can verify that the request was actually sent by jambonz.

When using the Node.js SDK, this is done simply as http middleware.
```js
const express = require('express');
const app = express();
const {WebhookResponse} = require('@jambonz/node-client');


app.use(WebhookResponse.verifyJambonzSignature('<your-webhook-secret>'));
app.use('/', routes); /* only requests with valid signatures will get here */
```


## Initial state of incoming calls
When the jambonz platform receives a new incoming call, it responds 100 Trying to the INVITE but does not automatically answer the call.  It is up to your application to decide how to finally respond to the INVITE.  You have some choices here.

Your application can:

- answer the call, which connects the call to a media endpoint that can perform IVR functions on the call,
- outdial a new call, and bridge the two calls together (i.e use the dial verb), 
- reject the call, with a specified SIP status code and reason,
- establish an early media connection and play audio to the caller without answering the call.

The last is interesting and worthy of further comment.  The intent is to let you play audio to callers without necessarily answering the call.  You signal this by including an "earlyMedia" property with a value of true in the application.  When receiving this, jambonz will create an early media connection (using 183 Session Progress), as shown in the example below.

> Note: an early media connection will not be possible if the call has already been answered by an earlier verb in the application.  In such a scenario, the earlyMedia property is ignored.
```json
[
  {
    "verb": "say",
    "earlyMedia": true,
    "text": "Please call back later, we are currently at lunch"
    "synthesizer": {
      "vendor": "aws",
      "language": "en-US",
      "voice": "Amy"
    },
    {
      "verb": "sip:decline",
      "status": 480,
      "headers": {
        "Retry-After": 1800
      }
    }
  }
]
```
Please note:
- The say, play, gather, listen, and transcribe verbs all support the "earlyMedia" property.  
- The dial verb supports a similar feature of not answering the inbound call unless/until the dialed call is answered via the "answerOnBridge" property.

## Speech integration
The platform makes use of text-to-speech as well as real-time speech recognition.  Both Google and AWS are supported for text to speech (TTS) as well as speech to text (STT). 

Synthesized audio is cached for up to 24 hours, so that if the same {text, language, voice} combination is requested more than once in that period it will be served from cache, thus reducing your TTS bill from from Google or AWS.

When you configure your applications in the portal, you can set defaults for the language and voice to use for speech synthesis as well as the language to use for speech recognition.  These can then be overridden by verbs in the application, by using the 'synthesizer' and 'recognizer' properties./

## Webhook URL specifiers
Many of the verbs specify a webhook that will be called when the verb completes or has some information to deliver to your application.  These verbs contain a property that allow you to configure that webhook.  By convention, the property name will always end in "Hook"; e.g "actionHook", "dtmfHook", and so on.

You can either specify the webhook as a simple string specifying either an absolute or relative url:

```json
"actionHook": "https://my.appserver.com/results"
```
```json
"actionHook": "/results"
```
In the latter case, the base url of the application will be applied.

Alternatively, you can provide an object containing a url and optional method and basic authentication parameters, e.g.:

```json
"actionHook": {
  "url": "https://my.appserver.com/results",
  "method": "GET",
  "username": "foo",
  "password": "bar"
}
```
In the sections that follow, we will describe each of the verbs in detail.

<p>
<a href="/docs/webhooks/conference" style="float: right;">Next: conference</a>
</p>
