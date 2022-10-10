import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService, private route: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>  {
    return next.handle(request).pipe(
      catchError(error  => {
        if(error){
          switch (error.status) {
            case 400:
               if(error.error.errors){
                const modalStatError = [];
                for(let key in error.error.errors){
                 if(error.error.errors[key]){
                  modalStatError.push(error.error.errors[key])
                 }
                }
                throw modalStatError
               } else{
                this.toastr.error(error.statusText, error.status)
               }
              break;
               case 401 : 
               this.toastr.error(error.statusText, error.status);
               break
               case 404 :
                this.route.navigateByUrl("/not-found");
                break;
                case 500:
                  const navigationExtras: NavigationExtras = {state: {error: error.error}}
                  this.route.navigateByUrl("server-error", navigationExtras)
                break;
            default:
               this.toastr.error("Something Unexpected Went wrong")
               console.log(error);
               break;
          }
        }

        return throwError(error)
      })
    )
  }
}
