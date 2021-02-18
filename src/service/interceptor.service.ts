import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from './api.service';
import { LoaderProvider } from './loaderProvider';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {
  constructor(private loader: LoaderProvider) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.showLoader();
    if (request.url.search('login') < 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ApiService.Token}`,
        },
      });
    }

    return next.handle(request).pipe(finalize(() => this.loader.hideLoader()));
  }
}
