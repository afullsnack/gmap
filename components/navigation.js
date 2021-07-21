import Menu from "antd/lib/menu";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [url, setUrl] = useState(router.asPath);
  return (
    <Menu
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={["/dashboard"]}
      selectedKeys={[url]}
      onSelect={({ item, key, selected }) => {
        // console.info(item, key, selected);
        setUrl(key);
        router.push(key);
      }}
    >
      <Menu.Item key="/dashboard">Dashboard</Menu.Item>
      <Menu.Item key="/courses">Course Info</Menu.Item>
      <Menu.Item key="/classes">Classes</Menu.Item>
      <Menu.Item key="/students">Student Data</Menu.Item>
      <Menu.Item key="/grading">Grading Info</Menu.Item>
    </Menu>
  );
}
