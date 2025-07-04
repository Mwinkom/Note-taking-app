import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LucideAngularModule, Archive, Edit, Search, Tag } from 'lucide-angular';
import { Note } from '../../models/note.model';
import { Subscription } from 'rxjs';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';


@Component({
  selector: 'app-archived-notes',
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, SearchFilterComponent],
  templateUrl: './archived-notes.component.html',
  styleUrl: './archived-notes.component.scss'
})

export class ArchivedNotesComponent implements OnInit, OnDestroy {
  private noteService = inject(NoteService);
  private router = inject(Router);
  notes: Note[] = [];
  searchTerm: string = '';
  private subscriptions = new Subscription();

  ArchiveIcon = Archive;
  EditIcon = Edit;
  SearchIcon = Search;
  TagIcon = Tag;

  selectedTag = '';
  
  ngOnInit(): void {
    this.noteService.loadNotesFromStorage();
    
    this.subscriptions.add(
      this.noteService.notes$.subscribe(notes => {
        this.notes = notes.filter(note => note.isArchived);
      })
    );
    
    this.subscriptions.add(
      this.noteService.searchTerm$.subscribe(term => {
        this.searchTerm = term;
      })
    );
    
    this.subscriptions.add(
      this.noteService.selectedTag$.subscribe(tag => {
        this.selectedTag = tag;
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  unarchiveNote(id: string, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent card click
    }
    this.noteService.unarchiveNote(id);
  }
  
  viewNote(id: string): void {
    this.router.navigate(['/notes', id]);
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