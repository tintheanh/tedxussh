import React from 'react';
import firebase from 'firebase';
import Modal from 'react-responsive-modal';
import UploadImage from './UploadImage/uploadImage';

class ImageSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferenceImages: [],
      highlightImages: [],
      speakerImages: [],
      sponsorImages: [],
      stockImages: [],
      thumbnails: [],

      modalUpload: false
    };
    this.openModalUpload = this.openModalUpload.bind(this);
    this.closeModalUpload = this.closeModalUpload.bind(this);
  }

  openModalUpload() {
    this.setState({ modalUpload: true });
  }

  closeModalUpload() {
    this.setState({ modalUpload: false });
  }

  componentDidMount() {
    firebase
      .database()
      .ref('images/conferenceImages')
      .on('value', snapshot => {
        const conferenceImagesObj = snapshot.val();
        if (conferenceImagesObj) {
          const conferenceImages = [];
          Object.keys(conferenceImagesObj).forEach(e => {
            const conferenceImage = {
              id: e,
              name: conferenceImagesObj[e].name,
              url: conferenceImagesObj[e].url
            };
            conferenceImages.push(conferenceImage);
          });
          this.setState({ conferenceImages });
        }
      });

    firebase
      .database()
      .ref('images/highlightImages')
      .on('value', snapshot => {
        const highlightImagesObj = snapshot.val();
        if (highlightImagesObj) {
          const highlightImages = [];
          Object.keys(highlightImagesObj).forEach(e => {
            const highlightImage = {
              id: e,
              name: highlightImagesObj[e].name,
              url: highlightImagesObj[e].url
            };
            highlightImages.push(highlightImage);
          });
          this.setState({ highlightImages });
        }
      });

    firebase
      .database()
      .ref('images/speakers')
      .on('value', snapshot => {
        const speakersObj = snapshot.val();
        if (speakersObj) {
          const speakerImages = [];
          Object.keys(speakersObj).forEach(e => {
            const speakerImage = {
              id: e,
              name: speakersObj[e].name,
              url: speakersObj[e].url
            };
            speakerImages.push(speakerImage);
          });
          this.setState({ speakerImages });
        }
      });

    firebase
      .database()
      .ref('images/sponsors')
      .on('value', snapshot => {
        const sponsorsObj = snapshot.val();
        if (sponsorsObj) {
          const sponsorImages = [];
          Object.keys(sponsorsObj).forEach(e => {
            const sponsorImage = {
              id: e,
              name: sponsorsObj[e].name,
              url: sponsorsObj[e].url
            };
            sponsorImages.push(sponsorImage);
          });
          this.setState({ sponsorImages });
        }
      });

    firebase
      .database()
      .ref('images/stockImages')
      .on('value', snapshot => {
        const stockImagesObj = snapshot.val();
        if (stockImagesObj) {
          const stockImages = [];
          Object.keys(stockImagesObj).forEach(e => {
            const stockImage = {
              id: e,
              name: stockImagesObj[e].name,
              url: stockImagesObj[e].url
            };
            stockImages.push(stockImage);
          });
          this.setState({ stockImages });
        }
      });

    firebase
      .database()
      .ref('images/thumbnails')
      .on('value', snapshot => {
        const thumbnailsObj = snapshot.val();
        if (thumbnailsObj) {
          const thumbnails = [];
          Object.keys(thumbnailsObj).forEach(e => {
            const thumbnail = {
              id: e,
              name: thumbnailsObj[e].name,
              url: thumbnailsObj[e].url
            };
            thumbnails.push(thumbnail);
          });
          this.setState({ thumbnails });
        }
      });
  }

  renderImg(totalRows, imgs, storage, database) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs, storage, database)}
        </div>
      );
    });
  }

  deleteImg(img, storage, database) {
    console.log(`images/${database}/${img.id}`);
    const ask = window.confirm('Sure to delete?');
    if (ask) {
      firebase
        .storage()
        .ref(`${storage}/${img.name}`)
        .delete()
        .then(() => {
          firebase
            .database()
            .ref(`images/${database}/${img.id}`)
            .remove()
            .catch(err => alert(err.message));
        })
        .catch(err => alert(err.message));
    }
  }

  renderRow(startIndex, endIndex, imgs, storage, database) {
    return imgs.slice(startIndex, endIndex).map(e => (
      <div className="col-3" key={e.id}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.url} className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <strong className="price">{e.name}</strong>
          </div>
        </div>
        <button onClick={this.deleteImg.bind(this, e, storage, database)}>
          Delete
        </button>
      </div>
    ));
  }

  renderAllImg(imgs, storage, database) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs, storage, database);
      }
      return this.renderImg(imgs.length / 4 + 1, imgs, storage, database);
    }
    return <h2>No imgs available</h2>;
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
          <h1>Conference images</h1>
          {this.renderAllImg(
            this.state.conferenceImages,
            'conference-images/main-picture',
            'conferenceImages'
          )}
          <h1>Highlight images</h1>
          {this.renderAllImg(
            this.state.highlightImages,
            'conference-images/highlight',
            'highlightImages'
          )}
          <h1>Speakers images</h1>
          {this.renderAllImg(
            this.state.speakerImages,
            'conference-images/speakers',
            'speakers'
          )}
          <h1>Sponsor images</h1>
          {this.renderAllImg(
            this.state.sponsorImages,
            'conference-images/sponsors',
            'sponsors'
          )}
          <h1>Stock images</h1>
          {this.renderAllImg(
            this.state.stockImages,
            'stock-images',
            'stockImages'
          )}
          <h1>Thumbnails</h1>
          {this.renderAllImg(
            this.state.thumbnails,
            'learn-posts-images/thumbnails',
            'thumbnails'
          )}
          <button onClick={this.openModalUpload}>Upload</button>
          <Modal
            open={this.state.modalUpload}
            onClose={this.closeModalUpload}
            center
          >
            <UploadImage closeModal={this.closeModalUpload} />
          </Modal>
        </div>
      </div>
    );
  }
}

export default ImageSection;