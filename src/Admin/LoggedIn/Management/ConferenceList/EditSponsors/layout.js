import React from 'react';

class EditSponsors extends React.Component {
  render() {
    return(
      <div>
        {this.props.renderSponsors(this.props.sponsors, 'sponsors', true)}
      </div>
    );
  }
}

export default EditSponsors;
