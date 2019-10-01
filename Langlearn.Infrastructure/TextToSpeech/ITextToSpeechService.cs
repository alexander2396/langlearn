using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text;

namespace Langlearn.Infrastructure.TextToSpeech
{
    public interface ITextToSpeechService
    {
        Task GenerateSpeechFile(string text, string path);
    }
}
