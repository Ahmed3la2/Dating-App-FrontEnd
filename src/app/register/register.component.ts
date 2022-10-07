import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor( private accountServices:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountServices.register(this.model).subscribe(u => {
      console.log(u);  
    })
  }

  cancel(){
    this.cancelRegitser.emit(false)
  }

}
