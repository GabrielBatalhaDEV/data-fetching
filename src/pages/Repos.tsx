//import { useFetch } from "./hooks/useFetch";

import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface Repository {
  full_name: string;
  description: string;
}

function Repos() {
  /*const { data: repositories, isFetching } = useFetch<Repository[]>(
    "/GabrielBatalhaDEV/repos"
  );*/

  const { data: repositories, isFetching } = useQuery<Repository[]>(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/GabrielBatalhaDEV/repos"
      );

      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return (
    <ul>
      {isFetching && <p>Carregando ...</p>}
      {repositories?.map((repo) => (
        <li key={repo.full_name}>
          <Link to={`/repo/${repo.full_name}`}>{repo.full_name}</Link>
          <p>{repo.description}</p>
        </li>
      ))}
    </ul>
  );
}

export { Repos };
