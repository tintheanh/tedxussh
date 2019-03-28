import React from 'react';
import YouTube from 'react-youtube';
import AboutHeader from './AboutHeader/aboutHeader';
import GetHeight from './getHeight';
import { modifyObj } from '../config/functions';

class About extends React.Component {
	constructor(props) {
		super(props);
		this.state = { height: 0 };
		this.element = React.createRef();
	}

	componentDidMount() {
		window.document.title = 'TEDxHCMUSSH - About';
	}

	onReady(event) {
		event.target.pauseVideo();
	}

	youtubeParser(url) {
		const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		const match = url.match(regExp);
		return match && match[7].length === 11 ? match[7] : '';
	}

	renderVisions(visions) {
		return visions.map((v, i) => {
			const title = v.title.split('||');
			const description = v.description.split('||');
			return (
				<div className="col-md-12 col-lg-4 mb-2" key={i}>
					<div className="hotel-room text-center" style={{ cover_picture: 'transparent' }}>
						<div className="hotel-room-body" style={{ padding: '38px' }}>
							<h3 className="heading mb-0" style={{ paddingBottom: '32px', fontFamily: 'Oswald' }}>
								{this.props.isVN ? title[0] : title[1]}
							</h3>
							<strong className="price" style={{ fontFamily: 'Montserrat' }}>
								{this.props.isVN ? description[0] : description[1]}
							</strong>
						</div>
					</div>
				</div>
			);
		});
  }
  
  objToArr(obj) {
    const arr = []
    Object.keys(obj).forEach(key => {
      const vision = {
        description: obj[key].description,
        title: obj[key].title
      }
      arr.push(vision)
    })
    return arr
  }

	onSize = size => {
		this.setState({ height: size.height });
	};

	render() {
		const { isVN } = this.props;
		const about = modifyObj(isVN, this.props.about, 'about');
		const { cover_picture, title, left, middle, right, visions } = about;
		return (
			<div>
				<AboutHeader cover_picture={cover_picture} title={title} />

				<div className="site-section bg-light">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-lg-4 mb-2">
								<div className="hotel-room text-center" style={{ cover_picture: 'transparent' }}>
									<GetHeight img={left.picture} onSize={this.onSize} />
									<div className="hotel-room-body" style={{ paddingTop: '32px' }}>
										<h3
											className="heading mb-0"
											style={{ fontFamily: 'Oswald', paddingBottom: '20px' }}
										>
											{left.title}
										</h3>
										<strong className="price" style={{ fontFamily: 'Montserrat' }}>
											{left.description}
										</strong>
									</div>
								</div>
							</div>
							<div className="col-md-12 col-lg-4 mb-2">
								<div className="hotel-room text-center" style={{ cover_picture: 'transparent' }}>
									<YouTube
										videoId={this.youtubeParser(middle.video)}
										onReady={this.onReady}
										className="youtube"
										opts={{ height: `${this.state.height}px` }}
									/>

									<div className="hotel-room-body" style={{ paddingTop: '23px' }}>
										<h3
											className="heading mb-0"
											style={{ fontFamily: 'Oswald', paddingBottom: '20px' }}
										>
											{middle.title}
										</h3>
										<strong className="price" style={{ fontFamily: 'Montserrat' }}>
											{middle.description}
										</strong>
									</div>
								</div>
							</div>
							<div className="col-md-12 col-lg-4 mb-2">
								<div className="hotel-room text-center" style={{ cover_picture: 'transparent' }}>
									<div className="d-block mb-0 thumbnail">
										<img src={right.picture} alt="" className="img-fluid" />
									</div>
									<div className="hotel-room-body" style={{ paddingTop: '32px' }}>
										<h3
											className="heading mb-0"
											style={{ fontFamily: 'Oswald', paddingBottom: '20px' }}
										>
											{right.title}
										</h3>
										<strong className="price" style={{ fontFamily: 'Montserrat' }}>
											{right.description}
										</strong>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="site-section bg-light">
					<div className="container">
						<div className="col-md-6 mx-auto text-center mb-5 section-heading">
							<h2 className="mb-5" style={{ fontFamily: 'Oswald' }}>
								Vision and Goals
							</h2>
						</div>
						<div className="row">{this.renderVisions(this.objToArr(visions))}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;
