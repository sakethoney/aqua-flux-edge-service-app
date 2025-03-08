import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FeaturesComponent } from './features/features.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { RenderMode } from '@angular/ssr';

export const serverRoutes = [
  { path: '', component: FeaturesComponent ,renderMode:RenderMode.Server},
  { path: 'artifacts', component: ArtifactsComponent, renderMode:RenderMode.Server },
];

export const serverAppConfig = {
  providers: [
    provideRouter(serverRoutes),
    importProvidersFrom(FeaturesComponent, ArtifactsComponent), // ✅ Explicitly import standalone components
  ],
};
