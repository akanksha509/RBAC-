import { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  DialogActions,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Alert,
  Snackbar,
  DialogContentText,
  Autocomplete,
  Chip,
  Stack,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  useRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,

} from "../../api/roles";
import {useResources} from "../../api/resources"
import CustomDataGridToolbar from "../CustomDataGridToolBar/CustomDataGridToolBar";

const RoleManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [currentRole, setCurrentRole] = useState({
    role_name: "",
    role_description: "",
    resources: [],
  });
  const [selectedResources, setSelectedResources] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isEditing, setIsEditing] = useState(false);

  const { data: roles, isLoading: rolesLoading } = useRoles();
  const { data: resources, isLoading: resourcesLoading } = useResources();
  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();

  useEffect(() => {
    if (isEditing && currentRole) {
      setSelectedResources(
        resources?.filter((resource) =>
          currentRole.resources.some(
            (r) => r.resource_id === resource.resource_id
          )
        ) || []
      );
    }
  }, [isEditing, currentRole, resources]);

  const columns = [
    { field: "role_name", headerName: "Role Name", width: 200 },
    { field: "role_description", headerName: "Description", width: 300 },
    {
      field: "resources",
      headerName: "Resources & Permissions",
      width: 400,
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
          {params.value.map((r) => {
            const resource = resources?.find(
              (res) => res.resource_id === r.resource_id
            );
            return resource ? (
              <Chip
                key={r.resource_id}
                label={`${resource.resource_name}`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ m: "0 !important" }}
              />
            ) : null;
          })}
        </Stack>
      ),
    },
    {
      field: "actions",
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

  const handleEdit = (role) => {
    setCurrentRole(role);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRoleMutation.mutateAsync(roleToDelete.role_id);
      setSnackbar({
        open: true,
        message: `Role "${roleToDelete.role_name}" has been deleted`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to delete role: ${error.message}`,
        severity: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleResourceSelection = (newValue) => {
    setSelectedResources(newValue);
    setCurrentRole((prev) => ({
      ...prev,
      resources: newValue.map((resource) => ({
        resource_id: resource.resource_id,
        allowed_actions: [],
      })),
    }));
  };

  const handleActionToggle = (resourceId, action) => {
    setCurrentRole((prev) => ({
      ...prev,
      resources: prev.resources.map((resource) => {
        if (resource.resource_id === resourceId) {
          const allowed_actions = resource.allowed_actions.includes(action)
            ? resource.allowed_actions.filter((a) => a !== action)
            : [...resource.allowed_actions, action];
          return { ...resource, allowed_actions };
        }
        return resource;
      }),
    }));
  };

  const handleSubmit = async () => {
    try {
      const roleData = {
        ...currentRole,
        resources: currentRole.resources.filter(
          (r) => r.allowed_actions.length > 0
        ),
      };

      if (isEditing) {
        await updateRoleMutation.mutateAsync(roleData);
      } else {
        await createRoleMutation.mutateAsync({
          ...roleData,
          role_id: Math.random().toString(36).substr(2, 9),
        });
      }

      setSnackbar({
        open: true,
        message: `Role successfully ${isEditing ? "updated" : "created"}`,
        severity: "success",
      });
      handleCloseModal();
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to ${isEditing ? "update" : "create"} role: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentRole({
      role_name: "",
      role_description: "",
      resources: [],
    });
    setSelectedResources([]);
    setIsEditing(false);
  };

  const isSubmitDisabled =
    !currentRole.role_name ||
    !currentRole.role_description ||
    currentRole.resources.length === 0;

  if (rolesLoading || resourcesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Create Role
        </Button>
      </Box>

      <DataGrid
        rows={roles || []}
        slots={{
          toolbar: CustomDataGridToolbar,
        }}
        slotProps={{ toolbar: { page: "role" } }}
        columns={columns}
        getRowId={(row) => row.role_id}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        sx={{
          p: 2,
        }}
        rowHeight={60}
      />

      {/* Create/Edit Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{isEditing ? "Edit Role" : "Create Role"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Role Name"
              fullWidth
              value={currentRole.role_name}
              onChange={(e) =>
                setCurrentRole((prev) => ({
                  ...prev,
                  role_name: e.target.value,
                }))
              }
            />
            <TextField
              label="Role Description"
              fullWidth
              multiline
              rows={3}
              value={currentRole.role_description}
              onChange={(e) =>
                setCurrentRole((prev) => ({
                  ...prev,
                  role_description: e.target.value,
                }))
              }
            />

            <Autocomplete
              multiple
              options={resources || []}
              getOptionLabel={(option) => option.resource_name}
              value={selectedResources}
              onChange={(_, newValue) => handleResourceSelection(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Resources"
                  placeholder="Choose resources"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.resource_name}
                    {...getTagProps({ index })}
                    key={option.resource_id}
                  />
                ))
              }
            />

            {selectedResources.length > 0 && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                Resource Permissions
              </Typography>
            )}

            {selectedResources.map((resource) => (
              <Paper key={resource.resource_id} sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                  {resource.resource_name}
                </Typography>
                <FormGroup row>
                  {resource.actions.map((action) => {
                    const resourceConfig = currentRole.resources.find(
                      (r) => r.resource_id === resource.resource_id
                    );
                    return (
                      <FormControlLabel
                        key={action}
                        control={
                          <Checkbox
                            checked={
                              resourceConfig?.allowed_actions.includes(
                                action
                              ) || false
                            }
                            onChange={() =>
                              handleActionToggle(resource.resource_id, action)
                            }
                          />
                        }
                        label={action}
                      />
                    );
                  })}
                </FormGroup>
              </Paper>
            ))}
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
            Are you sure you want to delete the role {roleToDelete?.role_name}?
            This action cannot be undone.
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
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RoleManagement;
