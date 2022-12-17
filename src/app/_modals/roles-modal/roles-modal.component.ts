import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_model/user.model';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  @Input() UpdateSelectedRoles = new EventEmitter()
  User!:User;
  Roles!: any
  constructor(public bsModalRef:BsModalRef) { }

  ngOnInit(): void {
  }

  updateRoles(){
    this.UpdateSelectedRoles.emit(this.Roles)
    this.bsModalRef.hide();
  }

}
