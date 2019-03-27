import React from 'react'
import { updateData } from 'config/firebase'

export default class UpdateLeftLinks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      toggle: false
    }
  }

  onChangeFb(e) {
    const data = {
      ...this.state.data,
      facebook: e.target.value
    }

    this.setState({ data })
  }

  onChangeYT(e) {
    const data = {
      ...this.state.data,
      youtube: e.target.value
    }

    this.setState({ data })
  }

  onUpdate() {
    const update = {
      left: {
        links: { ...this.state.data }
      }
    }
    updateData('footer', update)
      .then(() => this.setState({ toggle: false }))
      .catch(err => alert(err.message))
  }

  cancel() {
    this.setState({ toggle: false, data: this.props.data })
  }

  render() {
    const { facebook, youtube } = this.state.data
    if (!this.state.toggle) {
      return (
        <div className="col-12">
          <h5>Facebook link</h5>
          <p>{facebook}</p>
          <h5>Youtube link</h5>
          <p>{youtube}</p>
          <button type="button" onClick={() => this.setState({ toggle: true })}>
            Edit
          </button>
        </div>
      )
    }
    return (
      <div className="col-12">
        <h5>Facebook link</h5>
        <input type="text" value={facebook} onChange={e => this.onChangeFb(e)} />
        <h5>Youtube link</h5>
        <input type="text" value={youtube} onChange={e => this.onChangeYT(e)} />
        <button onClick={this.onUpdate.bind(this)}>Save</button>
        <button onClick={this.cancel.bind(this)}>Cancel</button>
      </div>
    )
  }
}
