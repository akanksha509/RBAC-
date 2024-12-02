import { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  DialogActions,
  Chip,
  Stack,
  IconButton,
  Alert,
  Snackbar,
  DialogContentText,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import {
  useResources,
  useCreateResource,
  useUpdateResource,
  useDeleteResource,
} from "../../api/resources";
import CustomDataGridToolbar from "../CustomDataGridToolBar/CustomDataGridToolBar";

const ResourceManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [currentResource, setCurrentResource] = useState({
    resource_name: "",
    description: "",
    actions: [],
  });
  const [newAction, setNewAction] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: resources, isLoading } = useResources();
  const createResourceMutation = useCreateResource();
  const updateResourceMutation = useUpdateResource();
  const deleteResourceMutation = useDeleteResource();

  const columns = [
    { field: "resource_name", headerName: "Resource Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "actions",
      headerName: "Available Actions",
      width: 300,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
            width: "200px",
            flexWrap: "wrap",
            padding: "5px",
            gap: "5px",
          }}
        >
          {params.value.map((action) => (
            <Chip
              key={action}
              label={action}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ m: "0 !important" }}
            />
          ))}
        </Stack>
      ),
    },
    {
      field: "operations",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row)}
        />,
      ],
    },
  ];

  const handleEdit = (resource) => {
    setCurrentResource(resource);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDeleteClick = (resource) => {
    setResourceToDelete(resource);
    setDeleteDialogOpen(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentResource({
      resource_name: "",
      description: "",
      actions: [],
    });
    setNewAction("");
    setIsEditing(false);
  };

  const handleAddAction = () => {
    if (
      newAction.trim() &&
      !currentResource.actions.includes(newAction.trim().toLowerCase())
    ) {
      setCurrentResource((prev) => ({
        ...prev,
        actions: [...prev.actions, newAction.trim().toLowerCase()],
      }));
      setNewAction("");
    }
  };

  const handleRemoveAction = (actionToRemove) => {
    setCurrentResource((prev) => ({
      ...prev,
      actions: prev.actions.filter((action) => action !== actionToRemove),
    }));
  };

  const handleSubmit = async () => {
    try {
      const resourceData = {
        ...currentResource,
        actions: currentResource.actions.filter(Boolean),
      };

      if (isEditing) {
        await updateResourceMutation.mutateAsync(resourceData);
      } else {
        await createResourceMutation.mutateAsync({
          ...resourceData,
          resource_id: Math.random().toString(36).substr(2, 9),
        });
      }

      setSnackbar({
        open: true,
        message: `Resource successfully ${isEditing ? "updated" : "created"}`,
        severity: "success",
      });
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: `Failed to ${isEditing ? "update" : "create"} resource: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteResourceMutation.mutateAsync(resourceToDelete.resource_id);
      setSnackbar({
        open: true,
        message: `Resource "${resourceToDelete.resource_name}" has been deleted`,
        severity: "success",
      });
      setDeleteDialogOpen(false);
      setResourceToDelete(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to delete resource: ${error.message}`,
        severity: "error",
      });
    }
  };

  const isSubmitDisabled =
    !currentResource.resource_name ||
    !currentResource.description ||
    currentResource.actions.length === 0;

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Create Resource
        </Button>
      </Box>

      <DataGrid
        rows={resources || []}
        slots={{
          toolbar: CustomDataGridToolbar,
        }}
        slotProps={{ toolbar: { page: "permission" } }}
        columns={columns}
        getRowId={(row) => row.resource_id}
        loading={isLoading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        sx={{
          p: 2,
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
        }}
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 200}
      />

      {/* Create/Edit Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? "Edit Resource" : "Create Resource"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Resource Name"
              fullWidth
              value={currentResource.resource_name}
              onChange={(e) =>
                setCurrentResource({
                  ...currentResource,
                  resource_name: e.target.value,
                })
              }
              placeholder="Enter resource name"
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={currentResource.description}
              onChange={(e) =>
                setCurrentResource({
                  ...currentResource,
                  description: e.target.value,
                })
              }
              placeholder="Enter resource description"
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Actions
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  label="Add Action"
                  size="small"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddAction();
                    }
                  }}
                  placeholder="e.g., create, read, update, delete"
                  fullWidth
                />
                <IconButton
                  onClick={handleAddAction}
                  disabled={!newAction.trim()}
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {currentResource.actions.map((action) => (
                  <Chip
                    key={action}
                    label={action}
                    onDelete={() => handleRemoveAction(action)}
                    color="primary"
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the resource
            {resourceToDelete?.resource_name}? This action cannot be undone and
            will also remove this resource from any roles that use it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResourceManagement;
