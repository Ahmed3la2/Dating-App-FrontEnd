import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any = {};
  registerForm!: FormGroup;
  bsconfig!:Partial<BsDatepickerConfig>
  valdationError :string[] = []

  @Input() usersFormHomeComp:any = [];
  @Output()  cancelRegitser = new EventEmitter();
  constructor( private accountServices:AccountService, private route:Router ) { 
    this.bsconfig = {
      containerClass: "theme-red",
      dateInputFormat: "DD MMMM YYYY"
    }
  }

  ngOnInit(): void {
    this.initializeFrom();
  }

  initializeFrom(){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      gender: new FormControl('male'),
      KnownAs: new FormControl('', Validators.required),
      DateOfBirth: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues("password")]),
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: any) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: false}
    }
  }

  register(){
    this.accountServices.register(this.registerForm.value).subscribe(() => {
      this.route.navigateByUrl("/members")
      console.log(this.registerForm.value);     
    }, error =>{
     this.valdationError = error
    }) 
  }

  cancel(){
    this.cancelRegitser.emit(false)
  }

}
