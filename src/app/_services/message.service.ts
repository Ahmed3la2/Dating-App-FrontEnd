import { HttpClient, HttpParams } from '@angular/common/http';
import { Messages} from '../_model/Messages.model';
import { messageContent} from '../_model/messgeContent.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, startWith, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessagesParam } from "../_model/messagesParam";
import { PaginatedResult } from '../_model/pagination';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl
  hubUrl = environment.hubUrl
  hubConnection!:HubConnection
  messagesSource = new BehaviorSubject<Messages[]>([]);
  messageThread$ = this.messagesSource.asObservable();
  paginatedResult : PaginatedResult<Messages[]> = new PaginatedResult<Messages[]>() ;
  messagesParam : MessagesParam = new MessagesParam()
  totalCount!:number;

  constructor(private http:HttpClient) {}

  CreateConnection(user:User, otherUser:string, pagenum:Number){
    this.hubConnection = new HubConnectionBuilder()
          .withUrl(`${this.hubUrl}message?user=${otherUser}&pageNumber=${pagenum}`,{accessTokenFactory:() => user.token})
          .withAutomaticReconnect()
          .build();
    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on("ReciveMessageThread",(messages) => {      
      this.messagesSource.next(messages.mess);
      this.totalCount = messages.totalCount
    })

    this.hubConnection.on("NewMessage", (message: any) => {
      this.messageThread$.pipe(take(1)).subscribe((messages: any) => {     
        console.log(messages);              
        messages.unshift(message)
        this.messagesSource.next(messages)
      })
    })

    this.hubConnection.on("paginatedMessage", (messages: any) => {
      this.messagesSource.next(messages.mess)
    })
  } 

  StophubConnecton(){
   if(this.hubConnection) {
    this.hubConnection.stop()
   }
  }

  async sendMessageThread(messageContent: messageContent){
    return this.hubConnection.invoke("SendMessage", messageContent).catch(e => console.log(e));
  }

  async GetPaginatedmessage(pageNum:number){
    return this.hubConnection.invoke("getPaginatedMessage", pageNum).catch(e=> console.log(e));
  }


  Getmessages(messagesParam: MessagesParam): Observable<PaginatedResult<Messages[]>>{
    let params = new HttpParams()
    params = params.append("PageNumber",messagesParam.PageNumber);
    params = params.append("PageSize",  messagesParam.PageSize);
    params = params.append("Container", messagesParam.container);
    
    return this.http.get<PaginatedResult<Messages[]>>(`${this.baseUrl}Message`, {observe:"response", params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body as any;
        if(response.headers.get("pagination") != null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("pagination") as any) 
        }
        return this.paginatedResult;
      })
    ) 
  }

  GetConversaTion(username:string, pageNumber:number, pagesize:number):Observable<PaginatedResult<Messages[]>>{
    let params = new HttpParams()
    params = params.append("PageNumber",pageNumber);
    params = params.append("PageSize",  pagesize);
    params = params.append("UserName",  username);

    return this.http.get<PaginatedResult<Messages[]>>(`${this.baseUrl}Message/thread`,{observe:"response", params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body as any;
        if(response.headers.get("pagination") != null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("pagination") as any) 
        }
        return this.paginatedResult;
      })
    )
  }

  sentMessage(messageContent: messageContent){
    return this.http.post(`${this.baseUrl}Message`, messageContent)
  }

  deleteMessage(id: number){
    return this.http.delete(`${this.baseUrl}Message/${id}`) 
  }
}
