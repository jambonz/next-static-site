# Custom speech API

jambonz natively supports a large number of [STT](/docs/webhooks/recognizer) and [TTS](/docs/webhooks/say) speech providers out of the box, but if you want to use a speech provider that we don't support: no propblem! You can also add support for new speech vendors using our Speech APIs:

- [custom STT API](/docs/supporting-articles/custom-speech-stt) (websocket-based)
- [custom TTS API](/docs/supporting-articles/custom-speech-tts) (http-based)

Adding support for a new STT or TTS vendor requires you to implement a server process that implements our APIs as described above, and integrates on the other side with your chosen vendor.  Check out [this example code](https://github.com/jambonz/custom-speech-example) which shows how to integrate [AssemblyAI](https://www.assemblyai.com/) as custom STT vendor, among others.

Once you have added support for a new vendor, you can start using it immediately by logging into the jambonz portal and adding a new Speech service for that vendor.  You will specify the URL(s) that your server exposes as well as an api key that you create to secure the endpoint:

![Creating custom STT vendor](/images/creating-custom-stt-vendor.png)

Then, in the Application view simply select your custom vendor:

![Selecting custom speech vendor](/images/using-custom-speech.png)
