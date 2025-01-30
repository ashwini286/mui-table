import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Autocomplete, TextField, Drawer } from "@mui/material";
import dayjs from "dayjs";
import { useStyles } from "./style.js";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";


const roles = ["Developer", "Designer", "Manager", "Tester"];
const DataGridDemo = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    localStorage.setItem("Pdf1", "/pdf1.pdf");
    localStorage.setItem("pdf_2", "/pdf_2.pdf");

  }, []);

  const handleOpenPdf = (pdfKey) => {
    if (!pdfKey) {
      alert("Invalid PDF reference!");
      return;
    }
    const pdfUrl = localStorage.getItem(pdfKey);
    if (pdfUrl) {
      const newWindow = window.open(pdfUrl, "_blank");
      if (!newWindow || newWindow.closed) {
        alert("Pop-up blocked! Please allow pop-ups for this site.");
      }
    } else {
      alert("PDF not found!");
    }
  };
  const handleCellClick = (params) => {
    if (params.field === "id") {
      setSelectedRowData(params.row);
      setOpenDrawer(true);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      display: "flex",
      align: "center",
      headerAlign: "center",

      renderHeader: () => (loading ? <Skeleton width={90} /> : "ID"),
      renderCell: (params) =>
        loading ? (
          <Skeleton width={50} />
        ) : (
          <Typography sx={{ cursor: "pointer", fontSize: "14px" }}>
            {params.value}
          </Typography>
        ),
    },

    {
      field: "dateandtime",
      headerName: "Date and Time",
      width: 250,
      editable: true,
      align: "center",
      headerAlign: "center",
      renderHeader: () =>
        loading ? <Skeleton width={150} variant="text" /> : "Date and Time",
      renderCell: (params) =>
        loading ? (
          <Skeleton variant="rectangular" width={180}>
            <Avatar />
          </Skeleton>
        ) : (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dayjs(params.value)}
              onChange={(newValue) =>
                params.api.setEditCellValue({
                  id: params.id,
                  field: "dateandtime",
                  value: newValue.format("YYYY-MM-DD HH:mm:ss"),
                })
              }
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "12px",
                },
                "& .inputField": {
                  fontSize: "12px",
                },
              }}
            />
          </LocalizationProvider>
        ),
    },
    {
      field: "select",
      headerName: "Select Role",
      width: 150,
      editable: true,
      display: "flex",
      align: "center",
      headerAlign: "center",
      renderHeader: () =>
        loading ? <Skeleton width={150} variant="text" /> : "Select Role",
      renderCell: (params) =>
        loading ? (
          <Skeleton variant="rectangular" width={180}>
            <Avatar />
          </Skeleton>
        ) : (
          <Autocomplete
            options={roles}
            defaultValue={params.value}
            size="small"
            sx={{
              width: 300,
              "& .MuiInputBase-input": {
                fontSize: "12px", // Adjust input text size
              },
              "& .MuiAutocomplete-popupIndicator": {
                fontSize: "12px", // Adjust the popup indicator size
              },
            }}
            onChange={(event, newValue) =>
              params.api.setEditCellValue({
                id: params.id,
                field: "select",
                value: newValue,
              })
            }
            renderInput={(props) => <TextField {...props} slotProps={{}} />}
          />
        ),
    },
    {
      field: "textfield",
      headerName: "Text Field",
      width: 150,
      editable: true,
      display: "flex",
      align: "center",
      headerAlign: "center",
      renderHeader: () =>
        loading ? <Skeleton width={150} variant="text" /> : "Text Field",
      renderCell: (params) =>
        loading ? (
          <Skeleton variant="rectangular" width={180}>
            <Avatar />
          </Skeleton>
        ) : (
          <TextField
            size="small"
            defaultValue={params.value}
            onChange={(event) =>
              params.api.setEditCellValue({
                id: params.id,
                field: "textfield",
                value: event.target.value,
              })
            }
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "12px",
              },
              "& .inputField": {
                fontSize: "12px",
              },
            }}
          />
        ),
    },

    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      display: "flex",
      align: "center",
      headerAlign: "center",

      renderHeader: () =>
        loading ? <Skeleton width={150} variant="text" /> : "Avatar",

      renderCell: (params) =>
        loading ? (
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        ) : (
          <div className={classes.avatarWrapper}>
            <Avatar
              alt="Profile"
              src={params.value}
              size="small"
              sx={{ width: 30, height: 30 }}
            />
          </div>
        ),
    },
    {
      field: "badge",
      headerName: "Badge",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderHeader: () =>
        loading ? <Skeleton width={150} variant="text" /> : "Badge",

      renderCell: (params) =>
        loading ? (
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        ) : (
          <div className={classes.badgeWrapper}>
            <Badge color="secondary" badgeContent={params.value}>
              <MailIcon />
            </Badge>
          </div>
        ),
    },
    {
      field: "chip",
      headerName: "Chip",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderHeader: () =>
        loading ? <Skeleton width={150} variant="text" /> : "Chip",

      renderCell: (params) =>
        loading ? (
          <Skeleton variant="rounded" width={100}>
            <Avatar />
          </Skeleton>
        ) : (
          <Chip
            label={params.value}
            size="small"
            sx={{ width: 100 }}
            color={
              params.value === "Active"
                ? "success"
                : params.value === "Pending"
                  ? "warning"
                  : "default"
            }
            variant="outlined"
          />
        ),
    },
    {
      field: "progressbar",
      headerName: "Progress Bar",
      width: 150,
      headerAlign: "center",
      renderHeader: () =>
        loading ? <Skeleton width={150} variant="text" /> : "Progress Bar",

      renderCell: (params) =>
        loading ? (
          <Skeleton variant="text" width={180}>
            <Avatar />
          </Skeleton>
        ) : (
          <div className={classes.progressWrapper}>
            <LinearProgress
              variant="determinate"
              value={params.value}
              sx={{ width: "100%", height: 8, borderRadius: 4 }}
            />
          </div>
        ),
    },
    {
      field: "pdf",
      headerName: "PDF",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        loading ? (
          <Skeleton variant="rounded" width={200}>
            <Avatar />
          </Skeleton>
        ) :
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpenPdf(params.value)}
          >
            Open PDF
          </Button>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      dateandtime: dayjs().subtract(1, "day"), // Yesterday
      select: "Developer",
      autocomplete: "Developer",
      textfield: "Alice Johnson",
      avatar: "/static/images/avatar/1.jpg",
      badge: 1,
      chip: "Active",
      progressbar: 80,
      pdf: "Pdf1"
    },
    {
      id: 2,
      dateandtime: dayjs(), // Today
      select: "Designer",
      autocomplete: "Designer",
      textfield: "Bob Smith",
      avatar: "/static/images/avatar/2.jpg",
      badge: 3,
      chip: "Pending",
      progressbar: 50,
      pdf: "pdf_2"
    },
    {
      id: 3,
      dateandtime: dayjs().add(2, "day"), // Two days from now
      select: "Manager",
      autocomplete: "Manager",
      textfield: "Catherine Doe",
      avatar: "/static/images/avatar/3.jpg",
      badge: 5,
      chip: "Completed",
      progressbar: 100,
    },
    {
      id: 4,
      dateandtime: dayjs().subtract(3, "day"), // Three days ago
      select: "Tester",
      autocomplete: "Tester",
      textfield: "David Lee",
      avatar: "/static/images/avatar/4.jpg",
      badge: 2,
      chip: "Pending",
      progressbar: 30,
    },
    {
      id: 5,
      dateandtime: dayjs().subtract(5, "day"), // Five days ago
      select: "Developer",
      autocomplete: "Developer",
      textfield: "Ella Brown",
      avatar: "/static/images/avatar/5.jpg",
      badge: 4,
      chip: "Active",
      progressbar: 90,
    },
    {
      id: 6,
      dateandtime: dayjs().add(1, "week"), // One week from now
      select: "Designer",
      autocomplete: "Designer",
      textfield: "Frank Green",
      avatar: "/static/images/avatar/6.jpg",
      badge: 6,
      chip: "Completed",
      progressbar: 100,
    },
    {
      id: 7,
      dateandtime: dayjs().add(3, "day"), // Three days from now
      select: "Tester",
      autocomplete: "Tester",
      textfield: "Grace White",
      avatar: "/static/images/avatar/7.jpg",
      badge: 7,
      chip: "Active",
      progressbar: 60,
    },
    {
      id: 8,
      dateandtime: dayjs().subtract(2, "week"), // Two weeks ago
      select: "Manager",
      autocomplete: "Manager",
      textfield: "Harry Black",
      avatar: "/static/images/avatar/8.jpg",
      badge: 8,
      chip: "Pending",
      progressbar: 40,
    },
    {
      id: 9,
      dateandtime: dayjs(), // Today
      select: "Developer",
      autocomplete: "Developer",
      textfield: "Isla Yellow",
      avatar: "/static/images/avatar/9.jpg",
      badge: 9,
      chip: "Active",
      progressbar: 70,
    },
    {
      id: 10,
      dateandtime: dayjs().add(1, "month"),
      select: "Designer",
      autocomplete: "Designer",
      textfield: "Jack Blue",
      avatar: "/static/images/avatar/10.jpg",
      badge: 10,
      chip: "Completed",
      progressbar: 100,
    },
  ];
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        onCellClick={handleCellClick}
        processRowUpdate={(newRow) => {
          console.log("Updated Row:", newRow);
          return newRow;
        }}
      />

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          width: 550,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 550,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "start",
            padding: 2,
          }}
        >
          <IconButton onClick={() => setOpenDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ padding: 2 }}>
          {selectedRowData ? (
            <div>
              <Avatar alt="Profile" src={selectedRowData.avatar} />
              <h3>Details for {selectedRowData.textfield}</h3>
              <p>ID: {selectedRowData.id}</p>
              <p>Role: {selectedRowData.select}</p>
              <p>
                Date and Time:{" "}
                {dayjs(selectedRowData.dateandtime).format("YYYY-MM-DD HH:mm")}
              </p>
              <p>Progress: {selectedRowData.progressbar}%</p>
              <p>Badge: {selectedRowData.badge}</p>
              <p>Chip: {selectedRowData.chip}</p>
            </div>
          ) : (
            <Skeleton variant="text" width="100%" height={200} />
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default DataGridDemo;
