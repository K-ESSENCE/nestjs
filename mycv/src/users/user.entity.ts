import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
//typeorm이 이해할수있게해줌
// import { Exclude } from 'class-transformer';
//직렬화 할때 제외하는 것

@Entity()
export class User {
  // userEntity라고 안하는 건 일종의 관례를 따르는 부분
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    //db에 새로운 사용자 삽입할때마다 이 함수가 실행될 것임
    console.log('Inserted User With id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User With id', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed With Id', this.id);
  }
}
