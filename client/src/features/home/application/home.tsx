import React, { useEffect, useState } from "react";
import { Input, Row, Col, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CategoriesSection from "./categories-section";
import { CardProduct } from "../../../common";
import { ProductInterface } from "../..";
import VideoSection from "./section-video";
import { fetchRandomProducts } from "../infrastructure";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Home: React.FC = () => {
  const [, setCartItems] = useState<{ code: string; quantity: number }[]>([]);
  const [cartCount, setCartCount] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermMarca, setSearchTermMarca] = useState("");
  const navigate = useNavigate();

  const handleSearchName = (value: string) => {
    if (value) {
      navigate(`/buscadorProductos/${value}`);
    }
  };

  const handleSearchMarca = (value: string) => {
    if (value) {
      navigate(`/buscadorProductosMarca/${value}`);
    }
  };

  useEffect(() => {
    fetchRandomProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Row gutter={16} style={{ marginBottom: "40px" }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Input
            placeholder="Buscar producto por nombre"
            value={searchTermName}
            onChange={(e) => setSearchTermName(e.target.value)}
            style={{ width: "100%" }}
            addonAfter={
              <SearchOutlined
                onClick={() => {
                  handleSearchName(searchTermName);
                }}
              />
            }
            onPressEnter={() => {
              handleSearchName(searchTermName);
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Input
            placeholder="Buscar producto por marca"
            value={searchTermMarca}
            onChange={(e) => setSearchTermMarca(e.target.value)}
            style={{ width: "100%" }}
            addonAfter={
              <SearchOutlined
                onClick={() => {
                  handleSearchMarca(searchTermMarca);
                }}
              />
            }
            onPressEnter={() => {
              handleSearchMarca(searchTermMarca);
            }}
          />
        </Col>
      </Row>

      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, rgba(255, 0, 0, 0), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))",
          margin: "20px auto",
          width: "80%",
          marginTop: "30px",
        }}
      />

      <VideoSection />

      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, rgba(255, 0, 0, 0), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))",
          margin: "20px auto",
          width: "80%",
          marginTop: "30px",
        }}
      />
      <CategoriesSection />

      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, rgba(255, 0, 0, 0), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))",
          margin: "20px auto",
          width: "80%",
          marginTop: "30px",
        }}
      />

      <Title level={3}>Productos Recomendados</Title>

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

export default Home;
