import { Express } from 'express';
import { Multer } from 'multer';

export class UploaderDto {
    directory: string
    file: Express.Multer.File
}