// File: src/app/artifact-list.component.ts
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GraphqlService, Artifact } from '../graphql.service';

@Component({
  standalone: true,
  selector: 'app-artifact',
  imports: [CommonModule],
  templateUrl: './artifact.component.html',
})
export class ArtifactsComponent implements OnInit {
  artifacts: Artifact[] = [];
  isBrowser: boolean;

  constructor(private gqlService: GraphqlService,
    @Inject(PLATFORM_ID) private platformId: object
) {
  this.isBrowser = isPlatformBrowser(this.platformId);
}

  fetchArtifacts() {
    this.gqlService.getAllArtifacts().subscribe((data) => {
      this.artifacts = data;
    });
  }

  ngOnInit(): void {
   console.log("Loaded the artifact");
  }
}
