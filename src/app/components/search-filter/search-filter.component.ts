import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Tag } from 'lucide-angular';
import { NoteService } from '../../services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-filter',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  private noteService = inject(NoteService);
  
  searchTerm = '';
  selectedTag = '';
  showTagDropdown = false;
  private subscriptions = new Subscription();
  
  SearchIcon = Search;
  TagIcon = Tag;
  
  ngOnInit(): void {
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
  
  onSearchChange(): void {
    this.noteService.setSearchTerm(this.searchTerm);
  }
  
  get allTags(): string[] {
    return this.noteService.getAllTags();
  }
  
  toggleTagDropdown(): void {
    this.showTagDropdown = !this.showTagDropdown;
  }
  
  selectTag(tag: string): void {
    this.selectedTag = tag;
    this.noteService.setSelectedTag(tag);
    this.showTagDropdown = false;
  }
  
  clearTagFilter(): void {
    this.selectedTag = '';
    this.noteService.setSelectedTag('');
    this.showTagDropdown = false;
  }
  
  closeTagDropdown(): void {
    this.showTagDropdown = false;
  }
  
  handleTagKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeTagDropdown();
    }
    event.stopPropagation();
  }
}