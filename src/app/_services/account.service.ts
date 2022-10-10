import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from 'src/app/_model/user.model'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  basrUrl = 'https://localhost:44382/api/'
  private CurrentUserSource = new ReplaySubject<User|null>(1);
  CurrentUser$ = this.CurrentUserSource.asObservable();
  static CurrentUser$: any;
  constructor(private http : HttpClient) {}

      login(model: User){
        return this.http.post(this.basrUrl + 'Account/login',  model).pipe(
          map((res: any) => {
            const user = res;
            if(user){
              localStorage.setItem("user", JSON.stringify(user));
              this.CurrentUserSource.next(user)
              return res
            }
          })
        )
   }
      register(model:any){
        return this.http.post<User>(this.basrUrl + 'account/register',  model).pipe(
          map((res: User) => {
            const user = res;
            if(user){
              localStorage.setItem("user", JSON.stringify(user));
              this.CurrentUserSource.next(user)
              return res
            }
            return null
          })

        )
      }
      setCurrentUser(user: User){
      this.CurrentUserSource.next(user);
    }

     logout(){
      localStorage.removeItem("user");
      this.CurrentUserSource.next(null);
   }
}
