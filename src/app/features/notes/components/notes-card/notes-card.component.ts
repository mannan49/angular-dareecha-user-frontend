import { Component, Input } from '@angular/core';
import { Note } from '@models/entities/note.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notes-card',
  standalone: false,
  templateUrl: './notes-card.component.html',
  styleUrl: './notes-card.component.css'
})
export class NotesCardComponent {
  @Input() note : Note;
  CLOUD_FRONT_URL = environment.cloudFrontUrl;

  onDownlaodButtonClick(){
    window.open(this.CLOUD_FRONT_URL + this.note?.File?.Url, '_blank');
  }
}
