import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/_modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_model/user.model';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {
  users!:User[]
  bsModalRef!:BsModalRef
  constructor(private Admin:AdminService, private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles()
  }
  getUsersWithRoles(){
    this.Admin.GetUsersWithRoles().subscribe(u=>{
      this.users = u;
    })
  }
  openRolesModal(user:User){
    let config = {
      class:"modal-dialog-centered",
      initialState:{
        User: user,
        Roles: this.getsRolesArray(user) 
      } 
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.UpdateSelectedRoles.subscribe((r: any) =>{
        const roles =   [...r.filter((el: { checked: boolean; }) => el.checked === true).map((el: { name: any; }) => el.name)]
        console.log(roles);
           
        if(roles) {
          this.Admin.UpdateRoles(user.userName, roles).subscribe(()=>{
            user.roles = [...roles]           
          })
        }  
    }); 
  }

  getsRolesArray(user:User){
    const roles: any[] = [];
    const userRoles = user.roles
    const availableRoles:any[] = [
      {name:"Admin", value:"Admin"},
      {name:"Moderator", value:"Moderator"},
      {name:"Member", value:"Member"}
    ]

    availableRoles.forEach(role => {
      let isMatch = false;
       for(const urole of userRoles){
        if(role.name === urole){
          role.checked = true
          isMatch = true
          roles.push(role)
          break;
        }       
       }
       if(!isMatch){
        role.checked = false
        roles.push(role)
      } 
    })

    return roles
  }

}
