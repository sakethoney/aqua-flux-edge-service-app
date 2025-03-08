import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.less'],
  imports:[FormsModule,CommonModule, RouterModule]
})
export class FeaturesComponent {

  // A list of items, e.g. from an external service in a real scenario
  items: string[] = ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'NgRx', 'Node.js'];
  
  // A filter text which the user will input
  filterText = '';

  get filteredItems(): string[] {
    if (!this.filterText) {
      return this.items;
    }
    // Filter ignoring case
    return this.items.filter(
      item => item.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
