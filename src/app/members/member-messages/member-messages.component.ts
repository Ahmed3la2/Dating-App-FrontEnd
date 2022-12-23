import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { messageContent } from 'src/app/_model/messgeContent.model';
import { MessageService } from 'src/app/_services/message.service';
import { Messages } from '../../_model/messages.model';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() messages:Messages[] = [];
  @Input() username!:string;
  @Input() pageNum!:number
  @ViewChild('messageForm') input!: NgForm

  messageContent:messageContent = new messageContent()
  
  constructor(public MessaggesService:MessageService) {
    this.messages.reverse()
  }

  ngOnInit(): void {
  }

  sendMessage(){
    this.messageContent.recipientUsername = this.username;
    if(this.pageNum > 1) {
      location.reload()
    }
    this.MessaggesService.sendMessageThread(this.messageContent).then(() => {
      this.input.reset()
    })
  }

}
