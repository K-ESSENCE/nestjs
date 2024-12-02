import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

it('can create an instance of auth service', async () => {
  // 가짜 서비스

  const fakeUserService: Partial<UsersService> = {
    //이객체가 UsersService 타입이지만 일부만 구현된 객체
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
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

  const service = module.get(AuthService);

  expect(service).toBeDefined(); // 서비스가 정의되어있는지 확인
});
