import { Component, OnInit } from '@angular/core';
import { messages } from '../_model/Messages.model';
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
  messages!:messages[]
  pagination!: Pagination
  loading = false;
  constructor(private messageSerice: MessageService) {}

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages(){
    this.messageSerice.Getmessages(this.messageParams).subscribe(m => {
      this.messages = m.result as any;
      this.pagination = m.pagination;      
    })
  }

  GetMessageThread(){

  }

  pageChanged(e: any) {
    this.messageParams.PageNumber = e;
    this.loadMessages;
  }
}
