# Controlling the media path during a call

When using the [dial verb](/docs/webhooks/hangu) to create a bridged call there a few ways the media can be routed:

- **full media** - we call it "full media" if the audio continues to be routed through the feature server.  From the perspective of the caller, their audio is routed to the jambonz SBC, through the feature server, and back out through the jambonz SBC on its outward path to the called party.  This media path is necessary if an application wants to perform operations like transcribe, listen, or record the call.

- **partial media** - we call it "partial media" if the audio path for the bridged call is released from the featuer server and only traverses the SBC(s) on its journey from caller to called party.

- **no media** - we call if "no media" if the audio is completely released from jambonz.  In this case, the audio path from the caller's SBC is directly to the far end SBC or SIP trunk.  

**Note**: creating a "no media" media route is entirely dependent on the originating and terminating SBCs/gateways abilities to accept a re-INVITE with a change of media source.  Due to how different enterprises and providers apply different policies for whitelisting media IP addresses, you should not expect this to work in all cases and this feature should be tested in advance for specific use cases with specific providers.

## Dial verb

### Default behavior

By default, when the `dial` verb is used jambonz will examine what options are used on the call and, if possible, it will release the media to the SBC (i.e. "partial media").  If the application is recording, transcribing, or using answering machine detection for instance, the call can not be released to the SBC and will continue to be routed through the feature server.

The following options can be used to override this behavior:

### I don't want to release the media.

Even if the media _could_ be released to the SBC, you may prefer for some reasons to continue to route it through the feature server.  To do so, simply set the `dial.anchorMedia` property to true.  This creates a "full media" bridged call

### I want to release the media completely.

If you want to release the media completely from the jambonz system, set the `dial.exitMediaPath` property to true.  This will attempt to crate a "no media" bridge call - but please keep in mind the warning above that this is dependent on the 3rd party providers/SBC you are connecting to.  

Note also that the 'no media' path is only possible if the `JAMBONES_ENABLE_FULL_MEDIA_RELEASE` environment variable has been set for both the sbc-inbound and sbc-outbound applications.

## Dynamically changing the media path during a call

The instructions above allow you to set a preferred media path at the start of the `dial` verb.  You can also dynamically change the media path during a call by sending a live call control REST api call or the similar using a websocket application connection.

For instance, using the [@jambonz/node-client-ws](https://www.npmjs.com/package/@jambonz/node-client-ws) library you could switch an existing dialed call in progress to a "no media" call so that an agent could take a PCI compliant credit card transaction by doing the following:

```js
session.injectCommand('media:path', 'no-media');
```

Later, once the transaction has been completed, you could switch the call back to a "full media" call:

```js
session.injectCommand('media:path', 'full-media');
```

Due to the switching of the audio path, both parties will hear a brief loss of audio while the audio path is re-established.