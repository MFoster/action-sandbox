import type { Metadata } from "next";

import "@mantine/core/styles.css";

import {
  AppShell,
  AppShellHeader,
  AppShellNavbar,
  AppShellMain,
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Image,
  Flex,
  Title,
} from "@mantine/core";
import { SideNavController } from "@/component/sidenav/SideNavController";

export const metadata: Metadata = {
  title: "Action Sandbox: Workflow Visualizer",
  description: "Experiment with workflows and visualize them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: "sm",
            }}
            padding="md"
          >
            <AppShellHeader>
              <Flex>
                <Image
                  src="/logo2.png"
                  alt="Logo"
                  h={50}
                  w="auto"
                  style={{ marginRight: "1rem" }}
                />

                <Title order={1}>Workflow Visualizer</Title>
              </Flex>
            </AppShellHeader>

            <AppShellNavbar p="md" display={"flex"}>
              <SideNavController />
            </AppShellNavbar>

            <AppShellMain display={"flex"}>{children}</AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
