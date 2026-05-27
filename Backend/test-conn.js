import mongoose from 'mongoose';
import dns from 'dns';

// Force Google DNS for SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const URIs = [
  'mongodb+srv://himanshu:Singh9995@cluster0.e0pwwco.mongodb.net/portfolio?appName=Cluster0'
];

async function test() {
  for (const uri of URIs) {
    try {
      console.log(`Testing: ${uri.replace(/:([^@]+)@/, ':****@')}`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log('✅ Connected successfully!');
      await mongoose.disconnect();
      console.log(`WINNER: ${uri}`);
      process.exit(0);
    } catch (e) {
      console.log(`❌ Failed: ${e.message}`);
    }
  }
  console.log('❌ All connections failed!');
  process.exit(1);
}

test();
