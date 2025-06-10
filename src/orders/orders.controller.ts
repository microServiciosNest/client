import { Controller, Get, Post, Body, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination-dto';

@Controller('orders')
export class OrdersController {

  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
  ) { }

  @Post()
  createProduct(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  FindAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send({ cmd: 'find_all_order' }, orderPaginationDto);
  }


  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const order = await firstValueFrom(
        this.ordersClient.send({ cmd: 'find_one_order' }, { id })
      )
      return order;

    } catch (error) {

      throw new RpcException(error);
    }
  }














}
