# Customizing the Homer install

Homer is installed when you use either the AWS Marketplace or the terraform scripts.  By default, when downloading pcaps from the portal you will get separate pcap files for the inbound and outbound legs of a call.  If you want the pcap files to contain both legs for a given call, you will need to make a change in the Homer GUI to edit the default mapping.  

To do so, follow these steps:

* Log into the Homer GUI (listening on port 9080 by default) using default username/password admin/sipcapture. (Note: it's a good idea to change the default password after you log in for the first time).
* Click Settings on the top nav, and then Mapping on the left-hand side nav.
* On the row of the table with Profile = call, click the pencil icon on the right side of the row.
* Replace the contents in the text edit box labeled "Correlation Mapping" with the content below, then click Save.

After this, when you download the pcap for an inbound call it will include the associated outbound call trace as well.

Content to paste (copy text inclusive of square brackets below):

```json
[
    {
        "source_field": "data_header.callid",
        "lookup_id": 100,
        "lookup_profile": "default",
        "lookup_field": "sid",
        "lookup_range": [
            -300,
            200
        ]
    },
    {
        "source_field": "data_header.callid",
        "lookup_id": 5,
        "lookup_profile": "default",
        "lookup_field": "sid",
        "lookup_range": [
            -300,
            200
        ]
    },
    {
        "source_field": "protocol_header.correlation_id",
        "lookup_id": 1,
        "lookup_profile": "call",
        "lookup_field": "sid",
        "lookup_range": [
            -300,
            200
        ]
    },
    {
        "source_field": "data_header.callid",
        "lookup_id": 1,
        "lookup_profile": "call",
        "lookup_field": "protocol_header->>'correlation_id'",
        "lookup_range": [
            -300,
            200
        ]
    },
    {
        "source_field": "protocol_header.correlation_id",
        "lookup_id": 1,
        "lookup_profile": "call",
        "lookup_field": "protocol_header->>'correlation_id'",
        "lookup_range": [
            -300,
            200
        ]
    },
    {
        "source_field": "data_header.callid",
        "lookup_id": 1,
        "lookup_profile": "call",
        "lookup_field": "data_header->>'callid'",
        "lookup_range": [
            -300,
            200
        ],
        "input_function_js": "var returnData=[]; for (var i = 0; i < data.length; i++) { returnData.push(data[i]+'_b2b-1'); }; returnData;"
    }
]
```