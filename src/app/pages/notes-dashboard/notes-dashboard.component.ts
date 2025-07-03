import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, FileText, Search, Tag, Archive, Edit } from 'lucide-angular';

@Component({
  selector: 'app-notes-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrl: './notes-dashboard.component.scss'
})

export class NotesDashboardComponent implements OnInit {  
  private noteService = inject(NoteService);
  notes$ = this.noteService.notes$;
  searchTerm: string = '';
  
  // Icons
  FileTextIcon = FileText;
  SearchIcon = Search;
  TagIcon = Tag;
  ArchiveIcon = Archive;
  EditIcon = Edit;

  archiveNote(id: string): void {
    this.noteService.archiveNote(id);
  } 

  notes: Note[] = [];
  
  ngOnInit() {
    // Clear existing data
    localStorage.removeItem('notes');
    this.noteService.loadNotesFromStorage();
    this.addMockNotes();
    this.notes$.subscribe(notes => {
      this.notes = notes.filter(note => !note.isArchived);
    });
  }
  
  private addMockNotes() {
    const mockNotes = [
      {
        title: 'Meeting Notes',
        content: 'Discussed project timeline and deliverables for Q1. Need to follow up with design team.',
        tags: ['work', 'meeting'],
        isArchived: false
      },
      {
        title: 'Recipe Ideas',
        content: 'Try making pasta with garlic, olive oil, and fresh herbs. Simple but delicious.',
        tags: ['cooking', 'recipes'],
        isArchived: false
      },
      {
        title: 'Book Recommendations',
        content: 'The Design of Everyday Things by Don Norman. Great insights on user experience.',
        tags: ['books', 'design'],
        isArchived: false
      }
    ];
    
    mockNotes.forEach(note => {
      this.noteService.createNote(note);
    });
  }
  
  get filteredNotes() {
    if (!this.searchTerm.trim()) return this.notes;
    return this.noteService.searchNotes(this.searchTerm).filter(note => !note.isArchived);
  }
}
