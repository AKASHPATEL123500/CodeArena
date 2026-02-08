import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        sparse: true  // ← ADDED
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,  // ← ADDED
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']  // ← ADDED
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false  // ← ADDED
    },
    role: {
        type: String,
        enum: ["student", "startup", "mentor"],
        default: "student"
    },
    avatar: {
        type: String,
        default: "https://via.placeholder.com/150"  // ← CHANGED (not required)
    },
    bio: {
        type: String,
        maxlength: [500, "Bio cannot exceed 500 characters"],
        default: "Welcome to CodeArena"  // ← TYPO FIX
    },
    dateOfBirth: {  // ← TYPO FIX (capital D removed)
        type: Date
    },
    phoneNumber: {
        type: String  // ← CHANGED from Number
    },
    location: {  // ← TYPO FIX
        city: String,
        country: String
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: "Skill"
    }],
    experienceLevel: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],  // ← ORDER FIX
        default: "beginner"
    },
    githubUsername: {
        type: String,
        trim: true
    },
    linkedinUrl: {  // ← TYPO FIX
        type: String,
        trim: true
    },
    portfolioUrl: {  // ← TYPO FIX
        type: String
    },
    rating: {
        type: Number,
        default: 1500,
        min: [0, "Rating cannot be negative"]
    },
    battlesPlayed: {
        type: Number,
        default: 0,
        min: 0
    },
    battlesWon: {
        type: Number,
        default: 0,
        min: 0
    },
    battlesLost: {
        type: Number,
        default: 0,
        min: 0
    },
    projectsCompleted: {
        type: Number,
        default: 0,
        min: 0
    },
    studyHours: {
        type: Number,
        default: 0,
        min: 0
    },
    currentStreak: {  // ← TYPO FIX
        type: Number,
        default: 0,
        min: 0
    },
    longestStreak: {  // ← TYPO FIX
        type: Number,
        default: 0,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    premiumExpiry: {
        type: Date
    },
    lastLogin: {
        type: Date
    },
    passwordChangedAt: {
        type: Date
    },
    refreshToken: {
        type: String,
        select: false  // ← ADDED (security)
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {  // ← ADDED
        type: Date
    }
}, {
    timestamps: true,
    toJSON: {  // ← ADDED
        virtuals: true,
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.refreshToken;
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

// ========== INDEXES ==========
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ rating: -1 });
userSchema.index({ skills: 1 });

// ========== VIRTUALS ==========
userSchema.virtual('winRate').get(function() {
    if (this.battlesPlayed === 0) return 0;
    return ((this.battlesWon / this.battlesPlayed) * 100).toFixed(2);
});

// ========== MIDDLEWARE ==========
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    
    this.password = await bcrypt.hash(this.password, 12);
    
});

// Password change track 
userSchema.pre("save", async function() {
    if (!this.isModified("password") || this.isNew) return ;
    
    this.passwordChangedAt = Date.now() - 1000;  // 1 sec pehle (JWT issue fix)
    
});

// ========== METHODS ==========
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function() {  
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            username: this.username,
            email: this.email,
            role: this.role  
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY_KEY
        }
    );
};

userSchema.methods.generateRefreshToken = function() {  
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY_KEY
        }
    );
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.incrementLoginAttempts = function() {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        });
    }
    
    const updates = { $inc: { loginAttempts: 1 } };
    const maxAttempts = 5;
    
    if (this.loginAttempts + 1 >= maxAttempts && !this.lockUntil) {
        updates.$set = { 
            lockUntil: Date.now() + 30 * 60 * 1000
        };
    }
    
    return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
    return this.updateOne({
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 }
    });
};

const User = mongoose.model("User",userSchema)
export default User