import React, { useState } from "react";
import { useDowntimeContext } from "../../API/DowntimeContext";
import {
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Typography,
  Paper,
  Table,
  TableBody,
  IconButton,
  Collapse,
  Box,
  Button,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

// Generates a row of a table with its buttons for a downtime
function Row(props) {
  const { deleteDowntime, putReason } = useDowntimeContext();
  const { dt } = props;
  const [collapse, setCollapse] = useState(false);
  const [edit, setEdit] = useState(false);
  const [reason, setReason] = useState("");
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dt.telescope_id}
        </TableCell>
        <TableCell align="right">{dt.telescope_site}</TableCell>
        <TableCell align="right">{dt.time_start}</TableCell>
        <TableCell align="right">{dt.time_end}</TableCell>
        <TableCell align="right">{dt.downtime_id}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => deleteDowntime(dt.downtime_id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <Box>
              <Typography
                sx={{ m: 1 }}
                variant="h6"
                gutterBottom
                component="div"
              >
                Reason
              </Typography>
              {!edit && (
                <Typography sx={{ m: 1 }} variant="body1" gutterBottom>
                  {dt.reason}
                </Typography>
              )}
              {edit && (
                <TextField
                  sx={{ m: 1 }}
                  fullWidth
                  multiline
                  rows={5}
                  defaultValue={dt.reason}
                  onChange={(e) => setReason(e.target.value)}
                ></TextField>
              )}
              {edit ? (
                <Button
                  sx={{ m: 1 }}
                  onClick={() => {
                    putReason(reason, dt.downtime_id);
                    setEdit(!edit);
                  }}
                  variant="contained"
                  endIcon={<SaveAltIcon />}
                >
                  Save
                </Button>
              ) : (
                <Button
                  sx={{ m: 1 }}
                  onClick={() => setEdit(!edit)}
                  variant="contained"
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function DowntimeTable() {
  // Context
  const { getDowntime } = useDowntimeContext();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Telescope Downtimes
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Telescope</TableCell>
              <TableCell align="right">Site</TableCell>
              <TableCell align="right">Start</TableCell>
              <TableCell align="right">End</TableCell>
              <TableCell align="right">Downtime ID</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {getDowntime().map((downtime) => (
              <Row key={downtime.downtime_id} dt={downtime}></Row>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
