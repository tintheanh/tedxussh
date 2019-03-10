import React from 'react'
import Modal from 'react-responsive-modal'
import EditTeamMem from './EditTeamMem/editTeamMem'
import { root } from '../../../../config/firebase'
import UpdateBackground from './updateBackground'
import UpdateTitle from './UpdateTitle'

class Organizers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
      organizers: null,
      modalEditTeam: false
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    this.openModalEditTeam = this.openModalEditTeam.bind(this)
    this.closeModalEditTeam = this.closeModalEditTeam.bind(this)
  }

  openModalEditTeam() {
    this.setState({ modalEditTeam: true })
  }

  closeModalEditTeam() {
    this.setState({ modalEditTeam: false })
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

    root.doc('organizer').onSnapshot(doc => {
      if (doc.exists) {
        const organizersObj = doc.data()

        root
          .doc('organizer')
          .collection('teamMembers')
          .orderBy('createdDate')
          .onSnapshot(querySnapshot => {
            const organizerArray = []
            querySnapshot.forEach(org => {
              const organizer = { ...org.data(), id: org.id }
              organizerArray.push(organizer)
            })

            const organizers = {
              ...organizersObj,
              teamMem: organizerArray
            }
            this.setState({ organizers })
          })
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight })
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row sponsors-section" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      )
    })
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(e => (
      <div className="col-md-6 col-lg-3 mb-2" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {e.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {e.role}
            </p>
            <p
              className="text-left"
              style={{
                margin: '0',
                fontWeight: '500',
                color: 'red',
                cursor: 'pointer'
              }}
            >
              {e.socialLink}
            </p>
          </div>
        </div>
      </div>
    ))
  }

  render() {
    if (this.state.organizers !== null) {
      const { organizers } = this.state
      return (
        <div className="page-wrapper" style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}>
          <div className="page-breadcrumb" style={{ paddingBottom: '54px' }}>
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h2 className="page-title">Organizers Edit Section</h2>
              </div>
            </div>
            <UpdateBackground background={organizers.background} />
            <UpdateTitle title={organizers.title} />
            <div className="row style-section-pictures">
              {this.renderImg(1, organizers.teamMem)}
              <button onClick={this.openModalEditTeam}>Edit team members...</button>
              <Modal open={this.state.modalEditTeam} onClose={this.closeModalEditTeam} center>
                <EditTeamMem teamMem={organizers.teamMem} closeModal={this.closeModalEditTeam} />
              </Modal>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

export default Organizers
