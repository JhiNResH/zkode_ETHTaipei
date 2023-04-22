export interface GithubReposResponse {
  id: number;
  name: string;
  private: boolean;
}

export interface GetRepositoriesResponse {
  repositories: GithubReposResponse[];
}
