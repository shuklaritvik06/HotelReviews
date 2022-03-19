const express = require('express');
const formidable = require('express-formidable');
const methodOverride = require('method-override');
const router = express.Router();
const fireApp =  require('../models/db');
const { getFirestore,collection,doc,getDocs,addDoc,updateDoc,deleteDoc } = require('firebase/firestore/lite');
const db = getFirestore(fireApp);

router.use(formidable());
router.use(methodOverride('_method'));

const data = async function getDocuments(db) {
    const restaurantsCol = collection(db, 'restaurants');
    return await getDocs(restaurantsCol);
}

router.get("/",(req,res)=>{
    res.render('index');
});

router.get("/dashboard",(req,res)=>{
    data(db).then((result)=>{
        const list = result.docs.map((doc)=>{
            return {id:doc.id,...doc.data()};
        })
        res.render('dashboard',{reviews: list})
    });
});

router.get("/add",(req,res)=>{
    res.render('addHotel');
})

router.post("/add",(req,res)=>{
    addDoc(collection(db,"restaurants"),{
        name: req.fields.name,
        location: req.fields.location,
        rating: req.fields.rating,
        description: req.fields.description,
        imageUrl: req.fields.imageurl
    }).then(()=>{
        res.redirect("/dashboard");
    })
});

router.get("/rate/:id",(req,res,next)=>{
    res.render('rateform',{id: req.params.id});
});

router.post("/rate/:id", (req,res)=>{
    updateDoc(doc(db, `restaurants/${req.params.id}`), {
        rating: req.fields.rating
    }).then(r => res.redirect("/dashboard"))
});

router .delete("/dashboard/delete/:id",(req,res)=>{
    deleteDoc(doc(db, `restaurants/${req.params.id}`)).then(r =>res.redirect("/dashboard"))
});

module.exports = router;