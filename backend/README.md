
# 📁 MODELS FOLDER - KITNI FILES BANANI HAIN?
# Total 12 Models chahiye complete project ke liye:
models/
├── User.js              ← SABSE PEHLE YE (Week 1)
├── Skill.js             ← Week 2
├── Goal.js              ← Week 2
├── Problem.js           ← Week 3
├── Battle.js            ← Week 3
├── BattleSubmission.js  ← Week 3
├── Project.js           ← Week 4
├── Team.js              ← Week 4
├── ProjectSubmission.js ← Week 4
├── StudyRoom.js         ← Week 6
├── MatchRequest.js      ← Week 5
└── Notification.js      ← Week 13




# 👤 USER MODEL - COMPLETE STRUCTURE



# CATEGORY 1: BASIC INFO (Must have)
name           → String (user ka naam)
email          → String (unique, login ke liye)
password       → String (hashed, never return in API)
role           → String ("student" / "startup" / "mentor")


# CATEGORY 2: PROFILE INFO (Optional but useful)
avatar         → String (image URL, default: placeholder)
bio            → String (about me - max 500 chars)
dateOfBirth    → Date
phoneNumber    → String
location       → Object 
                 {
                   city: String,
                   country: String
                 }


# CATEGORY 3: PROFESSIONAL INFO
skills              → Array of ObjectIds (reference Skill model)
experienceLevel     → String ("beginner" / "intermediate" / "advanced")
githubUsername      → String
linkedinUrl         → String
portfolioUrl        → String


# CATEGORY 4: PLATFORM STATS (Gaming/Competition)
rating              → Number (default: 1500, Elo rating)
battlesPlayed       → Number (default: 0)
battlesWon          → Number (default: 0)
battlesLost         → Number (default: 0)
projectsCompleted   → Number (default: 0)
studyHours          → Number (default: 0)
currentStreak       → Number (default: 0, daily login streak)
longestStreak       → Number (default: 0)


# CATEGORY 5: ACCOUNT STATUS
isVerified     → Boolean (email verified hai ya nahi)
isActive       → Boolean (account banned hai kya)
isPremium      → Boolean (paid user?)
premiumExpiry  → Date (premium kab expire hoga)


# CATEGORY 6: SECURITY & TRACKING
lastLogin           → Date (last kab login kiya)
passwordChangedAt   → Date (password last kab change hua)
loginAttempts       → Number (failed login count - security)
lockUntil          → Date (temporary lock time)
refreshToken        → String (logout ke liye revoke)


# CATEGORY 7: TIMESTAMPS (Automatic)
createdAt      → Date (mongoose automatically add karega)
updatedAt      → Date (mongoose automatically add karega)



# 📊 FINAL USER MODEL - COMPLETE LIST
# Total fields (copy this list):
# Must Have (Week 1 mein banao):

name
email
password
role
avatar (default value de do)
bio
rating (default: 1500)
isVerified (default: false)
isActive (default: true)
createdAt (auto)
updatedAt (auto)

# Nice to Have (baad mein add kar lena):

dateOfBirth
phoneNumber
location
skills (array)
experienceLevel
githubUsername
linkedinUrl
portfolioUrl
battlesPlayed
battlesWon
battlesLost
projectsCompleted
studyHours
currentStreak
longestStreak
isPremium
premiumExpiry
lastLogin
passwordChangedAt
loginAttempts
lockUntil
refreshToken


# 🎯 WEEK 1 KE LIYE - SIMPLIFIED USER MODEL
# Abhi sirf ye 11 fields rakh lo User.js mein:

name (String, required)
email (String, required, unique, lowercase)
password (String, required, minlength: 8)
role (String, enum: ['student', 'startup', 'mentor'], default: 'student')
avatar (String, default: "https://via.placeholder.com/150")
bio (String, maxlength: 500)
rating (Number, default: 1500)
isVerified (Boolean, default: false)
isActive (Boolean, default: true)
createdAt (Date, timestamps: true)
updatedAt (Date, timestamps: true)









# Day 2 building auth_controller.js

# 📋 AUTH CONTROLLER MEIN KITNE FUNCTIONS BANANE HAIN?
# Total 6 Main Functions:

`register` - **Naya user banao**
`login` - **User ko authenticate karo**
`logout` - **User ko log out karo**
`refreshAccessToken` - **Naya access token do**
`getCurrentUser` - **Logged-in user ka data do**
`updatePassword` - **Password change karo (logged-in user)**


# 1. SignUp

**Logic building**
1. req.body se data nikalo
2. 