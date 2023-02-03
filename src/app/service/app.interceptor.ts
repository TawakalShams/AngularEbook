import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

   constructor(private authService: ServiceService) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(this.addAuthToken(request));
   }

   addAuthToken(request: HttpRequest<any>) {
      const token = this.authService.getToken();

      return request.clone({
         setHeaders: {
            Authorization: `Bearer ${token}`
         }
      })
   }
}