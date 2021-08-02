import styles from "../styles/Home.module.css";
import Navigation from "components/navigation.js";
import Layout from "antd/lib/layout";
import { Button } from "antd";

const { Header, Content, Footer } = Layout;

export default function withLayout(BaseComp) {
  function Page(props) {
    return (
      <Layout className={styles.full_view}>
        <Header>
          <Navigation />
        </Header>
        <Content style={{ padding: 20 }}>
          <BaseComp {...props} />
        </Content>
        <Footer style={{ background: "#001529", color: "white" }}>
          <span>Student management system with Geolocation</span>
          <br />
          <span>Project by Emmanuel Onu</span>
        </Footer>
      </Layout>
    );
  }

  return Page;
}
