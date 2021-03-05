import React, { useState, useEffect, useRef } from 'react'
import { Grid } from '@material-ui/core'
import Tree from '../tree/Tree'
import DetailPreview from '../detail-preview/DetailPreview'
import axios from 'axios'
import DetailEdit from '../detail-edit/DetailEdit'

const Layout = () => {
    // const getCollection = () => {
    //     axios.get('/getCollection')
    //     .then((response) => {
    //         if(response.status === 200){
    //             // setCollection(response.data.collection)
    //             console.log(response.data.collection)
    //         }
    //     })
    //     .catch((err) => console.error("Unable to get collection!"))
    // }

    // const getItemById = (id) => {
    //     axios.get(`/getItemById/${id}`)
    //     .then((response) => {
    //         if(response.status === 200) {
    //             console.log(response.data)
    //         }
    //     })
    // }

    // const updateItem = () => {

    // }

    const [itemId, setItemId] = useState(0)
    const [edit, setEdit] = useState(false)
    const [item, setItem] = useState({})
    
    // const usePrevious = () => {
    //     const ref = useRef()
    //     useEffect(() => {
    //         ref.current = itemId
    //     })
    //     return ref.current
    // }
    // console.log(`parent ${itemId}`)

    // const prevId = usePrevious()
   
    return(
        <Grid container>
          {edit ? <DetailEdit item={item}/> : <Tree setItemId={setItemId}/>}
          {itemId > 0 ? <DetailPreview itemId={itemId} setEdit={setEdit} setItem={setItem}/> : <></>}
        </Grid>
    )
}

export default Layout