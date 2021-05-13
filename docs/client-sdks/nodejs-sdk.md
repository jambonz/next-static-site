# jambonz Node.js SDK

The jambonz Node.js SDK is one of the simplest and most powerful ways to build jambonz applications.  

The video below provides a walk-through of how to create an application using the [create-jambonz-app](/docs/client-sdks/create-jambonz-app) utility, and then gives examples of building various webhooks applications that include collecting speech or dtmf input as well as integration with Google [Dialogflow](https://developers.google.com/learn/pathways/chatbots-dialogflow) and AWS [Lex V2](https://aws.amazon.com/blogs/aws/amazon-lex-enhanced-console-experience/).

<iframe width="560" height="315" src="https://www.youtube.com/embed/42jcqyvCstU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Up and running
As mentioned above, the [create-jambonz-app](/docs/client-sdks/create-jambonz-app) will scaffold you an [express](https://expressjs.com/)-based app that provides a great starting point.

If you prefer to use a different http server, or you need to integrate the jambonz webhooks into an existing Node.js application, then you simply need to install [@jambonz/node-client](https://www.npmjs.com/package/@jambonz/node-client) in your application.

```bash
npm install --save @jambonz/node-client
```

If your application just needs to respond to [webhooks](/docs/webhooks/overview/), you can include it like this:
```js
const {WebhookResponse} = require('@jambonz/node-client');
```

If your application also needs to make [REST API calls](/docs/rest/overview/), you can include it like this:
```js
const jambonz = require('@jambonz/node-client');
const {WebhookResponse} = jambonz;
const client = jambonz('your-account-sid', 'your-api-key', {baseUrl: 'https://jambonz.us'});
```
> Note: if you are running a self-hosted system, replace `https://jambonz.us` in the above with the appropriate URL of your own jambonz system.

#### How to use it - Webhooks
Responding to webhooks is quite simple:

```js
router.post('/', (req, res) => {
  const app = new WebhookResponse();
  app
    .pause({length: 1.5})
    .say({
      text 'hi there, and welcome to jambonz!'
    });
  res.status(200).json(app);
```

The WebhookResponse instance offers methods corresponding to each of the [jambonz verbs](/docs/webhooks/overview/), so for the example above you can see the possible options for the `pause` verb [here](/docs/webhooks/pause/), and for the `say` verb [here](/docs/webhooks/say/).  After adding all of the verbs that you want to execute, in the order that you want them to happen, simply return the `app` object in the 200 OK to the HTTP request.


#### How to use it - REST API
To making a REST API call simply use the `client` object we showed how to create earlier:
```js
await client.calls.update(req.body.call_sid, {mute_status: 'mute'});
```
Documentation for the REST API can be found [here](/docs/rest/overview/).