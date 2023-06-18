import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from "mongoose";
import { AddCommentDto } from "./dto/add-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([ //Для работы с файлаии
        { name: 'picture', maxCount: 1 }, //Задаем, что ждем 1 файл "picture"
        { name: 'audio', maxCount: 1 }, //Задаем, что ждем 1 файл "audio"
    ]))
    create(@UploadedFiles() files, @Body() createTrackDto: CreateTrackDto) { //CreateTrackDto - type for TypeScript, @UploadedFiles() - для работы с файлами
        const {picture, audio} = files;
        return this.trackService.create(createTrackDto, picture[0], audio[0]) //picture, audio - приходят в форме массивов, поэтому берем по первому индексу
    }

    @Get()
    getAll() {
        return this.trackService.getAll()
    }

    @Get(':trackId')
    getOne(@Param('trackId') id: ObjectId) { //ObjectId - type for TypeScript
        return this.trackService.getOne(id)
    }

    @Delete(':trackId')
    delete(@Param('trackId') id: ObjectId) {
        return this.trackService.delete(id)
    }

    @Post('/comment')
    addComment(@Body() addCommentDto: AddCommentDto) {
        return this.trackService.addComment(addCommentDto)
    }
}