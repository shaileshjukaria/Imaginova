import mongoose from 'mongoose';
import 'dotenv/config';
import userModel from './models/userModel.js';

// This script marks all existing users as verified
// Run this once after adding email verification to avoid locking out existing users

const migrateExistingUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update all users without isVerified field to be verified
        const result = await userModel.updateMany(
            { isVerified: { $exists: false } },
            { 
                $set: { 
                    isVerified: true,
                    verificationToken: undefined,
                    verificationTokenExpiry: undefined
                } 
            }
        );

        console.log(`Migration complete!`);
        console.log(`${result.modifiedCount} existing users marked as verified`);
        
        // Disconnect
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrateExistingUsers();
