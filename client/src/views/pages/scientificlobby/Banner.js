import React from "react"
import { Card, CardBody, CardHeader, CardTitle, Row, Col, Tooltip, Modal, ModalHeader, ModalBody } from "reactstrap"
import Swiper from "react-id-swiper"
import img1 from "../../../assets/img/pages/banner.jpg"
import EventCountdown from "./Countdown"
//import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import StatisticsCard from "../../../components/@vuexy/statisticsCard/StatisticsCard"
import * as Icon from "react-feather"
import CommitteeMain from "./CommitteeMain"
import "../../../assets/scss/pages/knowledge-base.scss"
import { Link } from "react-router-dom"
import axios from "axios"
import { history } from "../../../../src/history"
import lobby from "../../../assets/img/sponsor/scientificlobby1.jpg"
import scientific_hall from "../../../assets/img/sponsor/scientific_hall.png"
import agendapdf from "../../../assets/img/sponsor/agenda.pdf"
import Agenda from "./Agenda"
import '../Pulse_Red.css'
// import scientific_hall from "../scientific-hall0/ProfileHeader"

const params = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
}

class Banner extends React.Component {

  state = {
    modal: false,
    tooltipOpen: false,
    // tooltipOpen1: false,
    // tooltipOpen2: false,
    data: [],
    hicon: []
  }

  toggleTooltip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  // toggleTooltip1 = () => {
  //   this.setState({
  //     tooltipOpen1: !this.state.tooltipOpen1
  //   })
  // }

  // toggleTooltip2 = () => {
  //   this.setState({
  //     tooltipOpen2: !this.state.tooltipOpen2
  //   })
  // }

  toggleModal1 = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  componentDidMount = () => {
    if (sessionStorage.getItem('token') != undefined) {
      const authHeader = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token').toString() };
      axios.get(`${process.env.REACT_APP_BASENAME}scientific/get-lobby`, { headers: authHeader }).then((response) => {
        console.log(response.data)
        this.setState({
          data: response.data.result
        })
      }).catch((error) => {
        console.log(error);
        history.push('/')
      })
    }
    else {
      history.push('/')
    }



  }
  render() {


    return (

      <Row>
        <img src={lobby} alt="lobby" width="100%" style={{ backgroundSize: "107%" }} />
        {this.state.data.map(item => (
          <div id={item.id} className="exhihall" style={{ position: "absolute", left: item.dleft + "%", width: item.dwidth + "%", height: item.dheight + "%", top: item.dtop + "%", cursor: "pointer", WebkitTransform: "rotate(0deg)" }}
            onClick={() => { history.push(`/pages/scientifichall/${item.hallid}`) }}>
              <span className='hint' style={{ height: "15px", width: "15px" }}></span>
            {/* <img src={process.env.REACT_APP_BASENAME + `${item.image}`} alt={item.name} width="100%" style={{ backgroundSize: "100%" }} /> */}
          </div>
        ))}
      </Row>
    )
  }
}

export default Banner
