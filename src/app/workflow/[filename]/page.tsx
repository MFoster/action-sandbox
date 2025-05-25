import { WorkflowDisplayController } from "@/component/WorkflowDisplay";

// Accept params as a prop in the server component
export default async function Page({
  params,
}: {
  params: Promise<{ filename: string }>;
}) {
  const { filename } = await params;
  return <WorkflowDisplayController filename={filename} />;
}
