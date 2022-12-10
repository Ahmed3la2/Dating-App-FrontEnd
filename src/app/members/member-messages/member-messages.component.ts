import { Component, Input, OnInit } from '@angular/core';
import { messages } from 'src/app/_model/Messages.model';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username?: string;
  messages:messages[] = [];
  messageContent = '';

  constructor(private messsagesService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages(){
    this.messsagesService.GetConversaTion(this.username).subscribe(m =>{
      this.messages = m 
      console.log(m)
    })
  }

  sendMessage(){
    this.sendMessage()
  }

}
