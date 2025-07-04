import { Component, inject, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Archive, Edit, Search, Tag } from 'lucide-angular';
import { Note } from '../../models/note.model';


@Component({
  selector: 'app-archived-notes',
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './archived-notes.component.html',
  styleUrl: './archived-notes.component.scss'
})

export class ArchivedNotesComponent implements OnInit {
  private noteService = inject(NoteService);
  notes: Note[] = [];
  searchTerm: string = '';

  ArchiveIcon = Archive;
  EditIcon = Edit;
  SearchIcon = Search;
  TagIcon = Tag;

  ngOnInit(): void {
    this.noteService.notes$.subscribe(notes => {
      this.notes = notes.filter(note => note.isArchived);
    });
    
    this.noteService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
    });
  }

  unarchiveNote(id: string): void {
    this.noteService.unarchiveNote(id);
  }

  get filteredNotes() {
    if (!this.searchTerm.trim()) return this.notes;
    return this.noteService.searchNotes(this.searchTerm).filter(note => note.isArchived);
  }
}