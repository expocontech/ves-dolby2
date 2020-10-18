import React from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap"
import { AgGridReact } from "ag-grid-react"
import { ContextLayout } from "../../../utility/context/Layout"
import { ChevronDown } from "react-feather"
import { FaUsers } from "react-icons/fa";
import axios from "axios"
import { history } from "../../../../src/history"
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"

import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"

class AttendeeList extends React.Component {

  state = {
    rowData: null,
    csvstatus: '',
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    columnDefs: [
      {
        headerName: "Name",
        field: "name",
        width: 200,
        filter: true
      },
      {
        headerName: "Designation",
        field: "designation",
        filter: true,
        // width: 275
      },
      {
        headerName: "Institute",
        field: "institute",
        filter: true,
        // width: 250
      },
      {
        headerName: "Email",
        field: "email",
        filter: true,
        // width: 350,
      },
      {
        headerName: "City",
        field: "city",
        filter: true,
        // width: 275
      },
      {
        headerName: "State",
        field: "state",
        filter: true,
        // width: 250
      },
    ]
  }

  componentDidMount() {
    if (sessionStorage.getItem('token') != null) {
      const authHeader = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token').toString() };
      axios.get(`${process.env.REACT_APP_BASENAME}delegate`, { headers: authHeader }).then(
        response => {
          // console.log(response.data);
          this.setState({
            rowData: response.data.result
          });
        }
      ).catch((error) => {
        // history.push('/')
        console.log(error)
        this.setState({
          rowData: []
        });
      });
    }
    else {
      history.push('/')
    }


    axios.get(`${process.env.REACT_APP_BASENAME}eventsetting`).then(
      (response) => {

        if (response.data.status == true) {
          var csvstat
          if (response.data.csvbutton == 1) {
            csvstat = true
          }
          else {
            csvstat = false
          }
          this.setState({
            csvstatus: csvstat

          })
        }
      }
    ).catch((error) => {
      console.log(error)
      // history.push('/')
      this.setState({
        message: "Some error in Server"
      })
    })
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages()
    })
  }

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        currenPageSize: val,
        getPageSize: val
      })
    }
  }

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state
    return (
      <React.Fragment>
        <Card className="overflow-hidden agGrid-card">
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-2 ag-grid-table">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mb-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown">
                      <DropdownToggle tag="div">
                        {this.gridApi
                          ? this.state.currenPageSize
                          : "" * this.state.getPageSize -
                          (this.state.getPageSize - 1)}{" "}
                                    -{" "}
                        {this.state.rowData.length -
                          this.state.currenPageSize * this.state.getPageSize >
                          0
                          ? this.state.currenPageSize * this.state.getPageSize
                          : this.state.rowData.length}{" "}
                                    of {this.state.rowData.length}
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                                    </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                                    </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                                    </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(134)}
                        >
                          134
                                    </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder="search..."
                        onChange={e => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>
                    {this.state.csvstatus ? <div className="export-btn">
                      <Button.Ripple
                        color="primary"
                        onClick={() => this.gridApi.exportDataAsCsv()}
                      >
                        Export as CSV
                          </Button.Ripple>
                    </div> : null}




                  </div>
                </div>
                <ContextLayout.Consumer>
                  {context => (
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      colResizeDefault={"shift"}
                      animateRows={true}
                      floatingFilter={true}
                      pagination={true}
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                      enableRtl={context.state.direction === "rtl"}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default AttendeeList
