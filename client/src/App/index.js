import { createClient, Provider as UqrlProvider } from "urql";
import { Nuggets } from "../Nuggets/";

const client = createClient({
  url: "http://localhost:4000/",
});

export const App = () => {
  return (
    <UqrlProvider value={client}>
      <Nuggets />
    </UqrlProvider>
  );
}
