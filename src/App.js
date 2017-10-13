import React, { Component } from 'react';
import Iframe from './Iframe'

const styles = {
  topbar: { position: 'fixed', top: 0, height: 50 },
  content: { paddingTop: 50 }
}

const c = 'novyZamestnanec'
const r = 'zamestnanci'
const u = 'editZamestnanec'
const d = undefined
const plan = [r, c, r, r, r, u, r, u, r, u]

class App extends Component {
  state = { tests: {} }

  intervalIndex = 0
  timers = []


  pushNewTest(path = '') {
    const id = `${Math.floor(Date.now() * Math.random())}`

    this.setState({
      tests: {
        ...this.state.tests,
        [id]: path
      }
    })
  }

  setTimer(id) {
    const that = this
    this.timers.push(setTimeout(() => {
      const stateCopy = { ...that.state.tests }
      delete stateCopy[id]
      that.setState({ tests: stateCopy })
    }, 5000))
  }

  componentDidMount() {
    this.interval = setInterval(() => {

      if (this.intervalIndex >= plan.length) {
        this.intervalIndex = 0
      }

      this.pushNewTest(plan[this.intervalIndex])

      this.intervalIndex++

    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    this.timers.forEach(timer => clearTimeout(timer))
  }


  render() {
    const tests = Object.keys(this.state.tests).map((id) => (
      <Iframe key={id} id={id} path={this.state[id]} onLoad={() => this.setTimer(id)} />
    ))

    return (
      <div style={styles.content}>
        <div style={styles.topbar}>
          <button onClick={() => this.pushNewTest('zamestnanci')}>ADD /zamestnanci</button>
          <button onClick={() => this.pushNewTest('novyZamestnanec')}>ADD /editZamestnanci</button>
          <button onClick={() => this.pushNewTest('editZamestnanec')}>ADD /newZamestnanci</button>
          <hr />
        </div>
        {tests}
      </div>
    );
  }
}

export default App;
