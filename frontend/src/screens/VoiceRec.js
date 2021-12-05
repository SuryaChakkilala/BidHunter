import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {Button} from 'react-bootstrap'
const VoiceRec = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const logger = () => {
    console.log(transcript)
  }

  return (
        <div class="card text-center">
                    <div class="card-header">
                        <h1 className='display-6'>VOICE RECOGNITION</h1>
                    </div>
                    <div className="card-body">
                        <p>Microphone: {listening ? 'on' : 'off'}</p>
                        <Button className='m-3' onClick={SpeechRecognition.startListening} variant="success">Start</Button>
                        <Button className='m-3' onClick={SpeechRecognition.stopListening} variant="danger">Stop</Button>
                        <Button className='m-3' onClick={resetTranscript} variant="info">Reset</Button>
                        <Button className='m-3' onClick={logger}>LOG</Button>
                    </div>
                    <figure>
                    <figcaption className="blockquote-footer py-5">
                        * This a feature under development to provide a better user experience and is planned to be released shortly.
                    </figcaption>
                    </figure>
                <p>{transcript}</p>
          </div>
  );
};
export default VoiceRec;