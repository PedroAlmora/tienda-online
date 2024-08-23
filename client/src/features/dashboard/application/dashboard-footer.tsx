import React, { useEffect, useRef } from 'react';
import { Layout, Row, Col, Space, Divider } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';

const { Footer } = Layout;

const DashboardFooter: React.FC = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerRef.current = footerElement;
    }
  }, []);
  return (
    <Footer style={{ textAlign: 'center' }} ref={footerRef} id='footer'>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={8}>
          <Space direction="vertical" align="center">
            <EnvironmentOutlined style={{ fontSize: '24px', color: '#ff0000' }} />
            <Divider/>
            <span style={{ fontWeight: 'bold' }}>España 28330, San Martin de la Vega, Madrid</span>
            <span style={{ fontWeight: 'bold' }}>Calle Plomo Nº4 & Calle Oro Nº 20</span>
            <span style={{ fontWeight: 'bold' }}>Portugal Sao Pedro da Torre, Valença</span>
            <span style={{ fontWeight: 'bold' }}>Estrada Nacional 13, N.º 1305</span>
            <span style={{ fontWeight: 'bold' }}>Cuba Avenida 5ta entre 40 y 42, No. 4001, Miramar, Playa, La Habana.</span>
          </Space>
        </Col>

        <Col xs={24} sm={8}>
          <Space direction="vertical" align="center">
            <PhoneOutlined style={{ fontSize: '24px', color: '#00ff00' }} />
            <Divider />
            <span style={{ fontWeight: 'bold' }}>Motor & Radiador – 91 691 36 14</span>
            <span style={{ fontWeight: 'bold' }}>Airtanks – 91 691 79 80</span>
          </Space>
        </Col>

        <Col xs={24} sm={8}>
          <Space direction="vertical" align="center">
            <MailOutlined style={{ fontSize: '24px', color: '#0000ff' }} />
            <Divider />
            <span style={{ fontWeight: 'bold' }}>tmp@tmpdiesel.com</span>
            <span style={{ fontWeight: 'bold' }}>info@tmpdiesel.com</span>
          </Space>
        </Col>
      </Row>

      <p style={{ fontWeight: 'bold', marginTop: '50px' }}>Desarrollado por Pedro Luis González Almora © 2023</p>
    </Footer>
  );
};

export default DashboardFooter;