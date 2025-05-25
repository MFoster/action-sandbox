import { WorkflowItem } from '@/data/type/WorkflowItem';

export async function getList(): Promise<WorkflowItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/list`, {
    cache: 'no-store', // optional: disables caching for fresh data
  });
  if (!res.ok) {
    throw new Error('Failed to fetch workflow items');
  }
  return res.json();
}