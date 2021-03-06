import React from "react"
import Select from "react-select"
import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Button,
  Input,
  Row,
  Col,
  Label,
  FormGroup
} from "reactstrap"
import DataTable from "react-data-table-component"
import { history } from "../../../history"



const colourOptions = [
  { value: "", label: "--Select--" },
  { value: "read", label: "Read" },
  { value: "notread", label: "Not Read" }
]

const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between ">
      <Input bsSize="lg" value={props.value} onChange={e => props.handleFilter(e)} placeholder="Search..." />
    </div>
  )
}

class QuestionsList extends React.Component {

  state = {
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <p className="text-bold-500 mb-0">{row.name}</p>
        )
      },
      {
        name: "Question",
        selector: "question",
        sortable: true,
        minWidth: "500px",
        cell: row => (
          <p className="text-bold-500 mb-0">{row.question}</p>
        )
      },
      {
        name: "Date Created",
        selector: "datetime",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.datetime}</p>
        )
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
        minWidth: "250px",
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.email}</p>
        )
      }
    ],

    data: [],
    filteredData: [],
    value: ""
  }

  componentDidMount() {
    this.getQuestionList()
    this.interval = setInterval(() => {
      this.getQuestionList()
      // console.log("question list called")
    }, 5000);
  }

  async getQuestionList() {
    if (sessionStorage.getItem('token') != null) {
      const authHeader = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token').toString() };
      await fetch(`${process.env.REACT_APP_BASENAME}viewlive/getlist`, { headers: authHeader }).then(results => {
        return results.json();
      }).then(data => {
        // console.log(data);
        this.setState({
          data: data.result
        });
        // console.log(this.state.data)
        console.clear()
      })
    }
    else {
      history.push('/')
    }
  }
  componentWillUnmount = () => {
    clearInterval(this.interval)
    console.clear()
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }





  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        let startsWithCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.datetime.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.regno.toLowerCase().startsWith(value.toLowerCase()) ||
          item.question.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.datetime.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          // item.regno.toLowerCase().includes(value.toLowerCase()) ||
          item.question.toLowerCase().includes(value.toLowerCase())

        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null
      })
      this.setState({ filteredData })
    }
  }

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <Row>

        <Col>
          <Card>
            <CardBody className="knowledge-base-bg">
              <h1 className="white">Questions</h1>
              <CustomHeader value={value} handleFilter={this.handleFilter} />
            </CardBody>
          </Card>
          <Card style={{marginLeft:"20px",marginRight:"20px"}}>
            <CardBody className="rdt_Wrapper">
              <DataTable
                className="dataTable-custom"
                data={value.length ? filteredData : data}
                columns={columns}
                noHeader
                fixedHeaderScrollHeight="500px"
                pagination
              />
            </CardBody>

            <Modal
              isOpen={this.state.modal}
              toggle={this.toggleModal}
              className="modal-dialog-centered modal-lg"
            >
              <ModalHeader toggle={this.toggleModal}>
                Update Status
        </ModalHeader>
              <ModalBody>
                <Form>
                  <Row >

                    <Col md="12" sm="12">
                      <FormGroup>
                        <Label for="status">Stauts</Label>
                        <Select className="React" classNamePrefix="select" defaultValue={colourOptions[0]} name="status" options={colourOptions} />
                      </FormGroup>
                    </Col>
                    <Col md="12" sm="12">
                      <Button.Ripple className="" color="primary" type="submit">Submit</Button.Ripple>
                      <Button.Ripple color="warning" type="reset" className="ml-1">Reset</Button.Ripple>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
          </Card>
          {/* <SweetAlert success title="Registration Successful"
          show={this.state.successAlert}
          onConfirm={() => this.handleAlert("successAlert", false)}
        >
        </SweetAlert> */}
        </Col>
      </Row>

    )
  }
}

export default QuestionsList
