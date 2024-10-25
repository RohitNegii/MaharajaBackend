import s3 from "../config/s3Config.js";

export const uploadBase64ImageToS3 = (base64Image, folderPath) => {
  const buffer = Buffer.from(
    base64Image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const fileName = `${folderPath}/${Date.now()}_${Math.random()
    .toString(36)
    .substring(7)}.png`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: "image/png",
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      if (error) return reject(error);
      resolve(data.Location); // Returns the URL of the uploaded image
    });
  });
};
