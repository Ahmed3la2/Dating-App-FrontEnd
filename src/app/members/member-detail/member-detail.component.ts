import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/_model/member.model';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member!:Member
  constructor(private route:ActivatedRoute, private memberService: MemberService) { }

  ngOnInit(): void {
    this.GetMember()
  } 

  GetMember(){
    this.memberService.GetMember(this.route.snapshot.paramMap.get("username")!).subscribe(member => {
      this.member = member;
    })
  }

}
