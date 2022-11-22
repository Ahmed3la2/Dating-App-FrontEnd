import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_model/member.model';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$!:Observable<Member[]>;
  constructor(private MemberService: MemberService) { }

  ngOnInit(): void {
    this.members$ = this.MemberService.GetMembers()
  }
}
