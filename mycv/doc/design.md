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

### SQL

sql 데이터 형태가 바뀌면 마이그레이션을 한다.

우리가엄격한 구조를 만든게아님

동기화 true는 TypeORM 이 구조를보고 자동으로 데이터 베이스구조를 업데이트 함.

개발시에만 쓰이는 모드라고한다.

@Entity 는 이 클래스를 살펴보고 새 테이블을 보고 따라와라 라고 명령

Primary Generated Column id 라는 컬럼을 추가함.

varchar

보통의 ORM 은 이렇게 안동작함 마이그레이션 파일을 작서해야한다고함.

싱크로나이즈는 개발환경에서만. 운영에서는 실행하지않는게 아주 중요하다.=> 실수로 열을 삭제하는 경우가 아주 흔하기때문에

이메일이 갑자기 사라진다면 아주 끔찎띄
그때는 대신에 마이그레이션 을 작성할 것이라고 함

개발중인데 아직 db 구조가 확정되지않았으면 이건 아주아주 나이스하다.

### 리포지토리에 대한 짤막한 설명

엔티티랑 리포지토리가 좀 헷갈릴수있다.
리포지토리에는 메서드 묶음이있음.
typeorm.io/#/repository-api 에서 확인해봐라

리포지토리 만드는 방법도 3가지이고 메서드도 거기서 거기인거처럼 보이는게 개많아보인다
공식문서를 읽을땐 이런점을 참고해라

뭐든지 항상 여러 가지 다양한 방법으로 수행할 수 있다. 라이브러리의 단점이기도함.abnf
SQL 내부의 논리를 이해하면 뭘할지 파악할 수 있다.

class-validator class-transformer 설치
main의 파이프에 연결한
white list -true는 허용된 이메일 과 패스워드만 존재하게함

커맨스 쉬프트 p sqlite

sqlite는 웹앱에 적합하지않음 나중에 postgres로 바꿀거라고함

### simply review

컨트롤러는 비즈니스로직을 안 만듦 서비스에서 비즈니스로직을 만듦

유저엔티티라는 인스턴스로 바꿔 유저 리포지토리에 저장함

여기서 타입 ORM 사용

왜 create를 호출하고 save를 호출하는가

이메일과 비밀번호를 인자로 받아서 create 함수에 전달하지만 내부에 정보를 저장하거나 유지하지 않음.

크리에이트는 엔티티를 생성하고

save는 실제로 엔티티를 가지고와서 데이터 베이스에 저장함.

save를 호춣기전에 검사했는지 확인하고싶다? 그러면 create에서 진행

왜 DTO가 아니라 엔티티에서 검사를 하는가? => 나중에 알려드림 뭥미

### 생성과 저장에 대한 추가내용

후크는 특정 시점에 자동으로 호출되는 엔티티에 함수를 정의함

훅이 연결되면 알아서 모든 인스턴스에 다 실행이되고 훅이없으면 실행안됨.

훅이없으면 에러를 캐치하기 어렵다.

다이렉트로 훅 실행하지마라

find 하고 save 하는거 안하고
update는 한방에 다하는거.

두번의 통신이 필요없다. 그런 차이가 있는것임

### 컨트롤러 관련

일반적인 오류 객체 던지면 Nest에서 모름 그래서 Nest에서 구현한 걸 날리는게 좋다.

http 이에도 WebSocket GRPC 처리하는 것도 다있음.

HTTP에 특화된걸 보내기시작하면 재사용하는데 어려움이 있긴하다.
그런 부분을 미리 이해하라고

### 직렬화

클래스 변환 객체를 문자열로 변환하는 것

인터셉터를 활용하여 진행

요청 -> 컨트롤러 -> 서비스 -> 컨트롤러 -> 인터셉터 -> 응답
이건 네스트에서 추천하는 방법이지만 최고가 될순없다

### 직렬화 솔루션

사용자에 더많은 정보를 저장하기로했다고 쳐보셈

그러면 우리는 또 새로운걸 만들어야됨

admin/auth 같이.

인터셉터는 다른 프레임워크나 언어에서 사용하는 미들웨어 개념과 유사함

class CustomInterceptor
인터셉터가 실행되기를 원할때 계속 실행됨

라우터 핸들러 자체는 아니고 라우터 핸들러 전후에 실행됨
