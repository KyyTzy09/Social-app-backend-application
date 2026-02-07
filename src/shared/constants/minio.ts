class MinioConfig {
    public minioEndpoint = process.env.MINIO_ENDPOINT
    public minioBaseURL = process.env.MINIO_BASE_URL
    public minioAccessKey = process.env.MINIO_ACCESS_KEY
    public minioSecretKey = process.env.MINIO_SECRET_KEY
    public minioBucker = process.env.MINIO_BUCKET
    public minioUseSSL = Boolean(process.env.MINIO_USE_SSL)
}

export const minioConfig = new MinioConfig();