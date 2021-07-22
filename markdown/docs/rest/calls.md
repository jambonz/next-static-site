# Calls
A call is a voice connection made between the jambonz platform and another endpoint, which may be a phone or a sip endpoint. Inbound calls are those made from external numbers or devices towards the platform, while outbound calls are placed by the platform to an endpoint.  Inbound calls quite often are used to trigger outbound calls and in such a situation the outbound call will have a Parent Call Sid that references the inbound call.

Calls may created, modified, and deleted through the API.

### Create a Call
Calls are created from the REST API by sending an HTTP POST request. A successful HTTP 201 response will contain the Call Sid of the call attempt that has been launched.

An example is shown below:
```bash
POST https://jambonz.us/v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls HTTP/1.1
Content-Length: 175
Accept: application/json
Authorization: Bearer 9404e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
  "application_sid": "0e06a1b0-d49f-4fb8-b973-b5a3c6758de1",
  "from": "+15083728299",
  "to": {
    "type": "phone",
    "number": "+16172375089"
  },
  "tag": {
    "accountCode": "288fe284"
  }
}

HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Content-Length: 46

{
  "sid":"9210add6-9573-4860-a003-648c7829faaa"
}
```

The Request-URI of the POST contains the Account Sid of the caller and JSON payload  may contain the following properties

| property      | description | required  |
| ------------- |-------------| -----|
| application_sid | The unique identifier of the application used to handle the call | either call_hook or application_sid must be supplied |
| call_hook | an object specifying a web callback that will be invoked when the call is answered | either call_hook or application_sid must be supplied |
| call_hook.url | web callback url | yes |
| call_hook.method | 'GET' or 'POST'.  Defaults to 'POST' | no |
| call_hook.username | username for HTTP Basic Authentication | no |
| call_hook.password | password for HTTP Basic Authentication | no |
| call_status_hook | an object specifying a  a web callback that will be invoked with call status notifications.  Object properties the same as 'call_hook' property above. | no |
| from | the calling party number | yes |
| headers | an object containing arbitrary sip headers to apply to the outbound call attempt | no |
| tag | an object containing customer data to associate with this call; this essentially calls the [tag](/jambonz#tag) verb for you| no |
| timeout | the number of seconds to wait for the call to be answered.  Defaults to 60. | no |
| to | specifies the destination of the call. See description of [target types](/jambonz#target-types) in jambonz call control language. | yes | 

At the time that the 201 response is returned to the caller, the call attempt has been launched (i.e., the SIP INVITE has been sent) but no ringing or call answer has yet occurred.  The caller will receive call status notifications via the call_status_hook (either that supplied in the POST request, or if an application_sid is supplied then via the configured call_status_hook for that application).

### Retrieving a Call

**GET /v1/Accounts/{AccountSid}/Calls/{CallSid}**

```bash
curl -X GET "https://jambonz.us/v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/ba01d74c-397e-4c80-9c8f-d57515ca8e86" \
  -H "accept: application/json" \
  -H "Authorization: Bearer 38700987-c7a4-4685-a5bb-af378f9734de"

200 response
{
  "service_url": "http://172.31.3.33:4001",
  "call_sid": "ba01d74c-397e-4c80-9c8f-d57515ca8e86",
  "account_sid": "fef61e75-cec3-496c-a7bc-8368e4d02a04",
  "application_sid": "0e0681b0-d49f-4fb8-b973-b5a3c6758de1",
  "caller_name": "+15083084809",
  "call_id": "95863901-c3c5-1238-6185-06d91d68c9b0",
  "sip_status": "200",
  "call_status": "completed",
  "duration": 182,
  "originating_sip_ip": "64.172.60.1:5060",
  "originating_sip_trunk_name": "cheaprates"
}
```

### Listing Calls

**GET /v1/Accounts/{AccountSid}/Calls**

Lists all Calls under an Account

### Deleting a Call

**DELETE /v1/Accounts/{AccountSid}/Calls/{CallSid}**

Deletes a specific Call.

### Updating a Call

**PUT /v1/Accounts/{AccountSid}/Calls/{CallSid}**

This operation allows you to modify certain aspects of an active call (aka "live call control").  The JSON payload can support the following properties:

| property      | description | when can this be used
| ------------- |-------------| ---------------------|
| call_hook | a new application to start executing on the call | at any time a call is active |
| call_status | Change the status of the call.  Possible values are 'completed' or 'no-answer' (the former terminates an answered call, the latter a call that is ringing) | at any time a call is in-progress or ringing |
| listen_status | Change the status of a listen stream.  Possible values are 'pause' or 'resume'.  Pausing a stream maintains the websocket connection but will discontinue sending audio over the connection.  Resuming will start sending audio again.  This may be useful, for example, when a caller is providing confidential information that you do not want to appear in a recording. | only when a listen command is active on the call (may be nested in an active dial command) | 
| mute_status | Mute or unmute a call that is currently in a Dial verb.  Possible values are 'mute' or 'unmute'. Either party in a call may be modified, depending on the call_sid provided in the path of the request-uri. | only when a dial command is currently active on a call |
| whisper | Play a mid-call whisper prompt to one of the parties on a call in progress.  The whisper prompt is provided in a play or say verb, as shown in the examples below.  The whisper may be played to either party on the call, depending on the call_sid provided in the path of the request-uri. The other party is briefly placed on hold while the prompt is played, and then reconnected to the other party afterwards.| only when a dial command is currently active on the call |

The call_status, listen_status, and mute_status properties are mutually exclusive -- only one may be provided in the same request.

The whisper property may be provided alone, or together with a listen_status or mute_status property, in which case the whisper prompt is played after the listen_status or mute_status operation is complete.

Finally, if call_hook is provided, then call_status_hook may also optionally be included.  This is used to specify a new callback to send call status events to.

The response to a successful PUT is a 204 No Content.

#### Providing a new application
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
	"call_hook": {
		"url": "/transfer-to-support",
	}
}
```
#### Terminating a call
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
	"call_status": "completed"
}
```
#### Pausing a listen stream
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
	"listen_status": "pause"
}
```
#### Resuming a listen stream
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
	"listen_status": "resume"
}
```

#### Muting a party
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
	"mute_status": "mute"
}
```

#### Unmuting a party
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
	"mute_status": "unmute"
}
```

#### Playing a whisper prompt

The content of the whisper prompt may be a single say or play verb:
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
	"whisper": {
		"verb": "say",
		"text": "You have two minutes remaining on your call."
	}
}
```
or an array of play or say verbs:
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
	"whisper": [{
		"verb": "say",
		"text": "You have two minutes remaining on your call."
	}, {
		"verb": "say",
		"text": "Please use them wisely"
	}]
}
```
No verb other than a play or say verb may be included.  The `loop` property of the verb is not supported in this usage.

#### Muting someone and then telling them about it
```bash
POST /v1/Accounts/fef61e75-cec3-496c-a7bc-8368e4d02a04/Calls/bd9a8d8d-bd55-4c53-a373-929e85c6db22 HTTP/1.1
Authorization: Bearer 9604e5f7-9a77-4bcc-b0fa-5665ace28ab3
Content-Type: application/json

{
  "mute_status": "mute",
  "whisper": [
   {
     "verb": "say",
     "text": "Your call has been muted."
   }
  ]
}
```