import fs from 'fs';
import path from 'path';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function saveImage(base64Data: string, filename: string): Promise<string> {
  // Remove data URL prefix if present
  const base64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
  
  // Decode base64 to binary data
  const imageBuffer = Buffer.from(base64, 'base64');
  
  // Create file path
  const filePath = path.join(uploadsDir, filename);
  
  // Write the image to the file system
  await fs.promises.writeFile(filePath, imageBuffer);
  
  // Return the URL path for the image
  return `/uploads/${filename}`;
}