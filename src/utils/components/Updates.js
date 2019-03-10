import React from 'react'
import _ from 'lodash'
import Modal from 'react-responsive-modal'
import { updateData, updatePersonData, deletePersonData, addPerson } from 'config/firebase'
import ImageManagement from 'utils/components/ImageManagement'

class UpdateText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      data: this.props.data
    }
  }

  onUpdate() {
    const { data } = this.state
    const { updateTo, field, outer } = this.props
    const update = {}
    if (outer === '') {
      _.set(update, `${field}`, data)
    } else {
      _.set(update, `${outer}.${field}`, data)
    }

    updateData(updateTo, update)
      .then(() => this.setState({ toggle: false }))
      .catch(err => alert(err.message))
  }

  cancel() {
    this.setState({ toggle: false, data: this.props.data })
  }

  render() {
    const { toggle, data } = this.state
    const { name, useTextarea } = this.props
    return (
      <div className="col-12">
        <h5>{name}</h5>
        {!toggle ? (
          <div>
            <p>{data}</p>
            <button onClick={() => this.setState({ toggle: true })}>Edit</button>
          </div>
        ) : (
          <div>
            {!useTextarea ? (
              <input type="text" value={data} onChange={e => this.setState({ data: e.target.value })} />
            ) : (
              <textarea value={data} onChange={e => this.setState({ data: e.target.value })} />
            )}
            <button onClick={this.onUpdate.bind(this)}>Save</button>
            <button onClick={this.cancel.bind(this)}>Cancel</button>
          </div>
        )}
      </div>
    )
  }
}

UpdateText.defaultProps = {
  useTextarea: false,
  outer: ''
}

class UpdatePicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: this.props.data, modal: false }
  }

  onUpdate(newPic) {
    const { updateTo, field, outer } = this.props
    const update = {}
    if (outer === '') {
      _.set(update, `${field}`, newPic)
    } else {
      _.set(update, `${outer}.${field}`, newPic)
    }
    updateData(updateTo, update)
      .then(() => this.setState({ data: newPic }))
      .catch(err => alert(err.message))
  }

  render() {
    return (
      <div className="col-12">
        <div>
          <h5>Picture</h5>
        </div>
        <div>
          <img className="img-fluid" src={this.state.data} alt="" />
        </div>
        <button onClick={() => this.setState({ modal: true })}>Edit</button>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <ImageManagement category="stockImages" pick={this.onUpdate.bind(this)} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}

UpdatePicture.defaultProps = {
  outer: ''
}

class Person extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      person: this.props.person
    }

    this.openModalEditPic = this.openModalEditPic.bind(this)
    this.closeModalEditPic = this.closeModalEditPic.bind(this)
  }

  openModalEditPic() {
    this.setState({ modalEditPic: true })
  }

  closeModalEditPic() {
    this.setState({ modalEditPic: false })
  }

  onUpdate(id) {
    const { list } = this.props
    const { person } = this.state
    const update = {
      introduction: person.introduction,
      name: person.name,
      occupation: person.occupation,
      picture: person.picture
    }

    updatePersonData('conference', list, id, update)
      .then(() => this.setState({ toggleEdit: false }))
      .catch(err => alert(err.message))
  }

  onDelete(id) {
    const { list } = this.props
    const ask = window.confirm('Sure to delete?')
    if (ask) {
      deletePersonData('conference', list, id)
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  onPictureChange(newPic) {
    const person = {
      ...this.state.person,
      picture: newPic
    }
    this.setState({ person })
  }

  onNameChange(e) {
    const person = {
      ...this.state.person,
      name: e.target.value
    }
    this.setState({ person })
  }

  onOccupationChange(e) {
    const person = {
      ...this.state.person,
      occupation: e.target.value
    }
    this.setState({ person })
  }

  onIntroductionChange(e) {
    const person = {
      ...this.state.person,
      introduction: e.target.value
    }
    this.setState({ person })
  }

  render() {
    const { person } = this.state
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={person.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0' }}>
              {person.name}
            </h3>
            <p className="text-left" style={{ margin: '0' }}>
              {person.occupation}
            </p>
            <p
              className="text-left"
              style={{
                margin: '0'
              }}
            >
              {person.introduction}
            </p>
          </div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, person.id)}>Delete</button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={person.picture} alt="" className="img-fluid notransition" onClick={this.openModalEditPic} />
            <Modal open={this.state.modalEditPic} onClose={this.closeModalEditPic} center>
              <ImageManagement category="speakers" closeModal={this.closeModalEditPic} pick={this.onPictureChange.bind(this)} />
            </Modal>
          </div>
          <div className="hotel-room-body">
            <input type="text" value={person.name} onChange={e => this.onNameChange(e)} />
            <input type="text" value={person.occupation} onChange={e => this.onOccupationChange(e)} />
            <textarea value={person.introduction} onChange={e => this.onIntroductionChange(e)} />
          </div>
        </div>
        <button onClick={this.onUpdate.bind(this, person.id)}>Save</button>
        <button onClick={() => this.setState({ toggleEdit: false })}>Cancel</button>
      </div>
    )
  }
}

class AddPerson extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      occupation: '',
      introduction: '',
      picture: '',

      modalPic: false
    }

    this.openModalPic = this.openModalPic.bind(this)
    this.closeModalPic = this.closeModalPic.bind(this)
  }

  openModalPic() {
    this.setState({ modalPic: true })
  }

  closeModalPic() {
    this.setState({ modalPic: false })
  }

  selectPic(newPic) {
    this.setState({ picture: newPic })
  }

  onAddSpeaker() {
    const {list} = this.props
    const newPerson = {
      name: this.state.name,
      occupation: this.state.occupation,
      picture: this.state.picture,
      introduction: this.state.introduction,
      createdDate: new Date()
    }

    addPerson('conference', list, newPerson)
      .then(() => {
        alert('Added')
        this.props.closeModal()
      })
      .catch(err => alert(err.message))
  }

  render() {
    const {
      name, occupation, introduction, picture
    } = this.state
    return (
      <div>
        <input type="text" placeholder="name" value={name} onChange={e => this.setState({ name: e.target.value })} />
        <input type="text" placeholder="occupation" value={occupation} onChange={e => this.setState({ occupation: e.target.value })} />
        <textarea placeholder="introduction" value={introduction} onChange={e => this.setState({ introduction: e.target.value })} />
        <img src={picture} alt="" className="img-fluid" />
        <br />
        <button onClick={this.openModalPic}>Select picture</button>
        <Modal open={this.state.modalPic} onClose={this.closeModalPic} center>
          <ImageManagement category="speakers" closeModal={this.closeModalPic} pick={this.selectPic.bind(this)} />
        </Modal>
        <button onClick={this.onAddSpeaker.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModal()}>Done</button>
      </div>
    )
  }
}

class EditPeople extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modalAdd: false }
    this.openModalAdd = this.openModalAdd.bind(this)
    this.closeModalAdd = this.closeModalAdd.bind(this)
  }

  openModalAdd() {
    this.setState({ modalAdd: true })
  }

  closeModalAdd() {
    this.setState({ modalAdd: false })
  }

  renderPersonRow(totalRows, people) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row sponsors-section" key={i}>
          {this.renderPerson(startIndex, endIndex, people)}
        </div>
      )
    })
  }

  renderPerson(startIndex, endIndex, people) {
    const { list } = this.props
    return people.slice(startIndex, endIndex).map(e => <Person key={e.id} list={list} person={e} />)
  }

  renderAllPerson(people) {
    if (people.length > 0) {
      if (people.length % 4 === 0) {
        return this.renderPersonRow(people.length / 4, people)
      }
      return this.renderPersonRow(people.length / 4 + 1, people)
    }
    return null
  }

  render() {
    const { people, closeModal, list } = this.props
    return (
      <div>
        {this.renderAllPerson(people)}
        <button onClick={this.openModalAdd}>Add</button>
        <Modal open={this.state.modalAdd} onClose={() => console.log('')} center>
          <AddPerson list={list} closeModal={this.closeModalAdd} />
        </Modal>
        <button onClick={() => closeModal()}>Done</button>
      </div>
    )
  }
}

class UpdatePeopleSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      peopleData: this.props.peopleData,
      toggle: false,
      modal: false
    }
  }

  renderPeople(startIndex, endIndex, people) {
    return people.slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} className="img-fluid notransition" alt="" />
          </div>
          <div className="hotel-room-body">
            <div>
              <h3 className="heading mb-0">{e.name}</h3>
              <strong className="price">{e.occupation}</strong>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  renderPeopleRow(totalRows, people) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderPeople(startIndex, endIndex, people)}
        </div>
      )
    })
  }

  onDescriptionChange(e) {
    const peopleData = {
      ...this.state.peopleData,
      description: e.target.value
    }
    this.setState({ peopleData })
  }

  onUpdate() {
    const { peopleData } = this.state
    const { updateTo, field, outer } = this.props
    const update = {}
    if (outer === '') {
      _.set(update, `${field}`, peopleData.description)
    } else {
      _.set(update, `${outer}.${field}`, peopleData.description)
    }

    updateData(updateTo, update)
      .then(() => this.setState({ toggle: false }))
      .catch(err => alert(err.message))
  }

  cancel() {
    this.setState({ toggle: false, data: this.props.data })
  }

  render() {
    const { peopleData } = this.state
    const { list } = this.props
    return (
      <div className="col-12">
        {!this.state.toggle ? (
          <div>
            <p>{peopleData.description}</p>
            <button onClick={() => this.setState({ toggle: true })}>Edit</button>
          </div>
        ) : (
          <div>
            <textarea value={peopleData.description} onChange={e => this.onDescriptionChange(e)} />
            <button onClick={this.onUpdate.bind(this)}>Save</button>
            <button onClick={this.cancel.bind(this)}>Cancel</button>
          </div>
        )}

        <div>{this.renderPeopleRow(1, this.props.peopleData[list])}</div>
        <button onClick={() => this.setState({ modal: true })}>Edit ...</button>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditPeople list={list} people={this.props.peopleData[list]} closeModal={() => this.setState({ modal: false })} />
        </Modal>
      </div>
    )
  }
}

UpdatePeopleSection.defaultProps = {
  outer: ''
}

export { UpdateText, UpdatePicture, UpdatePeopleSection }
