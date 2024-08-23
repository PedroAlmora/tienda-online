import React from "react";
import { Menu, MenuProps } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProductMenu: React.FC = () => {
  const navegate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <ShopOutlined />,
      label: <a>Neumáticos y productos relacionados</a>,
      onClick: () => navegate('productos/Neumáticos y productos relacionados'),
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: <a>Aceites y líquidos</a>,
      onClick: () => navegate('productos/Aceites y líquidos')
    },
    {
      key: "3",
      icon: <ShopOutlined />,
      label: <a>Frenos</a>,
      onClick: () => navegate('productos/Frenos')
    },
    {
      key: "4",
      icon: <ShopOutlined />,
      label: <a>Filtros</a>,
      onClick: () => navegate('productos/Filtros')
    },
    {
      key: "5",
      icon: <ShopOutlined />,
      label: <a>Motor</a>,
      onClick: () => navegate('productos/Motor')
    },
    {
      key: "6",
      icon: <ShopOutlined />,
      label: <a>Sistema limpiaparabrisas</a>,
      onClick: () => navegate('productos/Sistema limpiaparabrisas')
    },
    {
      key: "7",
      icon: <ShopOutlined />,
      label: <a>Encendido y precalentamiento</a>,
      onClick: () => navegate('productos/Encendido y precalentamiento')
    },
    {
      key: "8",
      icon: <ShopOutlined />,
      label: <a>Suspensión</a>,
    },
    {
      key: "9",
      icon: <ShopOutlined />,
      label: <a>Sistema eléctrico</a>,
      onClick: () => navegate('productos/Sistema eléctrico')
    },
    {
      key: "10",
      icon: <ShopOutlined />,
      label: <a>Amortiguación</a>,
      onClick: () => navegate('productos/Amortiguación')
    },
    {
      key: "11",
      icon: <ShopOutlined />,
      label: <a>Correas, cadenas, rodillos</a>,
      onClick: () => navegate('productos/Correas, cadenas, rodillos')
    },
    {
      key: "12",
      icon: <ShopOutlined />,
      label: <a>Sistema de refrigeración del motor</a>,
      onClick: () => navegate('productos/Sistema de refrigeración del motor')
    },
    {
      key: "13",
      icon: <ShopOutlined />,
      label: <a>Carrocería</a>,
      onClick: () => navegate('productos/Carrocería')
    },
    {
      key: "14",
      icon: <ShopOutlined />,
      label: <a>Calefacción y ventilación</a>,
      onClick: () => navegate('productos/Calefacción y ventilación')
    },
    {
      key: "15",
      icon: <ShopOutlined />,
      label: <a>Juntas y retenes</a>,
      onClick: () => navegate('productos/Juntas y retenes')
    },
    {
      key: "16",
      icon: <ShopOutlined />,
      label: <a>Escape</a>,
      onClick: () => navegate('productos/Escape')
    },
    {
      key: "17",
      icon: <ShopOutlined />,
      label: <a>Interior</a>,
      onClick: () => navegate('productos/Interior')
    },
    {
      key: "18",
      icon: <ShopOutlined />,
      label: <a>Sistema de combustible</a>,
      onClick: () => navegate('productos/Sistema de combustible')
    },
    {
      key: "19",
      icon: <ShopOutlined />,
      label: <a>Dirección</a>,
      onClick: () => navegate('productos/Dirección')
    },
    {
      key: "20",
      icon: <ShopOutlined />,
      label: <a>Embrague</a>,
      onClick: () => navegate('productos/Embrague')
    },
    {
      key: "21",
      icon: <ShopOutlined />,
      label: <a>Palier y junta homocinética</a>,
    },
    {
      key: "22",
      icon: <ShopOutlined />,
      label: <a>Remolque / piezas adicionales</a>,
      onClick: () => navegate('productos/Remolque / piezas adicionales')
    },
    {
      key: "23",
      icon: <ShopOutlined />,
      label: <a>Caja de cambios</a>,
      onClick: () => navegate('productos/Caja de cambios')
    },
    {
      key: "24",
      icon: <ShopOutlined />,
      label: <a>Aire acondicionado</a>,
    },
    {
      key: "25",
      icon: <ShopOutlined />,
      label: <a>Rodamientos</a>,
      onClick: () => navegate('productos/Rodamientos')
    },
    {
      key: "26",
      icon: <ShopOutlined />,
      label: <a>Árboles de transmisión y diferenciales</a>,
      onClick: () => navegate('productos/Árboles de transmisión y diferenciales')
    },
    {
      key: "27",
      icon: <ShopOutlined />,
      label: <a>Sensores, relés, unidades de control</a>,
      onClick: () => navegate('productos/Sensores, relés, unidades de control')
    },
    {
      key: "28",
      icon: <ShopOutlined />,
      label: <a>Accesorios para coches</a>,
      onClick: () => navegate('productos/Accesorios para coches')
    },
    {
      key: "29",
      icon: <ShopOutlined />,
      label: <a>Kits de reparación y herramientas</a>,
      onClick: () => navegate('productos/Kits de reparación y herramientas')
    },
    {
      key: "30",
      icon: <ShopOutlined />,
      label: <a>Tuberías y mangueras</a>,
      onClick: () => navegate('productos/Tuberías y mangueras')
    },
    {
      key: "31",
      icon: <ShopOutlined />,
      label: <a>Iluminación</a>,
      onClick: () => navegate('productos/Iluminación')
    },
    {
      key: "32",
      icon: <ShopOutlined />,
      label: <a>Sujeciones</a>,
      onClick: () => navegate('productos/Sujeciones')
    },
    {
      key: "33",
      icon: <ShopOutlined />,
      label: <a>TODOS</a>,
      onClick: () => navegate('productos/All')
    },
  ];

  return <Menu style={{ width: "100%" }} items={items} />;
};

export default ProductMenu;
