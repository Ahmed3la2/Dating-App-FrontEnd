import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl
  hubConnection!:HubConnection
  private onlineUserSource =  new BehaviorSubject<string[]>([]);
  onlineUser$ = this.onlineUserSource.asObservable()

  constructor(private toast:ToastrService) {}

  createHubConnection(user:User){
      this.hubConnection = new HubConnectionBuilder()
                          .withUrl(`${this.hubUrl}presence`, {accessTokenFactory:() => user.token })
                          .withAutomaticReconnect()
                          .build();
      this.hubConnection.start().catch(error => console.log(error));     
      this.hubConnection.on('UserIsOnline', userName => {
          this.toast.info(userName + ' Is Connected' )
      })
      this.hubConnection.on('UserIsOffline', userName => {
          this.toast.warning(userName + ' Is DisConnected')
      })
      this.hubConnection.on("GetOnlineUsers", (usernames:string[]) =>{
        this.onlineUserSource.next(usernames)        
      })
  }

  stopHubConnection(){
    this.hubConnection.stop().catch(error => console.log(error));
  }
}
