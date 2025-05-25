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
import { Box, LoadingOverlay } from "@mantine/core";

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
    <Box key="whocares" style={{ position: "relative", flexGrow: 1 }}>
      <ReactFlow nodes={nodes} edges={edges} minZoom={0.3} fitView>
        <Background />
      </ReactFlow>
    </Box>
  );
};

export const WorkflowDisplayLoading = () => {
  return (
    <Box style={{ position: "relative", flexGrow: 1 }}>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
};
