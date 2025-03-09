// File: src/app/artifact-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlService, Artifact } from '../graphql.service';


@Component({
  standalone: true,
  selector: 'app-artifact',
  imports: [CommonModule],
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifact.component.less'],
})
export class ArtifactsComponent implements OnInit {
 artifacts: Artifact[] = [];
 
 constructor(private gqlService: GraphqlService){}

  ngOnInit(): void {
   console.log("Loaded the artifact");
  }

  fetchArtifacts() {
    this.gqlService.getAllArtifacts().subscribe((data) => {
      this.artifacts = data;
    });
  }
}
