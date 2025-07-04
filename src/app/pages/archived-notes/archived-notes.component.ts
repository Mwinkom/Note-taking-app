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

  selectedTag = '';
  
  ngOnInit(): void {
    this.noteService.loadNotesFromStorage();
    
    this.noteService.notes$.subscribe(notes => {
      this.notes = notes.filter(note => note.isArchived);
    });
    
    this.noteService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
    });
    
    this.noteService.selectedTag$.subscribe(tag => {
      this.selectedTag = tag;
    });
  }

  unarchiveNote(id: string): void {
    this.noteService.unarchiveNote(id);
  }

  trackByNoteId(index: number, note: Note): string {
    return note.id;
  }
  
  get filteredNotes() {
    let filtered = this.notes;
    
    // Filter by tag first
    if (this.selectedTag) {
      filtered = filtered.filter(note => note.tags.includes(this.selectedTag));
    }
    
    // Then filter by search term using service method
    if (this.searchTerm.trim()) {
      const searchResults = this.noteService.searchNotes(this.searchTerm);
      filtered = filtered.filter(note => 
        searchResults.some(searchNote => searchNote.id === note.id)
      );
    }
    
    return filtered;
  }
}