import React from 'react';

class EditSponsors extends React.Component {
  render() {
    return (
      <div>
        {this.props.renderSponsors(this.props.sponsors, 'sponsors', true)}
        <button onClick={() => {
          this.props.updateSponsors('sponsors');
          this.props.closeModalSponsors();
        }}>Save</button>
        <button onClick={() => this.props.closeModalSponsors()}>Cancel</button>
      </div>
    );
  }
}

export default EditSponsors;
