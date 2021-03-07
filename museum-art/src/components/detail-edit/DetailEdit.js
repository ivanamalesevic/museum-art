import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import { Grid, TextField, Button } from "@material-ui/core";

const DetailEdit = (props) => {
  const [title, setTitle] = useState(props.item.name);
  const [url, setUrl] = useState(props.item.url);
  const [description, setDescription] = useState(props.item.description);

  const useStyles = makeStyles((theme) => ({
    editDiv: {
      borderRight: "1px lightgray solid",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      width: "90%",
    },
    inputMulti: {
      width: "90%",
    },
    button: {
      margin: "20px",
      marginLeft: '5%'
    },
    label:{
      alignSelf: 'flex-start',
      marginLeft: '5%'
    }
  }));

  const classes = useStyles();

  const validateForm = () => {
    if (title === "" || url === "" || description === "") {
      alert("All fields must have a value!");
      return false;
    } else {
      var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      if (!regex.test(url)) {
        alert("Please enter a valid URL!");
        return false;
      }
    }
    return true;
  };

  const updateItem = () => {
    if (validateForm()) {
      axios
        .put("/updateItem/", {
          item: {
            id: props.item.id,
            name: title,
            url: url,
            description: description,
            type: props.item.type,
          },
        })
        .then((result) => {
          if (result.status === 200) {
            if (localStorage.getItem(`item${props.item.id}`) !== undefined) {
              localStorage.setItem(
                `item${props.item.id}`,
                JSON.stringify(result.data.item)
              );
            }

            if (localStorage.getItem("collection") !== undefined) {
              localStorage.setItem(
                "collection",
                JSON.stringify(result.data.tree)
              );
            }
          }
        })
        .then(() => {
          props.setEdit(false);
          let id = props.item.id;
          props.setItemId(0);
          props.setItemId(id);
          props.setPreview(null);
        })
        .catch((err) => console.error(`Unable to update item! ${err}`));
    } else {
    }
  };

  return (
    <Grid item xs={6} className={classes.editDiv}>
      <h4 className={classes.label}>Title</h4>
      <TextField
        id="title"
        variant="outlined"
        className={classes.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h4 className={classes.label}>Image URL</h4>
      <TextField
        id="URL"
        variant="outlined"
        className={classes.input}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <h4 className={classes.label}>Description</h4>
      <TextField
        id="description"
        multiline
        rows={28}
        variant="outlined"
        className={classes.inputMulti}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Grid container>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            updateItem();
          }}
        >
          Save
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={() => {
            props.setPreview({
              name: title,
              url: url,
              description: description,
            });
          }}
        >
          Preview
        </Button>
      </Grid>
    </Grid>
  );
};

export default DetailEdit;
