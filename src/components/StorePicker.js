import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <form action="" className="store-selector">
        { /* comment */}
        <h2>Please enter a store</h2>
        <input type="text" required placeholder='Store Name' />
        <button type="submit">Visit store</button>
      </form>
    )
  }
}

export default StorePicker;