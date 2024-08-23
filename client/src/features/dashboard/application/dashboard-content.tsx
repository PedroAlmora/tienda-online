import { Card, Spin, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useNavigation } from 'react-router-dom';

export function DashboardContent() {
  const { state } = useNavigation();
  const { token: { colorBgContainer, boxShadow } } = theme.useToken();

  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <Card
        bordered={false}
        style={{
          minHeight: 500,
          background: colorBgContainer,
          boxShadow: boxShadow,
          borderRadius: '12px',
        }}
      >
        {state === 'loading' ? <Spin /> : <Outlet />}
      </Card>
    </Content>
  );
}