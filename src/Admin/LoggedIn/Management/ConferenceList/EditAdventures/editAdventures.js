import React from 'react';
import Modal from 'react-responsive-modal';
import Adventure from './Adventure/adventure';
import AddAdventure from './AddAdventure/addAdventure';

class EditHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalAdd: false };
    this.openModalAdd = this.openModalAdd.bind(this);
    this.closeModalAdd = this.closeModalAdd.bind(this);
  }

  openModalAdd() {
    this.setState({ modalAdd: true });
  }

  closeModalAdd() {
    this.setState({ modalAdd: false });
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row sponsors-section" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      );
    });
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs
      .slice(startIndex, endIndex)
      .map(e => <Adventure adventure={e} key={e.id} />);
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs);
      }
      return this.renderImg(imgs.length / 4 + 1, imgs);
    }
    return <h2>No imgs available</h2>;
  }

  render() {
    return (
      <div>
        {this.renderAllImg(this.props.adventures)}
        <button onClick={this.openModalAdd}>Add</button>
        <Modal
          open={this.state.modalAdd}
          onClose={() => console.log('')}
          center
        >
          <AddAdventure closeModal={this.closeModalAdd} />
        </Modal>
        <button onClick={() => this.props.closeModal()}>Done</button>
      </div>
    );
  }
}

export default EditHost;
