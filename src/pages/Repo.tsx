import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

interface Repository {
  full_name: string;
  description: string;
}

function Repo() {
  const params = useParams();
  const currentRepo = params["*"] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositor() {
    //await queryClient.invalidateQueries(["repos"]);

    const previousRepos = queryClient.getQueryData<Repository[]>("repos");

    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepo) {
          return { ...repo, description: "Testando" };
        } else {
          return repo;
        }
      });

      queryClient.setQueryData("repos", nextRepos);
    }
  }

  return (
    <div>
      <h1>{currentRepo}</h1>
      <button onClick={handleChangeRepositor}>Alterar</button>
    </div>
  );
}

export { Repo };
