import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    // return this.userService.findOne(session.userId);
    session.color = color;
  }

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    //내부 파일 보려면 DTO => DTO로 검증
    console.log(body);
    // this.userService.create(body.email, body.password);
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id') //db에서는 number지만 요청 받을때는 다 문자열
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    const user = await this.userService.findOne(parseInt(id));

    if (!user) throw new NotFoundException('null');
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
