import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessages(@Body() body: CreateMessageDto) {
    return this.messagesService.createMsg(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const msg = await this.messagesService.findOne(id);
    if (!msg) throw new NotFoundException('없어');
  }
}
