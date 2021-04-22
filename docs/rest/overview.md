# Overview
The jambonz REST API allows applications to query, create, and manage calls and other resources. 

**Base URL**

All calls should use the following base URL:
```
https://{serviceUrl}/v1
```
where serviceUrl is set according to your own installation.

**Authentication**

The REST api uses HTTP Bearer Authentication which requires that you include an HTTP Authorization header containing a valid api token.

**Dates and Times**

All dates and times are UTC, using RFC 2822 format.

**Phone Numbers**

All phone numbers are in E.164 format, starting with a plus sign ("+") and the country code.
