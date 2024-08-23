import React, { useState } from 'react';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface CartBadgeProps {
    onUpdateCart: (item: number) => void;
  }

  const CartBadge: React.FC<CartBadgeProps> = ({ onUpdateCart }) => {
    const [cartItems] = useState<{ id: number; quantity: number }[]>([]);

    return (
        <Badge count={cartItems.length} offset={[10, 0]}>
            <ShoppingCartOutlined
                style={{
                    color: 'white',
                    marginRight: '20px',
                    fontSize: '20px'
                }}
                onClick={() => { alert('Mostrar carrito') }}
            />
        </Badge>
    );
};

export default CartBadge;