import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-speech-to-text',
  imports: [CommonModule],
  templateUrl: './speech-to-text.component.html',
  styleUrl: './speech-to-text.component.css'
})
export class SpeechToTextComponent {

  // property to store video
  videoUrl: string | null = null;

  //reference to video in the markup
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  onFileSelected(event: any) {
    const file = event.target.files[0];

    // creates temporary url slug while the video is cached
    if (file && file.type.startsWith('video/')) {
      this.videoUrl = URL.createObjectURL(file);

    }
  }


}
