import { useQuery } from "urql";

const NuggetsQuery = `
  query {
    nuggets {
      nuggetId
      title
    }
  }
`;

export const Nuggets = () => {
  const [result, reexecuteQuery] = useQuery({
    query: NuggetsQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {data.nuggets.map((nugget) => (
        <li key={nugget.nuggetId}>{nugget.title}</li>
      ))}
    </ul>
  );
};
