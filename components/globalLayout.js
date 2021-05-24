import styles from "../styles/Home.module.css";
import Navigation from "components/navigation.js";
import Layout from "antd/lib/layout";

const { Header, Content, Footer } = Layout;

export default function withLayout(BaseComp) {
  function Page() {
    return (
      <Layout className={styles.full_view}>
        <Header>
          <Navigation />
        </Header>
        <Content style={{ padding: 20 }}>
          <BaseComp />
        </Content>
        <Footer>
          <h1>Footer</h1>
        </Footer>
      </Layout>
    );
  }

  return Page;
}
