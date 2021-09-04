const { ApolloServer, gql } = require("apollo-server");

const nuggetItems = [
  {
    nuggetId: "001",
    studyId: "001",
    title: "Potato Chips",
    content: "Yummy!",
    tags: ["food"],
  },
  {
    nuggetId: "002",
    studyId: "001",
    title: "Stuffed Potato",
    content: "Tasty :-)",
    tags: ["food"],
  },
  {
    nuggetId: "003",
    studyId: "002",
    title: "Nissan Z",
    content: "Super cool",
    tags: ["automotive"],
  },
  {
    nuggetId: "004",
    studyId: "003",
    title: "Tesla Model Y",
    content: "Electric stuff",
    tags: ["automotive", "technology"],
  },
  {
    nuggetId: "005",
    studyId: "004",
    title: "M1 Chip",
    content: "Really Fast",
    tags: ["technology"],
  },
];

const typeDefs = gql`
  type Nugget {
    nuggetId: String!
    studyId: String!
    title: String!
    content: String
    tags: [String]
  }

  type Study {
    studyId: String!
    title: String!
    content: String
    nuggetIds: [String]
  }

  type Query {
    nuggets(tags: [String]): [Nugget]
  }
`;

const resolvers = {
  Query: {
    nuggets: (parent, args, context, info) => {
      const { tags } = args;
      const hasTags = tags?.length;
      return !hasTags
        ? nuggetItems
        : nuggetItems.filter((nugget) =>
            tags.some((tag) => nugget.tags.includes(tag))
          );
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
