import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
    selector: 'app-loading-indicator',
    templateUrl: './loading-indicator.component.html',
    styleUrls: ['./loading-indicator.component.css'],
    standalone: false
})
export class LoadingIndicatorComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  /**
   * showLoading
   */
  public showLoading() {
    return this.loaderService.getIsLoading();
  }

}
