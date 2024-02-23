# Let’s note
## 서비스 소개

|                                             |                                              |
| ------------------------------------------- | -------------------------------------------- |
| <img src="assets/Untitled.png" width="400"> | <img src="assets/Workspace.png" width="410"> |


<span style="color: #49C5B6; font-size: 15pt;">**Let’s Note**</span>는 누구나 음악을 쉽고 재미있게 play 할 수 있도록 하는 악기 연주 플랫폼 입니다.

함께하고 싶은 친구들을 나의 작업실에 초대하고, 음성 채팅과 커서 공유를 통해 소통하세요. <br>
그리고 여러 가상악기로 이루어진 우리만의 음악을 만들어보세요!

사이트: www.letsnote.co.kr

---

## 프로젝트 실행 방법

### 프론트엔드

```bash
$ git clone [https://github.com/Team-SoundHub/Let-s-Note.git](https://github.com/Team-SoundHub/Let-s-Note.git)
$ cd Let-s-Note/frontend
```

**환경변수 설정**

```bash
vim .env
```

- .env 파일에 해당 변수들을 알맞게 선언합니다

```bash
REACT_APP_GOOGLE_CX = {구글 CSE CX 값}
REACT_APP_GOOGLE_API_KEY = {구글 CSE 키}
REACT_APP_BACKEND_URL = {백엔드 API URL}
REACT_APP_BACKEND_URL = {백엔드 API URL}
REACT_APP_SOCKET_URL =  {웹 소켓 주소}
REACT_APP_SOCKET_HTTP = {백엔드 서버 https 주소}
REACT_APP_TURN_SERVER = {TURN 서버 주소}
```

**실행**

```bash
$ npm install && npm start
```

## 백엔드

```bash
$ git clone [https://github.com/Team-SoundHub/Let-s-Note.git](https://github.com/Team-SoundHub/Let-s-Note.git)

$ cd Let-s-Note/backend/letsnote/src/main/resource/static
```

**properties 파일 설정**

```bash
$ vim application.yml
```

아래 내용을 참고하여 중괄호 안의 내용을 채운다.

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://{DB서버 주소}/{DB 이름}?autoReconnect=true&useUnicode=true&characterEncoding=utf8&useSSL=false&requireSSL=false&serverTimezone=Asia/Seoul&allowMultiQueries=true
    username: { 아이디 }
    password: { 비밀번호 }
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
        show_sql: true
jwt:
  header: Authorization
  secret: { refreshToken과는 다른 HS512형식의 시크릿 키 }
  refresh-token-secret: { accessToken과는 다른 HS512형식의 시크릿 키 }
  access-token-validity-in-seconds: 3600
  refresh-token-validity-in-seconds: 86400
letsnote:
  baseUrl: { 백엔드 서버 주소 }
ai-server:
  baseUrl: { 모델 서버 주소 }
```

**실행**

```bash
$ ./gradlew build

$ java -jar build/libs/letsnote.jar
```

---

## 기능 소개

### 1. 가상악기 연주
- 가로축은 박자 , 세로축은 음계로 배치하여 격자에 해당하는 음을 진행하는 방식
- Tone.js 를 활용하여 피아노, 기타, 드럼 악기 음원 출력 및 음질 조정

### 2. 작품 저장 및 둘러보기
- 완성된 음악을 저장해 나의 작품으로 남기고, 피드에 공유하는 기능
- 다른 사람의 작품도 열람 가능

### 3. 악보 검색 & 보관
- 악보 검색에 최적화시킨 Google Custom Search Engine으로 악보 이미지 제공
- API를 통해 받아온 이미지를 저장하는 이미지 보관 기능

### 4. 협업 기능

**1. 작업실에 멤버 초대**
- 작업실에 다른 유저를 초대할 수 있음

**2. 웹소켓 기반 작업 내용 공유**
- 실시간으로 작업실의 음표 노트 정보, 커서 위치, 채팅 공유

**3. WebRTC 기반 음성채팅 기능**

|1. Signaling|2. P2P Connection|
|--|--|
|<img src="assets/Untitled%201.png" width="400">|<img src="assets/Untitled%202.png" width="400">|

- P2P Mesh 방식을 활용하여 다중 음성채팅 활성화
- 웹소켓을 통해 연결 후보 Signal 교환

### 5. 연주 편의성 기능

**1. 드럼 루프 자동 생성**

- 일부 드럼 비트 입력 후 드럼 클릭 시 자동 완성

![Untitled](assets/Untitled%203.png)

**2. AI 노트 추천 기능**

- GPT 3.5 Assistant 기반 GPT API 공식 문서에 소개된 프롬프트 엔지니어링 방법론을 활용하여 도메인 지식을 주입하고, 응답 형식 정확도를 올리기 위해 입, 출력 형식을 프롬프트로 조정

![Untitled](assets/Untitled%204.png)

---

## 기술적 챌린지

### 1. 음질 개선

| <p align="center"><img src="assets/Untitled%205.png" height="40" ></p> | <p align="center"><img src="assets/Untitled%207.png" height="40" ></p> |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![Untitled](assets/Untitled%206.png)                                   | ![Untitled](assets/Untitled%208.png)                                   |

### 2. 웹 소켓 지연 개선

<table>
  <tr>
    <td align="center">
      <img src="assets/Untitled%205.png" height="40">
    </td>
    <td align="center">
      <img src="assets/Untitled%207.png" height="40">
    </td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>노트 정보가 server → DB → server → Client순으로 동기적 전달</li>
        <li><span style="color: tomato;">지연시간: 0.18s</span></li>
      </ul>
    </td>
    <td>
      <ul>
        <li>DB에서 server, client에게 비동기적으로 정보를 전달하도록 변경</li>
        <li><span style="color: skyblue;">지연시간: 0.04s</span></li>
      </ul>
    </td>
  </tr>
</table>

### 3. 노트 중복 생성 문제

<table>
  <tr>
    <td align="center">
      <img src="assets/Untitled%205.png" height="40">
    </td>
    <td align="center">
      <img src="assets/Untitled%207.png" height="40">
    </td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>여러 사용자가 하나의 노트에 대해 접근 시 동기화 문제 발생</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>DB 노트 정보 접근 시 세마포어를 도입하여 동기화 보장</li>
      </ul>
    </td>
  </tr>
</table>

### 4. 마우스 위치 공유시 과도한 소켓 요청 문제

<table style="width: 100%;">
  <colgroup>
    <col style="width: 33.33%;">
    <col style="width: 33.33%;">
    <col style="width: 33.33%;">
  </colgroup>
  <tr>
    <td align="center"><img src="assets/Untitled%205.png" height="40"></td>
    <td align="center"><img src="assets/Untitled%209.png" height="40"></td>
    <td align="center"><img src="assets/Untitled%207.png" height="40"></td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>mousemove 이벤트 기반</li>
        <li>8ms 마다 요청(125회/s)</li>
        <li><span style="color: tomato;">소켓 서버 부하</span></li>
      </ul>
    </td>
    <td>
      <ul>
        <li>스로틀링, 디바운싱 활용</li>
        <li>최대 요청 빈도 제한(<span style="color: skyblue;">5회/s</span>)</li>
        <li>음표 노트 내에서의 움직임은 무시하도록 재설계 → 불필요한 요청 제거</li>
        <li>움직임에 따른 위치 공유는 줄어들었으나, 음표 노트를 클릭할 때에도 마우스 좌표를 공유하도록 하여, 사용자의 불편함은 최소화하고자 했음</li>
      </ul>
    </td>
    <td>
      <ul>
        <li><span style="color: skyblue;">소켓 서버 부하를 줄여</span> 즉각적인 반응 유지</li>
        <li>협업 관련 <span style="color: skyblue;">사용자 경험 개선</span></li>
      </ul>
    </td>
  </tr>
</table>

### 5. 웹 소켓 보안 계층 추가

<img src="assets/Untitled%2010.png" height="40" align="left"><br><br>

<ul><li>Stomp 프로토콜을 활용하여 메세지들을 브로드캐스팅 할 수 있도록 구현</li><li>인가되지 않은 사용자가 소켓 연결 메세지를 보내도 <span style="color: tomato;">인증 절차의 부재로 보안 문제 발생</span></li></ul>

<img src="assets/Untitled%2011.png" height="40" align="left"><br><br>

<ul><li>특정 유저가 메세지 브로커에 웹소켓 연결 요청 시, JWT 토큰을 파싱하여</li><li>해당 유저가 음악 작업실의 멤버인지 판단하는 인증 인터셉터 계층 추가</li></ul>

<img src="assets/Untitled%2012.png" height="40" align="left"><br><br>

<ul><li><span style="color: skyblue;">웹소켓 연결 시 엑세스 토큰으로 유저의 인가 여부를 판단</span></li><li>인가되지 않은 사용자는 웹소켓 연결을 거부하여 보안을 강화</li></ul>

## 아키텍쳐

![Untitled](assets/Untitled%2013.png)

---

## Dependency

```jsx
frontend@0.1.0
├── @babel/runtime@7.23.9
├── @reduxjs/toolkit@2.1.0
├── @stomp/stompjs@7.0.0
├── @tailwindcss/forms@0.5.7
├── @testing-library/jest-dom@5.17.0
├── @testing-library/react@13.4.0
├── @testing-library/user-event@13.5.0
├── autoprefixer@10.4.17
├── axios@1.6.7
├── dom-helpers@5.2.1 extraneous
├── flowbite-react@0.7.2
├── flowbite@2.2.1
├── postcss@8.4.33
├── process@^0.11.10
├── react-dom@18.2.0
├── react-redux@9.1.0
├── react-router-dom@6.21.3
├── react-scripts@5.0.1
├── react-transition-group@4.4.5 extraneous
├── react-webcam@^7.2.0
├── react@18.2.0
├── simple-peer@^9.11.1
├── socket.io-client@4.7.4
├── sockjs-client@1.6.1
├── sockjs@0.3.24
├── soundfont2@0.4.0
├── styled-components@6.1.8
├── sweetalert2@11.10.5
├── tailwind-styled-components@2.2.0
├── tailwindcss@3.4.1
├── tone@14.7.77
├── web-vitals@2.1.4
├── webmidi@3.1.8
└── websocket@1.0.34
```
