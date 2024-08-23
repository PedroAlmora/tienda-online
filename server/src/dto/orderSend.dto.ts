

class OrderItemDto {
  code: string;

  quantity: number;

  price: number;
}

export class OrderDto {

  email: string;

  items: OrderItemDto[];

  totalPrice: number;
}
