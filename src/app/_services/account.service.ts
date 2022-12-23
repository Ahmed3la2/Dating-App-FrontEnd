import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from 'src/app/_model/user.model'
import { environment } from 'src/environments/environment';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  [x: string]: any;

  basrUrl = environment.apiUrl;
  private CurrentUserSource = new ReplaySubject<User|null>(1);
  CurrentUser$ = this.CurrentUserSource.asObservable();
  constructor(private http : HttpClient, private presence:PresenceService) {}

      login(model: User){
        return this.http.post(this.basrUrl + 'Account/login',  model).pipe(
          map((res: any) => {
            const user = res;
            if(user){
              this.setCurrentUser(user)
              localStorage.setItem("user", JSON.stringify(user));
              this.presence.createHubConnection(user);
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
              this.presence.createHubConnection(user);
              return user
            }
            return null
          })

        )
      }
      setCurrentUser(user: User){
        user.roles = [];
        const roles = this.DecodeToken(user.token).role
        Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
        localStorage.setItem("user", JSON.stringify(user));
        this.CurrentUserSource.next(user);
    }

     logout(){
      localStorage.removeItem("user");
      this.CurrentUserSource.next(null);
      this.presence.stopHubConnection();
   }

   DecodeToken(token:any){
    return JSON.parse(atob(token.split('.')[1]))
   }
}
