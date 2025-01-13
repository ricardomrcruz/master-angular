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

interface ContentSafety {
  summary: { [key: string]: number };
  severity_score_summary: { [key: string]: { [key: string]: number } };
  results: Array<{
    text: string;
    labels: Array<{ label: string; confidence: number; severity: number }>;
    timestamp: { start: number; end: number };
  }>;
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

  contentSafety: any = null;
  entities: any[] = [];
  chapters: any[] = [];
  highlights: any[] = [];
  sentimentAnalysis: any[] = [];



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
            content_safety: true,         // Keep content safety without censoring
            sentiment_analysis: true,     // Keep sentiment analysis
            entity_detection: true,
            iab_categories: true
          };

          console.log('Sending transcript request with config:', data);
          const transcript = await this.client.transcripts.transcribe(data);

          if (transcript && transcript.words) {
            this.words = transcript.words;
            this.entities = transcript.entities || [];


            this.sentimentAnalysis = transcript.sentiment_analysis_results || [];
            this.contentSafety = {
              content_safety_labels: {
                summary: transcript.content_safety_labels?.summary || {},
                severity_score_summary: transcript.content_safety_labels?.severity_score_summary || {}
              }
            };

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
    if (currentElement && previousElement && currentElement.offsetTop !== previousElement.offsetTop
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



  // ENTITIES
  getUniqueEntityTypes(): string[] {
    return Array.from(new Set(this.entities.map(entity => entity.entity_type)));
  }

  getEntitiesByType(type: string): any[] {
    return this.entities.filter(entity => entity.entity_type === type);
  }

  formatEntityType(type: string): string {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // CONTENT SAFETY
  getContentSafetyItems(): Array<{ label: string, score: number }> {
    const summary = this.contentSafety?.content_safety_labels?.summary;
    if (!summary) return [];

    return Object.entries(summary).map(([label, score]) => ({
      label,
      score: score as number
    }));
  }

  // Helper method to format labels
  formatLabel(label: string): string {
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}