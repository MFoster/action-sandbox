import { getList } from "@/data/action/getList";
import { WorkflowItem } from "@/data/type/WorkflowItem";
import { ScrollArea, ActionIcon, Tooltip, NavLink } from "@mantine/core";

import Link from "next/link";
import { Suspense } from "react";

export const SideNavController = () => {
  const items = getList();

  return (
    <ScrollArea style={{ height: "100%" }}>
      <Suspense fallback={<SideNavLoading />}>
        <SideNav items={items} />
      </Suspense>
    </ScrollArea>
  );
};

export const SideNav = async ({
  items,
}: {
  items: Promise<WorkflowItem[]>;
}) => {
  const list = await items;
  return list.map((item) => {
    return (
      <NavLink
        component={Link}
        href={`/workflow/${item.name}`}
        key={item.name}
        label={item.title}
        rightSection={
          <Tooltip label="View Workflow" position="right">
            <ActionIcon variant="subtle" size={24} color="blue" radius="xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-right"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </ActionIcon>
          </Tooltip>
        }
      />
    );
  });
};

export const SideNavLoading = () => {
  return (
    <div className="loading">
      <h2>Loading...</h2>
    </div>
  );
};
