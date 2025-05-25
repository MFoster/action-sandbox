import { WorkflowDisplayController } from "@/component/WorkflowDisplay";

// Accept params as a prop in the server component
export default function Page({ params }: { params: { filename: string } }) {
  const filename = params.filename;
  return <WorkflowDisplayController filename={filename} />;
}
