import {
  FacebookOutlined,
  InstagramOutlined,
  LockOutlined,
  MailOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LoginFormPage, ProFormText } from "@ant-design/pro-components";
import { Divider, Space, Tabs, theme } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import LogoTienda from "../../../assets/tmp_img_out.png";
import PhotoLogin from "../../../assets/photo-login.png";
import { useNavigate } from "react-router-dom";
import { login, register } from "../infrastructure/auth.service";
import Swal from "sweetalert2";

type LoginType = "registre" | "login";

const iconStyles: CSSProperties = {
  color: "rgba(0, 0, 0, 0.2)",
  fontSize: "18px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>("login");
  const { token } = theme.useToken();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const { username, password, firstName, lastName, email } = values;

      if (loginType === "login") {
        const response = await login(username, password);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario logueado correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            auth: true,
            username: username,
            email: response.data.email
          })
        );
        navigate("/");
      } else {
        await register(username, password, firstName, lastName, email);
        Swal.fire("Usuario creado con éxito", "", "success");
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Ocurrió un error",
        text: "Verifique que los campos estén correctos",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "97.7vh",
        overflow: "hidden",
      }}
    >
      <LoginFormPage
        backgroundImageUrl={PhotoLogin}
        logo={LogoTienda}
        title="TMP-STORE"
        containerStyle={{
          backgroundColor: "white",
          backdropFilter: "blur(4px)",
          overflow: "hidden",
        }}
        style={{ overflow: "hidden" }}
        subTitle="BIENVENIDOS"
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider plain></Divider>
            <Space align="center" size={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid " + token.colorPrimaryBorder,
                  borderRadius: "50%",
                }}
              >
                <FacebookOutlined style={{ ...iconStyles, color: "#1677FF" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid " + token.colorPrimaryBorder,
                  borderRadius: "50%",
                }}
              >
                <InstagramOutlined
                  style={{ ...iconStyles, color: "#FF6A10" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: 40,
                  width: 40,
                  border: "1px solid " + token.colorPrimaryBorder,
                  borderRadius: "50%",
                }}
              >
                <TwitterOutlined style={{ ...iconStyles, color: "#1890ff" }} />
              </div>
            </Space>
          </div>
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onFinish={async (values: Record<string, any>) => {
          console.table(values);
          try {
            await handleSubmit(values);
            return true;
          } catch (error) {
            return false;
          }
        }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={"login"} tab={"Iniciar Sesión"} />
          <Tabs.TabPane key={"registre"} tab={"Registrarse"} />
        </Tabs>
        {loginType === "login" && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Usuario"}
              rules={[
                {
                  required: true,
                  message: "Debe introducir su nombre de usuario!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Contraseña"}
              rules={[
                {
                  required: true,
                  message: "Debe introducir su contraseña",
                },
              ]}
            />
          </>
        )}
        {loginType === "registre" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="username"
              placeholder={"Nombre de usuario"}
              rules={[
                {
                  required: true,
                  message: "Introduzca su nombre de usuario",
                },
              ]}
            />

            <ProFormText.Password
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="password"
              placeholder={"Contraseña"}
              rules={[
                {
                  required: true,
                  message: "Introduzca su contraseña",
                },
              ]}
            />

            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="firstName"
              placeholder={"Nombre"}
              rules={[
                {
                  required: true,
                  message: "Introduzca su nombre",
                },
              ]}
            />

            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="lastName"
              placeholder={"Apellido"}
              rules={[
                {
                  required: true,
                  message: "Introduzca su apellido",
                },
              ]}
            />

            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <MailOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name="email"
              placeholder={"Correo electrónico"}
              rules={[
                {
                  required: true,
                  message: "Introduzca su correo electrónico",
                },
                {
                  type: "email",
                  message: "Introduzca un correo electrónico válido",
                },
              ]}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        ></div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
