/// <reference lib="dom" />

'use client';

import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/providers';
import React from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { toast } from 'sonner';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

/**
 * A React component that provides speech-to-text functionality using the Web Speech API.
 *
 * This component renders a microphone button that toggles speech recognition on/off.
 * When active, it converts spoken words to text and updates the provided content state.
 * Supports continuous recognition and interim results.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setContent - State setter function to update the transcribed text
 * @returns {React.JSX.Element} A button to toggle speech recognition and a hidden results div
 *
 * @example
 * ```jsx
 * const [content, setContent] = useState('');
 * <SpeechToText setContent={setContent} />
 * ```
 *
 * @remarks
 * - Uses the SpeechRecognition API or webkitSpeechRecognition as fallback
 * - Shows toast notifications for status updates and errors
 * - Stops recording if the word "stop" is spoken
 * - Requires browser support for Web Speech API
 */
export const SpeechToText = React.memo(
  ({
    setContent,
  }: {
    setContent: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    /**
     * Tracks whether speech recognition is currently active
     */
    const { isRecording, setIsRecording } = useGlobalStore((state) => state.speechToText);

    /**
     * Reference to the start/stop button element
     * @type {React.RefObject<HTMLButtonElement>}
     */
    const startButtonRef = React.useRef<HTMLButtonElement>(null);

    /**
     * Reference to the results div element
     * @type {React.RefObject<HTMLDivElement>}
     */
    const resultRef = React.useRef<HTMLDivElement>(null);

    /**
     * Reference to store the SpeechRecognition instance
     * @type {React.RefObject<SpeechRecognition>}
     */
    const recognitionRef = React.useRef<any>(null);

    useIsomorphicLayoutEffect(() => {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();

        const recognition = recognitionRef.current;

        recognition.continuous = true;
        recognition.interimResults = true;

        /**
         * Handles the start of speech recognition
         * Updates recording state and shows success toast
         */
        recognition.onstart = () => {
          setIsRecording(true);
          toast.success('Listening... Speak now!', {
            description: 'Click the stop button to end recording.',
            duration: 3000,
          });
        };

        /**
         * Handles the end of speech recognition
         * Updates recording state and shows info toast
         */
        recognition.onend = () => {
          setIsRecording(false);
          toast.info('Speech recognition ended.', {
            description: 'Click the microphone to start again.',
            duration: 3000,
          });
        };

        /**
         * Processes speech recognition results
         * Appends final transcripts to content and handles "stop" command
         * @param {SpeechRecognitionEvent} event - The recognition result event
         */
        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }

          if (finalTranscript) {
            if (finalTranscript.toLowerCase().includes('stop')) {
              setContent((content) => `${content} ${finalTranscript.replace(/stop/gi, '').trim()}`);
              recognition.stop();
            } else {
              setContent((content) => `${content} ${finalTranscript.trim()}`);
            }
          }
        };

        /**
         * Handles speech recognition errors
         * Logs error and shows error toast
         * @param {SpeechRecognitionErrorEvent} event - The error event
         */
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', (event as any).error);
          toast.error('Speech recognition error', {
            description: event.error,
            duration: 5000,
          });
        };
      } else {
        toast.error('Speech recognition not supported 🥲', {
          description: 'Your browser does not support speech recognition.',
          duration: 5000,
        });

        if (startButtonRef.current) {
          startButtonRef.current.disabled = true;
        }
      }
    }, [setContent]);

    /**
     * Toggles the speech recognition on/off
     * Starts recognition if stopped, stops if already recording
     */
    const toggleRecording = () => {
      if (isRecording) {
        recognitionRef.current?.stop();
      } else {
        recognitionRef.current?.start();
      }
    };

    return (
      <>
        <Button
          ref={startButtonRef}
          id="startBtn"
          className="cursor-pointer"
          onClick={toggleRecording}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </Button>
        <div ref={resultRef} id="result" className={'hidden'} />
      </>
    );
  },
);
