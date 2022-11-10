import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'], // 변환할 파일
  path: join(process.cwd(), 'src/graphql.ts'), // 변환한 파일을 저장할 경로
  outputAs: 'class', // 변환한 파일 내용의 출력 형식
});
