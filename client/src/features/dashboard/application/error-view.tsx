import { theme } from 'antd';
import { Content } from 'antd/es/layout/layout';

export function ErrorView() {
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <Content style={{ margin: '24px 16px 0' }}>
      <div style={{ minHeight: 360, background: colorBgContainer }}>
        Error
      </div>
    </Content>
  );
}