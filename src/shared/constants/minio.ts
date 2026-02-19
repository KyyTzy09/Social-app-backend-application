import "dotenv/config";

class MinioConfig {
    public minioEndpoint = process.env.MINIO_ENDPOINT
    public minioBaseURL = process.env.MINIO_BASE_URL
    public minioAccessKey = process.env.MINIO_ACCESS_KEY
    public minioSecretKey = process.env.MINIO_SECRET_KEY
    public minioBucket = process.env.MINIO_BUCKET
    public minioUseSSL = process.env.MINIO_USE_SSL
}

export const minioConfig = new MinioConfig();