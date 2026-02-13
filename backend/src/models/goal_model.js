import mongoose, { Schema } from "mongoose";

const goalSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
        },

        milestones: [
            {
                title: {
                    type: String,
                    required: true,
                    trim: true,
                    minlength: 3,
                    maxlength: 50,
                },
                description: {
                    type: String,
                    required: false,
                    trim: true,
                    minlength: [ 5, "description must be at least up to 5 characaters" ],
                    maxlength: 500
                },
                completed: {
                    type: Boolean,
                    default: false,
                    required: true
                },
                completedAt: {
                    type: Date,
                    default: null
                }
            }
        ],

        targetSkills: [ {
            type: Schema.Types.ObjectId,
            ref: "Skill"
        } ],

        deadline: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [ "active", "completed", "paused", "abandoned" ],
            default: "active"
        },

        progress: {
            type: Number,
            default: 0
        },

        isPublic: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function ( doc, ret ) {
                delete ret.__v
                return ret
            }
        }
    }
)

goalSchema.index(
    {
        owner: 1,
        status: 1,
        deadline: 1
    }
)


goalSchema.virtual( "calculatedProgress" ).get( function () {
    if ( !this.milestones || this.milestones.length === 0 )
        return 0

    const completed = this.milestones.filter( m => m.completed ).length
    const total = this.milestones.length

    return Math.round( ( completed / total ) * 100 )
} )



goalSchema.methods.updatedProgress = async function () {

    if ( this.milestones.length === 0 ) {
        this.progress = 0
        return
    }
    const completedCount = this.milestones.filter( m => m.completed ).length
    const totalCount = this.milestones.length

    this.progress = Math.round( ( completedCount / totalCount ) * 100 )

    if ( this.progress === 100 || this.status === "active" ) {
        this.status = "completed"
    }
    await this.save(
        {
            validateBeforeSave: false
        }
    )
}


goalSchema.methods.isOverDue = async function () {
    if ( !this.deadline ) return false
    return Date.now() > this.deadline && this.status === "active"
}


goalSchema.methods.daysRemaining = async function () {
    if ( !this.deadline ) return null
    const diff = this.deadline - Date.now()
    return Math.ceil( diff / ( 1000 * 60 * 60 * 24 ) )
}

goalSchema.statics.getActiveGoals = function ( userId ) {
    return this.find( {
        owner: userId,
        status: "active"
    } ).populate( 'targetSkills', 'name slug icon' ).sort( { deadline: 1 } )  // Nearest deadline first
}

// Get completed goals
goalSchema.statics.getCompletedGoals = function ( userId ) {
    return this.find( {
        owner: userId,
        status: "completed"
    } ).populate( 'targetSkills', 'name slug icon' ).sort( { updatedAt: -1 } )  // Recent first
}


export const Goal = mongoose.model( "Goal", goalSchema )