import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, Inject, Optional } from '@angular/core';
import { AssemblyAI } from "assemblyai";

interface Word {
  text: string;
  start: number;
  end: number;
  highlighted?: boolean;
}


@Component({
  selector: 'app-speech-to-text',
  imports: [CommonModule],
  templateUrl: './speech-to-text.component.html',
  styleUrl: './speech-to-text.component.css',
  standalone: true,
})
export class SpeechToTextComponent {

  private client: AssemblyAI | null = null;
  transcriptText: string | null | undefined = '';

  // property to store video
  videoUrl: string | null = null;
  isLoading: boolean = false;
  words: Word[] | null | undefined = [];
  currentTime: number = 0;

  constructor(@Optional() @Inject('API_KEY') private apiKey?: string) {
    console.log('api key is :', this.apiKey)
    if (this.apiKey) {
      this.client = new AssemblyAI({
        apiKey: this.apiKey
      });
    }
  }


  //reference to video in the markup
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  async onFileSelected(event: any) {

    const file = event.target.files[0];

    // creates temporary url slug while the video is cached
    if (file && file.type.startsWith('video/')) {


      this.videoUrl = URL.createObjectURL(file);
      this.isLoading = true;

      if (this.client) {

        try {
          // convert the video file to base64 or appropriate format
          const data: any = {
            audio: file, // Pass the file directly
            speech_model: "best",
            language_detection: true,
            word_timestamps: true
          }

          console.log('6. File converted, sending to AssemblyAI');
          // send file to assemblyAI
          const transcript = await this.client.transcripts.transcribe(data);

          this.words = transcript.words;
          console.log(transcript.text);
        } catch (error) {
          console.error('Error transcribing video:', error);
        } finally {
          this.isLoading = false;
        }
      }

    }
  }


}
