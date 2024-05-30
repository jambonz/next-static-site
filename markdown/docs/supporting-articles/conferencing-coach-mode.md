# Conferencing "coach" mode

The conferencing feature supports a coaching feature whereby designated participants can hear the full conference audio but their own audio is only heard by a subset of the conference participants.  

The classic example of this is a manager listening in on a call between an agent and a customer and being able to "whisper" to the agent without the customer hearing.  This feature is not limited to a single participant receiving the audio, it could be any subset of the conference participants.

>> Coach mode is only supported on version 0.9.1 and above

## Enabling coach mode

To enable coach mode, you must assign a member tag to the participants that you may want to selectively send the audio to.  In the example above, it is the agent that you want to be able to send the manager's audio to, so when the agent joins the conference you would assign them a memberTag:

```js 
app.conference({
  name: 'support-conference-23',
  startConferenceOnEnter: true,
  endConferenceOnExit: true,
  memberTag: 'agent'
})
```

Later, when the manager joins, they should use the `speakOnlyTo` tag to indicate their audio input should only be heard by agents:

```js 
app.conference({
  name: 'support-conference-23',
  speakOnlyTo: 'agent'
})
```

During the conference, you can dynamically change these settings, and the conference audio flows will be immediately updated accordingly.  This can be done using the REST API as show below:

```bash
# change a participant's member tag value
curl --location -g --request PUT '{{base_url}}/v1/Accounts/{{account_sid}}/Calls/{{call_sid}}' \
--data '{
    "conferenceParticipantAction": {
      "action": "tag",
      "tag": "customer"
    }
}'

# remove a participant's member tag
curl --location -g --request PUT '{{base_url}}/v1/Accounts/{{account_sid}}/Calls/{{call_sid}}' \
--data '{
    "conferenceParticipantAction": {
      "action": "untag"
    }
}'

# make manager's audio heard by everyone
curl --location -g --request PUT '{{base_url}}/v1/Accounts/{{account_sid}}/Calls/{{call_sid}}' \
--data '{
    "conferenceParticipantAction": {
      "action": "uncoach"
    }
}'

# put a participant into coach mode
curl --location -g --request PUT '{{base_url}}/v1/Accounts/{{account_sid}}/Calls/{{call_sid}}' \
--data '{
    "conferenceParticipantAction": {
      "action": "coach",
      "tag": "agent"
    }
}'
```

The same can be accomplished via the websocket api:

```js 
// change a participant's member tag
session.injectCommand('conf:participant-action', {action: 'tag', tag: 'customer'});

// remove a particpant's member tag
session.injectCommand('conf:participant-action', {action: 'untag'});

// make manager's audio heard by everyone
session.injectCommand('conf:participant-action', {action: 'uncoach'});

// put a participant into coach mode
session.injectCommand('conf:participant-action', {action: 'coach', tag: 'agent'});
```