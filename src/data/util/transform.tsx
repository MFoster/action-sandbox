import { GitHubJob } from "../type/GithubWorkflow";


export const transformJobToPhase = (jobs: Record<string, GitHubJob>) => {
  const phases = [];
  const jobMap = Object.fromEntries(
    Object.entries(jobs).map(([jobId, job]) => [
      jobId,
      job.needs
        ? Array.isArray(job.needs)
          ? job.needs
          : [job.needs]
        : [],
    ])
  );

  while (Object.keys(jobMap).length) {
    const currentPhase = Object.keys(jobMap).filter(
      (job) => jobMap[job].length === 0
    );

    phases.push(currentPhase);


    Object.keys(jobMap).forEach(
      (job) => (jobMap[job] = jobMap[job].filter((dep) => jobMap[dep as string]))
    );
        // Remove processed jobs & update dependencies
    currentPhase.forEach((job) => delete jobMap[job]);
  }
  
  return phases;
};

export const transformPhaseToNode = (phases: ReturnType<typeof transformJobToPhase>, jobs: Record<string, GitHubJob> ) => {
  // Generate positions dynamically
  const nodes: { id: string; data: { label: string }, position: { x: number; y: number } }[] = [];
    phases.forEach((phase, phaseIndex) => {
      phase.forEach((job, jobIndex) => {
        nodes.push({
          id: job,
          data: { label: jobs[job]?.name || job },
          position: { x: phaseIndex * 200, y: jobIndex * 100 }, // Stacks parallel jobs vertically
        });
      });

    })
  return nodes;
};

// Helper to generate edges from jobs
export function transformJobsToEdges(jobs: Record<string, any>) {
  const edges: { id: string; source: string; target: string }[] = [];
  Object.entries(jobs).forEach(([jobId, job]) => {
    const needs = job.needs
      ? Array.isArray(job.needs)
        ? job.needs
        : [job.needs]
      : [];
    needs.forEach((dep: string) => {
      edges.push({
        id: `${dep}->${jobId}`,
        source: dep,
        target: jobId,
      });
    });
  });
  return edges;
}