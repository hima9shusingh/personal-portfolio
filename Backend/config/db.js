import mongoose from 'mongoose';
import dns from 'dns';

// Fix Node.js 18+ DNS resolution issue with MongoDB Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const connectDB = async () => {
  try {
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected! Attempting to reconnect...');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB Connection Error: ${err.message}`);
    });

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Initial MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
