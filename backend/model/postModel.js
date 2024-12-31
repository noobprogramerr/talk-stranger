const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userid:{
       type:mongoose.Schema.Types.ObjectId,
             
    },

    image:{
        type:Object,
        default:{
            fileId:'',
            url:''
        }

    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    time:{
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model('post',postSchema);