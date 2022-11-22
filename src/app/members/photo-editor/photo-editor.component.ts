import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_model/member.model';
import { Photo } from 'src/app/_model/Photo';
import { User } from 'src/app/_model/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!:Member
  uploader!:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl
  user!: User 
  constructor(private accountservice:AccountService, private memberservice:MemberService) { 
    this.accountservice.CurrentUser$.pipe(take(1)).subscribe(u => {
      this.user  = u as any;
    })
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  SetMainPhoto(photo: Photo){
    this.memberservice.SetMainPhoto(photo.id).subscribe(()=>{
      this.user.photo = photo.url
      this.accountservice.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if(p.isMain) p.isMain = false
        if(p.id == photo.id) p.isMain = true
      })
    });    
  }

  deletePhoto(photo: Photo){
    this.memberservice.deletePhoto(photo.id).subscribe(() => {
      let NewPhotos = this.member.photos.filter(x => x.id != photo.id);
      this.member.photos = NewPhotos
    })
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'User/add-photo',
      authToken: "bearer " + this.user?.token,
      isHTML5: true,
      allowedFileType:["image"],
      removeAfterUpload: true,
      autoUpload:false,
      maxFileSize: 10 * 1024 * 1024
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo :Photo = JSON.parse(response);
        this.member.photos.push(photo);
        if(photo.isMain){
          this.user.photo = photo.url
          this.member.photoUrl = photo.url
          this.accountservice.setCurrentUser(this.user)
        }
      }
    }
  }
  
}
