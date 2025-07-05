import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Search, Tag, Menu, X } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { NoteService } from './services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'note-taking-app';
  searchTerm = '';
  selectedTag = '';
  showTagDropdown = false;
  
  SearchIcon = Search;
  TagIcon = Tag;
  MenuIcon = Menu;
  CloseIcon = X;
  
  isMobileMenuOpen = false;
  
  constructor(private noteService: NoteService) {}
  
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
  
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
  
  handleNavClick(event: Event): void {
    (event.target as HTMLElement).click();
  }
  
  handleTagKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeTagDropdown();
    }
    event.stopPropagation();
  }
}
