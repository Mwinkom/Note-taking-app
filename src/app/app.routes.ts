import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'notes',
        pathMatch: 'full'
    },
    {
        path: 'notes',
        loadComponent: () => 
            import('./pages/notes-dashboard/notes-dashboard.component').then(m => m.NotesDashboardComponent)
    },
    {
        path: 'notes/:id',
        loadComponent: () => 
            import('./pages/note-detail/note-detail.component').then(m => m.NoteDetailComponent)
    },
    {
        path: 'create',
        loadComponent: () => 
            import('./pages/create-note/create-note.component').then(m => m.CreateNoteComponent)
    },
    {
        path: 'archived',
        loadComponent: () => 
            import('./pages/archived-notes/archived-notes.component').then(m => m.ArchivedNotesComponent)
    }
];
