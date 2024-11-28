import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt); // callback대신 promise를 반환하는 함수로 변환
//typescript에서는 타입을 못잡는경우가있음 그래서 이따가해줄거임

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // hash the password
    //generate a salt
    const salt = randomBytes(8).toString('hex'); //16

    // hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer; //32

    // join the hased result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // create a new user and save it
    const user = await this.userService.create(email, result);
    // return the user
    return user;
  }
  async signin(email: string, password: string) {
    // collect email
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
