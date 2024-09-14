# 🍷 WINE
코드잇에서 주관하는 와인 관리 애플리케이션 프로젝트입니다. 

<img width="786" alt="image" src="https://github.com/user-attachments/assets/054fdb8a-3743-49a2-b714-87f3d40e4050">

## 📑 목차
> **[프로젝트 소개](#프로젝트-소개)**
> 
> **[개발 기간](#개발-기간)**
> 
> **[개발자 소개](#개발자-소개)**
> 
> **[상세 계획](#상세-계획)**
> 
> **[User Flow](#User-Flow)**
> 
> **[프로젝트 구조](#프로젝트-구조)**
> 
> **[개발 환경](#개발-환경)**
> 
> **[기술 스택](#기술-스택)**
> 
> **[주요 기능](#주요-기능)**
  
## 🧑‍💻 <a name="프로젝트-소개"/>프로젝트 소개
사용자가 다양한 와인을 조회하고, 새로운 와인을 등록할 수 있도록 하며 와인의 평균 평점과 최신 리뷰를 확인할 수 있는 기능을 제공합니다.

## 🗓️ <a name="개발-기간"/>개발 기간
***8 / 29 (목) ~ 9 / 19 (목)***

## 👨‍👨‍👦‍👦 <a name="개발자-소개"/>개발자 소개 

- 김종화 : 와인 상세 페이지 
- 이형준 : 랜딩 페이지 / 팀장 👑
- 손재헌 : 로그인, 회원가입 페이지
- 장혁수 : 마이 페이지
- 정인재 : 와인 목록 페이지

## 📃 <a name="상세-계획"/>상세 계획과 일정



[**📌 상세 계획**](https://grizzled-rose-30c.notion.site/85cbabe6e886479abbfd09d0f51a468e?pvs=4, "상세 계획 노션 링크")

[**📝 상세 일정**](https://grizzled-rose-30c.notion.site/7c70c15084e242808e01a0cfc0809d7f?pvs=4, "상세 일정 노션 링크")

## 💡 <a name="User-Flow"/>User Flow
![image](https://github.com/user-attachments/assets/f86c7d69-aa4b-4a4b-b0d5-bb580e4040a4)



## 📁 <a name="프로젝트-구조"/>프로젝트 구조
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

## 💻 <a name="개발-환경"/>개발 환경

|OS|IDE|Version Control|Package Manager|deploy|Community|
|:---:|:---:|:---:|:---:|:---:|:---:|
|![macOS](https://img.shields.io/badge/macOS-000000?style=for-the-badge&logo=apple&logoColor=white) ![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)|![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078d7?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white)|![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)|![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)|![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)|![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![Gather](https://img.shields.io/badge/Gather-5D7FA4?style=for-the-badge&logo=gather&logoColor=white)|


## ⚒ <a name="기술-스택"/>기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)


## 👨‍🏫 <a name="주요-기능"/>주요 기능

|사진|사진|사진|
|:---:|---|---|
|랜딩 페이지|와인 목록 페이지|와인 상세 페이지|

|사진|사진|사진|
|---|---|---|
|로그인 페이지|회원가입 페이지|마이 페이지|

와인 목록 조회: 사용자는 모든 와인의 목록을 확인할 수 있습니다.


와인 상세 정보: 각 와인의 이름, 가격, 평균 평점, 최신 리뷰 등의 정보를 제공합니다.


와인 추가: 사용자는 새로운 와인을 추가할 수 있으며, 이름, 가격, 원산지, 타입 등의 정보를 입력해야 합니다.


필터링 기능: 사용자는 가격대 및 와인 타입(레드, 화이트, 스파클링 등)으로 와인을 필터링할 수 있습니다.


리뷰 및 평점 확인: 각 와인에 대한 평균 평점과 최신 리뷰를 확인할 수 있습니다.


