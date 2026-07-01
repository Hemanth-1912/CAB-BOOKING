const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Driver = require('./models/Driver');
const Booking = require('./models/Booking');
const Payment = require('./models/Payment');
const Support = require('./models/Support');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cab-u', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB.');

    // Clear existing database
    console.log('Clearing database...');
    await User.deleteMany({});
    await Driver.deleteMany({});
    await Booking.deleteMany({});
    await Payment.deleteMany({});
    await Support.deleteMany({});
    console.log('✅ Database cleared.');

    // 1. Create Passenger User
    console.log('Creating passenger account...');
    const passenger = new User({
      name: 'Hemanth Passenger',
      email: 'passenger@example.com',
      password: 'password123', // Automatically hashed by User pre-save hook
      phone: '9876543210',
      role: 'user',
      address: {
        street: '100 Feet Rd, Indiranagar',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560038'
      }
    });
    await passenger.save();
    console.log('✅ Passenger created successfully.');

    // 2. Create Driver User
    console.log('Creating driver user account...');
    const driverUser = new User({
      name: 'Ravi Kumar Driver',
      email: 'driver@example.com',
      password: 'password123', // Automatically hashed by User pre-save hook
      phone: '8765432109',
      role: 'driver'
    });
    await driverUser.save();
    console.log('✅ Driver user account created.');

    // 3. Create Driver Profile details
    console.log('Creating driver profile...');
    const driverProfile = new Driver({
      userId: driverUser._id,
      licenseNumber: 'DL-KA0112345678',
      licenseExpiry: new Date('2032-12-31'),
      vehicle: {
        type: 'economy',
        make: 'Tata',
        model: 'Nexon EV',
        year: 2024,
        licensePlate: 'KA-01-AB-1234',
        color: 'Blue'
      },
      bankDetails: {
        accountHolder: 'Ravi Kumar',
        accountNumber: '1234567890',
        bankName: 'State Bank of India',
        ifscCode: 'SBIN0001234'
      },
      rating: 4.8,
      totalRides: 42,
      totalEarnings: 8200,
      isVerified: true,
      isOnline: true,
      currentLocation: {
        type: 'Point',
        coordinates: [77.6409, 12.9719] // Indiranagar, Bangalore
      }
    });
    await driverProfile.save();
    console.log('✅ Driver profile created and set ONLINE.');

    console.log('\n=============================================');
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFUL!');
    console.log('---------------------------------------------');
    console.log('Use these accounts to sign in immediately:');
    console.log('👉 Passenger: passenger@example.com / password123');
    console.log('👉 Driver:    driver@example.com    / password123');
    console.log('=============================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
