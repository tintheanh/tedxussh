import React from 'react'

class Organizers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Organizers'
  }

  openLink(url) {
    if (!url.includes('http')) {
      const newLink = `http://${url}`
      window.open(newLink, 'blank')
    } else window.open(url, 'blank')
  }

  formatLink(url) {
    if (url.includes('//')) {
      const splitted = url.split('//')
      return splitted[1]
    }
    return url
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4
    let endIndex = startIndex + 4
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()))

    return temp.map((_, i) => {
      startIndex += 4
      endIndex += 4
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      )
    })
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map((e, i) => (
      <div className="col-md-6 col-lg-3 mb-2" key={i}>
        <div className="hotel-room text-center notransition">
          <div className="d-block mb-0 thumbnail notransition">
            <img src={e.picture} alt="" className="img-fluid notransition" />
          </div>
          <div className="hotel-room-body">
            <h3 className="text-left" style={{ margin: '0', fontFamily: 'Oswald' }}>
              {e.name}
            </h3>
            <p className="text-left" style={{ margin: '0', fontFamily: 'Montserrat' }}>
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
              onClick={this.openLink.bind(this, e.social_link)}
            >
              {this.formatLink(e.social_link)}
            </p>
          </div>
        </div>
      </div>
    ))
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs)
      }
      return this.renderImg(imgs.length / 4 + 1, imgs)
    }
    return <h2>No imgs available</h2>
  }

  render() {
    const { organizers } = this.props
    return (
      <div>
        <div>
          <div
            className="about-header text-vertical-center"
            data-aos="fade"
            style={{
						  backgroundImage: `url(${organizers.cover_picture})`
            }}
          >
            <div className="row" style={{ width: '100%', margin: '0' }}>
              <div className="col-md-12">
                <h1 className="about-title">{organizers.title}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section bg-light">
          <div className="container">{this.renderAllImg(organizers.teamMemList)}</div>
        </div>
      </div>
    )
  }
}

export default Organizers
