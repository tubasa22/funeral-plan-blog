# 장례 플랜 블로그

GitHub Pages에서 바로 테스트할 수 있는 정적 HTML 블로그입니다. 별도 빌드나 설치가 필요하지 않습니다.

## 구조

```text
funeral-blog/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
│       ├── hero-remembrance.png
│       ├── planning-symbol.png
│       ├── funeral-home.png
│       ├── funeral-options.png
│       ├── cremation.png
│       ├── burial.png
│       └── closing-garden.png
├── content/content.md
└── README.md
```

## 로컬 확인

`index.html`을 브라우저에서 열면 됩니다. 로컬 서버가 필요한 경우 폴더 안에서 아래 명령을 실행하세요.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## GitHub Pages

1. 새 GitHub 저장소를 만듭니다.
2. 이 폴더 안의 파일을 저장소 루트에 올립니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Deploy from a branch**를 선택하고 `main` 브랜치의 `/ (root)`를 지정합니다.

## 수정 위치

- 본문: `index.html`
- 색상·글꼴·반응형 디자인: `assets/css/style.css`
- 모바일 메뉴·맨 위로 버튼: `assets/js/main.js`
- 이미지: `assets/images/`

가격, 가입 조건, 보장 관련 표현은 정식 공개 전에 실제 상품 자료와 광고 규정을 기준으로 다시 검토하세요.
