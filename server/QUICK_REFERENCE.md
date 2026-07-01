# 🚀 Cab-U Backend - Quick Reference

## ✅ What's Included

### Project Structure
```
✅ config/db.js                  - MongoDB connection
✅ models/User.js                - User model with auth
✅ models/Driver.js              - Driver model with location
✅ models/Booking.js             - Booking model
✅ controllers/userController.js - User logic
✅ controllers/driverController.js - Driver logic
✅ controllers/bookingController.js - Booking logic
✅ middleware/auth.js            - JWT authentication
✅ routes/userRoutes.js          - User endpoints
✅ routes/driverRoutes.js        - Driver endpoints
✅ routes/bookingRoutes.js       - Booking endpoints
✅ server.js                     - Main server
✅ .env                          - Environment variables
✅ package.json                  - Dependencies
```

### Features
✅ User registration & login
✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ Driver profile management
✅ Real-time location tracking
✅ Ride booking system
✅ Ride status management
✅ Rating & review system
✅ Driver earnings tracking
✅ MongoDB integration
✅ CORS enabled

---

## 🚀 Getting Started (5 Minutes)

### Step 1: Install Dependencies
```bash
cd C:\Users\HP 830 G6\OneDrive\Desktop\Cab-U
npm install
```

### Step 2: Ensure MongoDB is Running

**Option A: Local MongoDB**
- MongoDB should auto-start as Windows service
- Or run: `mongod` in terminal

**Option B: MongoDB Atlas**
- Update `MONGODB_URI` in `.env` with your connection string

### Step 3: Start Server
```bash
npm run dev
```

### Step 4: Test API
```bash
# In another terminal
curl http://localhost:5000/api/health
```

You should see:
```json
{"success": true, "message": "Server is running"}
```

---

## 📊 MongoDB Connection

### Local (Default)
```env
MONGODB_URI=mongodb://localhost:27017/cab-u
```

### MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/cab-u
```

### Connect with Compass
1. Open MongoDB Compass
2. URI: `mongodb://localhost:27017`
3. Click Connect

---

## 🔑 Main API Endpoints

### Users
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/users/register` | ❌ | Register new user |
| POST | `/api/users/login` | ❌ | Login user |
| GET | `/api/users/profile` | ✅ | Get profile |
| PUT | `/api/users/profile` | ✅ | Update profile |

### Drivers
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/drivers/register` | ✅ | Register as driver |
| GET | `/api/drivers/profile` | ✅ | Get driver profile |
| PUT | `/api/drivers/location` | ✅ | Update location |
| PUT | `/api/drivers/toggle-online` | ✅ | Go online/offline |
| POST | `/api/drivers/nearby` | ✅ | Find nearby drivers |
| GET | `/api/drivers/earnings` | ✅ | View earnings |

### Bookings
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/bookings/request` | ✅ | Request a ride |
| POST | `/api/bookings/accept` | ✅ | Accept ride (driver) |
| GET | `/api/bookings/:id` | ✅ | Get booking details |
| PUT | `/api/bookings/:id/status` | ✅ | Update ride status |
| GET | `/api/bookings/user/all` | ✅ | Get all user bookings |
| PUT | `/api/bookings/:id/complete` | ✅ | Complete with rating |

---

## 🧪 Quick Test

```bash
# User Registration
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123","phone":"9000000000"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'

# Copy token from response and use in Authorization header
# Get Profile
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📁 File Locations

All files are in:
```
C:\Users\HP 830 G6\OneDrive\Desktop\Cab-U\
```

Key files:
- `.env` - Configuration
- `server.js` - Start here
- `README.md` - Full documentation
- `MONGODB_SETUP.md` - MongoDB setup guide
- `API_TESTING.md` - Testing examples

---

## 🔧 Environment Variables

Create/Edit `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/cab-u
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

---

## 📦 Dependencies Installed

```
✅ express          - Web framework
✅ mongoose         - MongoDB ODM
✅ dotenv           - Environment variables
✅ bcryptjs         - Password hashing
✅ jsonwebtoken     - JWT tokens
✅ cors             - Cross-origin requests
✅ validator        - Data validation
✅ nodemon          - Auto-reload (dev)
```

---

## 🛠️ Common Commands

```bash
# Start dev server (with auto-reload)
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# Check if MongoDB is running
mongod --version

# Clear node_modules (if needed)
npm cache clean --force
```

---

## 🚨 Troubleshooting

### MongoDB not connecting?
1. Ensure MongoDB is running: `mongod`
2. Check `.env` has correct MONGODB_URI
3. Open MongoDB Compass to verify

### Port 5000 already in use?
1. Change PORT in `.env`
2. Or kill process: Find PID using port 5000 and stop it

### API returning 401 Unauthorized?
1. Include token in Authorization header: `Bearer YOUR_TOKEN`
2. Token might be expired (expires in 30 days)
3. Login again to get new token

### Collections not appearing in Compass?
1. Make sure API requests succeeded (check response status)
2. Refresh Compass: Click the refresh icon
3. Check database name is `cab-u`

---

## 📚 Documentation Files

- **README.md** - Complete project documentation
- **MONGODB_SETUP.md** - Detailed MongoDB setup guide
- **API_TESTING.md** - API testing examples with cURL
- **QUICK_REFERENCE.md** - This file (quick commands)

---

## 🎯 Next Steps

1. ✅ `npm install` - Install dependencies
2. ✅ Verify MongoDB is running
3. ✅ `npm run dev` - Start server
4. ✅ Test endpoints using cURL/Postman
5. ✅ View data in MongoDB Compass
6. ✅ Build frontend to consume these APIs

---

## 💡 Pro Tips

1. Use **MongoDB Compass** to visualize data in real-time
2. Save API responses in **Postman** for quick testing
3. Use **JWT Debugger** to inspect tokens: jwt.io
4. Enable **CORS** if frontend is on different port
5. Keep **JWT_SECRET** secure in production

---

## 🔐 Security Notes

⚠️ **Before Production:**
- Change JWT_SECRET to something strong
- Use MongoDB Atlas instead of local
- Enable HTTPS
- Add rate limiting
- Add input validation
- Use environment-specific configs
- Never commit .env file
- Use strong database passwords

---

## 📞 Support

Refer to:
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Docs](https://jwt.io/)

---

**Happy Coding! 🚀**

Need help? Review the README.md or API_TESTING.md files.
