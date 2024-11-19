# Controlling the media path during a call

When using the [dial verb](/docs/webhooks/hangu) to create a bridged call there a few ways the media can be routed:

- **full media** - we call it "full media" if the audio continues to be routed through the freeswitch.  From the perspective of the caller the audio then is routed through the jambonz SBC, through the feature server, and back out through the jambonz SBC again on its outward path.  This media path is necessary if an application wants to transcribe, listen to the call, or record the call.

- **partial media** - we call it "partial media" if the audio path for the bridged call is released from the featuer server and only traverses the SBC(s) on its journey from caller to called party.

- **no medi** - we call if "no media" if the audio is completely released from jambonz entirely.  In this case, the audio path from the caller's SBC or SIP trunk is directly to the far end SBC or SIP trunk.  **Note**: creating a "no media" media route is entirely dependent on the originating and terminating SBCs/gateways to accept a re-INVITE with a change of media source and due to how different enterprises and providers handle whitelisting media IP addresses it should not be expected to work globally and should be tested in advance with specific providers.

## Dial verb

### Default behavior

By default, when the `dial` verb is used jambonz will examine what options are used on the call and, if possible, it will release the media to the SBC (i.e. "partial media").  If the application is recording, or transcribing, or using answering machine detection, or using a nested listen or dub verb, etc then the call can not be released to the SBC and will continue to be pinned to the feature server.

The following options can be used to override this behavior:

### I don't want to release the media

Even if the media _could_ be released to the SBC, you may prefer for some reasons to continue to route it through the feature server.  To do so, simply set the `dial.anchorMedia` property to true.  This creates a "full media" bridged call

### I want to release the media completely

If you want to release the media completely from the jambonz system, set the `dial.exitMediaPath` property to true.  This will attempt to crate a "no media" bridge call - but please keep in mind the warning above that this is dependent on the 3rd party providers/SBC you are connecting to.  It also requires the `JAMBONES_ENABLE_FULL_MEDIA_RELEASE` to be set for both the sbc-inbound and sbc-outbound applications.

## Dynamically changing the media path during a call

The instructions above allow you to set a preferred media path at the start of the `dial` verb.  You can also dynamically change the media path during a call by sending a live call control REST api call or the similar using a websocket application connection.

For instance, using the [@jambonz/node-client-ws](https://www.npmjs.com/package/@jambonz/node-client-ws) library you could switch an existing dialed call in progress to a "no media" call so that an agent could take a PCI compliant credit card transaction by doing the following:

```js
session.injectCommand('media:path', 'no-media');
```

Later, you could switch back to a "full media" call:

```js
session.injectCommand('media:path', 'full-media');
```

Due to the switching of the audio path, both parties will hear a brief loss of audio while the audio path is re-established.