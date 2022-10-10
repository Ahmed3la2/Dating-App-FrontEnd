import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable} from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountServices: AccountService, private toast:ToastrService){}
  canActivate(): Observable<boolean> {
   return this.accountServices.CurrentUser$.pipe(map(u => {
      if(u) return true
      else{
        this.toast.error("You Shall Not Pass")
        return false
      }
   }))
  }
  
}
