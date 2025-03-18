import { Client, Storage } from "node-appwrite";

export default async () => {
    // Parse input from environment variable
    let event, payload;
    try {
        const functionData = JSON.parse(process.env.APPWRITE_FUNCTION_DATA || '{}');
        event = functionData.event;
        payload = functionData.payload;
    } catch (err) {
        console.error("Error parsing function data", err);
        return context.res.empty();
    }
    
    console.log("Event:", event);
    console.log("Payload:", payload);

    // If event does not match our deletion event, exit
    if (!event || !event.startsWith("databases.") || !event.includes(".collections.offers.documents.delete")) {
        return context.res.empty();
    }

    // Initialize Appwrite SDK
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const storage = new Storage(client);

    try {
        const images = payload.images || [];

        for (const imageUrl of images) {
            // Extract file ID from the Appwrite storage URL
            const fileId = imageUrl.split('/').pop();

            // Delete file from storage
            await storage.deleteFile(process.env.APPWRITE_BUCKET_ID, fileId);
        }

        console.log(`Deleted images for offer: ${payload.$id}`);
    } catch (error) {
        console.error("Error deleting images:", error);
    }

    return context.res.empty();
};
