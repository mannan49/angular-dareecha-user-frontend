import { Component } from '@angular/core';

import { catchError, EMPTY, filter, take, tap } from 'rxjs';

import { Note } from '@models/entities/note.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';

import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-notes-container',
  standalone: false,
  templateUrl: './notes-container.component.html',
  styleUrl: './notes-container.component.css',
})
export class NotesContainerComponent {
  notes: Note[] = [];

  constructor(private apiHttpService: ApiHttpService) {}

  ngOnInit() {
    this.fetchNotes(new EntityFilter());
  }

  fetchNotes(payload: EntityFilter) {
    this.apiHttpService
      .getNotesByFilter(payload)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Note>) => {
          this.notes = res?.Items;
          console.log(res);
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }

  handleFiltersSelection(subject: string) {
    const noteFilter = new EntityFilter();
    noteFilter.Subject = subject;
    this.fetchNotes(noteFilter);
  }
}



