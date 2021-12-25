import { Component } from '@angular/core';

import { counters } from '../counters';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  counters = counters;

  share() {
    window.alert('The counter!');
  }
}
