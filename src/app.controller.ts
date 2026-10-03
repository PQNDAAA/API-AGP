import {Body, Controller, Get, Post, Delete, Param, Patch, Put, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import * as internalControlInterface from "./internal-control/internal-control.interface";
import { JwtAuthGuard } from './auth/jwt-auth/jwt-auth.guard';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('internalControls')
  getInternalControls() {
    return this.appService.getInternalControls();
  }

  @UseGuards(JwtAuthGuard)
  @Post('internalControl')
  addInternalControl(@Body() newInternalControl: internalControlInterface.InternalControl){
    return this.appService.addInternalControl(newInternalControl);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('internalControl/:id')
  deleteInternalControl(@Param('id') id: number){
    return this.appService.deleteInternalControl(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('internalControl/:id')
  modifyInternalControl(@Param('id') id :number,@Body() targetInternalControl: internalControlInterface.InternalControl){
    return this.appService.modifyInternalControl(id, targetInternalControl);
  }
}
