import { useState } from "react";
import withLayout from "components/globalLayout.js";
import { applySession } from "next-session";
import Col from "ui/col";
import Row from "ui/row";
import Input from "ui/input";
import Button from "ui/button";
import Select from "ui/select";
import message from "ui/message";
import { sessionOptions } from "../lib/config";
import { updateStudentData } from "../lib/user";
import Student from "../models/Student";

const { Option } = Select;

function Students({ user, student }) {
  user = JSON.parse(user);
  student = JSON.parse(student);
  console.log(user, student);

  const [matricNo, setMatricNo] = useState(student?.matric_no ?? "");
  const [firstname, setFirstName] = useState(student?.firstname ?? "");
  const [lastname, setLastName] = useState(student?.lastname ?? "");
  const [level, setLevel] = useState(student?.currentLevel ?? "");
  const [semester, setSemester] = useState(student?.semester ?? "");
  const [email, setEmail] = useState(student?.email ?? "");
  const [phone, setPhone] = useState(student?.phone ?? "");
  const [faculty, setFaculty] = useState(student?.faculty ?? "");
  const [department, setDepartment] = useState(student?.department ?? "");
  const [programme, setProgramme] = useState(student?.programme ?? "B.Sc");
  const [country, setCountry] = useState(student?.country ?? "");
  const [state, setState] = useState(student?.state ?? "");
  const [lga, setLGA] = useState(student?.lga ?? "");
  const [loading, setLoading] = useState(false);
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
            onChange={(e) => setMatricNo(e.target.value)}
          />
          <Row gutter={16}>
            <Col span={12}>
              <Input
                type="text"
                placeholder="First Name"
                size="large"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <Input
                type="text"
                placeholder="Last Name"
                size="large"
                value={lastname}
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
            <Col span={9}>
              <Input
                type="text"
                placeholder="Level"
                size="large"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </Col>
            <Col span={9}>
              <Input
                type="text"
                placeholder="Semester"
                size="large"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                defaultValue={programme}
                onChange={(value) => setProgramme(value)}
                size="large"
              >
                <Option value="B.Sc">B.Sc</Option>
                <Option value="M.Sc">M.Sc</Option>
                <Option value="B.Eng">B.Eng</Option>
                <Option value="Diploma">Diploma</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Button
                onClick={async (e) => {
                  setLoading(true);
                  if (
                    matricNo == "" ||
                    firstname == "" ||
                    lastname == "" ||
                    level == "" ||
                    semester == "" ||
                    email == "" ||
                    phone == "" ||
                    faculty == "" ||
                    department == "" ||
                    country == "" ||
                    state == "" ||
                    lga == "" ||
                    programme == ""
                  ) {
                    setLoading(false);
                    return message.error("Values can't be empty");
                  }
                  // onclick take all the data and put in the student data
                  const [data, error] = await updateStudentData({
                    matricNo,
                    firstname,
                    lastname,
                    level,
                    semester,
                    email,
                    phone,
                    faculty,
                    department,
                    country,
                    state,
                    lga,
                    programme,
                  });
                  if (data != null) {
                    setLoading(false);
                    message.success(data?.message);
                    console.log(data);
                  } else {
                    message.error(error.message);
                    console.error(error);
                  }
                }}
                loading={loading}
                type="link"
                size="large"
                block
                style={{ backgroundColor: "#40a9ff", color: "#FFF" }}
              >
                Submit
              </Button>
            </Col>
            {/* <Col span={6}>
              <Button onClick={(e) => {}} type="ghost" size="large" block>
                Export
              </Button>
            </Col> */}
          </Row>
        </Col>
        <Col span={6}></Col>
      </Row>
    </>
  );
}

export default withLayout(Students);

export async function getServerSideProps({ req, res }) {
  try {
    await applySession(req, res, sessionOptions);
    console.log("USER SESSION from server side props", req?.session?.user);

    let student = req?.session?.user
      ? await Student.findOne({ email: req?.session?.user?.email })
      : null;
    console.log(student, "student");

    let user = JSON.stringify(req?.session?.user);
    student = JSON.stringify(student);

    // if (!req?.session?.user) return { props: {} };
    return {
      props: { user, student },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
