using System;
using System.IO;
using System.Threading.Tasks;
using Google.Cloud.TextToSpeech.V1;

namespace Langlearn.Infrastructure.TextToSpeech
{
    public class TextToSpeechService : ITextToSpeechService
    {
        public async Task GenerateSpeechFile(string text, string path)
        {
            TextToSpeechClient client = TextToSpeechClient.Create();
            
            SynthesisInput input = new SynthesisInput
            {
                Text = text
            };
            
            VoiceSelectionParams voice = new VoiceSelectionParams
            {
                LanguageCode = "en-US",
                SsmlGender = SsmlVoiceGender.Neutral
            };
            
            AudioConfig config = new AudioConfig
            {
                AudioEncoding = AudioEncoding.Mp3
            };
            
            var response = await client.SynthesizeSpeechAsync(new SynthesizeSpeechRequest
            {
                Input = input,
                Voice = voice,
                AudioConfig = config
            });
            
            using (Stream output = File.Create(path))
            {
                response.AudioContent.WriteTo(output);
            }
        }
    }
}
