import React from 'react';
import SmoothCollapse from 'react-smooth-collapse';

class OneAgd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggle(agdID) {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
      selectedAgenda: agdID
    }));
  }

  renderParticipants(string) {
    const splitted = string.split('//');
    return splitted.map((e, i) => (
      <p key={i} style={{ textAlign: 'center', fontFamily: 'Montserrat' }}>
        {e}
      </p>
    ));
  }

  renderHeaders(string, agd) {
    const splitted = string.split('//');
    return splitted.map((e, i) => {
      if (i === 0) {
        return (
          <div
            key={i}
            onClick={this.toggle.bind(this, agd.id)}
            style={{ paddingBottom: '24px' }}
          >
            <h1
              className="agd-header"
              style={{ cursor: agd.detail !== '' ? 'pointer' : '' }}
            >
              {e}{' '}
              {agd.detail !== '' ? (
                <i className="fa fa-arrow-down my-bounce" />
              ) : null}
            </h1>

            {this.state.selectedAgenda === agd.id && agd.detail !== '' ? (
              <SmoothCollapse expanded={this.state.expanded}>
                <p style={{ fontFamily: 'Montserrat' }}>{agd.detail}</p>
                {this.renderParticipants(agd.participants)}
              </SmoothCollapse>
            ) : (
              <SmoothCollapse expanded={this.state.expanded} />
            )}
          </div>
        );
      }
      return (
        <div key={i} style={{ paddingBottom: '24px' }}>
          <h1 className="agd-header">{e}</h1>
        </div>
      );
    });
  }

  render() {
    const { agd } = this.props;
    return (
      <li className="add-border-bottom-agenda">
        <div className="row">
          <div className="col-md-2 add-border-agenda">
            <h1 className="agd-time">{agd.time}</h1>
          </div>
          <div className="col-md-10">
            <div>{this.renderHeaders(agd.header, agd)}</div>
          </div>
        </div>
      </li>
    );
  }
}

export default OneAgd;
