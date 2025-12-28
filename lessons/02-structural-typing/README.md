# 2단계: 복잡한 데이터 모델링 (Structural Typing)

## 학습 목표
- 객체 지향적인 구조와 유연한 데이터 타입을 정의할 수 있다
- Interface와 Type Alias의 차이를 이해한다
- Union, Intersection, Literal 타입을 활용할 수 있다

## 학습 내용

### 1. 객체와 인터페이스
- **Interface**: 객체의 뼈대 정의 (`extends`를 통한 상속/확장 용이)
- **Type Alias**: 유니온 타입 등 더 복잡한 타입 정의
- **Property 속성**:
  - Optional Property (`?`): 있어도 되고 없어도 되는 속성
  - Readonly Property (`readonly`): 수정 불가능한 속성
- **Index Signature**: 속성 이름을 미리 알 수 없을 때 사용

### 2. 유니온(Union)과 인터섹션(Intersection)
- **Union (`|`)**: "A 이거나 B이다"
- **Intersection (`&`)**: "A 이면서 동시에 B이다"

### 3. 리터럴 타입 (Literal Type)
- 특정 값 자체를 타입으로 사용
- 예: `type HttpMethod = 'GET' | 'POST' | 'PUT';`

### 4. Enum (열거형)
- 상수 집합을 정의
- `const object` + `as const` 패턴도 알아두기

## 실습 파일

| 파일 | 설명 |
|------|------|
| `exercise.ts` | 초기화 코드 (직접 완성해보세요) |
| `solution.ts` | 완성된 정답 코드 |

## 실습 과제
사용자(User) 객체와 게시글(Post) 객체의 타입을 정의해 보세요.
- 사용자는 '일반'과 '관리자' 권한을 가짐
- 게시글은 '임시저장', '발행' 상태를 가짐

## 실행 방법
```bash
# 타입 체크
pnpm run check:02

# 실행
pnpm run lesson:02
```
