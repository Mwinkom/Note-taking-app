import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Search } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { NoteService } from './services/note.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'note-taking-app';
  searchTerm = '';
  
  SearchIcon = Search;
  
  constructor(private noteService: NoteService) {}
  
  onSearchChange(): void {
    this.noteService.setSearchTerm(this.searchTerm);
  }
}
