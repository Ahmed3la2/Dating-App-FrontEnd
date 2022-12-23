import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../app/_model/user.model';
import { AccountService } from '../app/_services/account.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: string[];
  User!: User | null;

  constructor(private ViewContainerRef: ViewContainerRef, private TemplateRef:TemplateRef<any>,
              private accountservice:AccountService) {
                this.accountservice.CurrentUser$.subscribe(u => {
                  this.User = u
                })
               }
  ngOnInit(): void {
    if(!this.User?.roles || this.User == null){
      this.ViewContainerRef.clear()
      return;
    } 

    if(this.User.roles.some(r => this.appHasRole.includes(r))){
      this.ViewContainerRef.createEmbeddedView(this.TemplateRef);
    } else{
      this.ViewContainerRef.clear()
      return;
    }
  }

}
