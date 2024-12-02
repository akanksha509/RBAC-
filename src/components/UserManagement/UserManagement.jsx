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
  Alert,
  Snackbar,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Chip,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  } 
from "../../api/users";
import {useRoles} from "../../api/roles"
import CustomDataGridToolbar from "../CustomDataGridToolBar/CustomDataGridToolBar";

const UserManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    status: "active",
    role_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: roles = [], isLoading: rolesLoading } = useRoles();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const userStatuses = ["Active", "Inactive", "Invited", "Deleted"];

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Avatar
            src={params.value || "/api/placeholder/40/40"}
            alt={params.row.name}
          />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: userStatuses,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Active"
              ? "success"
              : params.value === "Inactive"
                ? "warning"
                : params.value === "Invited"
                  ? "info"
                  : "error"
          }
        />
      ),
    },
    {
      field: "role_id",
      headerName: "Role",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: roles.map((role) => ({
        value: role.role_id,
        label: role.role_name,
      })),
      valueFormatter: (params) => {
        const role = roles.find((r) => r.role_id === params.value);
        return role ? role.role_name : "No Role";
      },
      renderCell: (params) => {
        const role = roles.find((r) => r.role_id === params.value);
        return (
          <Chip
            label={role ? role.role_name : "No Role"}
            variant="outlined"
            color={role ? "primary" : "default"}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 100,
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

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentUser({
      name: "",
      avatar: "",
      status: "active",
      role_id: "",
    });
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await updateUserMutation.mutateAsync(currentUser);
      } else {
        await createUserMutation.mutateAsync({
          ...currentUser,
          user_id: `user_${Date.now()}`,
        });
      }

      setSnackbar({
        open: true,
        message: `User successfully ${isEditing ? "updated" : "created"}`,
        severity: "success",
      });
      handleCloseModal();
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to ${isEditing ? "update" : "create"} user: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserMutation.mutateAsync(userToDelete.user_id);
      setSnackbar({
        open: true,
        message: `User "${userToDelete.name}" has been deleted`,
        severity: "success",
      });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to delete user: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleCellEditCommit = async (params) => {
    try {
      const user = users.find((u) => u.user_id === params.id);
      const updatedUser = { ...user, [params.field]: params.value };
      await updateUserMutation.mutateAsync(updatedUser);

      setSnackbar({
        open: true,
        message: "User status updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to update user status: ${error.message}`,
        severity: "error",
      });
    }
  };

  const isSubmitDisabled = !currentUser.name || !currentUser.role_id;

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Create User
        </Button>
      </Box>

      <DataGrid
        checkboxSelection
        rows={users}
        columns={columns}
        slots={{
          toolbar: CustomDataGridToolbar,
        }}
        slotProps={{ toolbar: { page: "user" } }}
        getRowId={(row) => row.user_id}
        loading={usersLoading || rolesLoading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        onCellEditCommit={handleCellEditCommit}
        sx={{
          p: 2,
        }}
        rowHeight={60}
      />

      {/* Create/Edit Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{isEditing ? "Edit User" : "Create User"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              fullWidth
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser({
                  ...currentUser,
                  name: e.target.value,
                })
              }
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={currentUser.status}
                label="Status"
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    status: e.target.value,
                  })
                }
              >
                {userStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={currentUser.role_id}
                label="Role"
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    role_id: e.target.value,
                  })
                }
              >
                {roles?.map((role) => (
                  <MenuItem key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            Are you sure you want to delete the user {userToDelete?.name}? This
            action cannot be undone.
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

export default UserManagement;
