import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  constructor(private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
