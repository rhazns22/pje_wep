const projectsData = [
  {
    id: "petlog",
    title: "PetLog",
    subtitle: "AI 기반 반려동물 의료비 데이터 분석 및 관리 플랫폼",
    description: "PetLog는 동물병원 영수증 이미지를 AI로 분석하고, 보호자가 직접 검토·수정한 뒤 의료비 기록으로 저장하는 웹앱입니다. 단순 OCR이 아니라 AI 분석 결과와 사용자의 검증을 결합한 Human-in-the-loop 구조를 중심으로 설계했습니다.",
    period: "2025.06 - 2026.06",
    status: "Beta Release Candidate",
    role: ["기획", "UI 설계", "Frontend", "Firebase 연동", "AI OCR 흐름 구현"],
    stack: ["React 19", "Vite", "Tailwind CSS", "Firebase Auth", "Firestore", "Storage", "Google Gemini 2.5 Flash", "Vercel"],
    tags: ["React", "Firebase", "Gemini API", "OCR"],
    coverColor: "linear-gradient(135deg, #e6fcf5 0%, #c3fae8 100%)",
    icon: "assets/images/petlog_icon.jpg",
    focus: "OCR 분석, 사용자 검토, 의료비 기록, PDF 리포트, 안전 가이드",
    links: [
      { label: "GitHub", url: "https://github.com/rhazns22/petlog" }
    ],
    sections: [
      {
        heading: "Overview",
        type: "paragraph",
        content: "PetLog는 동물병원 영수증 이미지를 AI로 분석하고, 보호자가 직접 검토·수정한 뒤 의료비 기록으로 저장하는 웹앱입니다. 단순 OCR이 아니라 AI 분석 결과와 사용자의 검증을 결합한 Human-in-the-loop 구조를 중심으로 설계했습니다."
      },
      {
        heading: "Problem",
        type: "paragraph",
        content: "동물병원 영수증은 병원마다 양식과 항목명이 다르고, 진료비·검사비·약제비·할인·부가세 정보가 한 장 안에 섞여 있어 보호자가 나중에 다시 이해하기 어렵습니다."
      },
      {
        heading: "Solution",
        type: "paragraph",
        content: "영수증을 업로드하면 AI가 먼저 항목을 분석하고, 사용자가 직접 확인·수정한 데이터만 저장합니다. AI 결과를 그대로 신뢰하지 않고, 보호자 검토 단계를 거쳐 기록의 신뢰도를 높이는 구조로 만들었습니다."
      },
      {
        heading: "Core Pipeline",
        type: "list",
        content: [
          "영수증 이미지 업로드",
          "이미지 최적화 및 OCR 분석 요청",
          "Gemini API 기반 항목 추출",
          "진찰, 검사, 처치, 입원, 수술, 약제 항목 분류",
          "부가세와 할인액 분리 처리",
          "사용자 검토 및 수정",
          "Firebase Firestore 저장",
          "월별 지출 리포트 및 PDF 기록 생성"
        ]
      },
      {
        heading: "Key Features",
        type: "list",
        content: [
          "<strong>스마트 OCR</strong>: 영수증 사진에서 상호명, 날짜, 결제수단, 세부 항목 추출",
          "<strong>의료비 6대 분류</strong>: 진찰, 검사, 처치, 입원, 수술, 약제 항목 자동 분류",
          "<strong>금융 데이터 처리</strong>: VAT 분리 및 할인액 안분 처리",
          "<strong>지출 기록 리포트</strong>: 개인 기록용 PDF 리포트 생성",
          "<strong>Care Insight</strong>: 진단/처방이 아닌 기록 중심의 안전한 안내 제공",
          "<strong>문의하기 Beta</strong>: 서비스 이용 중 불편 사항 접수"
        ]
      },
      {
        heading: "Technical Decisions",
        type: "list",
        content: [
          "분석용 이미지는 메모리에서 처리 후 즉시 파기하고, 원본 이미지는 Firebase Storage에 별도 보관",
          "긴 변 2000px 기준 이미지 리사이징과 짧은 변 900px 가독성 보호 로직 적용",
          "Firebase Auth, Firestore, Storage 기반 사용자별 데이터 관리",
          "Gemini 2.5 Flash를 활용한 OCR 분석 파이프라인 구성",
          "compressionRatio, analysisDurationMs, avgConfidence 등 QA 지표 추적"
        ]
      },
      {
        heading: "Stabilization",
        type: "list",
        content: [
          "네트워크 오류 또는 데이터 부재 시에도 화면이 깨지지 않도록 Fail-Safe UI 적용",
          "민감 작업 시 Google/Email 재인증 프로세스 강화",
          "/api/analyze-receipt 스키마 불일치 및 400 Bad Request 오류 수정",
          "특정 질환 키워드 감지 시 AI 진단/처방 유도를 방지하는 Fallback 강화",
          "한국어 사용자 경험에 집중하기 위해 미완성 다국어 기능 제거"
        ]
      },
      {
        heading: "AI Usage",
        type: "list",
        content: [
          "<strong>서비스 기능으로서의 AI</strong><br>• Gemini API를 활용해 영수증 이미지에서 상호명, 날짜, 결제수단, 세부 항목을 추출했습니다.<br>• 분석 결과를 진찰, 검사, 처치, 입원, 수술, 약제 항목으로 분류했습니다.<br>• AI 결과를 바로 저장하지 않고, 사용자가 검토하고 수정한 데이터만 최종 기록으로 저장했습니다.",
          "<strong>개발 보조 도구로서의 AI</strong><br>• OCR 실패 케이스, API 오류, 데이터 저장 흐름을 분석하는 데 AI를 활용했습니다.<br>• README, 발표 자료, 트러블슈팅 문서의 초안을 만들고 실제 구현 내용에 맞게 수정했습니다.<br>• AI가 만든 결과를 그대로 사용하지 않고, 직접 테스트와 검증을 거쳐 반영했습니다."
        ]
      },
      {
        heading: "Legal & Safety Notice",
        type: "paragraph",
        content: "PetLog에서 생성된 PDF 리포트는 개인 기록용이며, 공식 영수증, 세무 증빙, 보험 청구용 서류를 대체하지 않습니다. AI 안내는 진단이나 처방이 아니라 기록 관리와 병원 안내 준수에 한정됩니다."
      }
    ]
  },
  {
    id: "chaengim",
    title: "Chaengim",
    subtitle: "사용자 맞춤형 정부 혜택 탐색 및 일정·서류 관리 PWA",
    description: "Chaengim은 복잡한 정부 혜택 정보를 사용자의 나이, 거주 지역, 가구 형태, 소득 수준, 취업 상태 등 개인 프로필을 바탕으로 분석하고, 맞춤형 혜택과 신청 준비 흐름을 관리하는 모바일 퍼스트 PWA입니다.",
    status: "Beta Release Candidate",
    type: "Full-stack PWA",
    role: ["기획", "Frontend", "Backend API", "DB 설계", "배포 구조 구성"],
    stack: ["React 19", "TypeScript", "Vite", "Zustand", "Framer Motion", "Express", "Prisma", "MySQL", "Gemini API", "Railway", "Vercel"],
    tags: ["React", "Express", "Prisma", "MySQL"],
    coverColor: "linear-gradient(135deg, #e7f5ff 0%, #d0ebff 100%)",
    icon: "assets/images/jppimg.png",
    focus: "맞춤 혜택 추천, 신청 보드, 체크리스트, D-Day 일정 관리, 보안 API",
    links: [
      { label: "GitHub", url: "https://github.com/rhazns22/chaengim" }
    ],
    sections: [
      {
        heading: "Overview",
        type: "paragraph",
        content: "Chaengim은 복잡한 정부 혜택 정보를 사용자의 나이, 거주 지역, 가구 형태, 소득 수준, 취업 상태 등 개인 프로필을 바탕으로 분석하고, 맞춤형 혜택과 신청 준비 흐름을 관리하는 모바일 퍼스트 PWA입니다."
      },
      {
        heading: "Problem",
        type: "paragraph",
        content: "정부 혜택 정보는 여러 기관에 흩어져 있고, 사용자는 본인에게 맞는 혜택을 찾은 뒤에도 신청 서류, 마감일, 진행 상태를 따로 관리해야 합니다. 정보 탐색과 신청 준비 과정이 분리되어 있어 실제 신청까지 이어지기 어렵습니다."
      },
      {
        heading: "Solution",
        type: "paragraph",
        content: "사용자 프로필을 기반으로 혜택을 추천하고, 관심 혜택을 저장한 뒤 신청 상태와 구비 서류를 칸반 보드와 체크리스트로 관리할 수 있도록 구성했습니다. 마감 일정은 D-Day 기준으로 정리해 중요한 혜택을 놓치지 않도록 설계했습니다."
      },
      {
        heading: "Core Flow",
        type: "list",
        content: [
          "사용자 프로필 입력",
          "조건 기반 혜택 탐색",
          "Gemini API 기반 맞춤 추천 보고서 생성",
          "관심 혜택 저장",
          "신청 상태 보드 관리",
          "서류 체크리스트 관리",
          "D-Day 일정 확인"
        ]
      },
      {
        heading: "Key Features",
        type: "list",
        content: [
          "<strong>맞춤형 혜택 추천</strong>: 나이, 지역, 소득, 취업 상태 기반 추천",
          "<strong>신청 보드</strong>: 준비중, 신청완료, 대기중, 완료 상태 관리",
          "<strong>체크리스트</strong>: 혜택별 구비 서류 준비 상태 관리",
          "<strong>일정 관리</strong>: 마감일 기준 D-Day 모니터링",
          "<strong>AI 매칭 보고서</strong>: 적합성 점수, 추천 이유, 매칭 태그, 신청 유의점 생성",
          "<strong>모바일 PWA</strong>: 모바일 사용성을 고려한 레이아웃과 Safe-Area 대응"
        ]
      },
      {
        heading: "Architecture",
        type: "list",
        content: [
          "<strong>Frontend</strong>: React 19, TypeScript, Vite 기반 PWA. Zustand를 통한 인증 및 세션 상태 관리. Framer Motion을 활용한 상태 전환과 마이크로 인터랙션. 모바일 오버스크롤과 가상 키보드 대응",
          "<strong>Backend</strong>: Express 4 기반 REST API. Prisma ORM을 통한 Type-Safe DB 쿼리. MySQL 기반 사용자, 프로필, 혜택, 저장 혜택, 체크리스트 데이터 관리. Railway 배포",
          "<strong>AI</strong>: Gemini Flash API를 통해 맞춤 혜택 분석과 추천 사유 생성. 적합성 점수, 추천 이유, 매칭 해시태그, 신청 유의점 생성"
        ]
      },
      {
        heading: "Security",
        type: "list",
        content: [
          "JWT 기반 인증",
          "User ID를 클라이언트 값으로 신뢰하지 않고, 토큰에서 추출한 req.user.id 기준으로 데이터 소유권 검증",
          "Helmet 보안 헤더 적용",
          "CORS 허용 도메인 제한",
          "express-rate-limit을 통한 무분별한 요청 제한",
          "Zod 기반 런타임 데이터 검증",
          "이메일 인증 코드는 평문 저장하지 않고 SHA-256 해시로 저장",
          "인증 코드 만료 시간과 재발송 쿨다운 적용"
        ]
      },
      {
        heading: "Business Logic",
        type: "list",
        content: [
          "지역, 나이, 가구 형태, 소득 조건을 기준으로 1차 규칙 기반 필터링",
          "필터링된 혜택을 Gemini API에 전달해 맞춤 추천 결과 생성",
          "추천 결과는 점수, 사유, 태그, 유의점으로 구조화",
          "사용자는 관심 혜택을 저장하고 신청 준비 상태를 관리"
        ]
      },
      {
        heading: "UI Flow",
        type: "list",
        content: [
          "<strong>Home</strong>: 브랜딩 히어로와 라운드 오버레이 시트",
          "<strong>Benefits</strong>: 혜택 탐색과 필터 칩",
          "<strong>Board</strong>: 신청 상태별 칸반 보드",
          "<strong>Schedule</strong>: D-Day 기준 마감 일정 확인",
          "<strong>Settings</strong>: 사용자 정보 및 알림 설정"
        ]
      },
      {
        heading: "AI Usage",
        type: "list",
        content: [
          "<strong>서비스 기능으로서의 AI (추천 보조 및 신청 준비 관리)</strong><br>• 사용자 프로필과 혜택 조건을 바탕으로 Gemini API를 활용해 맞춤 추천 보고서를 생성했습니다.<br>• 추천 결과는 적합성 점수, 추천 이유, 매칭 태그, 신청 유의점 형태로 구조화했습니다.<br>• AI 추천 결과는 공식 판정이 아닌 추천 보조용 참고 정보로만 제공하며, 최종 자격 조건은 공식 기관에서 교차 검증하도록 설계했습니다.",
          "<strong>개발 보조 도구로서의 AI</strong><br>• API 구조, 데이터 모델, 신청 상태 흐름을 정리하는 데 AI를 활용했습니다.<br>• 보안 설계, README 문서화, 포트폴리오 설명 구조를 정리하는 데 도움을 받았습니다.<br>• 실제 구현에서는 Express, Prisma, MySQL, JWT 인증, 데이터 소유권 검증 구조를 직접 확인하며 반영했습니다."
        ]
      },
      {
        heading: "Legal Notice",
        type: "paragraph",
        content: "Chaengim은 공식 정부 신청 대행 기관이 아닙니다. AI 및 규칙 기반 추천 결과는 참고용이며, 최종 수급 여부와 자격 조건은 정부24 등 공식 기관에서 직접 확인해야 합니다."
      }
    ]
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    subtitle: "미니멀 정보 구조 포트폴리오",
    description: "채용 담당자의 핵심 읽기 경험을 최우선으로 고려한 포트폴리오입니다. 메인 허브는 Apple/Toss식의 넓은 여백과 가벼운 카드 뼈대로 간결함을 제공하고, 상세 분석 영역은 Notion 문서형 모달 뷰포트를 연동하여 상세 텍스트에 깊이 집중하도록 설계했습니다.",
    period: "2026.06 - 2026.06",
    status: "Completed / Main Portfolio",
    role: ["개인 100% 설계 및 마크업 개발"],
    stack: ["HTML5", "Vanilla CSS", "Vanilla JS", "Vercel"],
    tags: ["React", "TypeScript", "Vercel"],
    coverColor: "linear-gradient(135deg, #f1f3f5 0%, #e9ecef 100%)",
    icon: "📄",
    sections: [
      {
        heading: "Overview",
        type: "paragraph",
        content: "채용 담당자의 핵심 읽기 경험을 최우선으로 고려한 포트폴리오입니다. 메인 허브는 Apple/Toss식의 넓은 여백과 가벼운 카드 뼈대로 간결함을 제공하고, 상세 분석 영역은 Notion 문서형 모달 뷰포트를 연동하여 상세 텍스트에 깊이 집중하도록 설계했습니다."
      },
      {
        heading: "Design Strategy",
        type: "list",
        content: [
          "<strong>화이트 테마 & 미니멀 레이아웃</strong>: 시각적인 노이즈를 최소화하기 위해 모던한 타이포그래피와 카드 UI로 구성된 메인 허브를 배치했습니다.",
          "<strong>Notion 문서 뷰포트 오버레이</strong>: 각 프로젝트의 카드를 클릭하면 Notion 페이지 스타일을 그대로 살린 모달 창이 오버레이되도록 구현하여, 문제 상황과 아키텍처, 트러블슈팅 이력에 시선이 몰입될 수 있게 연출했습니다."
        ]
      },
      {
        heading: "Core Implementation",
        type: "list",
        content: [
          "외부 라이브러리 의존성을 제거한 순수 Vanilla JavaScript 기반 모달 상태 변경 및 HTML DOM 바인딩 제어",
          "뷰포트 하단 스크롤 차단(<code>overflow: hidden</code>) 기법을 활용한 모달 내부 독립형 스크롤 조작 최적화",
          "CSS Custom Properties를 통한 일관성 있는 서체 스케일 및 색상 토큰 관리"
        ]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
