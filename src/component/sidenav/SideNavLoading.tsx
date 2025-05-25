import { LoadingOverlay, Box } from "@mantine/core";

export const SideNavLoading = () => {
  return (
    <Box pos="relative" style={{ flexGrow: 1 }}>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        loaderProps={{ color: "red", type: "bars" }}
        overlayProps={{ radius: "lg", blur: 25 }}
      />
    </Box>
  );
};
