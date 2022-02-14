import { Injectable } from '@angular/core';

//this tells angular to create a Singleton
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: boolean = true;

  constructor() { }

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
