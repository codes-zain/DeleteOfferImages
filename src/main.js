import { Client, Storage } from "node-appwrite";

export default async ({ event, payload }) => {
    if (!event.startsWith("databases.") || !event.includes(".collections.offers.documents.delete")) {
        return;
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
};
