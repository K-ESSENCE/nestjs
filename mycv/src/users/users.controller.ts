import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    //내부 파일 보려면 DTO => DTO로 검증
    console.log(body);
  }
}
