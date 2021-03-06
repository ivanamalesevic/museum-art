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
    },
    input: {
      width: "90%",
    },
    inputMulti: {
      width: "90%",
    },
    button: {
      margin: "20px",
    },
  }));

  const classes = useStyles();

  const validateForm = () => {
    if (title === "" || url === "" || description === "") {
      alert("All fields must have a value!");
      return false;
    } else {
      var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
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
          // props.setItemId(props.item.id)
        })
        .catch((err) => console.error(`Unable to update item! ${err}`));
    } else {
    }
  };

  return (
    <Grid item xs={6} className={classes.editDiv}>
      <h5>Title</h5>
      <TextField
        id="title"
        variant="outlined"
        className={classes.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h5>Image URL</h5>
      <TextField
        id="URL"
        variant="outlined"
        className={classes.input}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <h5>Description</h5>
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
