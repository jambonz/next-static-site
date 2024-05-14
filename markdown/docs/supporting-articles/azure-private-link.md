# Azure on-prem and private link configurations

Microsoft provides additional options to their hosted speech service, including running the speech service locally ("on prem") in a [Docker container](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-container-overview) or using their [private link](https://learn.microsoft.com/en-us/azure/private-link/private-link-overview) service.

## Docker container
To use a Docker container, select the **Use Azure Docker container (on-prem)** option when creating a Microsoft speech service in the jambonz portal and supply the URLs for TTS (https) and STT (wss).  The subscription key is optional but can be supplied if your environment requires it.

## Private link
For private link, also select the **Use Azure Docker container (on-prem)** option.  

- For TTS, enter the URL in the form of 
```
https://<private-link>.cognitiveservices.azure.com/tts/cognitiveservices/v1
```
- for STT enter the URL in the form of 
```
wss://<private link>.cognitiveservices.azure.com/stt/speech/recognition/conversation/cognitiveservices/v1
```