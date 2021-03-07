import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Tree from "../tree/Tree";
import DetailPreview from "../detail-preview/DetailPreview";
import DetailEdit from "../detail-edit/DetailEdit";
import { makeStyles } from "@material-ui/core/styles";

const Layout = () => {

  const [itemId, setItemId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState({});
  const [preview, setPreview] = useState(null)

  const useStyles = makeStyles((theme) => ({
    layout: {
      color: 'gray',
      fontFamily: 'sans-serif'
    }
  }));

  const classes = useStyles();

  return (
    <Grid container className={classes.layout}>
      {edit ? <DetailEdit item={item} setEdit={setEdit} setPreview={setPreview} setItemId={setItemId}/> : <Tree setItemId={setItemId} itemId={itemId}/>}
      {itemId > 0 ? (
        <DetailPreview
          itemId={itemId}
          setEdit={setEdit}
          setItem={setItem}
          edit={edit}
          preview={preview}
          
        />
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default Layout;
