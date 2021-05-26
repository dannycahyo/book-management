import React, { lazy, Suspense } from "react";
import LandingPage from "./LandingPage";
import Logo from "./Logo";
import {
  Col,
  Layout,
  Menu,
  Row,
  Space,
  Typography,
  Breadcrumb,
  Result,
} from "antd";
import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  HomeOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Switch, Link, Route, useLocation } from "react-router-dom";

const MyBooks = lazy(() => import("./MyBooks"));
const UpComingBooks = lazy(() => import("./UpComingBooks"));

function App() {
  const { Header, Content, Footer } = Layout;
  const { pathname } = useLocation();

  return (
    <div>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <Logo />
          <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
            <Menu.Item key="/mybooks">
              <Link to="/mybooks">
                {" "}
                <Typography.Title
                  level={5}
                  style={{
                    color: "lightblue",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  My Books
                </Typography.Title>
              </Link>
            </Menu.Item>
            <Menu.Item key="/upcomingbooks">
              <Link to="/upcomingbooks">
                <Typography.Title
                  level={5}
                  style={{
                    color: "lightblue",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  Up Coming Books
                </Typography.Title>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 25px" }}>
          <Breadcrumb style={{ marginBottom: 12 }}>
            <Link to="/">
              <Breadcrumb.Item>
                Home <HomeOutlined />
              </Breadcrumb.Item>
            </Link>
            <Link to="/mybooks">
              <Breadcrumb.Item>My Books</Breadcrumb.Item>
            </Link>
            <Link to="/upcomingbooks">
              <Breadcrumb.Item>Upcoming Book</Breadcrumb.Item>
            </Link>
          </Breadcrumb>
          <div style={{ padding: 15, background: "#fff" }}>
            <Suspense
              fallback={
                <Result
                  icon={<BulbOutlined />}
                  title="Loading"
                  subTitle="Please Wait For A While"
                />
              }
            >
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/mybooks" component={MyBooks} />
                <Route exact path="/upcomingbooks" component={UpComingBooks} />
              </Switch>
            </Suspense>
          </div>
        </Content>
        <Footer
          style={{
            alignItems: "center",
            textAlign: "center",
            background: "#001529",
            color: "white",
            marginTop: 40,
          }}
        >
          <Row align="middle">
            <Col xs={24} sm={14} md={6} lg={8} xl={8} xxl={8}>
              <Logo />
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
              <Typography.Title
                level={5}
                style={{
                  color: "lightblue",
                }}
              >
                Copyright ©2020 Book App
              </Typography.Title>
            </Col>
            <Col xs={24} sm={12} md={6} lg={8} xl={8} xxl={8}>
              <Space size="large">
                <Link to="https://github.com/dannycahyo">
                  <GithubOutlined
                    style={{ fontSize: "25px", color: "lightblue" }}
                  />
                </Link>
                <Link to="https://www.linkedin.com/in/danny-cahyo/">
                  <LinkedinOutlined
                    style={{ fontSize: "25px", color: "lightblue" }}
                  />
                </Link>
                <Link to="https://www.instagram.com/danny_cahyo/">
                  <InstagramOutlined
                    style={{ fontSize: "25px", color: "lightblue" }}
                  />
                </Link>
              </Space>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
