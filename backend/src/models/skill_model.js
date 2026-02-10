import mongoose, { Schema } from "mongoose"

const skillSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,  // ← Fixed typo
            maxLength: 200,
            unique: true,  // ← Name bhi unique hona chahiye
            index: true
        },
        slug: {
            type: String,
            lowercase: true,  // ← Fixed typo
            minlength: 2,  // ← Fixed typo
            maxLength: 50,  // ← 2 se 50 (typo tha?)
            unique: true,
            trim: true,
            index: true
        },
        description: {
            type: String,
            required: false,
            maxLength: 500  // ← 200 se 500 (better)
        },
        category: {
            type: String,
            required: true,
            enum: [
                "programming",
                "web",
                "mobile",
                "design",
                "database",
                "devops",
                "cloud",
                "ai-ml",
                "other"
            ],
            trim: true,
            index: true  // ← Category pe index (filtering fast)
        },
        difficulty: {
            type: String,
            trim: true,
            enum: [
                "beginner",
                "intermediate",
                "advanced"
            ],
            default: "beginner"
        },
        icon: {
            type: String,
            trim: true
        },
        relatedSkills: [  // ← Fixed structure
            {
                type: Schema.Types.ObjectId,
                ref: "Skill"
            }
        ],
        totalUsers: {
            type: Number,
            default: 0,
            min: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function(doc, ret) {
                delete ret.__v
                return ret
            }
        }
    }
)

// ========== INDEXES ==========
skillSchema.index({ totalUsers: -1 })  // Popular skills fast query

// ========== INSTANCE METHODS ==========

// Method 1: Increment user count
skillSchema.methods.incrementUserCount = async function() {
    this.totalUsers += 1
    await this.save({ validateBeforeSave: false })
}

// Method 2: Decrement user count
skillSchema.methods.decrementUserCount = async function() {
    if (this.totalUsers > 0) {
        this.totalUsers -= 1
        await this.save({ validateBeforeSave: false })
    }
}

// Method 3: Check if popular
skillSchema.methods.isPopular = function() {
    return this.totalUsers >= 100
}

// Method 4: Get related skills (populated)
skillSchema.methods.getRelatedSkills = async function() {
    await this.populate('relatedSkills', 'name slug icon')
    return this.relatedSkills
}

// ========== STATIC METHODS ==========

// Method 5: Find by category
skillSchema.statics.findByCategory = function(category) {
    return this.find({ 
        category: category,
        isActive: true 
    }).sort({ totalUsers: -1 })
}

// Method 6: Search skills
skillSchema.statics.searchSkills = function(searchTerm) {
    const regex = new RegExp(searchTerm, 'i')  // Case-insensitive
    return this.find({
        $or: [
            { name: regex },
            { description: regex }
        ],
        isActive: true
    }).sort({ totalUsers: -1 })
}

// Method 7: Get popular skills
skillSchema.statics.getPopularSkills = function(limit = 10) {
    return this.find({ isActive: true })
        .sort({ totalUsers: -1 })
        .limit(limit)
}

const Skill = mongoose.model("Skill", skillSchema)
export default Skill