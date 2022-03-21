import { useFetch } from "./hooks/useFetch";

interface Repository {
  full_name: string;
  description: string;
}

function App() {
  const { data: repositories, isFetching } = useFetch<Repository[]>(
    "/GabrielBatalhaDEV/repos"
  );

  return (
    <ul>
      {isFetching && <p>Carregando ...</p>}
      {repositories?.map((repo) => (
        <li key={repo.full_name}>
          s<strong>{repo.full_name}</strong>
          <p>{repo.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default App;
