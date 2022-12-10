import { Component, OnInit } from '@angular/core';
import { Member } from '../_model/member.model';
import { Pagination } from '../_model/pagination';
import { UserParams } from '../_model/userParams';
import { MemberService } from '../_services/member.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  PageNumber:number = 1
  PageSize:number = 5
  members: Member[] = [];
  Perdicate :string = 'liked';
  pagination!:Pagination
  constructor(private memberSercice: MemberService) { 
    
  }

  ngOnInit(): void {
    this.GetMemberUserLiked(this.Perdicate);
  }

  GetMemberUserLiked(perdicate: string){
    this.memberSercice.getLikes(perdicate, this.PageNumber, this.PageSize).subscribe(m => {
      this.members = m.result;
      this.pagination = m.pagination;  
      console.log(m.pagination)    
    })
  }

  pageChange(e :any){
    this.PageNumber = e.page;
    this.GetMemberUserLiked(this.Perdicate);
  }
}
