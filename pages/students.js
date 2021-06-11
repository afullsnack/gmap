import { useState } from "react";
import withLayout from "components/globalLayout.js";
import Col from "ui/col";
import Row from "ui/row";
import Input from "ui/input";
import Button from "ui/button";
import Select from "ui/select";

const { Option } = Select;

function Students() {
  const [matricNo, setMatricNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [programme, setProgramme] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [lga, setLGA] = useState("");
  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{ margin: 0, padding: 0, width: "100%", height: "100%" }}
      >
        <Col span={6}></Col>
        <Col
          span={12}
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "column",
            alignitems: "cemter",
            justifyContent: "space-evenly",
          }}
        >
          <Input
            type="text"
            placeholder="Matric No."
            size="large"
            value={matricNo}
            onChange={(e) => setMatricNo(e.taget.value)}
          />
          <Row gutter={16}>
            <Col span={12}>
              <Input
                type="text"
                placeholder="First Name"
                size="large"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Input
                type="text"
                placeholder="Last Name"
                size="large"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Input
                type="email"
                placeholder="Email"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Input
                type="phone"
                placeholder="Phone"
                size="large"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Input
                type="text"
                placeholder="Faculty"
                size="large"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Input
                type="text"
                placeholder="Department"
                size="large"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Input
                type="text"
                placeholder="Country"
                size="large"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Input
                type="text"
                placeholder="State"
                size="large"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Input
                type="text"
                placeholder="L.G.A"
                size="large"
                value={lga}
                onChange={(e) => setLGA(e.target.value)}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Input
                type="text"
                placeholder="Level"
                size="large"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Select
                defaultValue="bsc"
                onChange={(e) => setProgramme(e.target.value)}
                size="large"
              >
                <Option value="bsc">B.Sc</Option>
                <Option value="msc">M.Sc</Option>
                <Option value="bng">B.Eng</Option>
                <Option value="diploma">Diploma</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Button
                onClick={(e) => {
                  // onclick take all the data and put in the student data
                }}
                type="link"
                size="large"
                block
                style={{ backgroundColor: "#40a9ff", color: "#FFF" }}
              >
                Update
              </Button>
            </Col>
            <Col span={6}>
              <Button onClick={(e) => {}} type="ghost" size="large" block>
                Export
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={6}></Col>
      </Row>
    </>
  );
}

export default withLayout(Students);
