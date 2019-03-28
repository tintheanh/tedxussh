import React from 'react'
import firebase from 'firebase'
import Modal from 'react-responsive-modal'

import {
  PageTitle, PageWrapper, SectionWrapper, SectionTitle, Loading
} from 'utils/components/PageComponents'
import { getListRealtime, deleteUnitData } from 'config/firebase'
import UploadImage from './UploadImage/uploadImage'

export default class ImageSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: null,
      modalUpload: false
    }

    this.openModalUpload = this.openModalUpload.bind(this)
    this.closeModalUpload = this.closeModalUpload.bind(this)
  }

  openModalUpload() {
    this.setState({ modalUpload: true })
  }

  closeModalUpload() {
    this.setState({ modalUpload: false })
  }

  componentDidMount() {
    getListRealtime('images', 'highlight', 'dateAdded', querySnapshot => {
      const highlight = []
      querySnapshot.forEach(doc => {
        const hl = { ...doc.data(), id: doc.id }
        highlight.push(hl)
      })
      getListRealtime('images', 'hosts', 'dateAdded', querySnapshot => {
        const hosts = []
        querySnapshot.forEach(doc => {
          const host = { ...doc.data(), id: doc.id }
          hosts.push(host)
        })
        getListRealtime('images', 'adventures', 'dateAdded', querySnapshot => {
          const adventures = []
          querySnapshot.forEach(doc => {
            const adventure = { ...doc.data(), id: doc.id }
            adventures.push(adventure)
          })
          getListRealtime('images', 'coverPage', 'dateAdded', querySnapshot => {
            const covers = []
            querySnapshot.forEach(doc => {
              const cover = { ...doc.data(), id: doc.id }
              covers.push(cover)
            })
            getListRealtime('images', 'others', 'dateAdded', querySnapshot => {
              const others = []
              querySnapshot.forEach(doc => {
                const other = { ...doc.data(), id: doc.id }
                others.push(other)
              })
              getListRealtime('images', 'performers', 'dateAdded', querySnapshot => {
                const performers = []
                querySnapshot.forEach(doc => {
                  const performer = { ...doc.data(), id: doc.id }
                  performers.push(performer)
                })
                getListRealtime('images', 'posts', 'dateAdded', querySnapshot => {
                  const posts = []
                  querySnapshot.forEach(doc => {
                    const post = { ...doc.data(), id: doc.id }
                    posts.push(post)
                  })
                  getListRealtime('images', 'speakers', 'dateAdded', querySnapshot => {
                    const speakers = []
                    querySnapshot.forEach(doc => {
                      const speaker = { ...doc.data(), id: doc.id }
                      speakers.push(speaker)
                    })
                    getListRealtime('images', 'sponsors', 'dateAdded', querySnapshot => {
                      const sponsors = []
                      querySnapshot.forEach(doc => {
                        const sponsor = { ...doc.data(), id: doc.id }
                        sponsors.push(sponsor)
                      })
                      getListRealtime('images', 'organizers', 'dateAdded', querySnapshot => {
                        const organizers = []
                        querySnapshot.forEach(doc => {
                          const organizer = { ...doc.data(), id: doc.id }
                          organizers.push(organizer)
                        })
                        const images = {
                          highlight: highlight.reverse(),
                          hosts: hosts.reverse(),
                          adventures: adventures.reverse(),
                          covers: covers.reverse(),
                          others: others.reverse(),
                          organizers: organizers.reverse(),
                          performers: performers.reverse(),
                          posts: posts.reverse(),
                          speakers: speakers.reverse(),
                          sponsors: sponsors.reverse()
                        }
                        this.setState({ images })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }


  deleteImg(img, destination) {
    const ask = window.confirm('Sure to delete?')
    if (ask) {
      firebase
        .storage()
        .ref(`${destination}/${img.name}`)
        .delete()
        .then(() => {
          deleteUnitData('images', destination, img.id)
        })
        .catch(err => alert(err.message))
    }
  }

  shorten(string) {
    if (string && string.length > 30)
      return `${string.substring(0, 10)}...`
    return string
  }

  renderImgRow(totalRows, images, destination) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderImg(startIndex, endIndex, images, destination)}
        </div>
      )
    })
  }

  renderImg(startIndex, endIndex, images, destination) {
    return images.slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.url} className="img-fluid notransition" alt="" />
          </div>
          <div className="hotel-room-body">
            <strong className="price">{this.shorten(e.name)}</strong>
          </div>
        </div>
        <button onClick={this.deleteImg.bind(this, e, destination)}>Delete</button>
      </div>
    ))
  }

  renderAllImgs(images, destination) {
    if (images.length > 0) {
      if (images.length % 4 === 0) {
        return this.renderImgRow(images.length / 4, images, destination)
      }
      return this.renderImgRow(images.length / 4 + 1, images, destination)
    }
    return <h2>No image</h2>
  }

  render() {
    const { images } = this.state
    if (images) {
      return (
        <PageWrapper>
          <PageTitle title="Image section" />
          <SectionWrapper forPicture>
            <SectionTitle title="Cover images" />
            {this.renderAllImgs(images.covers, 'coverPage')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Speaker images" />
            {this.renderAllImgs(images.speakers, 'speakers')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Performer images" />
            {this.renderAllImgs(images.performers, 'performers')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Host images" />
            {this.renderAllImgs(images.hosts, 'hosts')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Adventure images" />
            {this.renderAllImgs(images.adventures, 'adventures')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Sponsor images" />
            {this.renderAllImgs(images.sponsors, 'sponsors')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Highlight images" />
            {this.renderAllImgs(images.highlight, 'highlight')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Post images" />
            {this.renderAllImgs(images.posts, 'posts')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Organizer images" />
            {this.renderAllImgs(images.organizers, 'organizers')}
          </SectionWrapper>
          <SectionWrapper forPicture>
            <SectionTitle title="Other images" />
            {this.renderAllImgs(images.others, 'others')}
          </SectionWrapper>
          <button onClick={this.openModalUpload} style={{ width: '100px', height: '50px', position: 'fixed', bottom: '10px', zIndex: 1000 }}>Upload</button>
          <Modal open={this.state.modalUpload} onClose={this.closeModalUpload} center>
            <UploadImage closeModal={this.closeModalUpload} />
          </Modal>
        </PageWrapper>
      )
    }
    return <Loading />
  }
}
