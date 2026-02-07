import * as Minio from "minio"
import { minioConfig } from "../constants/minio"

export const minioClient = new Minio.Client({
    endPoint: minioConfig.minioEndpoint || "localhost",
    port: 9000,
    accessKey: minioConfig.minioAccessKey,
    secretKey: minioConfig.minioSecretKey,
    useSSL: process.env.NODE_ENV === 'production',
})