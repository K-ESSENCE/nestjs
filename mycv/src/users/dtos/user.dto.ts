import { Expose } from 'class-transformer';

//exclude는 포함 ㄴ expose는 포함 ㅇ
export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
