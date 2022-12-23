import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_model/member.model';
import { Pagination } from 'src/app/_model/pagination';
import { User } from 'src/app/_model/user.model';
import { UserParams } from 'src/app/_model/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members : Member[] | undefined
  pagination!: Pagination; 
  user: User | null | undefined;
  UserParams!:UserParams;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]


  constructor(private MemberService: MemberService, private accountServices: AccountService) {
    this.accountServices.CurrentUser$.pipe(take(1)).subscribe(user =>{
      this.user = user
      this.UserParams = new UserParams(user as any);
    })
   }

  ngOnInit(): void {
    this.loadMembers()
  }
  loadMembers(){
    this.MemberService.GetMembers(this.UserParams).subscribe(response => {       
      this.members = response.result 
      this.pagination = response.pagination
      console.log(this.pagination)
    })
  }

  pageChange(event: any){
    this.UserParams.PageNumber = event.page;
    this.loadMembers();
  }

  resetFilters(){
    this.UserParams = new UserParams(this.user as any);
    this.loadMembers();
  }
}
