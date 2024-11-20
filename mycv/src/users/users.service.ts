import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    //제네릭을 사용하기위해서 데코레이터를 씀. 그냥 제네릭만으로는 잘 동작이 잘 안되어서
  }
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  save() {}
  find() {}
  finOne() {}
  remove() {}
}
