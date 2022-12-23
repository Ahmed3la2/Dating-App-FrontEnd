import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, throttleTime } from 'rxjs';
import { Member } from '../_model/member.model';
import { MemberService } from '../_services/member.service';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolver implements Resolve<Member> {

  constructor(private memberService:MemberService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
     return this.memberService.GetMember(route.paramMap.get('username') as any);
  }
}
