# command

A `command` message is sent by the websocket server to jambonz when the server wants to asynchronously provide a new set of instructions to jambonz. 

The app **may** include an `id` property in each of the verbs included in the command; if so, jambonz will send `verb:status` notifications back to the app when the verb is executed.  The `id` property is a string value that is assigned by the app and is meaningful only to the app.

<p class="flex">
<span>&nbsp;</span>
<a href="/docs/ws/ack">Prev: ack</a>
</p>
