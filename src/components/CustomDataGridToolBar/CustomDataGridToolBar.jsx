import { Box } from "@mui/material";
import { GridToolbarQuickFilter, GridToolbarExport } from "@mui/x-data-grid";

const CustomDataGridToolbar = ({ page }) => {
  return (
    <Box sx={{ display: "flex", gap: "1rem", mb: 2 }}>
      <GridToolbarQuickFilter sx={{ width: "100%" }} />
      {page === "user" ? <GridToolbarExport /> : ""}
    </Box>
  );
};

export default CustomDataGridToolbar;
