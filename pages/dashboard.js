import React from "react";
import withLayout from "components/globalLayout.js";
import { applySession } from "next-session";
import Link from "next/link";
import { sessionOptions } from "../lib/config";
import {
  SnippetsOutlined,
  OrderedListOutlined,
  DatabaseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import Row from "ui/row";
import Col from "ui/col";
import Card from "ui/card";
import Button from "ui/button";
import style from "../styles/Home.module.css";

function Dashboard() {
  const ClassCard = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Card title="Classes" extra={<SnippetsOutlined />} hoverable>
          <Card.Meta
            title="Current Classes"
            description={
              <span className={style.dashboard_primary_span}>
                View current classes <ArrowRightOutlined />{" "}
              </span>
            }
          />
        </Card>
      </a>
    );
  });
  const CourseCard = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Card title="Courses" extra={<OrderedListOutlined />} hoverable>
          <Card.Meta
            title="Current Courses"
            description={
              <span className={style.dashboard_primary_span}>
                View current courses <ArrowRightOutlined />{" "}
              </span>
            }
          />
        </Card>
      </a>
    );
  });
  const StudentCard = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Card title="My Data" extra={<DatabaseOutlined />} hoverable>
          <Card.Meta
            title="Edit Data"
            description={
              <span className={style.dashboard_primary_span}>
                Edit student data <ArrowRightOutlined />{" "}
              </span>
            }
          />
        </Card>
      </a>
    );
  });

  return (
    <>
      <Row gutter={[8, 8]} style={{ marign: 0, padding: 0, width: "100%" }}>
        <Col span={8}>
          <Link href="/classes" passHref>
            <ClassCard />
          </Link>
        </Col>
        <Col span={8}>
          <Link href="/courses" passHref>
            <CourseCard />
          </Link>
        </Col>
        <Col span={8}>
          <Link href="/students" passHref>
            <StudentCard />
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default withLayout(Dashboard);

export async function getServerSideProps({ req, res }) {
  await applySession(req, res, sessionOptions);
  console.log("USER SESSION from server side props", req?.session?.user);

  let user = JSON.stringify(req?.session?.user);

  if (!user) return { props: {} };
  return {
    props: { user },
  };
}
