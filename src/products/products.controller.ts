import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) { }

  @Post()
  createProduct() {
    return {
      message: 'Create product'
    }
  }

  @Get()
  FinAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id })
      )
      return product;

    } catch (error) {

      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return {
      message: 'eliminar producto'
    }
  }
  @Patch(':id')
  patchProduc(@Body() body: any) {
    return {
      message: 'Actualizar producto'
    }
  }
}
