# Investing Diary Web Back-end Test

## 과제 목표
- 투자일지를 통해서 자산을 관리할 수 있는 웹 서비스의 백엔드를 개발한다.
- [디자인 요구사항]을 참고하여 유저가 이메일, 비밀번호를 이용해서 회원가입 및 로그인을 할 수 있으며 투자일지 기능을 사용할 수 있게끔 구현되어야 합니다.
- 응답과 관련해서 아래에 세부적인 응답 예시를 참고하시되, [웹 개발 주요 기능]의 요구사항을 참고하여 개발하면 됩니다.
- API 구성은 REST API, GraphQL 형식 중에 자유롭게 선택하실 수 있습니다.(+선택한 이유도 필요합니다.) 
- DB는 RDB, NoSQL 등 자유롭게 선택 가능합니다.(+선택한 이유도 필요합니다.)

## 웹 개발 주요 기능
- 회원가입
  - Email, Password 를 입력받아서 회원가입을 진행합니다.
  - Email 계정은 중복해서 가입할 수 없습니다.
  - Password 는 회원가입시 해시화 해서 처리가 되어야 합니다.
  - 회원가입시 메일 인증 처리 혹은 비밀번호 찾기 기능을 포함되는 형태가 좋습니다.

- 로그인
  - Email, Password 를 입력해서 유저를 식별할 수 있는 JWT token 을 얻어서 로그인 처리를 합니다.
  - JWT token 의 유효성 처리 로직이 포함 되어야 합니다.
  - 토큰의 연장 방법, 만료시 처리와 관련된 로직이 포함되어야 합니다.
  - 로그인 시에 [디바이스 인증] 과정을 거치고 멀티 디바이스(ex Web browser, device)에 대해서 로그인 처리를 지원합니다.
   
- 투자일지 목록
  - 기존에 등록되어 있는 투자일지를 조회/추가/삭제 할 수 있습니다.
  - [투자일지 목록 조회 API]를 이용합니다.
  - 투자일지는 제목, 내용, 투자한 자산 내역, 날짜 등으로 구성됩니다.
  - 새로운 투자일지를 추가, 기존에 등록되어 있는 투자 일지를 삭제 할 수 있습니다.
  - 투자 일지는 DB 상에서 soft_delete 기능을 지원해야 합니다.(soft delete 기능은 지워야할시에 실제로 데이터를 지우지 않고, 마킹 처리하는 것과 같습니다.)

- 투자일지 상세
  - 투자를 한 날짜, 투자한 자산, 수량 등이 나타나야 합니다.
  - 투자한 자산 내역은 [투자일지에 속해 있는 자산 목록 확인 API]를 이용합니다.


## 디자인 요구사항
- 백엔드 구현을 위한 참고 디자인 Flow 는 아래와 같고, 여기서 설명하지 않는 부분은 자유자재로 구현하시면 됩니다.
- ![flow](images/flow.png)

## 예시
- 아래의 API 내역은 응답값에 대한 참고용으로 보시면 될 듯 합니다. 

## 서버 API
- 예시 서버는 https://the-rich-coding-test1.herokuapp.com 에 존재합니다
- 대부분의 기능은 로그인 이후에 발급되는 토큰을 전달함으로써 이용이 가능합니다. 
- 토큰은 JWT 이며 전달은 헤더에 `Authorization: Bearer ${token}` 값이 전달되어야 합니다.

### 회원가입 API
```shell
$ curl -d "user[email]=test1@example.com&user[password]=1234" -X POST https://the-rich-coding-test1.herokuapp.com/users.json
{"id":2,"email":"test1@example.com","password":"!@#$!@#$","created_at":"2020-11-24T20:22:24.442Z","updated_at":"2020-11-24T20:22:24.442Z","url":"https://the-rich-coding-test1.herokuapp.com/users/2.json"}%
```

### 로그인 API
```shell
$ curl -d "email=test1@example.com&password=1234" -X POST https://the-rich-coding-test1.herokuapp.com/users/login
{"token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6InRlc3QxQGV4YW1wbGUuY29tIn0.SBsK7V2Dx8R4sPsHU7zt7tGa2e4fDuz0ZpecqK8j7Xo","user_id":2}
```
- 로그인 성공시에 응답으로 token 필드를 통해서 JWT Token 을 얻습니다. token 과 관련된 정보는 https://jwt.io 에서 확인이 가능합니다. 
- 토큰 안에 어떤 정보가 있는지 확인 하려면 Encoded 부분에 토큰을 복사해서 붙여 넣어서 확인 가능합니다.
- token 정보를 클라이언트에서 저장후에 다른 API를 호출할때 사용합니다.


### 자산 종목 정보 조회 API

- 투자 다이어리에 추가할 수 있는 자산 종목들이 나타납니다.
```shell
$ curl -X GET https://the-rich-coding-test1.herokuapp.com/assets.json 
[{"id":1,"ticker":"AAPL","name":"Apple","price":"150","created_at":"2020-11-24T20:20:47.706Z","updated_at":"2020-11-24T20:20:47.706Z","url":"https://the-rich-coding-test1.herokuapp.com/assets/1.json"},{"id":2,"ticker":"AMZN","name":"Amazon","price":"110","created_at":"2020-11-24T20:20:47.715Z","updated_at":"2020-11-24T20:20:47.715Z","url":"https://the-rich-coding-test1.herokuapp.com/assets/2.json"},{"id":3,"ticker":"T","name":"AT\u0026T","price":"130","created_at":"2020-11-24T20:20:47.727Z","updated_at":"2020-11-24T20:20:47.727Z","url":"https://the-rich-coding-test1.herokuapp.com/assets/3.json"}]
```


### 투자일지 목록 조회 API

- 기존에 [투자일지 추가 API]를 이용해서 등록한 투자일지 목록 정보를 가져옵니다.
- 가져온 데이터 중에서 title(제목), contents(내용), date(날짜) 순입니다.
- 투자일지에 포함되어 있는 투자자산 정보는 `투자일지에 속해 있는 자산 목록 확인 API` 를 통해서 확인할 수 있습니다.

```shell
$ curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.uBW651carDjPRmZ160DJG7PDcVFXsRz4orqEOkI1BX4' https://the-rich-coding-test1.herokuapp.com/diaries.json
[{"id":1,"title":"111","contents":"11","date":"2020-11-08T04:04:12.000Z","created_at":"2020-11-24T19:04:14.706Z","updated_at":"2020-11-24T19:04:14.706Z","url":"http://localhost:3000/diaries/1.json"}]%
```

### 투자일지 추가/삭제 API
- 투자 일지를 추가합니다.
- title(제목), contents(내용), date(날짜)를 기입합니다. 
```shell
$ curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.uBW651carDjPRmZ160DJG7PDcVFXsRz4orqEOkI1BX4' -d "diary[title]=title&diary[contents]=contentsdfdfd&diary[date]=2020-11-08T04:04:12.000Z" -X POST https://the-rich-coding-test1.herokuapp.com/diaries.json 
{"id":1,"title":"title","contents":"contentsdfdfd","date":"2020-11-08T04:04:12.000Z","created_at":"2020-11-24T20:26:45.558Z","updated_at":"2020-11-24T20:26:45.558Z","url":"https://the-rich-coding-test1.herokuapp.com/diaries/1.json"}%
```

- 투자 일지를 삭제 합니다.
- 투자일지 목록 조회를 통해서 알게 된 개별 id 값을 아래와 같이 url 에 포함시켜서 전달합니다.
```shell
$ curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.uBW651carDjPRmZ160DJG7PDcVFXsRz4orqEOkI1BX4' -X DELETE https://the-rich-coding-test1.herokuapp.com/diaries/1.json
```
### 투자일지 목록에 자산 추가/삭제 API
- 위에 [투자일지 추가 API] 를 통해서 얻은 diary_id 값과 [자산 종목 정보 조회 API] 를 통해서 얻은 asset_id 를 이용합니다.
- diary_id와 asset_id 를 payload로 넘겨줍니다. (diary_asset[diary_id], diary_asset[asset_id])
- 여러 종목을 추가할 경우 반복해서 API 를 호출합니다. 
```shell
$ curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.uBW651carDjPRmZ160DJG7PDcVFXsRz4orqEOkI1BX4' -X POST -d "diary_asset[diary_id]=2&diary_asset[asset_id]=1&diary_asset[amount]=10&diary_asset[buy_price]=110.5" https://the-rich-coding-test1.herokuapp.com/diary_assets.json
```
- 투자 일지에 포함되어 있는 자산 제거 API
- 해당 diary_asset id를 url 에 포함시켜서 호출합니다. 아래 예시에서는 1이 diary_asset의 id 입니다.
```shell
$ curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.uBW651carDjPRmZ160DJG7PDcVFXsRz4orqEOkI1BX4' -X DELETE https://the-rich-coding-test1.herokuapp.com/diary_assets/1.json
```

### 투자일지에 속해 있는 자산 목록 확인 API
- 아래와 같이 diary_id(투자 일지) 를 url 에 포함시켜서 호출합니다.
```shell
$ curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.uBW651carDjPRmZ160DJG7PDcVFXsRz4orqEOkI1BX4' -X GET https://the-rich-coding-test1.herokuapp.com/diaries/2/assets.json
[{"id":2,"diary_id":2,"asset_id":1,"amount":"10.0","buy_price":"100.0","created_at":"2020-11-24T20:33:40.541Z","updated_at":"2020-11-24T20:33:40.541Z"},{"id":3,"diary_id":2,"asset_id":2,"amount":"15.0","buy_price":"120.0","created_at":"2020-11-24T20:33:52.262Z","updated_at":"2020-11-24T20:33:52.262Z"}]% 
```

## 과제 수행시 참고사항
- 사용 언어 혹은 프레임웍을 사용한 이유도 같이 명시해 주시면 좋습니다.
- 테스트 케이스와 코드 포맷팅 등의 개발환경 설정과 관련해서도 고려해서 작성하면 좋습니다.
- 코드 리뷰 및 수행을 확인하기 위해서 최대한 동작 가능한 상태로 수행하셨으면 합니다.
- 가급적 API 기능 하나에 적어도 테스트 케이스 하나를 포함시켜서 작성해주시면 좋습니다.
- 과제 제출은 이 저장소를 클론 한후에 master 가 아닌 브랜치에서 프로젝트 파일들을 추가해서 Pull Request 로 올리시면 됩니다.
- 과제를 제출할시에 리뷰어가 쉽게 실행해볼 수 있도록 Dockerfile 을 포함하거나 heroku free dyno 등을 이용해서 시현이 쉽도록 하면 더 좋습니다.
