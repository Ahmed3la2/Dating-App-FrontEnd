import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from 'src/app/_model/user.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  [x: string]: any;

  basrUrl = environment.apiUrl;
  private CurrentUserSource = new ReplaySubject<User|null>(1);
  CurrentUser$ = this.CurrentUserSource.asObservable();
  constructor(private http : HttpClient) {}

      login(model: User){
        return this.http.post(this.basrUrl + 'Account/login',  model).pipe(
          map((res: any) => {
            const user = res;
            if(user){
              this.setCurrentUser(user)
              localStorage.setItem("user", JSON.stringify(user));
              return user
            }
          })
        )
   }
      register(model:any){
        return this.http.post<User>(this.basrUrl + 'account/register',  model).pipe(
          map((res: User) => {
            const user = res;
            if(user){
              this.setCurrentUser(user)
              localStorage.setItem("user", JSON.stringify(user));
              return user
            }
            return null
          })

        )
      }
      setCurrentUser(user: User){
        localStorage.setItem("user", JSON.stringify(user));
        this.CurrentUserSource.next(user);
    }

     logout(){
      localStorage.removeItem("user");
      this.CurrentUserSource.next(null);
   }
}
