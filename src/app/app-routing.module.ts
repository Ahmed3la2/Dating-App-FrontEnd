import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { map, pipe } from 'rxjs';
import { AuthGuard } from 'src/_guards/auth.guard';
import { PreventUnsaveChangeGuard } from 'src/_guards/prevent-unsave-change.guard';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { EditProfileComponent } from './members/edit-profile/edit-profile.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './_errors/not-found/not-found.component';
import { ServerErrorComponent } from './_errors/server-error/server-error.component';
import { AccountService } from './_services/account.service';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {
    path:"", 
    runGuardsAndResolvers:"always",
    canActivate:[AuthGuard],
    children:[
      {path:"members", component:MemberListComponent,canActivate:[AuthGuard]},
      {path:"members/:username", component:MemberDetailComponent},
      {path:"edit", component:EditProfileComponent,canDeactivate:[PreventUnsaveChangeGuard]},
      {path:"lists", component:ListsComponent},
      {path:"messages", component:MessagesComponent},
    ]
  },
  {path:"not-found", component:NotFoundComponent},
  {path:"server-error", component:ServerErrorComponent},
  {path:"**", component:HomeComponent,  pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 export  class AppRoutingModule { 
  constructor(private AccountService:AccountService){}
}
