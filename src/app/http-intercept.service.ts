import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptService implements HttpInterceptor {

  constructor(private loader: LoaderService) { }

  /**
   * Http interceptor hocked sich in alle requests ein. Kann z.b. für Auth. oder loading icon genutzt werden.
   * @param req 
   * @param next 
   * @returns 
   */
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
    return next.handle(req).pipe(
      finalize(() => this.loader.hide())
    );
  }
}
