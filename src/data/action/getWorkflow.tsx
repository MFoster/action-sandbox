import { GitHubWorkflow } from '../type/GithubWorkflow';
export async function getWorkflow(filename: string): Promise<GitHubWorkflow<unknown>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}` + `/api/workflow/${encodeURIComponent(filename)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch workflow: ${response.statusText}`);
  }
  return response.json();
}