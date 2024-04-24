# conference

The `conference` verb places a call into a conference.
```json
  {
    "verb": "conference",
    "name": "test",
    "beep": true,
    "startConferenceOnEnter": false,
    "waitHook": "/confWait",
    "enterHook": "/confEnter"   
  },
```
You can use the following attributes in the `conference` command:

| option        | description | required  |
| ------------- |-------------| -----|
| actionHook | A webhook to call when the conference ends | no |
| beep | if true, play a beep tone to the conference when caller enters (default: false) | no |
| endConferenceOnExit | if true, end the conference when this caller hangs up (default: false) | no |
| enterHook | A webhook to retrieve something to play or say to the caller just before they are put into a conference after waiting for it to start| no |
| joinMuted | if true, this caller will join th conference with their audio muted | no |
| maxParticipants | maximum number of participants that will be allowed in the conference | no |
| memberTag | a way to classify participants for the "coach" feature; see related speakOnlyTo attribute below (0.9.0 and above)| no |
| name | name of the conference | yes |
| speakOnlyTo | a tag value that will cause this members audio to be heard only by members that were assigned that tag; see [this article](/docs/supporting-articles/conferencing-coach-mode) for details | no |
| startConferenceOnEnter | if true, start the conference only when this caller enters.  This also designates this caller as a moderator of the conference (default: true) | no |
| statusHook | A webhook to call with conference status events | no |
| statusEvents | An array of events for which the statusHook should be called to. See below for details. | no | 
| waitHook | A webhook to retrieve commands to play or say while the caller is waiting for the conference to start | no |

Conference status events:

- 'start': the conference has started
- 'end': the conference has ended
- 'join': a participant has joined the conference
- 'leave': a participant has left the conference
- 'start-talking': a participant started speaking
- 'end-talking': a participant stopped talking

Conference status webhooks will contain the following additional parameters:

- conferenceSid: a unique identifier for the conference
- friendlyName: the name of the conference as specified in the application
- event: the conference event being reported (e.g. "join")
- time: the time of the event in ISO format (e.g. "2020-04-27T13:44:17.336Z")
- members: the current number of members in the conference
- duration: the current length of the conference in seconds

<p class="flex">
<a href="/docs/webhooks/overview">Prev: Overview</a>
<a href="/docs/webhooks/config">Next: config</a>
</p>
