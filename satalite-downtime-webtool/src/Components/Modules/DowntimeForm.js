import React, { useState } from "react";
import {
  Button,
  TextField,
  Alert,
  Typography,
  IconButton,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { DateTimePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { Downtime } from "../../API/Model/Downtime";
import { useDowntimeContext } from "../../API/DowntimeContext";

// dayjs Setup
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
// TODO id counter for downtimes, test move to state at end
let id = 0;

export default function DowntimeForm() {
  // State
  const [name, setName] = useState("");
  const [site, setSite] = useState("");
  const [time_start, setTimeStart] = useState();
  const [time_end, setTimeEnd] = useState();
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);
  // Context
  const { postDowntime } = useDowntimeContext();
  const { getDowntime } = useDowntimeContext();
  // Validation booleans
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [isSiteInvalid, setIsSiteInvalid] = useState(false);
  const [isReasonInvalid, setIsReasonInvalid] = useState(false);
  const [isReasonOverCharLimit, setisReasonOverCharLimit] = useState(false);

  // Validates inputs to the form
  function validateErrors() {
    let errors = false;
    if (name.length < 1) {
      setIsNameInvalid(true);
      errors = true;
    } else {
      setIsNameInvalid(false);
    }
    if (site.length < 1) {
      setIsSiteInvalid(true);
      errors = true;
    } else {
      setIsSiteInvalid(false);
    }
    if (reason.length < 1) {
      setIsReasonInvalid(true);
      errors = true;
    } else {
      setIsReasonInvalid(false);
    }
    if (reason.length > 255) {
      setisReasonOverCharLimit(true);
      errors = true;
    } else {
      setisReasonOverCharLimit(false);
    }
    return errors;
  }

  // Creates a new Downtime
  function createDowntime() {
    if (!validateErrors()) {
      // remove the alert if the user didn't close previously
      setError(false);
      const newDowntime = new Downtime(
        id,
        time_start,
        time_end,
        name,
        site,
        reason
      );
      if (!postDowntime(newDowntime)) {
        console.log("alert! cannot add obj since it overlaps");
        setError(true);
      } else {
        id++;
        console.log(getDowntime());
      }
    }
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Add New Downtime
      </Typography>
      <TextField
        error={isNameInvalid}
        helperText={isNameInvalid && "required"}
        sx={{ m: 1 }}
        id="telescope-name"
        label="Telescope Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value.toLowerCase())}
      ></TextField>
      <TextField
        error={isSiteInvalid}
        helperText={isSiteInvalid && "required"}
        sx={{ m: 1 }}
        id="site"
        label="Site"
        variant="outlined"
        onChange={(e) => setSite(e.target.value.toLowerCase())}
      ></TextField>
      <DateTimePicker
        maxDate={dayjs.utc(time_end)}
        sx={{ m: 1 }}
        label="Start Time"
        onChange={(newValue) =>
          setTimeStart(dayjs(newValue).utc(true).format())
        }
      />
      <DateTimePicker
        minDate={dayjs.utc(time_start)}
        sx={{ m: 1 }}
        label="End Time"
        onChange={(newValue) => setTimeEnd(dayjs(newValue).utc(true).format())}
      />
      <TextField
        error={isReasonInvalid || isReasonOverCharLimit}
        helperText={
          (isReasonInvalid && "required") ||
          (isReasonOverCharLimit && "over 255 chars")
        }
        sx={{ m: 1 }}
        fullWidth
        multiline
        rows={5}
        label="Reason"
        placeholder="255 Characters"
        onChange={(e) => setReason(e.target.value)}
      ></TextField>
      <Button
        sx={{ m: 2 }}
        onClick={createDowntime}
        variant="contained"
        endIcon={<AddCircleRoundedIcon />}
      >
        Create
      </Button>
      {error && (
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Did not create: Telescope has overlapping downtime!
        </Alert>
      )}
    </div>
  );
}
