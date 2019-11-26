import React from 'react';
import { render } from 'react-dom';

import { WYSIWYGEditor, fromJSON, toJSON } from '../../lib/wysiwyg/index';
import './index.css';

import { randomValue } from '../common/sample';

function uploadFileHandler (file) {
  console.log('File to upload:', file);

  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();

    reader.addEventListener('error', e => reject(e), false);
    reader.addEventListener('load', () => resolve(reader.result), false);

    // Timeout to simulate delay
    setTimeout(() => {
      if (file) reader.readAsDataURL(file);
    }, 1000);
  });
}

const Loading = ({ alt }) => <div>Uploading {alt}...</div>;
const Error = ({ alt }) => <div>Error uploading {alt}...</div>;

class RichTextEditorExample extends React.Component {
  state = {
    readOnly: false,
    showPrintSink: false,
    value: fromJSON(randomValue)
  };

  handleToggleReadOnly = () => {
    this.setState(prevState => ({
      readOnly: !prevState.readOnly
    }));
  };

  handlePrintScriboState = () => {
    console.log(toJSON(this.state.value));
    this.setState({
      showPrintSink: true
    });
  };

  handleValueChanged = value => {
    this.setState({ value });
  };

  render () {
    const imageUploadOptions = {
      Loading,
      Error,
      uploadFileHandler
    };

    const { value, showPrintSink } = this.state;

    return (
      <>
        <h2>
          <code>WYSIWYGEditor</code> component
        </h2>
        <div className='container'>
          <WYSIWYGEditor
            readOnly={this.state.readOnly}
            value={value}
            onValueChanged={this.handleValueChanged}
            placeholder='Start typing...'
            imageUploadOptions={imageUploadOptions}
          />
        </div>
        <div>
          <input
            type='button'
            value='Toggle `readOnly` mode'
            onClick={this.handleToggleReadOnly}
          />
          <input
            type='button'
            value='Print value'
            onClick={this.handlePrintScriboState}
          />
        </div>
        {showPrintSink && (
          <div>
            <pre>
              <code>{JSON.stringify(toJSON(value), null, 2)}</code>
            </pre>
          </div>
        )}
      </>
    );
  }
}

render(<RichTextEditorExample />, document.getElementById('root'));

// // TODO Make HMR work!
// if (module.hot) {
//     module.hot.dispose(() => {
//         window.location.reload();
//     });
// }
