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

interface IabCategory {
  status: string;
  results: Array<{
    text: string;
    labels?: Array<{  // Make labels optional with ?
      label: string;
      relevance: number;
    }>;
    timestamp?: {     // Make timestamp optional with ?
      start: number;
      end: number;
    };
  }>;
  summary: { [key: string]: number };
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
  iabCategories: IabCategory | null = null;



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

          // Step 1: Upload the file first
          console.log('Starting upload at:', new Date().toISOString());
          const uploadURL = await this.client.files.upload(file);
          console.log('Upload completed at:', new Date().toISOString());
          console.log('Upload URL:', uploadURL);





          const data: any = {
            audio: uploadURL,
            speech_model: 'best',
            language_detection: true,
            content_safety: true,         // Keep content safety without censoring
            sentiment_analysis: true,     // Keep sentiment analysis
            entity_detection: true,
            iab_categories: true,
          };

          console.log('Starting request at:', new Date().toISOString());

          console.log('Sending transcript request with config:', data);
          const transcript = await this.client.transcripts.transcribe(data);
          console.log('Response received at:', new Date().toISOString());

          // Debug logs for specific properties
          console.log('IAB Categories Result:', transcript.iab_categories_result);
          console.log('IAB Categories Status:', transcript.iab_categories_result?.status);
          console.log('IAB Categories Summary:', transcript.iab_categories_result?.summary);

          if (transcript && transcript.words) {
            this.words = transcript.words;
            this.entities = transcript.entities || [];

            this.iabCategories = transcript.iab_categories_result || null;


            this.sentimentAnalysis = transcript.sentiment_analysis_results || [];
            this.contentSafety = {
              content_safety_labels: {
                summary: transcript.content_safety_labels?.summary || {},
                severity_score_summary: transcript.content_safety_labels?.severity_score_summary || {}
              }
            };

            console.log('Component IAB Categories after assignment:', this.iabCategories);

          }

          console.log('transcript', transcript);
        } catch (error) {
          console.error('Error transcribing video:', error);
          if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
          }
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

  // TOPICS
  getTopicItems(): Array<{ topic: string, relevance: number }> {
    const summary = this.iabCategories?.summary;
    if (!summary) return [];

    return Object.entries(summary)
      .map(([topic, relevance]) => ({
        topic,
        relevance: relevance as number
      }))
      .sort((a, b) => b.relevance - a.relevance);
  }

  // Add this method to format topic labels
  formatTopicLabel(topic: string): string {
    return topic.split('>').map(part =>
      part.split(/(?=[A-Z])/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    ).join(' > ');
  }


  getCurrentWordConfidence(): number {
    const currentWord = this.words.find(word =>
      this.currentTime >= word.start && this.currentTime <= word.end
    );
    return currentWord ? currentWord.confidence * 100 : 0;
  }

  getConfidenceEmoji(confidence: number): string {
    if (confidence >= 80) return '😊';
    if (confidence >= 60) return '🙂';
    if (confidence >= 45) return '😐';
    return '😟';
  }
}