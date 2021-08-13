# Receiving queue event notifications

You can optionally receive a notification any time a person joins or leaves a queue.  This can be useful, for example, when building a browser app that shows the count of people in a queue and lets an agent click on a queue to receive the next caller from that queue.

The webhook, which can optionally be configured at the account level, will generate an HTTP POST request to your webhook any time someone joins or leaves a queue. Example payloads for join and leave events are shown below.

#### Example webhook when caller is placed in queue

#### Example webhook when caller is dequeued

