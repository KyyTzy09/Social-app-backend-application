import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as Minio from "minio"
import { minioConfig } from "src/shared/constants/minio";
import { UploaderDto } from "./dto/upload.dto";
import * as path from "path";
import { randomUUID } from "crypto";

@Injectable()
export class MinioService {
    constructor(@Inject("MINIO_CLIENT") private readonly minio: Minio.Client) { }

    async Uploader(dto: UploaderDto): Promise<string> {
        try {
            const ext = path.extname(dto.file.originalname);
            const filename = `${randomUUID()}${ext}`;
            const objectName = `${dto.directory}/${filename}`;
            await this.minio.putObject(minioConfig.minioBucket || "", objectName, dto.file.buffer, dto.file.size, {
                'Content-Type': dto.file.mimetype,
            })

            const url = `${minioConfig.minioBaseURL}/${minioConfig.minioBucket}/${objectName}`;
            return url
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}