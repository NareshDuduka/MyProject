const express=require('express');
const router=express.Router()
const { add,vegetableById,read,remove,update,list,listRelated} = require("../controllers/vegetables");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
router.get("/vegetables/:vegetableId",read)
router.post('/vegetables/add/:userId', requireSignin,add);
router.delete("/vegetables/:vegetableId/:userId",requireSignin,remove)
router.put("/vegetables/:vegetableId/:userId",requireSignin,update)
router.get("/vegetables",list);
router.get("/vegetables/related/:vegetableId",listRelated);//based on vegetable id ,, it shows the vegetables of corresponding farmer.
router.param("userId",userById);
router.param("vegetableId",vegetableById);


module.exports=router; 