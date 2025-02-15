// 컨텐츠 타입에 대한 유니온 타입
export type ContentType = 'title' | 'subtitle' | 'text' | 'strong' | 'empty' | 'questionAnswer';

// 기본 컨텐츠 인터페이스
export interface BaseContent {
  type: ContentType;
}

// 텍스트 기반 컨텐츠
export interface TextContent extends BaseContent {
  type: 'title' | 'subtitle' | 'text' | 'strong';
  body: string;
}

// 비어있는 컨텐츠
export interface EmptyContent extends BaseContent {
  type: 'empty';
}

// 질문-답변 컨텐츠
export interface QuestionAnswerContent extends BaseContent {
  type: 'questionAnswer';
  question: string;
  answer: string;
}

// 모든 컨텐츠 타입을 포함하는 유니온 타입
export type Content = TextContent | EmptyContent | QuestionAnswerContent;

// 소분류 카테고리 인터페이스
export interface MinorCategory {
  minorCategory: string;
  identifier: string;
  contents: Content[];
}

// 대분류 카테고리 인터페이스
export interface MajorCategory {
  majorCategory: string;
  hasMinorCategories: boolean;
  identifier: string;
  contents: MinorCategory[] | Content[];
}

// 위키 데이터 전체 구조
export type WikiData = MajorCategory[];
