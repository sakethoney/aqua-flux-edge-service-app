// File: src/app/artifact-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlService, Artifact } from '../graphql.service';

@Component({
  standalone: true,
  selector: 'app-artifact',
  imports: [CommonModule],
  templateUrl: './artifact.component.html',
})
export class ArtifactComponent implements OnInit {
  artifacts: Artifact[] = [];

  constructor(private gqlService: GraphqlService) {}

  ngOnInit(): void {
    this.gqlService.getAllArtifacts().subscribe((data) => {
      this.artifacts = data;
    });
  }
}
