import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditProfileComponent } from 'src/app/members/edit-profile/edit-profile.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsaveChangeGuard implements CanDeactivate<unknown> {
  canDeactivate(component: EditProfileComponent) :boolean {
    if(component.editForm.dirty){
      return  confirm("If U Leave The Site The Update UnSave");
    }
    return true
  }
  
}
