import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Note } from '@models/entities/note.model';
import { Select } from '@models/shared/select.model';

@Component({
  selector: 'app-notes-filter',
  standalone: false,
  templateUrl: './notes-filter.component.html',
  styleUrl: './notes-filter.component.css',
})
export class NotesFilterComponent {
  @Input() notes: Note[] = [];
  notesFilterForm: FormGroup;
  gradesList: Select[] = [];
  subjectsList: Select[] = [];
  chaptersList: Select[] = [];

  @Output() filtersSelection = new EventEmitter<string>()

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.intializeForm();
    this.buildSelectLists();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notes']) {
      this.buildSelectLists();
    }
  }

  intializeForm() {
    this.notesFilterForm = this.formBuilder.group({
      grade: String.Empty,
      subject: String.Empty,
      chapter: String.Empty,
    });
  }

  buildSelectLists() {
    const toSelectList = (items: string[]): Select[] => {
      const unique = Array.from(new Set(items.filter(Boolean)));
      return unique.map(value => ({
        Value: value,
        Display: value,
      }));
    };

    this.gradesList = toSelectList(this.notes.map(note => note?.Grade));
    this.subjectsList = toSelectList(this.notes.map(note => note?.Subject));
    this.chaptersList = toSelectList(this.notes.map(note => note?.Chapter));
  }

  onSubjectSelection(subject: string){
    console.log("Selected subject", subject);
    this.filtersSelection.emit(subject);
  }
}
