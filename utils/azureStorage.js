import { BlobServiceClient } from "@azure/storage-blob"

const AZURE_STORAGE_CONNECTION_STRING = "your_connection_string"
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
const containerClient = blobServiceClient.getContainerClient("your-container-name")

export async function uploadImageStreamed(blobName, dataStream) {
  const blobClient = containerClient.getBlockBlobClient(blobName)
  await blobClient.uploadStream(dataStream)
  return blobClient.url
}
// Function to generate a temporary SAS token URL for accessing the blob
// async function generateSasUrl(containerName, blobName) {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const blobClient = containerClient.getBlobClient(blobName);

//   // Generate a SAS token that expires in 1 hour and grants read permissions
//   const expiryDate = new Date(new Date().valueOf() + 3600 * 1000);  // 1 hour expiration
//   const sasUrl = await generateBlobSasUrl(blobClient, {
//     permissions: BlobSasPermissions.parse('r'), // Read permission
//     expiresOn: expiryDate,
//   });

//   console.log(`SAS URL: ${sasUrl}`);
//   return sasUrl;
// }
