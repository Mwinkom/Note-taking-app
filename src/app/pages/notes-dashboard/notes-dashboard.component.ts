import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LucideAngularModule, FileText, Archive, Edit, Tag, Search } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { SearchFilterComponent } from '../../components/search-filter/search-filter.component';

@Component({
  selector: 'app-notes-dashboard',
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule, SearchFilterComponent],
  templateUrl: './notes-dashboard.component.html',
  styleUrl: './notes-dashboard.component.scss'
})

export class NotesDashboardComponent implements OnInit, OnDestroy {  
  private noteService = inject(NoteService);
  private router = inject(Router);
  notes$ = this.noteService.notes$;
  searchTerm: string = '';
  private subscriptions = new Subscription();
  
  // Icons
  FileTextIcon = FileText;
  SearchIcon = Search;
  TagIcon = Tag;
  ArchiveIcon = Archive;
  EditIcon = Edit;

  archiveNote(id: string, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent card click
    }
    this.noteService.archiveNote(id);
  }
  
  viewNote(id: string): void {
    this.router.navigate(['/notes', id]);
  } 

  trackByNoteId(index: number, note: Note): string {
    return note.id;
  }

  notes: Note[] = [];
  
  selectedTag = '';
  
  ngOnInit() {
    this.noteService.loadNotesFromStorage();
    
    this.subscriptions.add(
      this.notes$.subscribe(notes => {
        this.notes = notes.filter(note => !note.isArchived);
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
