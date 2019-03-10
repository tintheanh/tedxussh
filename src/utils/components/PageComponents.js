import React from 'react'

const PageTitle = props => (
  <div className="row">
    <div className="col-12 d-flex no-block align-items-center">
      <h2 className="page-title">{props.title}</h2>
    </div>
  </div>
)

const SectionWrapper = props => <div className="row style-section">{props.children}</div>

const SectionTitle = props => (
  <div className="col-12">
    <h3>{props.title}</h3>
  </div>
)

class PageWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight })
  }

  render() {
    return (
      <div className="page-wrapper" style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}>
        <div className="page-breadcrumb" style={{ paddingBottom: '54px' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export {
  PageTitle, SectionWrapper, SectionTitle, PageWrapper
}
