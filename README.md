# 🍷 WINE
코드잇에서 주관하는 와인 관리 애플리케이션 프로젝트입니다. 

<img width="786" alt="image" src="https://github.com/user-attachments/assets/054fdb8a-3743-49a2-b714-87f3d40e4050">


## 🧑‍💻 프로젝트 소개
사용자가 다양한 와인을 조회하고, 새로운 와인을 등록할 수 있도록 하며 와인의 평균 평점과 최신 리뷰를 확인할 수 있는 기능을 제공합니다.

## 🗓️ 개발 기간
8 / 29 (목) ~ 9 / 19 (목)

## 📃 상세 계획
[노션 상세 계획 링크] (https://grizzled-rose-30c.notion.site/85cbabe6e886479abbfd09d0f51a468e?pvs=4)

## 💡 User Flow
![구성]


## 📁 프로젝트 구조
```
wine/
│
├── public/
│   ├── images/                 # 이미지 파일 폴더
│   └── robots.txt ...
│
├── src/
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── @shared/            # 공통 컴포넌트
│   │   │   ├── GlobalNavBar.tsx
│   │   │   └── Footer.tsx
│   │   ├── signup/            # 회원가입 페이지에 들어갈 컴포넌트 모음
│   │   │   ├── SimpleLogin.tsx
│   │   │   └── SubmitForm.tsx
│   │   └── boards/             # boards 페이지에 들어갈 컴포넌트 모음
│   │       └── index/          # index에 들어갈 컴포넌트 모음
│   │           ├── SimpleLogin.tsx
│   │           └── SubmitForm.tsx
│   │       └── id/             # boards/[id]에 들어갈 컴포넌트 모음
│   │
│   ├── pages/                  # Next.js page 라우팅 (최대한 api 요청은 page에서 진행)
│   │   └── boards/             # boards 로 시작하는 path가 여러개 있는 경우 폴더로 묶기
│   │       ├── [id].tsx
│   │       └── index.tsx
│   │   └── signup/             # signup 로 시작하는 path가 없는 경우에도 폴더 생성
│   │       └── index.tsx
│   │   └── signin/
│   │       └── index.tsx
│   │   ├── index.tsx
│   │   ├── _app.tsx
│   │   └── _document.tsx
│   │
│   ├── libs/                   # 라이브러리 관련된 세팅 및 함수들 정리하는 폴더
│   │   └── axios/              # axios 관련 세팅 및 api 요청 함수
│   │       └── axiosInstance.ts
│   │       └── auth/           # auth와 관련된 fetch 요청 함수
│   │           ├── signUpUser.ts
│   │           └── logInUser.ts
│   │       └── articles/       # articles와 관련된 fetch 요청 함수
│   │           ├── getArticles.ts
│   │           └── postArticle.ts
│   │   └── queries/            # Tanstack-Query 훅
│   │
│   ├── store/ or contexts/     # 전역 상태 관리 (context, redux 등..) => 사용 미정
│   │
│   ├── hooks/                  # 커스텀 React 훅
│   │
│   ├── types/                  # 타입 폴더 (DTO 혹은 전역적으로 사용되는 type을 미리 정의)
│   │                           # 컴포넌트 props의 경우에는 해당 컴포넌트 위치에 정의
│   │
│   ├── styles/                 # 스타일 관련 파일 모음
│   │   └── global.css
│   │
│   ├── constants/              # 상수 폴더
│   │   └── mediaQueryBreakPoint.ts
│   │
│   └── utils/                  # 유틸리티 폴더
│
├─ .gitignore
├─ .env.local                   # 각자 환경에서 별도 생성 필요
├─ .eslintrc.json
├─ .prettierrc.json
├─ next.confing.mjs
├─ tailwind.config.ts
├─ tsconfig.json
│
...생략
```

## 👨‍👨‍👦‍👦 개발자 소개 

- 김종화 : 와인 상세 페이지 
- 이형준 : 랜딩 페이지 / 팀장 👑
- 손재헌 : 로그인, 회원가입 페이지
- 장혁수 : 마이 페이지
- 정인재 : 와인 목록 페이지

## 💻 개발 환경

OS: macOS, Windows


IDE: Visual Studio Code


Version Control: Git, GitHub


Package Manager: npm

## 기술 스택

- React
- Next.js
- TypeScript
- Tailwind CSS



## 주요 기능

|제목|내용|설명|
|---|---|---|
|테스트1|*강조1*|테스트3|
|테스트1|**강조2**|테스트3|

와인 목록 조회: 사용자는 모든 와인의 목록을 확인할 수 있습니다.


와인 상세 정보: 각 와인의 이름, 가격, 평균 평점, 최신 리뷰 등의 정보를 제공합니다.


와인 추가: 사용자는 새로운 와인을 추가할 수 있으며, 이름, 가격, 원산지, 타입 등의 정보를 입력해야 합니다.


필터링 기능: 사용자는 가격대 및 와인 타입(레드, 화이트, 스파클링 등)으로 와인을 필터링할 수 있습니다.


리뷰 및 평점 확인: 각 와인에 대한 평균 평점과 최신 리뷰를 확인할 수 있습니다.

## API
