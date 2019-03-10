import React from 'react'
import { updateData } from 'config/firebase'

export default class UpdateVision extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vision: this.props.vision,
      toggle: false
    }
  }

  onTitleChange(e) {
    const vision = {
      ...this.state.vision,
      title: e.target.value
    }

    this.setState({ vision })
  }

  onDescriptionChange(e) {
    const vision = {
      ...this.state.vision,
      description: e.target.value
    }

    this.setState({ vision })
  }

  onUpdate() {
    const { vision } = this.state
    const update = {
      visions: {}
    }

    update.visions[this.props.id] = {
      title: vision.title,
      description: vision.description
    }
    updateData('about', update)
      .then(() => this.setState({ toggle: false }))
      .catch(err => alert(err.message))
  }

  cancel() {
    this.setState({ toggle: false, vision: this.props.vision })
  }

  render() {
    const { toggle, vision } = this.state
    if (!toggle) {
      return (
        <div>
          <p>{vision.title}</p>
          <p>{vision.description}</p>
          <button onClick={() => this.setState({ toggle: true })}>Edit</button>
        </div>
      )
    }
    return (
      <div>
        <input type="text" value={vision.title} onChange={e => this.onTitleChange(e)} />
        <textarea value={vision.description} onChange={e => this.onDescriptionChange(e)} />
        <button onClick={this.onUpdate.bind(this)}>Save</button>
        <button onClick={this.cancel.bind(this)}>Cancel</button>
      </div>
    )
  }
}
