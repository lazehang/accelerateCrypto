import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (event) => {
    // 1. Stop form submit
    event.preventDefault();
    // 2. get text from input
    const storeName = this.myInput.current.value;
    // 3. change the page to /store/myInput
    this.props.history.push(`/store/${storeName}`)
  }
  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        { /* comment */}
        <h2>Please enter a store</h2>
        <input
          type="text"
          placeholder='Store Name'
          defaultValue={getFunName()}
          ref={this.myInput}
          required
        />
        <button type="submit">Visit store</button>
      </form>
    )
  }
}

export default StorePicker;