import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private baseUrl = environment.coingecko.host;
  private version = environment.coingecko.version;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      url: request.url.startsWith('http') ? request.url : `${this.baseUrl}/${this.version}${request.url}`,
    });

    return next.handle(request);
  }
}
