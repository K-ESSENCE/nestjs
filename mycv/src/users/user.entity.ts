import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//typeorm이 이해할수있게해줌

@Entity()
export class User {
  // userEntity라고 안하는 건 일종의 관례를 따르는 부분
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
