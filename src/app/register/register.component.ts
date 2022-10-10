import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any = {};
  @Input() usersFormHomeComp:any = [];
  @Output()  cancelRegitser = new EventEmitter();
  constructor( private accountServices:AccountService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountServices.register(this.model).subscribe()
  }

  cancel(){
    this.cancelRegitser.emit(false)
  }

}
