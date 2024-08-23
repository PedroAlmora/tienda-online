import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
    @ApiProperty()
    code: string;

    @ApiProperty()
    barCode: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    oem: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    compatibility: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    section: string;
}

export class ProductCodesDto {
    codes: string[];
  }