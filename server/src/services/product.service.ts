import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, In, Repository } from "typeorm";
import { Product } from "src/entitys";
import { ProductCodesDto, ProductDto } from "src/dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAllProduct(): Promise<ProductDto[]> {
    const result = await this.productsRepository.find();

    const data: ProductDto[] = result.map((product) => ({
      code: product.code,
      barCode: product.barCode,
      name: product.name,
      description: product.description,
      price: product.price,
      amount: product.amount,
      compatibility: product.compatibility,
      avatar: product.avatar,
      oem: product.oem,
      section: product.section,
    }));

    return data;
  }

  async findByIdProduct(code: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { code } });
    if (!product) {
      throw new NotFoundException(`No hay producto con id ${code}`);
    }
    return product;
  }

  async findRandomProducts(): Promise<Product[]> {
    const randomProducts = await this.productsRepository
      .createQueryBuilder("product")
      .orderBy("RANDOM()")
      .take(8)
      .getMany();

    return randomProducts;
  }

  async findBySectionProduct(section: string): Promise<Product[]> {
    if (!section) {
      throw new NotFoundException(
        `El valor de la sección no puede ser nulo o vacío`,
      );
    }
    console.log(section);
    const products = await this.productsRepository.find({ where: { section } });
    if (products.length === 0) {
      throw new NotFoundException(`No hay productos en la sección ${section}`);
    }
    return products;
  }

  async findBySearch(criteria: any): Promise<ProductDto[]> {
    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    if (criteria.code) {
      queryBuilder.andWhere("product.code = :code", {
        code: criteria.code,
      });
    }
    if (criteria.barCode) {
      queryBuilder.andWhere("product.codigo_barras = :barCode", {
        barCode: criteria.barCode,
      });
    }
    if (criteria.name) {
      queryBuilder.andWhere("product.nombre LIKE :name", { name: `%${criteria.name}%` });
    }
    if (criteria.description) {
      queryBuilder.andWhere("product.descripcion LIKE :description", {
        description: `%${criteria.description}%`,
      });
    }
    if (criteria.price) {
      queryBuilder.andWhere("product.precio = :price", {
        price: criteria.price,
      });
    }
    if (criteria.amount) {
      queryBuilder.andWhere("product.cantidad = :amount", {
        amount: criteria.amount,
      });
    }
    if (criteria.compatibility) {
      queryBuilder.andWhere("product.compatibilidad LIKE :compatibility", {
        compatibility: `%${criteria.compatibility}%`,
      });
    }
    if (criteria.oem) {
      queryBuilder.andWhere("product.oem LIKE :oem", {  oem: `%${criteria.oem}%` });
    }
    if (criteria.section) {
      queryBuilder.andWhere("product.campo_predefinido = :section", {
        section: criteria.section,
      });
    }
    // Añade más condiciones según sea necesario

    try {
      console.log(queryBuilder);
      console.log(criteria);
      const products = await queryBuilder.getMany();
      console.log(products);
      const data: ProductDto[] = products.map((product) => ({
        code: product.code,
        barCode: product.barCode,
        name: product.name,
        description: product.description,
        price: product.price,
        amount: product.amount,
        compatibility: product.compatibility,
        avatar: product.avatar,
        oem: product.oem,
        section: product.section,
      }));
      return data;
    } catch (error) {
      throw new Error(`Error al ejecutar la consulta: ${error.message}`);
    }
  }
  async findProductsByCodes(codes: string[]): Promise<ProductDto[]> {
    const result = await this.productsRepository.find({
      where: { code: In(codes) },
    });

    const data: ProductDto[] = result.map((product) => ({
      code: product.code,
      barCode: product.barCode,
      name: product.name,
      description: product.description,
      price: product.price,
      amount: product.amount,
      compatibility: product.compatibility,
      avatar: product.avatar,
      oem: product.oem,
      section: product.section,
    }));

    return data;
  }
}
