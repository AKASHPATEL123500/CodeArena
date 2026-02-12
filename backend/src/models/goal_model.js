import mongoose ,{ Schema } from "mongoose";

const goalSchema = new Schema(
    {
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },

        title : {
            type : String,
            required : true,
            minlength : 3,
            maxlength : 50,
            unique : true
        },

        description : {
            type : String,
            required : true,
            minlength : 3,
            maxlength : 50,
        },

        milestones :[
            {
                title : {
                    type : String,
                    required : true,
                    minlength : 3,
                    maxlength : 50,
                    unique : true
                },
                description : {
                    type : String,
                    required :false,
                    minLength : 3,
                    maxLength : 100
                },
                completed : {
                    type : Boolean,
                    default : false,
                    required : true
                },
                completedAt : {
                    type : Date,
                    default : Date
                }
            }
        ],

        targetSkills : {
            type : Schema.Types.ObjectId,
            ref : "Skill"
        },

        deadline : {
            type : Date,
            default : Date.now
        },

        status : {
            type : String,
            enum : ["active","completed","paused","abandoned"],
            default : "active"
        },

        progress :{
            type : Number,
            default : 0
        },

        isPublic : {
            type : Boolean,
            default : true
        }

    },
    {
        timestamps : true,
        toJSON :{
            virtuals : true,
            transform : function(doc,ret){
                delete ret.__v
                return ret
            }
        }
    }
)

export const Goal = mongoose.model("Goal",goalSchema)