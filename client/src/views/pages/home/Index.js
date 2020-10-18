import React from "react";

import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

//import ExtensionsHeader from "../../../extensions/extensionsHeader"
//import { Row, Col } from "reactstrap"
import Banner from "./Banner";
import VideoPlayer from "../../ui-elements/VideoPlayer/VideoPlayer";
import { toggleFullScreen } from "../../ui-elements/VideoPlayer/ToggleFullScreen";

import "swiper/css/swiper.css";
import "../../../assets/scss/plugins/extensions/swiper.scss";

class Index extends React.Component {
  state = {
    showEntranceVideo: false,
    playEntranceVideo: false,
  };

  componentDidMount() {
    const prevLocation = sessionStorage.getItem("prevLocationUrl");
    if (prevLocation !== "/") {
      this.setState({ showEntranceVideo: false });
    } else {
      this.setState({ showEntranceVideo: true });
    }

    sessionStorage.removeItem("prevLocationUrl");
  }

  entranceVideoToggler = () => {
    this.setState({ showEntranceVideo: !this.state.showEntranceVideo });
  };

  playEntranceVideoToggler = () => {
    this.setState({ playEntranceVideo: !this.state.playEntranceVideo });
  };

  render() {
    let content = (
      <div className="index-entrance-video">
        <VideoPlayer
          playVideo={this.state.playEntranceVideo}
          showPlayer={this.state.showEntranceVideoPlayer}
          url={"https://thegoldsummit.dreamcast.in/videos/audi_1.mp4"}
          hideVideo={this.entranceVideoToggler}
        />
        <Button
          onClick={this.playEntranceVideoToggler}
          className={this.state.playEntranceVideo ? "animateNow" : null}
        >
          Click Here To Start The Journery
        </Button>
        <Button
          onClick={() => {
            this.entranceVideoToggler();
            toggleFullScreen();
          }}
          className={
            this.state.playEntranceVideo ? "skip-button-animate" : "skip-button"
          }
        >
          SKIP
        </Button>
      </div>
    );

    if (!this.state.showEntranceVideo) content = <Banner />;

    return content;
  }
}

export default withRouter(Index);
