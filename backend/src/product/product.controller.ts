import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { Roles } from 'src/common/decorators/roles.decorator';
// import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
// import { RolesGuard } from 'src/common/guards/roles.guard';
import { Admin } from '../common/decorators/admin.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Get()
  @Admin()
  async findAll() {
    return {
      users: 150,
      sales: 9999,
      activeSessions: 42,
      products: await this.productService.findAll()
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
