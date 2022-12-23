import { Component, OnInit } from '@angular/core';
import { Messages } from '../_model/Messages.model';
import { MessagesParam } from '../_model/messagesParam';
import { Pagination } from '../_model/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messageParams:MessagesParam = new MessagesParam();
  messages!:Messages[]
  pagination!: Pagination
  loading = false;
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages(){
    this.messageService.Getmessages(this.messageParams).subscribe(m => {
      this.messages = m.result as any;
      this.pagination = m.pagination;      
      console.log(this.pagination);
      
    })
  }
  pageChanged(e: any) {  
    this.messageParams.PageNumber = e.page;
    this.loadMessages();
  }

  deleteMessage(id:number){
    this.messageService.deleteMessage(id).subscribe(m => {
      this.messages.splice(this.messages.findIndex(m => m.id == id), 1)
     console.log(id);   
    })
  }
}
