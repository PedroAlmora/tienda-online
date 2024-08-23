import { Drawer } from "antd";
import type { DrawerProps } from "antd";
import { ReactNode, useState } from "react";

interface DashboardDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function DashboardDrawer(p: DashboardDrawerProps) {
  const [placement] = useState<DrawerProps["placement"]>("left");
  return (
    <Drawer
      title="Listado de Categorías"
      placement={placement}
      closable={false}
      open={p.open}
      onClose={p.onClose}
    >
      {p.children}
    </Drawer>
  );
}
