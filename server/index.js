const { ApolloServer, gql } = require("apollo-server");

let nuggetDatabase = [
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

let studyDatabase = [
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
    new Promise((resolve) => setTimeout(() => resolve(nuggetDatabase), 1000));

  const updateAllNuggetItems = (nuggetItems) => new Promise((resolve) => setTimeout(() => {
    nuggetDatabase = nuggetItems;
    resolve(nuggetDatabase)
  }, 1000))

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

    const deleteNugget = (nuggetId) => requestAllNuggetItems().then(nuggetItems => {
      const nuggetIndex = nuggetItems.findIndex((nugget) => nugget.nuggetId === nuggetId);
      const removedNugget = nuggetItems[nuggetIndex];
      const remainingNugets = [...nuggetItems.slice(0, nuggetIndex), ...nuggetItems.slice(nuggetIndex + 1)]
      return updateAllNuggetItems(remainingNugets).then(() => removedNugget);
    });

  return { getNuggetItems, getNugget, deleteNugget };
};

const createStudyApi = () => {
  const requestAllStudyItems = () =>
    new Promise((resolve) => setTimeout(() => resolve(studyDatabase), 1000));

  const getStudy = (studyId) =>
    requestAllStudyItems().then((studyItems) =>
      studyItems.find((study) => study.studyId === studyId)
    );

  return { getStudy };
};

const typeDefs = gql`
  type Study {
    studyId: ID!
    title: String!
    content: String!
  }

  type Nugget {
    nuggetId: ID!
    studyId: ID!
    study: Study
    title: String!
    content: String
    tags: [String]
  }

  type Query {
    nuggets(tags: [String]): [Nugget]!
    study(studyId: ID): Study!
  }

  type Mutation {
      deleteNugget(nuggetId: ID!): Nugget!
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

  Mutation: {
    deleteNugget: (parent, args, context, info) => {
      return context.dataSources.nuggetAPI.deleteNugget(args.nuggetId);
    },
  },

  Nugget: {
    study(parent, args, context) {
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
