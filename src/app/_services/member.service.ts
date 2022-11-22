import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/member.model';
import { Photo } from '../_model/Photo';

// const httpOption = {
//  headers: new HttpHeaders({
//   Authorization: "Bearer " + JSON.parse(localStorage.getItem('user')!).token,
//   "Content-Type":"application/json"
//  })
// }

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  members: Member[] = [];
  baseUrll = environment.apiUrl
  constructor(private http: HttpClient) {}

  GetMembers() : Observable<Member[]>{
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrll + "User/allusers").pipe(
      map(members => {
        this.members = members
        return members;
    }));
  }

  GetMember(username: string) {
    const member = this.members.find(x => x.userName === username);
    if(member != undefined) return of(member);

    return this.http.get<Member>(this.baseUrll + 'User/user' + username)
  }

  UpdateMemeber(member:Member) {
    return this.http.put(this.baseUrll + 'User', member)
  }

  SetMainPhoto(id :Number){
    return this.http.put(this.baseUrll + `User/set-main-photo/${id}`, {})
  }

  deletePhoto(id:Number){
    return this.http.delete(this.baseUrll + `User/delete-photo/${id}`)
  }
}

