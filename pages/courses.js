import React, {
  useState,
  createContext,
  useEffect,
  useRef,
  useContext,
} from "react";
import withLayout from "components/globalLayout.js";
import { applySession } from "next-session";
import { sessionOptions } from "../lib/config";
import Row from "ui/row";
import Col from "ui/col";
import Card from "ui/card";
// import Button from "ui/button";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
} from "antd";

import Student from "../models/Student";
import Course from "../models/Course";

import style from "../styles/Home.module.css";
// import { connectDB } from "../lib/db";
// connectDB();

// import React, { , useState,  } from "react";
// import { Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "code",
        dataIndex: "code",
        width: "20%",
        editable: true,
      },
      {
        title: "title",
        dataIndex: "title",
        width: "40%",
        editable: true,
      },
      {
        title: "unit",
        dataIndex: "unit",
        width: "10%",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        width: "20%",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: "0",
          code: "MTH 111",
          title: "Elementary Mathematics (Algebra and Trigonometry)",
          unit: "3",
        },
        {
          key: "1",
          code: "MTH 112",
          title: "Elementary Mathematics (Vectors Geometry and Dynamics)",
          unit: "3",
        },
      ],
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      code: `Code`,
      title: "Course title",
      unit: `credit unit`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add course
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

function Courses({ user, status }) {
  console.log("user session", user);
  console.log("Student status", status);
  status = JSON.parse(status);
  user = JSON.parse(user);
  return (
    <>
      <Row gutter={8} style={{ margin: 0, padding: 0, width: "100%" }}>
        <Col span={24}>
          {status == "no_data" ? (
            <p>
              You need to add your student info before you can add courses. Go
              to <a href="/students">Student Info</a>
            </p>
          ) : (
            <EditableTable />
          )}
        </Col>
      </Row>
    </>
  );
}

export default withLayout(Courses);

export async function getServerSideProps({ req, res }) {
  try {
    await applySession(req, res, sessionOptions);
    console.log("USER SESSION from server side props", req);
    let user = JSON.stringify(req?.session?.user);
    var courses;

    // check is the student has set their data and that it matches their account
    let studentCount = await Student.count();
    const getStatus = async () => {
      if (studentCount <= 0 || studentCount == null) {
        return "no_data";
      } else {
        var data = await Student.findOne({ email: req?.session?.user?.email });
        courses = await Course.findOne({
          level: data?.currentLevel,
          semester: data?.semester,
        });
        return data != null ? "yes_data" : "no_data";
      }
    };
    let status = await getStatus();
    console.log(status);
    status = JSON.stringify(status);
    courses = courses ? JSON.stringify(courses) : null;

    if (!user) return { props: {} };
    return {
      props: { user, status, courses },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
