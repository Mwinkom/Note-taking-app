import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Settings, X, Palette, Type } from 'lucide-angular';
import { ThemeService, ColorTheme, FontTheme, ThemePreferences } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  
  showSettings = false;
  preferences: ThemePreferences = { colorTheme: 'light', fontTheme: 'sans-serif' };
  private subscriptions = new Subscription();
  
  SettingsIcon = Settings;
  CloseIcon = X;
  PaletteIcon = Palette;
  TypeIcon = Type;
  
  colorThemes: { value: ColorTheme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'custom', label: 'Custom' }
  ];
  
  fontThemes: { value: FontTheme; label: string }[] = [
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'monospace', label: 'Monospace' }
  ];
  
  ngOnInit(): void {
    this.subscriptions.add(
      this.themeService.preferences$.subscribe(prefs => {
        this.preferences = prefs;
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  toggleSettings(): void {
    this.showSettings = !this.showSettings;
  }
  
  closeSettings(): void {
    this.showSettings = false;
  }
  
  setColorTheme(theme: ColorTheme): void {
    this.themeService.setColorTheme(theme);
  }
  
  setFontTheme(theme: FontTheme): void {
    this.themeService.setFontTheme(theme);
  }
  
  handleSettingsKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeSettings();
    }
    event.stopPropagation();
  }
  
  handleButtonKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeSettings();
    }
  }
  
  getFontFamily(fontTheme: FontTheme): string {
    switch (fontTheme) {
      case 'serif': return 'Georgia, serif';
      case 'monospace': return 'Monaco, monospace';
      default: return 'Inter, sans-serif';
    }
  }
}