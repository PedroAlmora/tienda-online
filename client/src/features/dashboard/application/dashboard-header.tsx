import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { LoginOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProductMenu from "./dashboard-menu";
import { DashboardDrawer } from ".";
import { Cart } from "../../cart";

const { Header } = Layout;

interface DashboardHeaderProps {
  footerRef: React.RefObject<HTMLDivElement | null>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ footerRef }) => {
  const isSmallScreen = window.innerWidth <= 768;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.auth) {
        setUser(parsedUser.username.toUpperCase());
      }
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showCart = () => {
    setOpenCart(true);
  };

  const onCloseCart = () => {
    setOpenCart(false);
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Header
      style={{
        color: "white",
        background: "rgba(3, 25, 225, 0.7)",
        padding: "0 20px",
        borderRadius: "15px",
      }}
    >
      <div
        className="logo"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {!isSmallScreen && user && (
            <>
              <img
                src="/tmp_img.png"
                alt="Nombre de la Tienda"
                style={{ width: "100px", height: "auto", marginRight: "20px" }}
              />
              <span
                style={{ color: "white", cursor: "pointer", fontSize: "20px" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <b>TIENDA-ONLINE</b>
              </span>
            </>
          )}
          {isSmallScreen && user && (
            <img
              src="/tmp_img.png"
              alt="Nombre de la Tienda"
              style={{ width: "100px", height: "auto", marginRight: "20px" }}
            />
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {!isSmallScreen && user && (
              <>
                <span
                  style={{
                    color: "white",
                    cursor: "pointer",
                    marginRight: "20px",
                    marginLeft: "10px",
                  }}
                  onClick={showDrawer}
                >
                  Productos
                </span>
                <span
                  style={{
                    color: "white",
                    cursor: "pointer",
                    marginRight: "20px",
                    marginLeft: "10px",
                  }}
                  onClick={() => scrollToFooter()}
                >
                  Contáctenos
                </span>
              </>
            )}
            {isSmallScreen && user && (
              <div
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              >
                <span
                  style={{
                    color: "white",
                    cursor: "pointer",
                    marginRight: "20px",
                    marginLeft: "10px",
                  }}
                  onClick={showDrawer}
                >
                  Productos
                </span>
              </div>
            )}
          </div>
          <ShoppingCartOutlined
            style={{
              color: "white",
              marginRight: "20px",
              fontSize: "24px",
            }}
            onClick={() => {
              showCart();
            }}
          />
          {user && (
            <>
              {!isSmallScreen && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  <span
                    style={{
                      color: "white",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  ></span>
                  <LoginOutlined
                    style={{
                      color: "white",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  />
                  <span
                    style={{
                      color: "white",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    {user}
                  </span>
                </div>
              )}
              {isSmallScreen && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  <span
                    style={{
                      color: "white",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    {user}
                  </span>
                </div>
              )}
            </>
          )}
          {!user && !isSmallScreen && (
            <div
              onClick={() => {
                navigate("/login");
              }}
            >
              <LoginOutlined
                style={{
                  color: "white",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              />
              <span
                style={{
                  color: "white",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                Iniciar Sesión
              </span>
            </div>
          )}
          {!user && isSmallScreen && (
            <div
              onClick={() => {
                navigate("/login");
              }}
            >
              <LoginOutlined
                style={{
                  color: "white",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              />
            </div>
          )}
          <DashboardDrawer
            open={open}
            onClose={onClose}
            children={<ProductMenu />}
          />
          <Cart open={openCart} onClose={onCloseCart} />
        </div>
      </div>
    </Header>
  );
};

export default DashboardHeader;
