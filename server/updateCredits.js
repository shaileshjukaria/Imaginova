import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userModel from './models/userModel.js';

// Update all users to have 5 credits if they don't have creditBalance set
const updateUserCredits = async () => {
    try {
        await connectDB();
        
        // Update all users without creditBalance or with 0 credits
        const result = await userModel.updateMany(
            { $or: [{ creditBalance: { $exists: false } }, { creditBalance: 0 }] },
            { $set: { creditBalance: 5 } }
        );
        
        console.log(`Updated ${result.modifiedCount} user(s) with 5 credits`);
        
        // Show all users
        const users = await userModel.find({}, 'name email creditBalance');
        console.log('\nAll users:');
        users.forEach(user => {
            console.log(`- ${user.name} (${user.email}): ${user.creditBalance} credits`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateUserCredits();
