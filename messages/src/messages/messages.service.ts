import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './message.repository';

@Injectable() //di
export class MessagesService {
  //copy Reposityory
  constructor(public msgRepo: MessagesRepository) {}

  findOne(id: string) {
    return this.msgRepo.faindOne(id);
  }
  findAll() {
    return this.msgRepo.findAll();
  }
  createMsg(content: string) {
    return this.msgRepo.create(content);
  }
}
