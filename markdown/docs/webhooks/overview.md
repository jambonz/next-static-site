# Webhook API

>> Note: this page describes how to build applications using webhooks.  If you prefer to use the websocket API, please visit [this page](/docs/ws/overview).

**TLDR;**
- Use `npx create-jambonz-app` to scaffold a webhook application
- See [@jambonz/node-client](https://www.npmjs.com/package/@jambonz/node-client) for Node.js API

Or:
- use Node-RED and install [@jambonz/node-red-contrib-jambonz](https://flows.nodered.org/node/@jambonz/node-red-contrib-jambonz)

## Overview

jambonz controls calls through the use of JSON payloads that are exchanged either over an HTTP(s) or a websocket connection.  When an incoming call for your account is received, jambonz retrieves the URL that you have configured for the application you want to run.  If the URL begins with 'http(s)://' jambonz makes an http request to the URL, while if the URL starts with 'ws(s)://' jambonz establishes a websocket connection to that URL. jambonz then sends an initial message describing the incoming call, and your webapp is then responsible for returning a JSON payload that indicates how you want the call handled.


Either way (http or websocket) the details of the JSON payloads are the same.  The information below pertains to using HTTP connections; for information describing the websocket interface [see here](/docs/ws/overview).

When an incoming call for your account is received, jambonz makes an HTTP request to a URL that you have configured and your webapp will then return a response containing a JSON body that indicates how you want the call handled.

> You can develop your webapp using whatever language or framework you like, but the quickest way to scaffold up a webapp is by using our [Node.js framework](/docs/client-sdks/create-jambonz-app/.)

If you want to generate an outbound call it works similarly: you will make an HTTP request using the [REST API](/docs/api/rest) and in it you will specify a URL or application identifier that will be invoked once the call is answered.  Once again, your response to that HTTP request will contain a JSON body that indicates how you want the call handled.

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

## Authenticating SIP clients

jambonz allows SIP clients such as softphones, SIP phones, and webrtc clients to register with the platform and make and receive calls.

Managing sip registrations is a shared activity between the platform and your application, and uses webhooks.  The platform handles the sip messaging details, but the determination of whether to authenticate a specific sip user is the responsibility of the application, which is notified of incoming REGISTER or INVITE requests by means of a registration webhook.

> This approach ensures that sip credentials - which embody highly confidential and private information - are stored within customer networks and never directly exposed to the jambonz platform.  

When the platform receives an incoming sip request from an endpoint that is not a carrier SIP trunk, the request is challenged with a 401 Unauthorized response that includes a WWW-Authenticate header.  

When the originating sip device then resends the request with credentials (e.g. an Authorization header) the sip domain is retrieve from the request and used to lookup the account that owns that domain.  Then, the associated registration webhook is invoked with the details provided in the Authorization header, e.g.:

```json
{
  "method": "REGISTER",
  "realm": "example.com",
  "username": "foo",
  "expires": 3600,
  "nonce": "InFriVGWVoKeCckYrTx7wg==",
  "uri": "sip:example.com",
  "algorithm": "MD5",
  "qop": "auth",
  "cnonce": "03d8d2aafd5a975f2b07dc90fe5f4100",
  "nc": "00000001",
  "response": "db7b7dbec7edc0c427c1708031f67cc6"
}
```
The application's responsibility is to retrieve the password associated with the username, and perform [digest authentication](https://tools.ietf.org/html/rfc2617) to authenticate the request using the information provided, including the calculated response value.

Regardless of whether the request is authenticated or not, the application should respond with a 200 OK to the http POST and with a JSON body.

The JSON body in the response if the request is authenticated should simply contain a `status` attribute with a value of `ok`, e.g.:
```json
{
  "status": "ok"
}
```

If the application wishes to enforce a shorter expires value, it may include that value in the response, e.g.:
```json
{
  "status": "ok",
  "expires": 1800
}
```

The JSON body in the response if the request is _not_ authentication should contain a status of `fail`, and optionally a `msg` attribute, e.g.
```json
{
  "status": "fail",
  "msg" : "invalid password"
}
```

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

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/webhooks/conference">Next: conference</a>
</p>
