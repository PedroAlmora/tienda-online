import { useEffect, useState } from "react";
import { Modal, Button, List, Typography, Space } from "antd";
import { getProductCart } from "../infrastructure";
import Swal from "sweetalert2";

const { Title, Text } = Typography;

interface CartItem {
  code: string;
  quantity: number;
}

interface Product {
  code: string;
  name: string;
  price: string;
}

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export function Cart({ open, onClose }: CartProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [emailUser, setEmailUser] = useState<string>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.auth) {
        setEmailUser(parsedUser.email);
      }
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductCart();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const storedCartItems = JSON.parse(
      localStorage.getItem("productsCart") || "[]"
    ) as CartItem[];
    setCartItems(storedCartItems);
  }, [open]);

  const updateCartItemQuantity = (code: string, newQuantity: number) => {
    const updatedCartItems = cartItems
      .map((item) =>
        item.code === code ? { ...item, quantity: newQuantity } : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCartItems);
    localStorage.setItem("productsCart", JSON.stringify(updatedCartItems));
  };

  const handleIncrement = (code: string) => {
    const item = cartItems.find((item) => item.code === code);
    if (item) {
      updateCartItemQuantity(code, item.quantity + 1);
    }
  };

  const handleDecrement = (code: string) => {
    const item = cartItems.find((item) => item.code === code);
    if (item) {
      updateCartItemQuantity(code, item.quantity - 1);
    }
  };

  const handleOrder = async () => {
    const email = emailUser;
    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          items: cartItems,
          totalPrice: totalPrice,
        }),
      });

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pedido realizado con exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
        onClose();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Ocurrio un error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al realizar el pedido",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.code === item.code);
    const price = product ? parseFloat(product.price) : 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <Modal
      title="Carrito de Compras"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="order" type="primary" onClick={handleOrder}>
          Realizar Pedido
        </Button>,
      ]}
      width={600}
    >
      <List
        dataSource={cartItems}
        renderItem={(item) => {
          const product = products.find((p) => p.code === item.code);

          if (!product) return null;

          return (
            <List.Item
              actions={[
                <Button
                  key="decrement"
                  onClick={() => handleDecrement(item.code)}
                >
                  -
                </Button>,
                <Button
                  key="increment"
                  onClick={() => handleIncrement(item.code)}
                >
                  +
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`Código: ${item.code}`}
                description={`${product.name} - ${parseFloat(
                  product.price
                ).toFixed(2)} €`}
              />
              <div>
                <Text strong>Cantidad:</Text> {item.quantity}
              </div>
            </List.Item>
          );
        }}
      />
      <Space direction="vertical" style={{ display: "flex", marginTop: 16 }}>
        <Title level={4}>Precio Total: {totalPrice.toFixed(2)} €</Title>
      </Space>
    </Modal>
  );
}
