import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_model/member.model';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input()
  member!: Member;

  constructor(private MemberService: MemberService, private toast: ToastrService) {}

  ngOnInit(): void {
  }

  AddLike(member: Member){
    this.MemberService.AddLike(member.id).subscribe(() => {
      this.toast.success(`You Liked ${member.knownAs}`);
    })
  }

}
