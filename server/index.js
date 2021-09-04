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

const studyItems = [
  {
    studyId: "001",
    title: "Some great food",
    content: "Food is pretty important",
  },
  {
    studyId: "002",
    title: "Cars that are awesome",
    content: "Transportation can be helpful",
  },
  {
    studyId: "003",
    title: "Interesting Technology",
    content: "Technology let me write this",
  },
];

const typeDefs = gql`
  type Study {
    studyId: String!
    title: String!
    content: String!
  }

  type Nugget {
    nuggetId: String!
    studyId: String!
    study: Study
    title: String!
    content: String
    tags: [String]
  }

  type Query {
    nuggets(tags: [String]): [Nugget]
    study(studyId: String): Study
  }
`;

const resolvers = {
  Query: {
    nuggets: (parent, args, context, info) => {
      const hasTags = args?.tags.length;

      return !hasTags
        ? nuggetItems
        : nuggetItems.filter((nuggetItem) =>
            args.tags.some((tag) => nuggetItem.tags.includes(tag))
          );
    },
    study(parent, args, context, info) {
      return studyItems.find((studyItem) => studyItem.studyId === args.studyId);
    },
  },

  Nugget: {
    study(parent) {
      return studyItems.find(
        (studyItem) => studyItem.studyId === parent.studyId
      );
    },
  },

  Study: {},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
