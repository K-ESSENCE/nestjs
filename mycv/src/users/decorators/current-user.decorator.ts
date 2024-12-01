import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //context객체가 다양한 리퀘스트를 대상으로 쓰임, 웹소켓의 인커밍 메시지라던지, grpc의 컨텍스트라던지 request라고 하면 http로 보여서 그렇게안함
    // 이렇게하면 다양한 프로토콜을 주제로 쓸 수있음

    const request = context.switchToHttp().getRequest(); // 현재 요청을 가져옴
    //UserService는 Di 되어있음 단독으로 못씀
    // 의존성 중비을 데코레이터에 사용할수없음
    //그래서 인터셉터를 만들어서 인터셉터가 읽고 인터셉터에서 조회시키고 데코레이터로 노출시킬거임
    // 인터셉터는 데코레이터한테 데코레이터는 라우터한테

    //인터셉터만 써도되지만  그게 좀 더 명확해질수있음 그냥 Requset 객체가아니라 뭐라고 명시가능
    return request.currentUser;
  },
);
