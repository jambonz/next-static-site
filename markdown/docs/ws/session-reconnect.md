# session:reconnect

>> jambonz => websocket server

A `session:reconnect` message is sent by jambonz to the websocket server when the websocket connection was closed unexpectedly by the websocket server and jambonz has then successfully reconnected.

|property|type|meaning|required|
|--------|----|-------|--------|
|type|string "session:reconnect"|indicates this is a session:reconnect message|yes|
|msgid|string|unique message identifier|yes|
|call_sid|string|unique call identifier|yes|
|b3|string|open telemetry span identifier for this call (only provided if otel tracing is enabled)|no|
|data|object|JSON payload describing the call|yes|

```json
{
	"type": "session:reconnect",
	"msgid": "auuHioXGktYh2ZFYxf3hAA",
  "call_sid": "9fb35c28-9688-4531-943c-e280b04f3adf",
	"data": {
		"sip": {
			"headers": {
				"via": "SIP/2.0/UDP 3.212.205.202;rport=5060;branch=z9hG4bK3tv053jp1mcHQ;received=10.0.13.72",
				"max-forwards": "70",
				"from": "<sip:+15083084809@3.212.205.202:5060>;tag=9mgyBeaUy4H2S",
				"to": "<sip:+15083728299@3.212.205.202>",
				"call-id": "d8907723-0bc7-123b-09b5-12e962f3039b",
				"cseq": "48063641 INVITE",
				"contact": "<sip:10.0.13.72:5060>",
				"user-agent": "Twilio Gateway",
				"allow": "INVITE, ACK, CANCEL, BYE, REFER, NOTIFY, OPTIONS",
				"content-type": "application/sdp",
				"content-length": "281",
				"X-Account-Sid": "9351f46a-678c-43f5-b8a6-d4eb58d131af",
				"X-CID": "dae8845526bf7fe640ad0162238473e4@0.0.0.0",
				"X-Forwarded-For": "54.172.60.3",
				"X-Originating-Carrier": "Twilio",
				"X-Voip-Carrier-Sid": "c763b9dc-7113-450d-b86e-b3781d5fbec1",
				"X-Application-Sid": "7087fe50-8acb-4f3b-b820-97b573723aab",
				"Diversion": "<sip:+15083728299@twilio.com>;reason=unconditional",
				"X-Twilio-AccountSid": "AC58f23d38858ac262d6ee2e554b30c561",
				"X-Twilio-CallSid": "CAeea292c8a7c71dc67de46155ec667826",
				"p-asserted-identity": "<sip:+15083084809@206.147.76.45:5060>"
			},
			"raw": "INVITE sip:+15083728299@10.0.13.72:5070 SIP/2.0\r\nVia: SIP/2.0/UDP 3.212.205.202;rport=5060;branch=z9hG4bK3tv053jp1mcHQ;received=10.0.13.72\r\nMax-Forwards: 70\r\nFrom: <sip:+15083084809@3.212.205.202:5060>;tag=9mgyBeaUy4H2S\r\nTo: <sip:+15083728299@3.212.205.202>\r\nCall-ID: d8907723-0bc7-123b-09b5-12e962f3039b\r\nCSeq: 48063641 INVITE\r\nContact: <sip:10.0.13.72:5060>\r\nUser-Agent: Twilio Gateway\r\nAllow: INVITE, ACK, CANCEL, BYE, REFER, NOTIFY, OPTIONS\r\nContent-Type: application/sdp\r\nContent-Length: 281\r\nX-Account-Sid: 9351f46a-678c-43f5-b8a6-d4eb58d131af\r\nX-CID: dae8845526bf7fe640ad0162238473e4@0.0.0.0\r\nX-Forwarded-For: 54.172.60.3\r\nX-Originating-Carrier: Twilio\r\nX-Voip-Carrier-Sid: c763b9dc-7113-450d-b86e-b3781d5fbec1\r\nX-Application-Sid: 7087fe50-8acb-4f3b-b820-97b573723aab\r\nDiversion: <sip:+15083728299@twilio.com>;reason=unconditional\r\nX-Twilio-AccountSid: AC58f23d38858ac262d6ee2e554b30c561\r\nX-Twilio-CallSid: CAeea292c8a7c71dc67de46155ec667826\r\nP-Asserted-Identity: <sip:+15083084809@206.147.76.45:5060>\r\n\r\nv=0\r\no=root 81565042 81565042 IN IP4 10.0.13.72\r\ns=Twilio Media Gateway\r\nc=IN IP4 10.0.13.72\r\nt=0 0\r\nm=audio 40150 RTP/AVP 0 8 101\r\na=maxptime:20\r\na=rtpmap:0 PCMU/8000\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:101 telephone-event/8000\r\na=fmtp:101 0-16\r\na=sendrecv\r\na=rtcp:40151\r\na=ptime:20\r\n",
			"body": "v=0\r\no=root 81565042 81565042 IN IP4 10.0.13.72\r\ns=Twilio Media Gateway\r\nc=IN IP4 10.0.13.72\r\nt=0 0\r\nm=audio 40150 RTP/AVP 0 8 101\r\na=maxptime:20\r\na=rtpmap:0 PCMU/8000\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:101 telephone-event/8000\r\na=fmtp:101 0-16\r\na=sendrecv\r\na=rtcp:40151\r\na=ptime:20\r\n",
			"method": "INVITE",
			"version": "2.0",
			"uri": "sip:+15083728299@10.0.13.72:5070",
			"payload": [{
				"type": "application/sdp",
				"content": "v=0\r\no=root 81565042 81565042 IN IP4 10.0.13.72\r\ns=Twilio Media Gateway\r\nc=IN IP4 10.0.13.72\r\nt=0 0\r\nm=audio 40150 RTP/AVP 0 8 101\r\na=maxptime:20\r\na=rtpmap:0 PCMU/8000\r\na=rtpmap:8 PCMA/8000\r\na=rtpmap:101 telephone-event/8000\r\na=fmtp:101 0-16\r\na=sendrecv\r\na=rtcp:40151\r\na=ptime:20\r\n"
			}]
		},
		"direction": "inbound",
		"caller_name": "",
		"call_sid": "9fb35c28-9688-4531-943c-e280b04f3adf",
		"account_sid": "9351f46a-678c-43f5-b8a6-d4eb58d131af",
		"application_sid": "7087fe50-8acb-4f3b-b820-97b573723aab",
		"from": "+15083084809",
		"to": "+15083728299",
		"call_id": "d8907723-0bc7-123b-09b5-12e962f3039b",
		"sip_status": 100,
		"call_status": "trying",
		"originating_sip_ip": "54.172.60.3",
		"originating_sip_trunk_name": "Twilio",
		"local_sip_address": "10.0.13.72:5070"
	}
}
```

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/session-redirect">Prev: session:redirect</a>
<a href="/docs/ws/call-status">Next: call:status</a>
</p>
