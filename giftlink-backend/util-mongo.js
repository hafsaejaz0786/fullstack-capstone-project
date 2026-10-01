const connectToDatabase = require('./db');

const sampleGifts = [
    { id: "1", name: "Wireless Mouse", category: "Electronics", condition: "Like New", posted_by: "john_doe", zipcode: "10001", date_added: "1693500000" },
    { id: "2", name: "Wooden Coffee Table", category: "Furniture", condition: "Good", posted_by: "jane_smith", zipcode: "10002", date_added: "1693500100" },
    { id: "3", name: "Cotton Jacket", category: "Fashion", condition: "New", posted_by: "ali_khan", zipcode: "10003", date_added: "1693500200" }
];

async function insertSampleData() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        await collection.deleteMany({}); // clear existing
        const result = await collection.insertMany(sampleGifts);
        console.log(`Inserted ${result.insertedCount} items into MongoDB collection: gifts`);
        process.exit(0);
    } catch (error) {
        console.error("Error inserting data:", error);
        process.exit(1);
    }
}

insertSampleData();