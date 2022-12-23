import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_model/member.model';
import { Messages } from '../../_model/messages.model';
import { MessageService } from 'src/app/_services/message.service';
import { Pagination } from 'src/app/_model/pagination';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_model/user.model';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: true}) memberTabs!:TabsetComponent 
  member!:Member
  messages:Messages[] = []
  pagination!: Pagination; 
  activeTabe!:TabDirective
  username!:string
  pageNumber = 1
  pagesize = 5  
  activeTabb!: boolean 
  user!:User
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  constructor(private route:ActivatedRoute, private accountService: AccountService, public messageServices: MessageService, public presenceService: PresenceService, private memberService: MemberService){
    this.accountService.CurrentUser$.subscribe(u => {
      this.user = u as any;
    })
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 100,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];
  
    this.galleryImages = [];
  }
  ngOnDestroy(): void {
    this.messageServices.StophubConnecton();
  }

  ngOnInit(): void {
    this.route.data.subscribe(d =>{
      this.member = d['member'];
    })

    this.route.queryParams.subscribe((p: any) => {
      p.tab ? this.selectTab(p.tab) : this.selectTab(0)
    })

   this.messageServices.messageThread$.subscribe(m => {
    this.messages = m
   })

  } 

  loadMessages(){
    this.messageServices.GetConversaTion(this.member.userName, this.pageNumber, this.pagesize).subscribe(response =>{
      this.messages = response.result 
      this.pagination = response.pagination
   })
  }

  onTabActivate(tab:TabDirective){
    this.activeTabe = tab
    if(this.activeTabe.heading === 'Messages'){
      this.messageServices.CreateConnection(this.user, this.member.userName, this.pageNumber)      
    }
    else {
      this.messageServices.StophubConnecton();
    }
  }

  selectTab(id:number){
    this.memberTabs.tabs[id].active = true    
  }

  OnactiveTab(id: number){
    this.activeTabb = id == 3 ? true : false 
    
  }
  getmemberPhoto(){
       this.messageServices.StophubConnecton();
       if(this.galleryImages.length == 0) {
        this.memberService.getUserPhoto(this.member.userName).subscribe(photos => {
          photos.forEach(p => {
            this.galleryImages.push(
              {
                small: p.url,
                medium: p.url,
                big: p.url,
              }
            )
          })
         }) 
       }
  }

  pageChange(event: any){
    this.pageNumber = event.page;     
    this.messageServices.GetPaginatedmessage(this.pageNumber).then(() =>{
      console.log('y');   
    })

    
  }
}
