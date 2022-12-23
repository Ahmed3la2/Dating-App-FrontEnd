import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit {
  usersWithRoles!: User[];
  baseUrl = environment.apiUrl
  constructor(private http:HttpClient) { }
  ngOnInit(): void {   
  }

  GetUsersWithRoles(): Observable<User[]>{
   return this.http.get<User[]>(`${this.baseUrl}Admin/users-with-roles`)
  }

  UpdateRoles(username:string, roles: any[]){ 
   return this.http.post(`${this.baseUrl}Admin/edit-roles/${username}?roles=${roles}`,{})
  }
}
