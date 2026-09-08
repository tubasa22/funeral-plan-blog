# AGENTS.md — Codex 작업 규칙

## 작업 폴더

- 이 저장소는 [https://github.com/tubasa22/funeral-plan-blog](https://github.com/tubasa22/funeral-plan-blog) 의 로컬 클론이다.
- 경로: C:\Users\jaden\OneDrive\Desktop\funeral-blog-github-pages\funeral-blog

## Git 워크플로

- 작업을 완료하면 항상 `git add .` 와 `git commit -m "<작업 요약>"` 까지 실행한다.
- **git push는 절대 하지 않는다.** push는 사람이 직접 확인 후 실행한다.
- 커밋 메시지는 무엇을 왜 바꿨는지 한 줄로 명확히 작성한다.

## 로그 기록

- 매 작업 후 docs/agent-log.md 파일에 다음 형식으로 항목을 추가한다:
  - 작업 번호, 날짜, 목적, 변경된 파일 목록, 커밋 해시(짧은 형식)

## 수정 범위

- 지시받은 파일 외에는 수정하지 않는다.
- README.md의 파일 구조 트리는 실제 파일 목록과 항상 일치시킨다.
- assets/images, assets/audio 등 바이너리 파일은 지시 없이 삭제하지 않는다.
