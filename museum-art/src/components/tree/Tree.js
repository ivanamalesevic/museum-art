import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SearchIcon } from "@material-ui/icons";

const Tree = () => {
  const [collection, setCollection] = useState({});
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchName, setSearchName] = useState("");

  const useStyles = makeStyles((theme) => ({
    searchField: {
      width: "80%",
      maxHeight: "30px",
    },
    radios: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  const getCollection = () => {
    let col = JSON.parse(localStorage.getItem("collection"));

    if (col === null) {
      axios
        .get("/getCollection")
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("collection", JSON.stringify(response.data));
            setCollection(response.data);
          }
        })
        .catch((err) => console.error("Unable to get collection!"));
    } else {
      setCollection(col);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <Grid item xs={6}>
      <FormControl component="fieldset" className={classes.radios}>
        <RadioGroup
          row
          aria-label="type"
          name="type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel
            value="painting"
            control={<Radio />}
            label="Painting"
          />
          <FormControlLabel
            value="potteries"
            control={<Radio />}
            label="Potteries"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        className={classes.searchField}
        id="outlined-search"
        type="search"
        variant="outlined"
        value={searchName}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default Tree;
