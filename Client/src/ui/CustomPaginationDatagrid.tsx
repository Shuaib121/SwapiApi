import Pagination from "@mui/material/Pagination";
import SearchBar from "./SearchBar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageQuery from "../queries/PageQuery";
import SearchQuery from "../queries/SearchQuery";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { usePeopleContext } from "../context/Context";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomPagination() {
  const classes = useStyles();
  const { page, setPage, setName } = usePeopleContext();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      variant="outlined"
      shape="rounded"
      count={9}
      page={parseInt(page)}
      onChange={(event, value) => {
        setName("");
        setPage(value.toString());
      }}
    />
  );
}

export default function CustomPaginationGrid() {
  const { page, name, setName } = usePeopleContext();
  const [currentPersonDetails, setCurrentPersonDetails] = useState({
    name: "",
    height: "",
    mass: "",
    gender: "",
    homeworld: "",
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  let rowData: any[] = [];
  let loading: boolean = false;

  const handleSearch = (name: string) => {
    setName(name);
  };

  const handleRowClick = (param: any, event: any) => {
    setCurrentPersonDetails({
      name: param.row.col1,
      height: param.row.col2,
      mass: param.row.col3,
      gender: param.row.col4,
      homeworld: param.row.col5,
    });
    setOpen(true);
  };

  if (name != "") {
    rowData = SearchQuery(name);
  } else {
    rowData = PageQuery(page);
  }

  if (Array.isArray(rowData) && rowData.length) {
    loading = false;
  } else {
    loading = true;
  }

  const rows: GridRowsProp = rowData;
  const columns: GridColDef[] = [
    { field: "col1", headerName: "Name", flex: 1 },
    { field: "col2", headerName: "Height", flex: 1 },
    { field: "col3", headerName: "Mass", flex: 1 },
    { field: "col4", headerName: "Gender", flex: 1 },
    { field: "col5", headerName: "Homeworld", flex: 1 },
  ];

  return (
    <>
      <SearchBar onNameSearch={handleSearch} />
      <div style={{ height: 400, width: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              pageSize={10}
              loading={loading}
              rowsPerPageOptions={[10]}
              onRowClick={handleRowClick}
              components={{
                Pagination: CustomPagination,
              }}
            />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4">
            Person Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Name: {currentPersonDetails.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Height: {currentPersonDetails.height}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Mass: {currentPersonDetails.mass}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Gender: {currentPersonDetails.gender}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Homeworld: {currentPersonDetails.homeworld}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
