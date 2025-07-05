import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { LucideAngularModule, Save, X, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-create-note',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss'
})
export class CreateNoteComponent {
  private fb = inject(FormBuilder);
  private noteService = inject(NoteService);
  private router = inject(Router);
  
  noteForm: FormGroup;
  showToast = false;
  
  // Icons
  SaveIcon = Save;
  CancelIcon = X;
  ArrowLeftIcon = ArrowLeft;
  
  constructor() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      content: ['', [Validators.required, Validators.minLength(1)]],
      tags: [[]]
    });
  }
  
  createNote(): void {
    if (this.noteForm.valid) {
      const noteData = {
        title: this.noteForm.value.title,
        content: this.noteForm.value.content,
        tags: this.noteForm.value.tags || [],
        isArchived: false
      };
      
      this.noteService.createNote(noteData);
      this.showSuccessToast();
      this.noteForm.reset();
    }
  }
  
  updateTags(event: Event): void {
    const target = event.target as HTMLInputElement;
    const tags = target.value.split(',').map(t => t.trim()).filter(t => t);
    this.noteForm.patchValue({ tags });
  }
  
  goBack(): void {
    this.router.navigate(['/notes']);
  }
  
  showSuccessToast(): void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
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
}
