import { Module } from "@nestjs/common";
import { minioClient } from "src/shared/integrations/minioClient";
import { MinioService } from "./minio.service";

@Module({
    providers: [{ provide: "MINIO_CLIENT", useValue: minioClient }, MinioService],
    exports: [MinioService]
})
export class MinioModule { }