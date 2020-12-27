import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { Code, CodeDocument } from './code.schema';
import { CodeService } from './code.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@Controller('code')
export class CodeController {
  constructor(private service: CodeService) {}

  @Get('/')
  @ApiOperation({ summary: 'Retrieve all code docs' })
  @ApiOkResponse({ type: [Code] })
  getAll() {
    return this.service.query();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve code doc by Id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: Code })
  getById(@Param('id') id: string) {
    console.log(id);
    return this.service.findById(id);
  }

  @Post('/query')
  @ApiOperation({ summary: 'Query docs using mongo query' })
  @ApiBody({ type: Code })
  @ApiOkResponse({ type: [Code] })
  query(@Body() query: FilterQuery<Code>) {
    return this.service.query(query);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create new code doc' })
  @ApiBody({ type: Code })
  @ApiCreatedResponse({ type: Code })
  create(@Body() payload: CodeDocument) {
    return this.service.upsert(payload);
  }

  @Put('/')
  @ApiOperation({ summary: 'Update a code doc' })
  @ApiBody({ type: Code })
  @ApiCreatedResponse({ type: Code })
  update(@Body() payload: CodeDocument) {
    return this.service.upsert(payload);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete code doc by Id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiNoContentResponse()
  deleteById(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
