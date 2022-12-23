import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private accountservie: AccountService, private toast:ToastrService){ }

  canActivate(): Observable<boolean>{
    return this.accountservie.CurrentUser$.pipe(
      map((res :any) => {
        if(res.roles.includes('Admin') || res.roles.includes("Moderator")){
          return true;
        }
         else {
          this.toast.error("You Cannot Enter This Area")
          return false
        }
      })
    )
  }
  
}
