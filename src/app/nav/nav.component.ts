import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  user!:any
  

  constructor(public accountservices:AccountService, private router:Router, private toast:ToastrService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login(){
    this.accountservices.login(this.model).subscribe(() => {
      this.router.navigateByUrl("/members")
      this.logging = true;
    })
  }

  logout(){
    this.logging = false; 
    this.accountservices.logout();
    this.router.navigateByUrl("/")

  }

  getCurrentUser(){
    this.accountservices.CurrentUser$.subscribe(user=>{
      this.logging = !!user;
      this.accountservices.CurrentUser$.subscribe(x => {
        this.user = x
      })
    })
  }

}
