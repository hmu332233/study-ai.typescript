# 4단계: 실전 적용 및 생태계 (Ecosystem & Advanced)

## 학습 목표
- 외부 라이브러리를 자유롭게 사용할 수 있다
- 타입 단언과 선언 파일을 이해한다
- 실제 프로젝트에서 TypeScript를 능숙하게 활용한다

## 학습 내용

### 1. 외부 라이브러리 연동
- **`@types` 패키지**: DefinitelyTyped 저장소 활용
- **`.d.ts` (Declaration File)**: 타입 정의 파일의 역할
- **모듈 보강 (Module Augmentation)**: 기존 라이브러리의 타입 확장

### 2. 타입 단언 (Type Assertion)
- `as` 키워드: 개발자가 컴파일러보다 타입을 더 잘 알 때 사용
- 주의: 남용 시 런타임 에러의 주범

### 3. 고급 패턴
- Discriminated Union (구별된 유니온)
- Exhaustive Check (완전성 검사)
- 조건부 타입 (Conditional Types)
- 템플릿 리터럴 타입

## 실습 파일

| 파일 | 설명 |
|------|------|
| `exercise.ts` | 초기화 코드 (직접 완성해보세요) |
| `solution.ts` | 완성된 정답 코드 |

## 실습 과제
- 외부 라이브러리 타입 정의 파일 작성해보기
- 타입 안전한 이벤트 에미터 구현하기
- 조건부 타입을 활용한 유틸리티 타입 만들기

## 실행 방법
```bash
# 타입 체크
pnpm run check:04

# 실행
pnpm run lesson:04
```
