import { getList } from "@/data/action/getList";
import { ScrollArea } from "@mantine/core";
import { SideNavLoading } from "@/component/sidenav/SideNavLoading";
import { SideNavDisplay } from "@/component/sidenav/SideNavDisplay";
import { Suspense } from "react";

export const SideNavController = () => {
  const items = getList();

  return (
    <Suspense fallback={<SideNavLoading />}>
      <ScrollArea style={{ height: "100%" }}>
        <SideNavDisplay items={items} />
      </ScrollArea>
    </Suspense>
  );
};
