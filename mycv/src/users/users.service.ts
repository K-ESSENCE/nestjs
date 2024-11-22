import { Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
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

  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, attrs: Partial<User>) {
    //Partial? => Users클래스의 일부 혹은 모든 속성
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');

    Object.assign(user, attrs); // 덮어씌우기
    return this.repo.save(user);
  }

  async remove(id: number) {
    //update랑 마찬가지로 한번 통신하냐 두번통신하냐 remove 와 delete의 차이는 그것이다
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found'); //에러를 안뱉어도됨 니 선택
    return this.repo.remove(user);
  }
}
