import { Key, useEffect, useState } from "react";
import { Modal, Button, Row, Col, Typography, Divider, Image } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { getProductByCodeDetail, ProductInterface } from "../features";

interface ProductDetailModalProps {
  open: boolean;
  close: () => void;
  code: string;
}

const { Paragraph } = Typography;

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  close,
  code,
}) => {
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState<boolean>(false);
  const [compatibilityExpanded, setCompatibilityExpanded] = useState<boolean>(false);
  const [oemExpanded, setOemExpanded] = useState<boolean>(false);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "/tmp_img.png";
  };

  useEffect(() => {
    if (code) {
      const fetchProduct = async () => {
        try {
          const productData = await getProductByCodeDetail(code);
          setProduct(productData);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
      fetchProduct();
    }
  }, [code]);

  if (!product) {
    return null;
  }

  const handleDescriptionToggle = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  const handleCompatibilityToggle = () => {
    setCompatibilityExpanded(!compatibilityExpanded);
  };

  const handleOemToggle = () => {
    setOemExpanded(!oemExpanded);
  };

  return (
    <Modal
      title="Detalles del Producto"
      open={open}
      onCancel={close}
      footer={null}
      width={800}
    >
      <Row gutter={16}>
        <Col span={8} style={{ textAlign: "center" }}>
          <Image
            src={product.avatar || "/tmp_img.png"}
            alt={product.name}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
            onError={handleImageError}
          />
        </Col>
        <Col span={16}>
          {product.oem && (
            <>
              <Paragraph>
                <strong>OEM:</strong>
              </Paragraph>
              {oemExpanded ? (
                <div>
                  {product.oem
                    .split("\r\n")
                    .map((item: string, index: Key | null | undefined) => (
                      <div key={index} style={{ paddingLeft: 10 }}>
                        {item.replace("*", "")}
                      </div>
                    ))}
                </div>
              ) : (
                <div></div>
              )}
              <Button
                type={oemExpanded ? "default" : "primary"}
                icon={oemExpanded ? <MinusOutlined /> : <PlusOutlined />}
                onClick={handleOemToggle}
              >
                {oemExpanded ? "Ver menos" : "Ver más"}
              </Button>
              <Divider />
            </>
          )}
          {product.description && (
            <>
              <Paragraph>
                <strong>Descripción:</strong>
              </Paragraph>
              {descriptionExpanded ? (
                <div>
                  {product.description
                    .split("\r\n")
                    .map((item: string, index: Key | null | undefined) => (
                      <div key={index} style={{ paddingLeft: 10 }}>
                        {item.replace("*", "")}
                      </div>
                    ))}
                </div>
              ) : (
                <div></div>
              )}
              <Button
                type={descriptionExpanded ? "default" : "primary"}
                icon={descriptionExpanded ? <MinusOutlined /> : <PlusOutlined />}
                onClick={handleDescriptionToggle}
              >
                {descriptionExpanded ? "Ver menos" : "Ver más"}
              </Button>
              <Divider />
            </>
          )}
          {product.compatibility && (
            <>
              <Paragraph>
                <strong>Compatibilidad:</strong>
              </Paragraph>
              {compatibilityExpanded ? (
                <div>
                  {product.compatibility
                    .split(";")
                    .map((item: string, index: Key | null | undefined) => (
                      <div key={index} style={{ paddingLeft: 10 }}>
                        {item}
                      </div>
                    ))}
                </div>
              ) : (
                <div></div>
              )}
              <Button
                type={compatibilityExpanded ? "default" : "primary"}
                icon={compatibilityExpanded ? <MinusOutlined /> : <PlusOutlined />}
                onClick={handleCompatibilityToggle}
              >
                {compatibilityExpanded ? "Ver menos" : "Ver más"}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Modal>
  );
};
