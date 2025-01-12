import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  Inject,
  Optional,
} from '@angular/core';
import { AssemblyAI, TranscriptWord } from 'assemblyai';

interface Word extends TranscriptWord {
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
  words: Word[] = [];
  currentTime: number = 0;

  constructor(@Optional() @Inject('API_KEY') private apiKey?: string) {
    console.log('api key is :', this.apiKey);
    if (this.apiKey) {
      this.client = new AssemblyAI({
        apiKey: this.apiKey,
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
          const data: any = {
            audio: file,
            speech_model: 'best',
            language_detection: true,
          };

          console.log('Sending transcript request with config:', data);
          const transcript = await this.client.transcripts.transcribe(data);

          if (transcript && transcript.words) {
            this.words = transcript.words;
          }

          console.log('transcript', transcript);
        } catch (error) {
          console.error('Error transcribing video:', error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }

  onTimeUpdate() {
    this.currentTime = this.videoPlayer.nativeElement.currentTime * 1000;
  }

  isWordActive(word: Word): boolean {
    return this.currentTime >= word.start && this.currentTime <= word.end;
  }

  private checkLineBreakAndScroll(word: Word): void {
    const wordElements = document.getElementsByClassName('word');
    const currentElement = Array.from(wordElements).find(
      (el) => el.textContent === word.text
    ) as HTMLElement;

    const previousElement =
      currentElement?.previousElementSibling as HTMLElement;
    if (
      currentElement &&
      previousElement &&
      currentElement.offsetTop !== previousElement.offsetTop
    ) {
      currentElement.scrollIntoView({ behavior: 'smooth' });
    }

  }

  checkWordsAndScroll(word: Word): boolean {
    const isActive = this.isWordActive(word);
    if (isActive) {
      this.checkLineBreakAndScroll(word);
    }
    return isActive;
  }
}
