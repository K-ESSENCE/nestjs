import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from '../interceptors/serialize.interceptor';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // 가짜 서비스

    const users: User[] = [];

    fakeUserService = {
      //이객체가 UsersService 타입이지만 일부만 구현된 객체
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
          // di 서비스를 살짝 속이는 작업 누가 UserService를 사용하려고한다고하면 fakeValue를 쓰겠다
          // 이렇게 하면 테스트 코드에서 원래 서비스를 사용하는게 아니라 가짜 서비스를 사용하게됨
          // sqlLIte안써도된다
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined(); // 서비스가 정의되어있는지 확인
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws error 이미쓰고있는 이메일', async () => {
    const existingEmail = 'asdf@asdf.com';

    // 가입하려는 이메일과 동일한 이메일을 가진 사용자가 이미 존재
    // fakeUserService.find = () =>
    //   Promise.resolve([
    //     { id: 1, email: existingEmail, password: '1234' } as User,
    //   ]);

    await service.signup(existingEmail, 'asdf');

    // 동일한 이메일로 가입 시도
    await expect(service.signup(existingEmail, 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('사용하지않는 이메일로 로그인 시도', async () => {
    await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('invalid password', async () => {
    await service.signup('asdf@asdf.com', 'sdadsa');
    await expect(
      service.signin('asdf@asdf.com', 'wrongpassword'),
    ).rejects.toThrow(BadRequestException);
  });

  it('correct password', async () => {
    await service.signup('asdf@asdf.com', '123');
    const user = await service.signin('asdf@asdf.com', '123');
    expect(user).toBeDefined();
  });
});

// 두 가지 테스트에서 find의 역할이 다름 어떻게 해결하는가?
