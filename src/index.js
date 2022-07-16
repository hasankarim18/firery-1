

import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs, addDoc,
    deleteDoc, doc
} from 'firebase/firestore'

import { firebaseConfig } from './fireobj'

// const firebaseConfig = require('./fireobj')

// const firebaseConfig = {
//     apiKey: "AIzaSyA77osiT0_M_sdzPx2S2UBq-FNdWtnCtAE",
//     authDomain: "firery-1.firebaseapp.com",
//     projectId: "firery-1",
//     storageBucket: "firery-1.appspot.com",
//     messagingSenderId: "990920457191",
//     appId: "1:990920457191:web:43c9aa5e55ce518a335b42"
// };


// init firbase app 
initializeApp(firebaseConfig);


// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')


// get collection data 

getDocs(colRef)
    .then((res) => {
        let books = []
        res.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err)
    })


// adding a document 

const addBookForm = document.querySelector('.add')

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(addBookForm.title.value)
    console.log(addBookForm.author.value)
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value
    })
        .then((res) => {
            addBookForm.reset()
        })
        .catch((res) => {
            console.log(res)
        })
})


const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(res => {
            deleteBookForm.reset()
        })
        .catch(err => {
            console.log(err)
        })

})

