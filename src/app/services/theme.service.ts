import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ColorTheme = 'light' | 'dark' | 'custom';
export type FontTheme = 'sans-serif' | 'serif' | 'monospace';

export interface ThemePreferences {
  colorTheme: ColorTheme;
  fontTheme: FontTheme;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme-preferences';
  
  private preferencesSubject = new BehaviorSubject<ThemePreferences>({
    colorTheme: 'light',
    fontTheme: 'sans-serif'
  });
  
  preferences$ = this.preferencesSubject.asObservable();
  
  constructor() {
    this.loadPreferences();
    this.applyTheme();
  }
  
  setColorTheme(theme: ColorTheme): void {
    const current = this.preferencesSubject.value;
    const updated = { ...current, colorTheme: theme };
    this.preferencesSubject.next(updated);
    this.savePreferences();
    this.applyTheme();
  }
  
  setFontTheme(theme: FontTheme): void {
    const current = this.preferencesSubject.value;
    const updated = { ...current, fontTheme: theme };
    this.preferencesSubject.next(updated);
    this.savePreferences();
    this.applyTheme();
  }
  
  private loadPreferences(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const preferences = JSON.parse(stored);
        this.preferencesSubject.next(preferences);
      } catch (error) {
        console.warn('Failed to load theme preferences:', error);
      }
    }
  }
  
  private savePreferences(): void {
    const preferences = this.preferencesSubject.value;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
  }
  
  private applyTheme(): void {
    const { colorTheme, fontTheme } = this.preferencesSubject.value;
    const body = document.body;
    
    // Apply color theme
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add(`theme-${colorTheme}`);
    
    // Apply font theme
    body.className = body.className.replace(/font-\w+/g, '');
    body.classList.add(`font-${fontTheme}`);
  }
}