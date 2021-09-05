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

const createNuggetApi = () => {
  const requestAllNuggetItems = () =>
    new Promise((resolve) => setTimeout(() => resolve(nuggetItems), 2000));

  const getNugget = (nuggetId) =>
    requestAllNuggetItems().then((nuggetItems) =>
      nuggetItems.find((nugget) => nugget.nuggetId === nuggetId)
    );

  const getNuggetItems = (tags) =>
    requestAllNuggetItems(tags).then((nuggetItems) =>
      !tags?.length
        ? nuggetItems
        : nuggetItems.filter((nuggetItem) =>
            tags.some((tag) => nuggetItem.tags.includes(tag))
          )
    );

  return { getNuggetItems, getNugget };
};

const createStudyApi = () => {
  const requestAllStudyItems = () =>
    new Promise((resolve) => setTimeout(() => resolve(studyItems), 2000));

  const getStudy = (studyId) =>
    requestAllStudyItems().then((studyItems) =>
      studyItems.find((study) => study.studyId === studyId)
    );

  return { getStudy };
};

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
      return context.dataSources.nuggetAPI.getNuggetItems(args.tags);
    },
    study(parent, args, context, info) {
      return context.dataSources.studyAPI.getStudy(args.studyId);
    },
  },

  Nugget: {
    study(parent) {
      return context.dataSources.studyAPI.getStudy(parent.studyId);
    },
  },

  Study: {},
};

const dataSources = () => {
  return {
    nuggetAPI: createNuggetApi(),
    studyAPI: createStudyApi(),
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
