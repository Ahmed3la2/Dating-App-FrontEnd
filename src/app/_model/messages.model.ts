export interface Messages {
    id: number
    senderId: number
    senderUserName: string
    senderPhtoUrl: string
    recipientId: number
    recipientUserName: string
    recipientPhotoUrl: string
    content: string
    dateRead? : Date
    messageSent: Date
  }  