const database = require("./database");
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`;
// team 쿼리에 Int 타입의 id라는 인자를 받아 그에 해당하는 Team을 반환하는 Query를 등록하기 위해 team(id: Int): Team을 typeDefs에 등록한다.

const resolvers = {
  Query: {
    teams: () =>
      database.teams.map((team) => {
        team.supplies = database.supplies.filter(
          (supply) => team.id === supply.team
        );

        return team;
      }),
    team: (
      // team 쿼리에 id라는 인자를 받는 resolver
      // team 쿼리에 인자를 넣으면 두 번쨰 파라미터에 대입된다.
      parent,
      args,
      context,
      info
    ) =>
      database.teams.filter((team) => {
        return team.id === args.id;
      })[0],
    equipments: () => database.equipments,
    supplies: () => database.supplies,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
