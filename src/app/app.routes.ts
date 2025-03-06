import { Routes } from '@angular/router';
import { ArtifactComponent } from './artifact/artifact.component';

export const routes: Routes = [
    { path: '', redirectTo: '/artifacts', pathMatch: 'full' },
    { path: 'artifacts', component: ArtifactComponent },
];
