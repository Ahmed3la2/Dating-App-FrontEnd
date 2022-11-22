import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_model/member.model';
import { User } from 'src/app/_model/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotifcation($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true
    }
  }
  user!: User;
  member!:Member;

  constructor(private accountuser:AccountService, private memberservice:MemberService, private toast:ToastrService) { 
    this.accountuser.CurrentUser$.pipe().subscribe(user => {
      this.user = user as any
    })
  }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(){
    this.memberservice.GetMember(this.user.userName).subscribe(member => {
      this.member = member
    })
  }
  
  upDateMember(){
   this.memberservice.UpdateMemeber(this.member).subscribe(() => {
    this.toast.success('success');
    this.editForm.reset(this.member);
   });
   
  }
}
