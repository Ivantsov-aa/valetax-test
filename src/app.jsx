import Tree from "./components/Tree/Tree";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <Tree />
  </QueryClientProvider>;
}

export default App;
