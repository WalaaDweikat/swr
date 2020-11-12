import "./App.css";
import React, { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stopwatch status={false} hh={0} mm={0} ss={0} />
      </div>
    );
  }
}

class Stopwatch extends Component {
  interval = null;
  state = {
    status: true,
    h: 0,
    m: 0,
    s: 0,
    interval: null,
  };
  stop_start = () => {
    if (this.state.status) {
      this.interval = window.setInterval(() => {
        this.setState(({ h, m, s }) => {
          s = s + 1;
          if (s === 60) {
            s = 0;
            m = m + 1;
          }
          if (m === 60) {
            m = 0;
            h = h + 1;
          }

          return { s: s, m: m, h: h };
        });
      }, 1000);
      this.setState(({ interval, status }) => ({
        interval: this.interval,
        status: false,
      }));
    } else {
      this.setState(({ interval, status }) => ({
        interval: clearInterval(this.interval),
        status: true,
      }));
    }
  };
  reset = () => {
    this.setState(({ interval, status, h, s, m }) => {
      return {
        interval: clearInterval(this.interval),
        h: 0,
        s: 0,
        m: 0,
        status: true,
      };
    });
  };
  render() {
    const { status, h, m, s } = this.state;
    const hh = h < 10 ? `${0}` + h : h;
    const mm = m < 10 ? `${0}` + m : m;
    const ss = s < 10 ? `${0}` + s : s;

    return (
      <>
        <p className="display">
          {hh} : {mm} : {ss}
        </p>
        <div>
          <button onClick={this.stop_start}>{status ? "Start" : "Stop"}</button>
          <button onClick={this.reset}>Reset</button>
        </div>
      </>
    );
  }
}

export default App;
