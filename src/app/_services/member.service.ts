import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/member.model';
import { PaginatedResult } from '../_model/pagination';
import { Photo } from '../_model/Photo';
import { UserParams } from '../_model/userParams';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  members: Member[] = [];
  paginatedResult : PaginatedResult<Member[]>= new PaginatedResult<Member[]>() ;
  baseUrl = environment.apiUrl
  constructor(private http: HttpClient) {}

  GetMembers(UserParams: UserParams) : Observable<PaginatedResult<Member[]>>  {  
    let params = this.GetPaginationHeaders(UserParams.PageNumber, UserParams.PageSize);

    params = params.append("MiniAge", UserParams.MiniAge.toString())
    params = params.append("MaxAge", UserParams.MaxAge.toString())
    params = params.append("Gender", UserParams.Gender)
    params = params.append("OrderBy", UserParams.OrderBy)
    

    return this.http.get<PaginatedResult<Member[]>>(this.baseUrl + "User/allusers", {observe:"response", params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body as any;
        if(response.headers.get("pagination") != null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("pagination") as any) 
        }
        return this.paginatedResult;
      })

    );
  }

  private GetPaginationHeaders(PageNumeber : Number,  PageSize : Number){
    let params =  new HttpParams();
      params = params.append("PageNumber", PageNumeber.toString());
      params = params.append("PageSize"  , PageSize.toString());
      return params
  }

  GetMember(username: string) {
    const member = this.members.find(x => x.userName === username);
    if(member != undefined) return of(member);

    return this.http.get<Member>(this.baseUrl + 'User/user' + username)
  }

  UpdateMemeber(member:Member) {
    return this.http.put(this.baseUrl + 'User', member)
  }

  SetMainPhoto(id :Number){
    return this.http.put(this.baseUrl + `User/set-main-photo/${id}`, {})
  }

  deletePhoto(id:Number){
    return this.http.delete(this.baseUrl + `User/delete-photo/${id}`)
  }
  AddLike(id:Number) {
     return this.http.post(`${this.baseUrl}UserLikes/${id}`, {});
  }

  getLikes(perdicate: string, PageNumber: number, PageSize: number): Observable<PaginatedResult<Member[]>>  {
    let params =  new HttpParams();
    params = params.append("PageNumber", PageNumber.toString());
    params = params.append("PageSize", PageSize.toString());
    params = params.append("Perdicate", perdicate);

    return this.http.get<PaginatedResult<Member[]>>(`${this.baseUrl}UserLikes`, {observe:"response", params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body as any;
        if(response.headers.get("pagination") != null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("pagination") as any) 
        }
        return this.paginatedResult;
      })
    );
  }

  getUserPhoto(userName:string): Observable<Photo[]>{
    return this.http.get<Photo[]>(`${this.baseUrl}User/get-member-photo?userName=${userName}`)
  }
}

