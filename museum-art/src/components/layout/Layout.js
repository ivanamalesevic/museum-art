import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import Tree from "../tree/Tree";
import DetailPreview from "../detail-preview/DetailPreview";
import axios from "axios";
import DetailEdit from "../detail-edit/DetailEdit";

const Layout = () => {

  const [itemId, setItemId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState({});
  const [preview, setPreview] = useState(null)

  return (
    <Grid container>
      {edit ? <DetailEdit item={item} setEdit={setEdit} setPreview={setPreview} setItemId={setItemId}/> : <Tree setItemId={setItemId} />}
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
