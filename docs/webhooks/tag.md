# tag

The tag verb is used to add properties to the standard call attributes that jambonz includes on every action or call status HTTP POST request.

> Note: because of the possible richness of the data, only subsequent POST requests will include this data.  It will not be included in HTTP GET requests.

The purpose is to simplify applications by eliminating the need to store state information if it can simply be echoed back to the application on each HTTP request for the call.

For example, consider an application that wishes to apply some privacy settings on outdials based on attributes in the initial incoming call.  The application could parse information from the SIP INVITE provided in the web callback when the call arrives, and rather than having to store that information for later use it could simply use the 'tag' verb to associate that information with the call.  Later, when an action or call status triggers the need for the application to outdial it can simply access the information from the HTTP POST body, rather than having to retrieve it from the cache of some sort.

Note that every time the tag verb is used, the collection of customer data is completely replaced with the new data provided.  This information will be provided back in all action or status notifications if POST method is used.  It will appear in property named 'customerData' in the JSON payload. 

```json
{
  "verb": "tag",
  "data": {
		"foo": "bar",
		"counter": 100,
		"list": [1, 2, "three"]
	}
}
```

After the above 'tag' verb has executed, web callbacks using POST would have a payload similar to this:
```json
{
	"call_sid": "df09e8d4-7ffd-492b-94d9-51a60318552c",
	"direction": "inbound",
	"from": "+15083084809",
	"to": "+15083728299",
	"call_id": "f0414693-bdb6-1238-6185-06d91d68c9b0",
	"sip_status": 200,
	"call_status": "in-progress",
	"caller_id": "f0414693-bdb6-1238-6185-06d91d68c9b0",
	"account_sid": "fef61e75-cec3-496c-a7bc-8368e4d02a04",
	"application_sid": "0e0681b0-d49f-4fb8-b973-b5a3c6758de1",
	"originating_sip_ip": "54.172.60.1:5060",
	"originating_sip_trunk_name": "twilio",
	"customerData": {
		"foo": "bar",
		"counter": 100,
		"list": [1, 2, "three"]
	}
}
```

You can use the following options in the `tag` command:

| option        | description | required  |
| ------------- |-------------| -----|
| data | a JSON object containing values to be saved and included in future action or call status notifications (HTTP POST only) for this call | yes |

<p>
<a href="/docs/webhooks/sip-decline" style="float: left;">Prev: sip:decline</a>
<a href="/docs/webhooks/transcribe" style="float: right;">Next: transcribe</a>
</p>
