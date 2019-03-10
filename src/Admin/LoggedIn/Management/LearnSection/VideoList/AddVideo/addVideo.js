import React from 'react'
import { root } from '../../../../../../config/firebase'

export default class AddVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      link: '',
      by: ''
    }
  }

  onAdd() {
    const newVid = {
      title: this.state.title,
      link: this.state.link,
      by: this.state.by,
      createdDate: new Date()
    }

    root
      .doc('learn')
      .collection('videoList')
      .add(newVid)
      .then(() => {
        alert('Added')
        this.props.closeModal()
      })
      .catch(err => alert(err.message))
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="title" onChange={e => this.setState({ title: e.target.value })} />
        <input type="text" placeholder="link" onChange={e => this.setState({ link: e.target.value })} />
        <input type="text" placeholder="by" onChange={e => this.setState({ by: e.target.value })} />
        <button onClick={this.onAdd.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModal()}>Cancel</button>
      </div>
    )
  }
}
