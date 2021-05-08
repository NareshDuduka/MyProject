const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const vegetableSchema=new mongoose.Schema({
    item_name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    price:{
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    quantity:{
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    sold:{
        type:Number,
        default:0
    },
    farmer_id:{
        type: ObjectId,
        ref:"User",
        required: true
        
    },
    photo:{
        data:Buffer,
        contentType:String,

    }
  
  
},
   
{timestamps:true}

);


module.exports=mongoose.model("Vegetable",vegetableSchema);
