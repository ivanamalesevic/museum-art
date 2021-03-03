import React from 'react'
import { Grid } from '@material-ui/core'
import Tree from '../tree/Tree'
import DetailPreview from '../detail-preview/DetailPreview'
import axios from 'axios'

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

    return(
        <Grid container>
           <Tree />
           <DetailPreview />
        </Grid>
    )
}

export default Layout