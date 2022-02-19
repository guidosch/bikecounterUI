import { Injectable } from '@angular/core';

//this tells angular to create a Singleton
@Injectable({
  providedIn: 'root'
})

/**
 * Must be its own service and cannot be combined with the http interceptor class as each import creates an instance of the http interceptor.
 */
export class LoaderService {

  private isLoading: boolean = true;

  constructor() { 
  }

  public show() {
    this.isLoading = true;
  }

  public hide() {
    this.isLoading = false;
  }

  public getIsLoading() {
    return this.isLoading;
  }
}
