import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'notes';

@Injectable({
  providedIn: 'root'
})

export class NoteService { 
    private notes: Note[] = [];
    private notesSubject = new BehaviorSubject <Note[]>([]);
    notes$ = this.notesSubject.asObservable();
    
    private searchTermSubject = new BehaviorSubject<string>('');
    searchTerm$ = this.searchTermSubject.asObservable();
    
    private selectedTagSubject = new BehaviorSubject<string>('');
    selectedTag$ = this.selectedTagSubject.asObservable();
    
    setSearchTerm(term: string): void {
      this.searchTermSubject.next(term);
    }
    
    setSelectedTag(tag: string): void {
      this.selectedTagSubject.next(tag);
    }
    
    getAllTags(): string[] {
      const allTags = this.notes.flatMap(note => note.tags);
      return [...new Set(allTags)].sort();
    }

    constructor() { }

    loadNotesFromStorage(): void {
      const storedNotes = localStorage.getItem(STORAGE_KEY);
      this.notes = storedNotes ? JSON.parse(storedNotes) : [];
      this.notesSubject.next(this.notes);
    }

    saveNotesToStorage(): void {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notes))
    }

    getAllNotes(): Observable<Note[]> {
        return this.notes$;
    }

    getNoteById(id: string): Note | undefined {
      return this.notes.find(note => note.id === id);
    }

    createNote(noteData: Omit<Note, 'id' | 'createdAt'>): void{
      const newNote = {
        id: uuidv4(),
        createdAt: new Date(),
        ...noteData
      }

      this.notes.push(newNote);
      this.saveNotesToStorage();
      this.notesSubject.next(this.notes);
    }
    
    updateNote(updatedNote: Note): void {
      const index = this.notes.findIndex(n => n.id === updatedNote.id);
      if (index > -1) {
        this.notes[index] = updatedNote;
        this.saveNotesToStorage();
        this.notesSubject.next(this.notes);
      }
    }

    deleteNote(id: string): void {
      this.notes = this.notes.filter(note => note.id !== id);
      this.saveNotesToStorage();
      this.notesSubject.next(this.notes);
    }

    archiveNote(id: string): void {
      const note = this.notes.find( n => n.id === id);

      if(note){
        note.isArchived = true;
        this.saveNotesToStorage();
        this.notesSubject.next(this.notes);
      }
    }

    unarchiveNote(id: string): void {
      const note = this.notes.find( n => n.id === id);

      if(note){
        note.isArchived = false;
        this.saveNotesToStorage();
        this.notesSubject.next(this.notes);
      }
    }

    searchNotes(term: string): Note[] {
      const lowercaseTerm = term.toLowerCase();

      return this.notes.filter( note => {
        return note.title.toLowerCase().includes(lowercaseTerm) ||
        note.content.toLowerCase().includes(lowercaseTerm) ||
        note.tags.some(tag => tag.toLowerCase().includes(lowercaseTerm));
      });
    }

}
