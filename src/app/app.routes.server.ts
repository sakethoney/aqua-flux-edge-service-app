import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FeaturesComponent } from './features/features.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { RenderMode } from '@angular/ssr';




export const serverAppConfig = {
  providers: [
    
    importProvidersFrom(FeaturesComponent, ArtifactsComponent), // ✅ Explicitly import standalone components
  ],
};
