import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule, CommonModule, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  
  title = 'note-taking-app';
  isMobileMenuOpen = false;
  
  MenuIcon = Menu;
  CloseIcon = X;
  
  ngOnInit(): void {
    // Theme service initializes automatically
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
}
