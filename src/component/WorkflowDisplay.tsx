import { getWorkflow } from "@/data/action/getWorkflow";
import { GitHubWorkflow } from "@/data/type/GithubWorkflow";
import {
  transformJobsToEdges,
  transformJobToPhase,
  transformPhaseToNode,
} from "@/data/util/transform";
import { Suspense } from "react";
import { ReactFlow, Background } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

export const WorkflowDisplayController = ({
  filename,
}: {
  filename: string;
}) => {
  const data = getWorkflow(filename);

  return (
    <Suspense fallback={<WorkflowDisplayLoading />}>
      <WorkflowDisplay workflow={data} />
    </Suspense>
  );
};

export const WorkflowDisplay = async ({
  workflow,
}: {
  workflow: Promise<GitHubWorkflow<unknown>>;
}) => {
  const data = await workflow;
  const phases = transformJobToPhase(data.jobs);
  const nodes = transformPhaseToNode(phases, data.jobs);
  const edges = transformJobsToEdges(data.jobs);
  console.log("Nodes: %o and edges %o", nodes, edges);
  return (
    <div
      key="whocares"
      style={{ position: "absolute", top: 5, left: 5, right: 5, bottom: 5 }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
};

export const WorkflowDisplayLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  );
};
