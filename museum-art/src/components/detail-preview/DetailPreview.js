import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const DetailPreview = (props) => {
  const [item, setItem] = useState({});
  const [itemId, setItemId] = useState(props.itemId);

  useEffect(() => {
    setItemId(props.itemId);
    getItemById();
  }, [props.itemId]);

  const getItemById = () => {
    let itm = JSON.parse(localStorage.getItem(`item${props.itemId}`));
    if (itm === null) {
      axios
        .get(`/getItemById/${props.itemId}`)
        .then((result) => {
          if (result.status === 200) {
            setItem(result.data);
            localStorage.setItem(
              `item${props.itemId}`,
              JSON.stringify(result.data)
            );
          }
        })
        .catch((error) =>
          console.error(`Unable to get item with the specified id!`)
        );
    } else {
      setItem(itm);
    }
  };

  const useStyles = makeStyles((theme) => ({
    imgDiv: {
      height: "40vh",
      borderBottom: "1px lightgray solid",
    },
    descDiv: {
      height: "60vh",
      margin: "10px",
    },
    itemImg: {
      maxHeight: "90%",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    editButton: {
      marginTop: "20px",
    },
    itemDesc: {
      textAlign: "justify",
      overflowY: "auto",
    },
  }));

  const classes = useStyles();

  return (
    <Grid item xs={6}>
      <div className={classes.imgDiv}>
        <img className={classes.itemImg} src={item.url} alt="Art" />
      </div>
      <div className={classes.descDiv}>
        <Grid container>
          <Grid item xs={10}>
            <h3>{item.name}</h3>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.editButton}
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => {
                props.setEdit(true);
                props.setItem(item);
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
        <p className={classes.itemDesc}>{item.description}</p>
      </div>
    </Grid>
  );
};

export default DetailPreview;
