const database = require("./database");
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    teams: [Team]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
  }
`;
// type Query 부분은 query 키워드로 조회할 때, teams는 아래 정의된 type Team을 요소로 갖는 배열 타입임을 지정한 것이다.
// 그리고 type Team은 위에서 teams 배열의 요소로 들어가는 타입인 Team을 정의한 것이다.

const resolvers = {
  // resolver는 Query, Mutation과 같은 CRUD 기능(함수)이 어떻게 동작할 지에 대한 정의이다.
  Query: {
    teams: () => database.teams,
  },
};

const server = new ApolloServer({ typeDefs, resolvers }); // 위에서 정의한 typeDefs와 resolvers 두 객체를 가지는 객체를 ApolloServer() 인스턴스의 생성자의 인자로 대입하여 아폴로 서버를 생성한다.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
