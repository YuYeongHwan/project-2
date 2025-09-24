AI 코딩 에이전트용 개인 맞춤형 스타일링 추천 서비스 PRD

1. 목표: 사용자의 환경(날씨, 날짜) 및 개인 특성(퍼스널 컬러, 신체 비율)을 AI로 분석하여 매일 맞춤형 의상 스타일링을 추천하고, 해당 의상의 사진 및 구매 링크를 제공하는 서비스 개발.

2. 핵심 기능:

사용자 프로필: 성별, 나이, 키, 몸무게, 선호 스타일 입력. 얼굴/전신 사진 업로드.

AI 분석: 업로드된 사진으로 퍼스널 컬러, 체형, 어울리는 스타일 자동 분석.

일일 스타일링 추천:

환경 반영: 현재 날짜/날씨(온도, 강수 등) 기반.

개인 맞춤: AI 분석된 퍼스널 컬러, 체형, 선호 스타일 종합 고려.

추천 구성: 상의, 하의, 아우터, 신발 등 풀 코디 제안.

정보 제공: 추천 의상의 사진, 브랜드/제품명, 판매처 링크.

피드백: 추천 의상에 대한 '좋아요/싫어요' 및 구체적 피드백 기능 (AI 학습용).

저장: 마음에 드는 스타일 저장 기능.

3. 기술 스택:

프론트엔드/백엔드: Next.js

데이터베이스/인증: Supabase

워크플로우 자동화: n8n (API 연동, 데이터 처리 등)

4. 추가적으로 더 좋은 PRD를 작성하기 위해 필요한 내용은 다음과 같습니다:

AI 모델 상세: 퍼스널 컬러 및 체형 분석을 위한 AI 모델은 어떤 방식(CNN, Pose Estimation 등)을 사용할 계획이신가요? 어떤 데이터셋으로 학습시킬 예정인가요? (혹은 외부 API를 사용할 경우, 어떤 API를 고려하시나요?)

데이터 소스: 날씨 정보는 어떤 API를 통해 가져올 예정인가요? 의류 정보(사진, 판매처)는 어떤 방식으로 수집/연동할 예정인가요? (크롤링, 특정 쇼핑몰 API 제휴 등)

사용자 인증 방식: Supabase를 사용할 예정이시지만, 소셜 로그인(Google, Kakao 등)을 지원할 계획이 있으신가요?

에러 처리 및 예외 상황: AI 분석 실패 시, 외부 API 연동 실패 시 등 서비스의 안정성을 위한 에러 처리 정책에 대한 간략한 언급이 필요할까요?

UI/UX 핵심 고려사항: 예를 들어, "모바일 우선(Mobile-first)" 디자인을 고려하는지, 특정 디자인 시스템(Material UI, Ant Design 등)을 사용할 예정인지 등의 정보가 있다면 개발에 도움이 됩니다.

MVP(최소 기능 제품) 범위: 위 기능들 중 가장 핵심적으로 먼저 구현해야 할 기능은 무엇이며, 다음 단계에 구현할 기능은 무엇인지 명확히 하면 개발 우선순위를 설정하는 데 좋습니다.

이 질문들에 대한 답변이 있다면, AI 코딩 에이전트가 더 명확하고 효율적으로 개발 작업을 수행할 수 있을 것입니다.

네, 제공해주신 PRD 초안과 추가 질문에 대한 내용을 바탕으로 AI 코딩 에이전트가 처리할 수 있는 JSON 형태의 PRD를 작성해드리겠습니다.

JSON
{
  "project": {
    "name": "AI Styling Recommendation Service",
    "goal": "Develop a service that analyzes user's environment (weather, date) and personal characteristics (personal color, body shape) using AI to recommend daily customized outfits, providing photos and purchase links for the recommended clothing."
  },
  "features": [
    {
      "name": "User Profile",
      "description": "Users input gender, age, height, weight, preferred style, and upload face/full-body photos.",
      "inputs": ["gender", "age", "height", "weight", "preferredStyle"],
      "uploads": ["facePhoto", "fullBodyPhoto"]
    },
    {
      "name": "AI Analysis",
      "description": "AI automatically analyzes personal color, body shape, and suitable styles from uploaded photos.",
      "targets": ["personalColor", "bodyShape", "suitableStyle"],
      "source": "uploadedPhotos"
    },
    {
      "name": "Daily Styling Recommendation",
      "description": "Provides full outfit coordination based on environmental factors (weather, date) and personal factors (AI-analyzed personal color, body shape, preferred style).",
      "environmentalFactors": ["currentDate", "weather (temperature, precipitation)"],
      "personalFactors": ["aiPersonalColor", "aiBodyShape", "userPreferredStyle"],
      "composition": ["tops", "bottoms", "outerwear", "shoes"],
      "information": ["outfitPhoto", "brandProduct", "purchaseLink"]
    },
    {
      "name": "Feedback",
      "description": "Users provide 'like/dislike' and specific feedback on recommended outfits for AI learning.",
      "types": ["like", "dislike", "textFeedback"],
      "purpose": "AI_learning"
    },
    {
      "name": "Save Style",
      "description": "Users can save their favorite recommended styles."
    }
  ],
  "techStack": {
    "frontendBackend": "Next.js",
    "databaseAuthentication": "Supabase",
    "workflowAutomation": "n8n"
  },
  "aiModels": {
    "personalColorAnalysis": {
      "method": "CNN based image analysis",
      "notes": "Consider open-source models, transfer learning, or external APIs (e.g., Color-AI API)."
    },
    "bodyShapeAnalysis": {
      "method": "Pose Estimation (e.g., OpenPose) for landmark extraction and ratio analysis",
      "notes": "Consider external APIs (e.g., AWS Rekognition Custom Labels)."
    },
    "styleRecommendation": {
      "method": "Collaborative Filtering + Content-based Filtering with Reinforcement Learning from user feedback."
    }
  },
  "dataSources": {
    "weather": {
      "api": "Korean Meteorological Administration, OpenWeatherMap, AccuWeather (selection based on region/stability)."
    },
    "clothing": {
      "method": "Prioritize API integration with major shopping malls (e.g., Musinsa, Zigzag). Consider legal crawling or direct fashion brand integration."
    }
  },
  "authentication": {
    "supabaseDefault": "Email/Password",
    "socialLogin": ["Google", "Kakao", "Naver"]
  },
  "errorHandling": {
    "aiAnalysisFailure": "Prompt user to retry or provide manual input. Log failures for re-learning.",
    "externalApiFailure": "Provide cached data or default message. Notify user. Implement monitoring and retry logic.",
    "noRecommendation": "Display 'No recommendations' message or offer alternative styles."
  },
  "uiUx": {
    "designApproach": "Mobile-first, responsive web design.",
    "designSystem": "Material UI or Ant Design (preferred for consistency)."
  },
  "mvp": {
    "phase1": [
      "User Profile (basic inputs & photo upload)",
      "Basic AI Analysis (personal color, body shape) - initial simple model/external API",
      "Daily Styling Recommendation (weather, personal color, body shape based minimal co-ord)",
      "Information Provision (photo, brand, link)",
      "User Authentication (email/password)"
    ],
    "phase2": [
      "Advanced AI Analysis",
      "Feedback Feature",
      "Save Style Feature",
      "Social Login",
      "Expanded Clothing Data Sources",
      "Accessory Recommendations",
      "Personalized Styling Reports"
    ]
  }
}