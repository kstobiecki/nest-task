import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppService } from './app.service';
import { CreateItemDto, ItemDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Items')
@Controller({
  version: '1',
  path: 'items',
})
export class AppController {
  constructor(
    private readonly connection: Connection,
    private readonly appService: AppService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all items',
  })
  @ApiOkResponse({
    description: 'Successfully get all items',
    type: [ItemDto],
  })
  @HttpCode(HttpStatus.OK)
  async getItems(): Promise<ItemDto[]> {
    Logger.debug({ message: '[getItems] Requested for all items' });
    return this.appService.getItems();
  }

  @Post()
  @ApiOperation({
    summary: 'Create an item',
  })
  @ApiCreatedResponse({
    description: 'Successfully created an item',
    type: ItemDto,
  })
  @ApiBadRequestResponse({
    description: 'Item not created',
  })
  @ApiBody({ type: CreateItemDto })
  @HttpCode(HttpStatus.CREATED)
  async addItem(@Body() item: CreateItemDto): Promise<ItemDto> {
    Logger.debug({ message: '[addItem] Requested to add an item' });
    return this.appService.addItem(item);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Soft delete an item',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted an item',
  })
  @ApiNotFoundResponse({
    description: 'Item was not deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(@Param('id') itemId: string): Promise<void> {
    Logger.debug({
      message: `[deleteItem] Requested to delete an item with id ${itemId}`,
    });
    return this.appService.deleteItem(itemId);
  }

  @Post('/restore/:id')
  @ApiOperation({
    summary: 'Restore an item',
  })
  @ApiNoContentResponse({
    description: 'Successfully restored an item',
  })
  @ApiNotFoundResponse({
    description: 'Item was not restored',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async restoreItem(@Param('id') itemId: string): Promise<void> {
    Logger.debug({
      message: `[restoreItem] Requested to restore an item with id ${itemId}`,
    });
    return this.appService.restoreItem(itemId);
  }
}
