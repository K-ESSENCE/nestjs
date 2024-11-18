### 설계

여기에서는 모듈 설계를 api 다음 묶어서 나눠서 설계하네

User 모듈과 Reports모듈

리포지터리는 생성안됨 => 수동으로 해야됨 => 매번 다르기떄문

### TypeOrm

2가지 옵션 => TypeORM , Moongoose
타입오알엠 => SQLite , Postgres , MySQL , MongoDB

네스트랑 타입오알엠은 찰떡궁합 서로돕는 유틸이 많다

몽구스 => 몽고db

시작은 SQLite로 해서 나중엔 Postgres로 갈거라고함

npm i @nestjs/typeorm typeorm sqlite3

엔티티 파일은 앱 내부에서 저장하려는 리소스 중 하나의 종류만 정의함
사용자 엔티티 사용자 리소스가있는데 사용자라는 종류의 파일만 넣을거다

db파일 보고싶으면 extension 깔아야함

깔고 ctrl shift p sqlite로 open database 하면 파일탐색기 쪽에 컬럼 생성된것이 거기에 나옴
