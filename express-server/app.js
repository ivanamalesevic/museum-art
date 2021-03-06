
import { request } from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

//mock data to be consumed
var collection = {
    "collection": [
        {
            "id": "101",
            "name": "English Vase",
            "type": "potery",
            "url": "https://images.metmuseum.org/CRDImages/ad/mobile-large/DP-14161-261.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "id": "102",
            "name": "Native american vase",
            "type": "potery",
            "url": "https://images.metmuseum.org/CRDImages/ad/mobile-large/DP-14161-261.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "id": "103",
            "name": "American painting",
            "type": "painting",
            "url": "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436535/796067/main-image",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "id": "104",
            "name": "French vase",
            "type": "potery",
            "url": "https://images.metmuseum.org/CRDImages/ad/mobile-large/DP-14161-261.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "id": "201",
            "name": "English VASE",
            "type": "potery",
            "url": "https://images.metmuseum.org/CRDImages/ad/mobile-large/DP-14161-261.jpg",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "id": "202",
            "name": "English Painting",
            "type": "painting",
            "url": "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436535/796067/main-image",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "id": "203",
            "name": "French painting",
            "type": "painting",
            "url": "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436535/796067/main-image",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ]
}

var tree = {
    "id": "1",
    "name": "The Met collection",
    "type": "museum",
    "collection": [
        {
            "id": "10",
            "name": "The American wing",
            "type": "department",
            "collection": [
                {
                    "id": "101",
                    "name": "English Vase",                    
                    "type": "potery",
                    "collection": []
                },
                {
                    "id": "102",
                    "name": "Native american vase",
                    "type": "potery",
                    "collection": []
                },
                {
                    "id": "103",
                    "name": "American painting",
                    "type": "painting",
                    "collection": []
                },
                {
                    "id": "104",
                    "name": "French vase",
                    "type": "potery",
                    "collection": []
                }
                
            ]
        },
        {
            "id": "20",
            "name": "The European wing",
            "type": "department",
            "collection": [
                {
                    "id": "201",
                    "name": "English VASE",                    
                    "type": "potery",
                    "collection": []
                },
                {
                    "id": "202",
                    "name": "English Painting",
                    "type": "painting",
                    "collection": []
                },
                {
                    "id": "203",
                    "name": "French painting",
                    "type": "painting",
                    "collection": []
                }
                
            ]
        }
    ]
}

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3030

app.get('/', (req, res) => {
    res.send('Welcome to Express API!')
})

//get collection
app.get('/getCollection', (req, res) => {
   res.send(tree)
})

//get item by id
app.get('/getItemById/:id', (req, res) => {
    res.json(collection.collection.find((item) => item.id === req.params.id))
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//updateItem
app.put('/updateItem/', (req, res) => {
    let itm = req.body.item
    let index = collection.collection.indexOf(collection.collection.find((item) => item.id === itm.id))
    collection.collection[index] = itm

    tree.collection.map(col => col.collection.map(i => {
        if(i.id === itm.id){
            i.name = itm.name
        }
        return i
    }))
   
    res.send({item: itm, tree: tree})
})

app.listen(port, () => console.log(`Listening on port ${port}...`))