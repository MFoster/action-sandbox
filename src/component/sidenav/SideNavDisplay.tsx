"use client";
import { usePathname } from "next/navigation";
import { WorkflowItem } from "@/data/type/WorkflowItem";
import { ActionIcon, Tooltip, NavLink } from "@mantine/core";

import Link from "next/link";
import { use } from "react";

export const SideNavDisplay = ({
  items,
}: {
  items: Promise<WorkflowItem[]>;
}) => {
  const list = use(items);
  const path = usePathname();
  return list.map((item) => {
    const href = `/workflow/${item.name}`;
    const isActive = path === href;
    return (
      <NavLink
        component={Link}
        href={`/workflow/${item.name}`}
        key={item.name}
        active={isActive}
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
