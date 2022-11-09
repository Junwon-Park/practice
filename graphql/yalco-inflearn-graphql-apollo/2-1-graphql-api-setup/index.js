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
// 쿼리 시에 Team에 정의된 속성들을 가져오고 싶은 것만 지정해서 쿼리할 수 있는데, 없는 속성은 당연히 가져올 수 없고 존재하는 속성을 빼고 가져오는 것은 가능하다.
// 즉, type Query는 쿼리할 수 있는 데이터와 그 데이터를 구성하는 타이입이 무엇인지 정의한 것이고(type Query에 정의된 것만 query 키워드로 조회할 수 있다.) 여기에서는 type Team을 요소로 갖는 배열 타입으로 반환한다는 것이다.
// 그리고 그 Team이라는 요소는 위에 정의된 속성을 가진 객체이며 이를 조회할 때, Team에 정의된 속성을 제외하고 가져오는 것은 가능하지만 없는 당연히 없는 속성은 조회할 수 없다.

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
