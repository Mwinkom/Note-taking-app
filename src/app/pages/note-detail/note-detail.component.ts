import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { LucideAngularModule, ArrowLeft, Edit, Trash2, Save, X, Tag } from 'lucide-angular';

@Component({
  selector: 'app-note-detail',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss'
})
export class NoteDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noteService = inject(NoteService);
  private fb = inject(FormBuilder);
  
  note: Note | null = null;
  isEditMode = false;
  isLoading = true;
  noteForm: FormGroup;
  
  // Icons
  ArrowLeftIcon = ArrowLeft;
  EditIcon = Edit;
  TrashIcon = Trash2;
  SaveIcon = Save;
  CancelIcon = X;
  TagIcon = Tag;
  
  constructor() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      content: ['', [Validators.required, Validators.minLength(1)]],
      tags: [[]]
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const noteId = params['id'];
      this.loadNote(noteId);
    });
  }
  
  loadNote(id: string): void {
    this.noteService.loadNotesFromStorage();
    const foundNote = this.noteService.getNoteById(id);
    
    if (foundNote) {
      this.note = foundNote;
      this.noteForm.patchValue({
        title: this.note.title,
        content: this.note.content,
        tags: this.note.tags
      });
      this.isLoading = false;
    } else {
      this.router.navigate(['/notes']);
    }
  }
  
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode && this.note) {
      // Reset form if canceling edit
      this.noteForm.patchValue({
        title: this.note.title,
        content: this.note.content,
        tags: this.note.tags
      });
    }
  }
  
  saveNote(): void {
    if (this.noteForm.valid && this.note) {
      const updatedNote: Note = {
        ...this.note,
        title: this.noteForm.value.title,
        content: this.noteForm.value.content,
        tags: this.noteForm.value.tags || []
      };
      
      this.noteService.updateNote(updatedNote);
      this.note = updatedNote;
      this.isEditMode = false;
    }
  }
  
  deleteNote(): void {
    if (this.note && confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(this.note.id);
      this.router.navigate(['/notes']);
    }
  }
  
  goBack(): void {
    this.router.navigate(['/notes']);
  }
  
  get titleError(): string {
    const titleControl = this.noteForm.get('title');
    if (titleControl?.errors && titleControl.touched) {
      if (titleControl.errors['required']) return 'Title is required';
      if (titleControl.errors['minlength']) return 'Title must not be empty';
    }
    return '';
  }
  
  get contentError(): string {
    const contentControl = this.noteForm.get('content');
    if (contentControl?.errors && contentControl.touched) {
      if (contentControl.errors['required']) return 'Content is required';
      if (contentControl.errors['minlength']) return 'Content must not be empty';
    }
    return '';
  }
  
  updateTags(event: Event): void {
    const target = event.target as HTMLInputElement;
    const tags = target.value.split(',').map(t => t.trim()).filter(t => t);
    this.noteForm.patchValue({ tags });
  }
}
