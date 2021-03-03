import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { TreeItem, TreeView } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import { SearchIcon } from "@material-ui/icons";

const Tree = () => {
  const [collection, setCollection] = useState({});
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchName, setSearchName] = useState("");
  const [loadingData, setLoadingData] = useState(true);

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
            setLoadingData(false);
          }
        })
        .catch((err) => console.error("Unable to get collection!"));
    } else {
      setCollection(col);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  if (loadingData) {
    return (
      <Dialog open={loadingData}>
        <DialogContent>Loading data...</DialogContent>
      </Dialog>
    );
  }

  const displayData = () => {
    return collection.collection.map((col) => {
      return (
        <TreeItem key={col.id} nodeId={col.id} label={col.name}>
          {col.collection.map((item) => {
            return (typeFilter === "all" || typeFilter === item.type) && (searchName === "" || item.name.toLowerCase().includes(searchName.toLowerCase())) ? (
              <TreeItem
                key={item.id}
                nodeId={item.id}
                label={item.name}
              ></TreeItem>
            ) : (
              <></>
            );
          })}
        </TreeItem>
      );
    });
  };

  return (
    <Grid item xs={6}>
      <div>
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
              value="potery"
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
          onChange={(e) => {setSearchName(e.target.value)}}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="end">
          //       <SearchIcon />
          //     </InputAdornment>
          //   ),
          // }}
        />
      </div>
      <br />
      <br />
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId={collection.id} label={collection.name}>
          {displayData()}
        </TreeItem>
      </TreeView>
    </Grid>
  );
};

export default Tree;
