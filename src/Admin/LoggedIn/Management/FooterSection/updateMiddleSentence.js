import React from 'react';
import { updateData } from '../../../../config/firebase';

export default class UpdateMiddleSentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      toggle: false
    };
  }

  onChangeCopyright(e) {
    const data = {
      ...this.state.data,
      copyright: e.target.value
    };

    this.setState({ data });
  }

  onChangeSentence(e) {
    const data = {
      ...this.state.data,
      sentence: e.target.value
    };

    this.setState({ data });
  }

  onUpdate() {
    const update = {
      copyright: this.state.data.copyright,
      middle: {
        sentence: this.state.data.sentence
      }
    };
    updateData('footer', update).catch(err => alert(err.message));
    this.setState({ toggle: false });
  }

  render() {
    const { copyright, sentence } = this.state.data;
    if (!this.state.toggle) {
      return (
        <div className="row style-section">
          <div className="col-12">
            <h3>Middle</h3>
          </div>
          <div className="col-12">
            <h5>Copyright</h5>
          </div>
          <div className="col-12">
            <p>{copyright}</p>
          </div>
          <div className="col-12">
            <h5>Sentence</h5>
          </div>
          <div className="col-12">
            <p>{sentence}</p>
          </div>
          <button type="button" onClick={() => this.setState({ toggle: true })}>
            Edit
          </button>
        </div>
      );
    }
    return (
      <div className="row style-section">
        <div className="col-12">
          <h3>Middle</h3>
        </div>
        <div className="col-12">
          <h5>Copyright</h5>
        </div>
        <div className="col-12">
          <textarea
            value={copyright}
            onChange={e => this.onChangeCopyright(e)}
          />
        </div>
        <div className="col-12">
          <h5>Sentence</h5>
        </div>
        <div className="col-12">
          <textarea value={sentence} onChange={e => this.onChangeSentence(e)} />
        </div>
        <button onClick={this.onUpdate.bind(this)}>Save</button>
        <button
          onClick={() =>
            this.setState({ toggle: false, data: this.props.data })
          }
        >
          Cancel
        </button>
      </div>
    );
  }
}
