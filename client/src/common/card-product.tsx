import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Space, Tooltip } from "antd";
import { useState } from "react";
import { ProductDetailModal } from "./product-detail";

interface CardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  onBadgeClick: () => void;
  countBadge: number;
  onClick: () => void;
}

export function CardProduct({
  image,
  title,
  description,
  price,
  onBadgeClick,
  countBadge,
  onClick,
}: CardProps) {
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "/tmp_img.png";
  };

  const [isModalOpenDetail, setIsModalOpenDetail] = useState<boolean>(false);

  const openModalDetailProduct = () => {
    setIsModalOpenDetail(true);
  };

  const closeModalDetailProduct = () => {
    setIsModalOpenDetail(false);
  };
  return (
    <>
      <Card
        hoverable
        cover={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="Product"
              src={image}
              onError={handleImageError}
              style={{
                width: "90%",
                height: "auto",
                maxHeight: "200px",
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid #e8e8e8",
                marginTop: "10px",
              }}
            />
          </div>
        }
      >
        <Card.Meta
          title={
            <Tooltip title={title}>
              <span>{`${title}`}</span>
            </Tooltip>
          }
          description={
            description ? (
              <Space>
                <Button
                  type="text"
                  icon={<EyeOutlined style={{ color: "green" }} />}
                  onClick={() => openModalDetailProduct()}
                >
                  Ver descripción
                </Button>
              </Space>
            ) : (
              <Space>
                <span>No tiene descripción el producto</span>
              </Space>
            )
          }
        />
        <Space
          direction="vertical"
          style={{ width: "100%", marginTop: "10px" }}
        >
          <span>{`Precio: ${price} €`}</span>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Button
              icon={<ShoppingCartOutlined />}
              type="primary"
              onClick={() => onClick()}
            >
              Añadir al carrito
            </Button>
            <div
              onClick={() => onBadgeClick()}
              style={{ position: "absolute", top: -10, right: -8 }}
            >
              <Badge count={countBadge || 0} />
            </div>
          </div>
        </Space>
      </Card>
      <ProductDetailModal
        open={isModalOpenDetail}
        close={closeModalDetailProduct}
        code={description}
      />
    </>
  );
}
