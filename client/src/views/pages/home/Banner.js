import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Swiper from "react-id-swiper";
import img1 from "../../../assets/img/pages/banner.jpg";
import EventCountdown from "./Countdown";
//import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import StatisticsCard from "../../../components/@vuexy/statisticsCard/StatisticsCard";
import * as Icon from "react-feather";
import CommitteeMain from "./CommitteeMain";
import "../../../assets/scss/pages/knowledge-base.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { history } from "../../../../src/history";
import lobby from "../../../assets/img/sponsor/newlobby12.jpg";
import agendapdf from "../../../assets/img/sponsor/agenda.pdf";
import Agenda from "./Agenda";
import Stalls from "./Stalls";
import "../Pulse_Blue.css";
import { useState } from "react";

const params = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

const CustomMainHall = ({ item }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  return (
    <>
      <div
        className="mainhall"
        id={`mainhall${item.id}`}
        style={{
          position: "absolute",
          left: item.dleft + "%",
          width: item.dwidth + "%",
          height: item.dheight + "%",
          top: item.dtop + "%",
          cursor: "pointer",
        }}
        onClick={() => {
          history.push(`${item.url}`);
        }}
      >
        <span className="hint" style={{ height: "12px", width: "12px" }}></span>
      </div>
      <Tooltip
        isOpen={showTooltip}
        target={`mainhall${item.id}`}
        autohide={true}
        toggle={toggleTooltip}
      >
        {item.name}
      </Tooltip>
    </>
  );
};

class Banner extends React.Component {
  state = {
    modal: false,
    tooltipOpen: false,
    tooltipOpen1: false,
    tooltipOpen2: false,
    tooltipOpen0: false,
    data: [],
    hicon: [],
  };
  toggleTooltip0 = () => {
    this.setState({
      tooltipOpen0: !this.state.tooltipOpen0,
    });
  };

  toggleTooltip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  };

  toggleTooltip1 = () => {
    this.setState({
      tooltipOpen1: !this.state.tooltipOpen1,
    });
  };

  toggleTooltip2 = () => {
    this.setState({
      tooltipOpen2: !this.state.tooltipOpen2,
    });
  };

  toggleModal1 = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  componentDidMount = () => {
    if (sessionStorage.getItem("token") != undefined) {
      const authHeader = {
        Authorization: "Bearer " + sessionStorage.getItem("token").toString(),
      };
      axios
        .get(`${process.env.REACT_APP_BASENAME}home-lobby/get-scientific`, {
          headers: authHeader,
        })
        .then((response) => {
          console.log(response.data);
          this.setState({
            data: response.data.result,
            modal: !this.state.modal,
          });
        })
        .catch((error) => {
          console.log(error);
          history.push("/");
        });
    } else {
      history.push("/");
    }
  };
  render() {
    // const { img1, img2, img3, img4 } = this.state
    console.log(this.state.data);
    return (
      <Row>
        <img
          src={lobby}
          alt="lobby"
          width="100%"
          style={{ backgroundSize: "107%" }}
        />
        <div
          className="welcomvideo"
          id="welcomvideo"
          style={{
            position: "absolute",
            left: "42.5%",
            width: "15.3%",
            height: "13.5%",
            top: "46.9%",
            cursor: "pointer",
          }}
          onClick={this.toggleModal}
        >
          <span
            className="hint "
            style={{ height: "12px ", width: "12px" }}
          ></span>
          <Tooltip
            placement="top"
            isOpen={this.state.tooltipOpen1}
            target="welcomvideo"
            toggle={this.toggleTooltip1}
          >
            Welcome Message
          </Tooltip>
        </div>

        {this.state.data.map((item) => (
          <CustomMainHall item={item} key={item.name} />
        ))}
        {/* <Stalls /> */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={this.toggleModal}>Welcome Message</ModalHeader>
          <ModalBody className="text-center">
            <iframe
              className="embed-responsive-item w-100"
              src="https://www.youtube.com/embed/_UafVmFJ2PU?autoplay=1"
              allowFullScreen
              title="post"
              frameBorder="0"
              width="100%"
              height="350"
            />
          </ModalBody>
        </Modal>
      </Row>
    );
  }
}

export default Banner;
