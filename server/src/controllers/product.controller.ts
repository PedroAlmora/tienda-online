import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common";
import { ProductService } from "src/services";
import { ProductDto } from "src/dto";
import { Product } from "src/entitys";
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
// import { AuthGuard } from "src/middlewares";

@ApiTags("PRODUCTS")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: "Obtener productos",
    description: "Este endpoint devuelve todos los productos",
  })
  @ApiOkResponse({
    description: "Productos obtenidos exitosamente",
    type: [ProductDto],
  })
  @ApiResponse({
    status: 400,
    description: "No encontrado",
  })
  async allProducts(): Promise<ProductDto[]> {
    return await this.productService.findAllProduct();
  }

  @Get("cartProduct")
  @ApiOperation({
    summary: "Obtener productos carrito",
    description: "Este endpoint devuelve todos los productos del carrito",
  })
  @ApiOkResponse({
    description: "Productos obtenidos exitosamente",
    type: [ProductDto],
  })
  @ApiResponse({
    status: 400,
    description: "No encontrado",
  })
  @ApiQuery({ name: 'codes', required: false, type: [String], isArray: true })
  async findProductsByCodes(@Query('codes') codes: string[]): Promise<ProductDto[]> {
    return this.productService.findProductsByCodes(codes);
  }

  @Get("random")
  @ApiOperation({
    summary: "Obtener productos aleatorios",
    description: "Este endpoint devuelve 8 productos aleatorios",
  })
  @ApiOkResponse({
    description: "Productos obtenidos exitosamente",
    type: [ProductDto],
  })
  @ApiResponse({
    status: 400,
    description: "No encontrado",
  })
  async RandomProducts(): Promise<ProductDto[]> {
    return await this.productService.findRandomProducts();
  }

  @ApiOperation({
    summary: "Obtener productos por criterios de búsqueda",
    description:
      "Este endpoint devuelve todos los productos que coincidan con los criterios de búsqueda especificados",
  })
  @ApiOkResponse({
    description: "Productos obtenidos exitosamente",
    type: [ProductDto],
  })
  @ApiResponse({
    status: 400,
    description: "No encontrado",
  })
  @ApiQuery({ name: "code", required: false, type: String })
  @ApiQuery({ name: "barCode", required: false, type: String })
  @ApiQuery({ name: "name", required: false, type: String })
  @ApiQuery({ name: "description", required: false, type: String })
  @ApiQuery({ name: "price", required: false, type: Number })
  @ApiQuery({ name: "amount", required: false, type: Number })
  @ApiQuery({ name: "compatibility", required: false, type: String })
  @ApiQuery({ name: "oem", required: false, type: String })
  @ApiQuery({ name: "section", required: false, type: String })
  @Get("search")
  async searchProducts(@Query() query: any): Promise<ProductDto[]> {
    const criteria: any = {};

    if (query.code) criteria.code = query.code;
    if (!isNaN(query.barCode)) criteria.barCode = query.barCode;
    if (query.name) criteria.name = query.name;
    if (query.description) criteria.description = query.description;
    if (!isNaN(query.price)) criteria.price = query.price;
    if (!isNaN(query.amount)) criteria.amount = query.amount;
    if (query.compatibility) criteria.compatibility = query.compatibility;
    if (query.oem) criteria.oem = query.oem;
    if (query.section) criteria.section = query.section;

    return await this.productService.findBySearch(criteria);
  }

  @ApiOperation({
    summary: "Obtener producto",
    description: "Este endpoint devuelve un producto",
  })
  @ApiOkResponse({
    description: "producto obtenido exitosamente",
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: "No encontrado",
  })
  @Get(":code")
  async getProduct(@Param('code') code: string): Promise<Product> {
    const productId = code;
    if (!productId) {
      throw new BadRequestException('ID de producto no válido');
    }
    return await this.productService.findByIdProduct(productId);
  }

  @ApiOperation({
    summary: "Obtener productos",
    description: "Este endpoint devuelve todos los productos dada una sección",
  })
  @ApiOkResponse({
    description: "Productos obtenidos exitosamente",
    type: [Product],
  })
  @ApiResponse({
    status: 400,
    description: "No encontrado",
  })
  @Get("filter/:section")
  async getProductSection(
    @Param("section") section: string,
  ): Promise<Product[]> {
    return await this.productService.findBySectionProduct(section);
  }

}
