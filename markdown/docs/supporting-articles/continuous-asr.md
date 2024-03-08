# Continous ASR
Continuous ASR (automatic speech recognition) is a feature that allows the speech-to-text (STT) recognition to be tuned for the collection of things like phone numbers, customer identifiers and other strings of digits or characters which when spoken are often spoken with pauses in between utterances.

As an example, consider someone speaking a customer pin of 5 digits.  It might be common for them to pause while speaking, as they struggle to remember the full digit sequence.  They might say, for instance, "four eight two ....pause.....five nine".  In this situation, normal STT will be triggered by the pause to return "482" as the full utterance.  In a case where the jambonz application is submitting the user input to an AI bot, the input will be invalid.

Continuous ASR applies to the [gather](/docs/webhooks/gather) verb and provides the ability to specify some additional options that help ensure the collection of the full customer pin in the example above. Two additional options are provided:

- `asrTimeout`: this is a duration of silence, in seconds, to wait after a transcript is received from the STT vendor before returning the result.  If another transcript is received before this timeout elapses, then the transcripts are combined and recognition continues.  The combined transcripts are returned once a timeout between utterances exceeds this value or a specified dtmf termination key is detected (see below)
- `asrDtmfTerminationDigit`: a DTMF key which, if entered, will also terminate the gather operation and immediately return the collected results.