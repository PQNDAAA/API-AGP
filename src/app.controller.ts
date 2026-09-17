import {Body, Controller, Get, Post, Delete, Param, Patch, Put} from '@nestjs/common';
import { AppService } from './app.service';
import * as internalControlInterface from "./internal-control/internal-control.interface";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('ic')
  getInternalControls() {
    return this.appService.getInternalControls();
  }

  @Post('internalControl')
  addInternalControl(@Body() newInternalControl: internalControlInterface.InternalControl){
    return this.appService.addInternalControl(newInternalControl);
  }

  @Delete('internalControl/:id')
  deleteInternalControl(@Param('id') id: number){
    return this.appService.deleteInternalControl(id);
  }

  @Put('internalControl/:id')
  modifyInternalControl(@Param('id') id :number,@Body() targetInternalControl: internalControlInterface.InternalControl){
    return this.appService.modifyInternalControl(id, targetInternalControl);
  }
}
