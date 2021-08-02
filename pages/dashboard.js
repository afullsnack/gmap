import React, { useRef, useEffect, useState } from "react";
import withLayout from "components/globalLayout.js";
import { applySession } from "next-session";
import Link from "next/link";
import Head from "next/head";
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
import message from "ui/message";
import style from "../styles/Home.module.css";
import { getCurrentPosition } from "../lib/geolocation";
import { useRouter } from "next/router";

function Dashboard({ user }) {
  const router = useRouter();
  // user = JSON.parse(user);
  // if (!user || user == null) {
  //   message.error("You have to login to access this page");
  //   router.push("/");
  // }
  const GradingCard = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        <Card title="Grades" extra={<SnippetsOutlined />} hoverable>
          <Card.Meta
            title="Grading info"
            description={
              <span className={style.dashboard_primary_span}>
                View grading info <ArrowRightOutlined />{" "}
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

  // const mapRef = useRef();
  const [position, setCoords] = useState([8.8493724, 7.8950405]);
  useEffect(async () => {
    console.log(user);
    user
      ? console.log("User in session", user)
      : console.log("no user in session");

    const here = {
      apiKey: "lGKTZBcbuYZSIFESrHSNqgvaJkMfobEPSafo_3ACcDo",
    };
    const style = ["reduced.night", "normal.day"];

    const hereTileUrl = `https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${style[0]}/{z}/{x}/{y}/512/png8?apiKey=${here.apiKey}&ppi=320`;
    const hereNormalDayTile = `https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${style[1]}/{z}/{x}/{y}/512/png8?apiKey=${here.apiKey}&ppi=320`;
    const hereStreetMap = `https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${here.apiKey}&ppi=320`;
    const nightLayer = L.tileLayer(hereTileUrl);
    const dayLayer = L.tileLayer(hereNormalDayTile);
    const streetLayer = L.tileLayer(hereStreetMap);
    const map = L.map("map", {
      center: position,
      zoom: 10,
      layers: [nightLayer, dayLayer],
    });
    map.attributionControl.addAttribution("&copy; HERE 2019");
    var schoolMarker = L.marker(map.getCenter())
      .bindPopup("Nasarawa State University Keffi")
      .addTo(map);

    var circle = L.circle(map.getCenter(), {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.5,
      radius: 700,
    }).addTo(map);
    var baseMaps = {
      "Night Map": nightLayer,
      "Day Map": dayLayer,
    };

    var streetMap = {
      "Street Map": streetLayer,
    };

    L.control.layers(baseMaps, streetMap).addTo(map);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        console.log(latitude, longitude);
        // coords = { longitude, latitude };
        setCoords([latitude, longitude]);
        map.setView([latitude, longitude]);
        L.marker([latitude, longitude])
          .bindPopup("My current location")
          .openPopup()
          .addTo(map);
      },
      onPosError,
      {
        enableHighAccuracy: true,
      }
    );

    // TODO: check if is admin to get every one elses location

    const onPosError = (error) => {
      console.error(error);
      throw error;
    };

    return () => {
      map.off();
      map.remove();
      // var container = L.DomUtil.get("map");
      // if (container != null) {
      //   container._leaflet_id = null;
      // }
    };
  }, [position]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"></script>
      </Head>
      <Row gutter={[8, 8]} style={{ marign: 0, padding: 0, width: "100%" }}>
        {/* <Col span={8}>
          <Link href="/grading" passHref>
            <GradingCard />
          </Link>
        </Col> */}
        <Col span={12}>
          <Link href="/courses" passHref>
            <CourseCard />
          </Link>
        </Col>
        <Col span={12}>
          <Link href="/students" passHref>
            <StudentCard />
          </Link>
        </Col>
        <Col span={24} style={{ height: 400 }}>
          <div
            id="map"
            style={{ width: "100%", height: "100%", backgroundColor: "teal" }}
          ></div>
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
  // console.warn(user, "Stringified user");

  // if (!req?.session?.user) return { props: {} };
  return {
    props: { user },
  };
}
