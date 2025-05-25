export type GitHubWorkflow<T> = {
  name: string;
  on: string | string[] | Record<string, T>; // Can be event triggers
  jobs: Record<string, GitHubJob>;
};

export type GitHubJob = {
  name?: string;
  runs_on: string;
  steps: GitHubStep[];
  needs?: string[]; // Dependencies for job execution
};

type GitHubStep<X = string | boolean | number, T = Record<string, X>> = {
  name?: string;
  uses?: string;
  run?: string;
  with?: T; // Generic type for action inputs
  env?: Record<string, string>;
};
