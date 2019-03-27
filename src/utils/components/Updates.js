import React from 'react'
import _ from 'lodash'
import Modal from 'react-responsive-modal'
import {
  updateData, updateUnitData, deleteUnitData, addUnit
} from 'config/firebase'
import ImageManagement from 'utils/components/ImageManagement'

function renderImageManagement(type, onUpdate, close) {
  return (
    <ImageManagement
      category={type}
      pick={onUpdate}
      closeModal={close}
    />
  )
}

function classifyImageInput(list) {
  let storage
  switch (list) {
    case 'speakerList':
      storage = 'speakers'
      break
    case 'hostList':
      storage = 'hosts'
      break
    case 'performerList':
      storage = 'performers'
      break
    case 'adventureList':
      storage = 'adventures'
      break
    case 'sponsorList':
      storage = 'sponsors'
      break
    case 'teamMemList':
      storage = 'organizers'
      break
    default:
      storage = 'highlight'
      break
  }
  return storage
}

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
    } else if (outer.includes('.')) {
      const splitted = outer.split('.')
      _.set(update, `videoSection.${splitted[0]}.${field}`, data)
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
    } else if (outer.includes('.')) {
      const splitted = outer.split('.')
      _.set(update, `videoSection.${splitted[0]}.${field}`, newPic)
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
          {renderImageManagement('coverPage', this.onUpdate.bind(this), () => this.setState({ modal: false }))}
        </Modal>
      </div>
    )
  }
}

UpdatePicture.defaultProps = {
  outer: ''
}

class Unit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleEdit: false,
      modalEditPic: false,

      unit: this.props.unit
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
    const { unit } = this.state
    let update
    let updateTo = 'conference'
    if (list === 'adventureList') {
      update = {
        name: unit.name,
        detail: unit.detail,
        picture: unit.picture
      }
    } else if (list === 'teamMemList') {
      update = {
        name: unit.name,
        role: unit.role,
        social_link: unit.social_link,
        picture: unit.picture
      }
      updateTo = 'organizers'
    } else if (list === 'sponsorList') {
      update = {
        link: unit.link,
        picture: unit.picture,
        type: unit.type
      }
    } else {
      update = {
        introduction: unit.introduction,
        name: unit.name,
        occupation: unit.occupation,
        picture: unit.picture
      }
    }
    updateUnitData(updateTo, list, id, update)
      .then(() => this.setState({ toggleEdit: false }))
      .catch(err => alert(err.message))
  }

  onDelete(id) {
    const { list } = this.props
    const ask = window.confirm('Sure to delete?')
    if (ask) {
      deleteUnitData(list === 'teamMemList' ? 'organizers' : 'conference', list, id)
        .then(() => this.setState({ toggleEdit: false }))
        .catch(err => alert(err.message))
    }
  }

  onPictureChange(newPic) {
    const unit = {
      ...this.state.unit,
      picture: newPic
    }
    this.setState({ unit })
  }

  onNameChange(e) {
    const unit = {
      ...this.state.unit,
      name: e.target.value
    }
    this.setState({ unit })
  }

  onOccupationChange(e) {
    const unit = {
      ...this.state.unit,
      occupation: e.target.value
    }
    this.setState({ unit })
  }

  onDetailChange(e) {
    const unit = {
      ...this.state.unit,
      detail: e.target.value
    }
    this.setState({ unit })
  }

  onIntroductionChange(e) {
    const unit = {
      ...this.state.unit,
      introduction: e.target.value
    }
    this.setState({ unit })
  }

  onLinkChange(e) {
    const unit = {
      ...this.state.unit,
      link: e.target.value
    }
    this.setState({ unit })
  }

  onRoleChange(e) {
    const unit = {
      ...this.state.unit,
      role: e.target.value
    }
    this.setState({ unit })
  }

  onSocialLinkChange(e) {
    const unit = {
      ...this.state.unit,
      social_link: e.target.value
    }
    this.setState({ unit })
  }

  onSponsorTypeChange(e) {
    const unit = {
      ...this.state.unit,
      type: e.target.value
    }
    this.setState({ unit })
  }

  renderShowable(unit) {
    const { list } = this.props
    if (list === 'teamMemList') {
      return (
        <div>
          <h5 className="text-left" style={{ margin: '0' }}>
            {unit.name}
          </h5>
          <p className="text-left" style={{ margin: '0' }}>
            {unit.role}
          </p>
          <p className="text-left" style={{ margin: '0' }}>
            {unit.social_link}
          </p>
        </div>
      )
    }
    if (list === 'adventureList') {
      return (
        <div>
          <h5 className="text-left" style={{ margin: '0' }}>
            {unit.name}
          </h5>
          <p className="text-left" style={{ margin: '0' }}>
            {unit.detail}
          </p>
        </div>
      )
    }
    if (list === 'sponsorList') {
      return (
        <div>
          <p className="text-left" style={{ margin: '0' }}>
            {unit.link}
          </p>
          <p className="text-left" style={{ margin: '0' }}>
            {unit.type}
          </p>
        </div>
      )
    }
    return (
      <div>
        <h5 className="text-left" style={{ margin: '0' }}>
          {unit.name}
        </h5>
        <p className="text-left" style={{ margin: '0' }}>
          {unit.occupation}
        </p>
        <p
          className="text-left"
          style={{
					  margin: '0'
          }}
        >
          {this.shorten(unit.introduction)}
        </p>
      </div>
    )
  }

  shorten(string) {
    if (string && string.length > 50)
      return `${string.substring(0, 50)}...`
    return string
  }

  renderEditable(unit) {
    const { list } = this.props
    if (list === 'teamMemList') {
      return (
        <div>
          <input type="text" value={unit.name} onChange={e => this.onNameChange(e)} />
          <input type="text" value={unit.role} onChange={e => this.onRoleChange(e)} />
          <input type="text" value={unit.social_link} onChange={e => this.onSocialLinkChange(e)} />
        </div>
      )
    }
    if (list === 'adventureList') {
      return (
        <div>
          <input type="text" value={unit.name} onChange={e => this.onNameChange(e)} />
          <input type="text" value={unit.detail} onChange={e => this.onDetailChange(e)} />
        </div>
      )
    }
    if (list === 'sponsorList') {
      return (
        <div>
          <input type="text" value={unit.link} onChange={e => this.onLinkChange(e)} />
          <select value={unit.type} onChange={e => this.onSponsorTypeChange(e)}>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="supporting">Supporting</option>
            <option value="inKind">In kind</option>
            <option value="mediaSupport">Supporting media</option>
          </select>
        </div>
      )
    }
    return (
      <div>
        <input type="text" value={unit.name} onChange={e => this.onNameChange(e)} />
        <input type="text" value={unit.occupation} onChange={e => this.onOccupationChange(e)} />
        <textarea value={unit.introduction} onChange={e => this.onIntroductionChange(e)} />
      </div>
    )
  }

  render() {
    const { unit } = this.state
    return !this.state.toggleEdit ? (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={unit.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">{this.renderShowable(unit)}</div>
        </div>
        <button onClick={() => this.setState({ toggleEdit: true })}>Edit</button>
        <button onClick={this.onDelete.bind(this, unit.id)}>Delete</button>
      </div>
    ) : (
      <div className="col-md-6 col-lg-3 mb-2">
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img
              src={unit.picture}
              alt=""
              className="img-fluid notransition"
              onClick={this.openModalEditPic}
            />
            <Modal open={this.state.modalEditPic} onClose={this.closeModalEditPic} center>
              {renderImageManagement(classifyImageInput(this.props.list), this.onPictureChange.bind(this), this.closeModalEditPic)}
            </Modal>
          </div>
          <div className="hotel-room-body">{this.renderEditable(unit)}</div>
        </div>
        <button onClick={this.onUpdate.bind(this, unit.id)}>Save</button>
        <button onClick={() => this.setState({ toggleEdit: false })}>Cancel</button>
      </div>
    )
  }
}

class AddUnit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      occupation: '',
      introduction: '',
      picture: '',
      detail: '',
      link: '',
      role: '',
      social_link: '',
      sponsorType: 'gold',
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

  onAdd() {
    const { list } = this.props
    let newUnit
    let addTo = 'conference'
    if (list === 'adventureList') {
      newUnit = {
        name: this.state.name,
        picture: this.state.picture,
        detail: this.state.detail,
        createdDate: new Date()
      }
    } else if (list === 'teamMemList') {
      newUnit = {
        name: this.state.name,
        picture: this.state.picture,
        role: this.state.role,
        social_link: this.state.social_link,
        createdDate: new Date()
      }
      addTo = 'organizers'
    } else if (list === 'sponsorList') {
      newUnit = {
        link: this.state.link,
        picture: this.state.picture,
        type: this.state.sponsorType,
        createdDate: new Date()
      }
    } else {
      newUnit = {
        name: this.state.name,
        occupation: this.state.occupation,
        picture: this.state.picture,
        introduction: this.state.introduction,
        createdDate: new Date()
      }
    }

    addUnit(addTo, list, newUnit)
      .then(() => {
        alert('Added')
        this.props.closeModal()
      })
      .catch(err => alert(err.message))
  }

  renderInput() {
    const { list } = this.props
    const {
      name, occupation, introduction, detail, link, role, social_link
    } = this.state
    if (list === 'teamMemList') {
      return (
        <div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="role"
            value={role}
            onChange={e => this.setState({ role: e.target.value })}
          />
          <input
            type="text"
            placeholder="social link"
            value={social_link}
            onChange={e => this.setState({ social_link: e.target.value })}
          />
        </div>
      )
    }
    if (list === 'adventureList') {
      return (
        <div>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="detail"
            value={detail}
            onChange={e => this.setState({ detail: e.target.value })}
          />
        </div>
      )
    }
    if (list === 'sponsorList') {
      return (
        <div>
          <input
            type="text"
            placeholder="link"
            value={link}
            onChange={e => this.setState({ link: e.target.value })}
          />
          <select value={this.state.sponsorType} onChange={e => this.setState({ sponsorType: e.target.value })}>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="supporting">Supporting</option>
            <option value="inKind">In kind</option>
            <option value="mediaSupport">Supporting media</option>
          </select>
        </div>
      )
    }
    return (
      <div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input
          type="text"
          placeholder="occupation"
          value={occupation}
          onChange={e => this.setState({ occupation: e.target.value })}
        />
        <textarea
          placeholder="introduction"
          value={introduction}
          onChange={e => this.setState({ introduction: e.target.value })}
        />
      </div>
    )
  }

  render() {
    const { picture } = this.state
    return (
      <div>
        {this.renderInput()}
        <img src={picture} alt="" className="img-fluid" />
        <br />
        <button onClick={this.openModalPic}>Select picture</button>
        <Modal open={this.state.modalPic} onClose={this.closeModalPic} center>
          {renderImageManagement(classifyImageInput(this.props.list), this.selectPic.bind(this), this.closeModalPic)}
        </Modal>
        <button onClick={this.onAdd.bind(this)}>Add</button>
        <button onClick={() => this.props.closeModal()}>Done</button>
      </div>
    )
  }
}

class EditUnits extends React.Component {
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

  renderUnitRow(totalRows, units) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row sponsors-section" key={i}>
          {this.renderUnit(startIndex, endIndex, units)}
        </div>
      )
    })
  }

  renderUnit(startIndex, endIndex, units) {
    const { list } = this.props
    return units.slice(startIndex, endIndex).map(e => <Unit key={e.id} list={list} unit={e} />)
  }

  renderAllUnits() {
    const { units } = this.props
    if (units.length > 0) {
      if (units.length % 4 === 0) {
        return this.renderUnitRow(units.length / 4, units)
      }
      return this.renderUnitRow(units.length / 4 + 1, units)
    }
    return null
  }

  render() {
    const { closeModal, list } = this.props
    return (
      <div>
        {this.renderAllUnits()}
        <button onClick={this.openModalAdd}>Add</button>
        <Modal open={this.state.modalAdd} onClose={() => console.log('')} center>
          <AddUnit list={list} closeModal={this.closeModalAdd} />
        </Modal>
        <button onClick={() => closeModal()}>Done</button>
      </div>
    )
  }
}

class UpdateUnitSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      unitData: this.props.unitData,
      toggle: false,
      modal: false
    }
  }

  renderTextInfo(info) {
    const { list } = this.props
    if (list === 'teamMemList') {
      return (
        <div>
          <h5 className="heading mb-0">{info.name}</h5>
          <strong className="price">{info.role}</strong>
        </div>
      )
    }
    if (list === 'adventureList') {
      return (
        <div>
          <h5 className="heading mb-0">{info.name}</h5>
          <strong className="price">{info.detail}</strong>
        </div>
      )
    }
    if (list === 'sponsorList') {
      return (
        <div>
          <strong className="price">{info.link}</strong>
        </div>
      )
    }
    return (
      <div>
        <h5 className="heading mb-0">{info.name}</h5>
        <strong className="price">{info.occupation}</strong>
      </div>
    )
  }

  renderUnits(startIndex, endIndex) {
    const { list, unitData } = this.props
    return unitData[list].slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} className="img-fluid notransition" alt="" />
          </div>
          <div className="hotel-room-body">{this.renderTextInfo(e)}</div>
        </div>
      </div>
    ))
  }

  renderUnitRow(totalRows) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderUnits(startIndex, endIndex)}
        </div>
      )
    })
  }

  renderEditDescription() {
    const { unitData, toggle } = this.state
    const { list } = this.props
    if (list === 'teamMemList') {
      return null
    }
    if (!toggle) {
      return (
        <div>
          <p>{unitData.description}</p>
          <button onClick={() => this.setState({ toggle: true })}>Edit</button>
        </div>
      )
    }
    return (
      <div>
        <textarea value={unitData.description} onChange={e => this.onDescriptionChange(e)} />
        <button onClick={this.onUpdate.bind(this)}>Save</button>
        <button onClick={this.cancel.bind(this)}>Cancel</button>
      </div>
    )
  }

  onDescriptionChange(e) {
    const unitData = {
      ...this.state.unitData,
      description: e.target.value
    }
    this.setState({ unitData })
  }

  onUpdate() {
    const { unitData } = this.state
    const { updateTo, field, outer } = this.props
    const update = {}
    if (outer === '') {
      _.set(update, `${field}`, unitData.description)
    } else {
      _.set(update, `${outer}.${field}`, unitData.description)
    }

    updateData(updateTo, update)
      .then(() => this.setState({ toggle: false }))
      .catch(err => alert(err.message))
  }

  cancel() {
    this.setState({ toggle: false, data: this.props.data })
  }

  render() {
    const { list } = this.props
    return (
      <div className="col-12">
        {this.renderEditDescription()}
        <div>{this.renderUnitRow(1)}</div>
        <button onClick={() => this.setState({ modal: true })}>Edit ...</button>
        <Modal open={this.state.modal} onClose={() => this.setState({ modal: false })} center>
          <EditUnits
            list={list}
            units={this.props.unitData[list]}
            closeModal={() => this.setState({ modal: false })}
          />
        </Modal>
      </div>
    )
  }
}

UpdateUnitSection.defaultProps = {
  outer: ''
}

export { UpdateText, UpdatePicture, UpdateUnitSection }
