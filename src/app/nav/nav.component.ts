import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model:any = {};
  logging:boolean = false;
  user:User= {
    userName: '',
    token: ''
  };

  constructor(private accountservices:AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login(){
    this.accountservices.login(this.model).subscribe(res => {
      console.log(res)
      this.logging = true;
    })
  }

  logout(){
    this.logging = false; 
    this.accountservices.logout();
  }

  getCurrentUser(){
    this.accountservices.CurrentUser$.subscribe(user=>{
      this.logging = !!user;
    })
  }

}
