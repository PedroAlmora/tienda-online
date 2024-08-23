import { Alert, Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { ProductInterface, getProductMarca } from "..";
import { CardProduct } from "../../../common";
import { useParams } from "react-router-dom";

const ProductMarcaList = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setCartItems] = useState<{ code: string; quantity: number }[]>([]);
  const [cartCount, setCartCount] = useState<{ [key: string]: number }>({});
  const { marca } = useParams<{ marca: string }>();

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        if (marca) {
          const productData = await getProductMarca(marca);
          setProducts(productData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [marca]);

  const saveCartItemsToLocalStorage = (
    items: { code: string; quantity: number }[]
  ) => {
    const nonZeroItems = items.filter((item) => item.quantity > 0);
    localStorage.setItem("productsCart", JSON.stringify(nonZeroItems));
  };

  const handleAddToCart = (item: string) => {
    const updatedCartCount = { ...cartCount };
    updatedCartCount[item] = (updatedCartCount[item] || 0) + 1;
    setCartCount(updatedCartCount);

    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (cartItem) => cartItem.code === item
      );
      let updatedItems;
      if (itemIndex !== -1) {
        updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity++;
      } else {
        updatedItems = [...prevItems, { code: item, quantity: 1 }];
      }

      saveCartItemsToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const handleBadgeClick = (item: string) => {
    const updatedCartCount = { ...cartCount };
    if (updatedCartCount[item]) {
      updatedCartCount[item] -= 1;
      if (updatedCartCount[item] === 0) {
        delete updatedCartCount[item];
      }
    }
    setCartCount(updatedCartCount);

    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((cartItem) =>
          cartItem.code === item && cartItem.quantity > 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0);

      saveCartItemsToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  if (isLoading) {
    return (
      <div style={{ alignContent: "center", alignItems: "center" }}>
        <Spin tip="Cargando...">
          <Alert
            type="info"
            message="Cargando productos"
            description="Se están obteniendo los productos desde los almacenes"
          />
        </Spin>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src="/tmp_img.png"
          alt="Store Icon"
          style={{
            width: "80%",
            height: "80px",
            marginBottom: "15px",
          }}
        />
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            margin: "0",
          }}
        >
          No hay elementos para mostrar
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            marginTop: "10px",
          }}
        >
          Parece que no hay productos disponibles con este nombre.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {products.map((product, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <CardProduct
              image={product.avatar || "/tmp_img.png"}
              title={product.name}
              description={product.code}
              price={product.price.toString()}
              onBadgeClick={() => handleBadgeClick(product.code)}
              countBadge={cartCount[product.code]}
              onClick={() => handleAddToCart(product.code)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductMarcaList;
