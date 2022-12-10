import { HttpClient, HttpParams } from '@angular/common/http';
import { messages} from '../_model/Messages.model';
import { messageContent} from '../_model/messgeContent.model';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessagesParam } from "../_model/messagesParam";
import { PaginatedResult } from '../_model/pagination';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl
  paginatedResult : PaginatedResult<messages[]> = new PaginatedResult<messages[]>() ;
  Conversation: messages[]
  constructor(private http:HttpClient) { }

  Getmessages(messagesParam: MessagesParam): Observable<PaginatedResult<messages[]>>{
    let params = new HttpParams()
    params = params.append("PageNumber",messagesParam.PageNumber);
    params = params.append("PageSize",  messagesParam.PageSize);
    params = params.append("Container", messagesParam.container)
    
    return this.http.get<PaginatedResult<messages[]>>(`${this.baseUrl}Message`, {observe:"response", params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body as any;
        if(response.headers.get("pagination") != null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("pagination") as any) 
        }
        return this.paginatedResult;
      })
    ) 
  }

  GetConversaTion(UserName? :string):Observable<messages[]>{
    return this.http.get<messages[]>(`${this.baseUrl}Message/thread/${UserName}`,{observe:"response"}).pipe(
      map(response => {
       return this.Conversation = response.body as any
      })
    )
  }

  sentMessage(messageContent: messageContent){
    return this.http.post(`${this.baseUrl}Message`, messageContent)
  }
}
