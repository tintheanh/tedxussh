import React from 'react'
import Modal from 'react-responsive-modal'
import ImageManagement from '../ImageMangement/imageManagement'
import { updateData } from '../../../../config/firebase'

export default class UpdateTheme extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: this.props.theme,
      modal: false,
      toggleEditHeader: false,
      toggleEditDetail: false
    }
  }

  onHeaderChange(e) {
    const theme = {
      ...this.state.theme,
      header: e.target.value
    }

    this.setState({ theme })
  }

  onDetailChange(e) {
    const theme = {
      ...this.state.theme,
      detail: e.target.value
    }

    this.setState({ theme })
  }

  onPictureChange(newPic) {
    const update = {
      theme: {
        ...this.state.theme,
        picture: newPic
      }
    }
    this.setState({ theme: update.theme }, () => updateData('conference', update).catch(err => alert(err.message)))
  }

  onUpdate() {
    const update = {
      theme: {
        ...this.state.theme
      }
    }
    updateData('conference', update).catch(err => alert(err.message))
  }

  render() {
    const { picture, detail, header } = this.state.theme
    return (
      <div className="row style-section">
        <div className="col-12">
          <h3>Background</h3>
        </div>
        <div className="col-12">
          <img className="img-fluid" src={picture} alt="" />
        </div>
        <div className="col-12">
          <button onClick={() => this.setState({ modal: true })}>Edit</button>
        </div>
        <div className="col-12">
          <h4>Header</h4>
          {!this.state.toggleEditHeader ? (
            <div>
              <p>{header}</p>
              <button onClick={() => this.setState({ toggleEditHeader: true })}>Edit</button>
            </div>
          ) : (
            <div>
              <input type="text" value={header} onChange={e => this.onHeaderChange(e)} />
              <button
                onClick={() => {
                  this.onUpdate()
                  this.setState({ toggleEditHeader: false })
                }}
              >
                Save
              </button>
              <button onClick={() => this.setState({ toggleEditHeader: false, theme: this.props.theme })}>Cancel</button>
            </div>
          )}
        </div>
        <div className="col-12">
          <h4>Detail</h4>
          {!this.state.toggleEditDetail ? (
            <div>
              <p>{detail}</p>
              <button onClick={() => this.setState({ toggleEditDetail: true })}>Edit</button>
            </div>
          ) : (
            <div>
              <input type="text" value={detail} onChange={e => this.onDetailChange(e)} />
              <button
                onClick={() => {
                  this.onUpdate()
                  this.setState({ toggleEditDetail: false })
                }}
              >
                Save
              </button>
              <button onClick={() => this.setState({ toggleEditDetail: false, theme: this.props.theme })}>Cancel</button>
            </div>
          )}
        </div>

        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <ImageManagement category="stockImages" pick={this.onPictureChange.bind(this)} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}
