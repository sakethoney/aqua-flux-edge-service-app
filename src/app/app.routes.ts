import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';

export const routes: Routes = [
    { path: '', component: FeaturesComponent },
    { path: 'artifacts', component: ArtifactsComponent },
];
