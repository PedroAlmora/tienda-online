import { List, Button, Space } from 'antd';
import { ProductInterface } from '../features';

interface CartProps{
    cartItems: ProductInterface[];
    removeFromCart: (id: string)=> void;
    updateQuantity: (id: string, amount: number)=> void
}

export function CartProduct({ cartItems, removeFromCart, updateQuantity }: CartProps) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={cartItems}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Space size="middle">
              <Button onClick={() => updateQuantity(item.id, item.amount - 1)}>-</Button>
              <Button onClick={() => updateQuantity(item.id, item.amount + 1)}>+</Button>
              <Button onClick={() => removeFromCart(item.id)}>Eliminar</Button>
            </Space>
          ]}
        >
          <List.Item.Meta
            title={item.name}
            description={`Precio: $${item.price.toFixed(2)} - Cantidad: ${item.amount}`}
          />
          <div>Total: ${(item.price * item.amount).toFixed(2)}</div>
        </List.Item>
      )}
    />
  );
}
