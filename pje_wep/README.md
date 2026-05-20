# Product-Minded Frontend Engineer Portfolio

<div align="center">
  <img src="assets/images/jppimg.png" alt="Ju Eun Park Banner" />

  <p align="center">
    <strong>사용자 흐름과 데이터 연결을 구현하는 프론트엔드 엔지니어, 박주은입니다.</strong>
  </p>

  <p align="center">
    <a href="https://pjewep.vercel.app">
      <img src="https://img.shields.io/badge/Live_Demo-Visit_Portfolio-60a5fa?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
  </p>

  <p align="center">
    <strong>Portfolio & Project Experience Stack</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

---

## Engineering Philosophy & Value

단순한 화면 구현에 그치지 않고, 기획과 UI 설계, API 연동, 데이터 흐름, 배포까지 이어지는 웹 서비스 제작 흐름을 경험하고 있습니다.

* **문제를 구조화하기**: 사용자가 겪는 불편함을 기능 요구사항과 화면 흐름 단위로 정리합니다.
* **디자인을 UI 코드로 구현하기**: 시각적 완성도뿐 아니라 컴포넌트 재사용성과 반응형 레이아웃을 고려해 화면을 구현합니다.
* **데이터 흐름 연결하기**: Firebase Auth, Firestore, MySQL, Gemini API를 활용해 인증, 데이터 저장, AI API 연동 흐름을 프론트엔드 기능과 연결합니다.

---

## Tech Stack & Capability

| Category | Skills & Tools | Experience |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript, HTML5, CSS3, JavaScript | 컴포넌트 기반 UI 구현, 반응형 레이아웃, 기본 인터랙션 구현 경험 |
| **Data & API Integration** | Firebase Auth, Firestore, Storage, MySQL | 인증 흐름, 사용자별 데이터 저장, 기본 CRUD 흐름 구현 경험 |
| **AI API** | Gemini API | OCR 분석 초안 생성, 에러 처리, 사용자 확인 흐름 연결 경험 |
| **Design** | Figma, Photoshop, Illustrator | 화면 구성, UI 흐름 설계, 시각 디자인 경험 |
| **Deployment & Workflow** | Vercel, Git, ChatGPT, Antigravity | 배포, 오류 분석, AI 도구 기반 구현 지시 및 개선 흐름 경험 |

---

## Main Projects

### 1. PetLog  
**AI 기반 반려동물 병원비 기록 및 분석 서비스**

영수증 이미지를 AI 분석 초안으로 변환하고, 사용자가 확인한 뒤 데이터로 저장되는 서비스입니다.

* **Live App**: [PetLog 바로가기](https://petlog-eight.vercel.app/)
* **Project Web**: [PetLog 상세 설명 웹](https://petlogwep.vercel.app/)

**Core Flow**

1. 사용자가 영수증 이미지를 업로드합니다.
2. Gemini OCR을 활용해 병원명, 날짜, 항목, 금액 정보를 분석합니다.
3. AI 분석 결과를 바로 저장하지 않고, 사용자가 확인하고 수정할 수 있는 검토 단계를 거칩니다.
4. 확인된 데이터는 Firebase Firestore에 저장됩니다.
5. AI 분석이 어려운 경우 수기 입력 fallback 흐름을 제공합니다.

---

### 2. VetFlow  
**동물병원 운영 흐름을 관리하는 SaaS형 대시보드**

동물병원의 업무 상태, 역할별 화면 흐름, 운영 데이터를 대시보드 형태로 정리한 프로젝트입니다.

* **Live Demo**: [VetFlow 바로가기](https://vetflow-pi.vercel.app/)

**Core Flow**

1. 역할에 따라 화면 뷰와 접근 흐름을 나눕니다.
2. 미처리 업무와 대기 환자 상태를 대시보드에서 확인할 수 있도록 구성합니다.
3. 복잡한 운영 데이터를 카드, 타임라인, 상태 표시 UI로 정리합니다.

---

## Portfolio Interaction Features

포트폴리오 사이트에는 사용자의 탐색 흐름을 돕기 위한 가벼운 인터랙션을 적용했습니다.

```mermaid
graph TD
    A[Splash Screen] --> B[Main Hero Typing]
    B --> C[Custom Cursor]
    C --> D[Summary Peek]
    D --> E[Responsive Layout]