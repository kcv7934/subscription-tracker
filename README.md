# About

Simple backend project using frameworks Node.js, Express.js, and MongoDB to make a working subscription tracker to handle real users, currency, and business.

User authenication done using JWT, database modeled using MongoDB and Mongoose. Global error handling included along with email reminders via Upstash.

Arcjet was used for bot protection and rate limiting.

****

# Prerequisites 

To run ensure: Git, Node.js, and npm (Node Package Manager) are downloaded on device.

***

# Clone Repository

```
git clone https://github.com/kcv7934/subscription-tracker.git 
cd subscription-tracker
```

****

# Installation

```
npm install
```

*******

Setup Environment Variables

```
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=_

# JWT AUTH
JWT_SECRET=_
JWT_EXPIRES_IN=1d

# ARCJET
ARCJET_KEY=_
ARCJET_ENV="development"

# UPSTASH 
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=_


#NODEMAILER
EMAIL_PASSWORD=_
```

Fill in _ with proper credentials

***

# Running Project

```
npm run dev
```

Open http://localhost:5500 in your browser of choice

***

