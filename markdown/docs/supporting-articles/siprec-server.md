# Agent Assist via SIPREC

jambonz can integrate with session border controllers (SBCs) that support SIPREC to receive listen-only audio streams of callers and agents in Contact Centre scenarios in order to provide agent assist type of functionality.

In this scenario, jambonz acts as a SIPREC server and receives incoming audio streams signaled in the SIPREC INVITE from the SBC.  These audio streams can then be handled by a jambonz application, which can transcribe the audio as well as send it to 3rd parties via the [listen](/docs/webhooks/listen) verb.

Because these are listen-only audio streams, the application is limited in what it can do.  It can not, for instance, play audio or say text back to the caller.  In fact, the only verbs allowed in a jambonz application that is handling an incoming SIPREC call are:
- [config](/docs/webhooks/config)
- [gather](/docs/webhooks/gather)
- [transcribe](/docs/webhooks/transcribe)
- [listen](/docs/webhooks/listen)

Any other verbs present in the application will be removed and silently ignored.

## Routing SIPREC calls
SIPREC calls are routed at the account level; that is to say that you must configure a webhook application for each account that will handle incoming SIPREC calls for that account.  This can be done via the portal on the Edit Account page, or via the API.
