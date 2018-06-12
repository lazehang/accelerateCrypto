import React from 'react';

class AddCoinForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createCoin = (event) => {
    // 1. stop form submit
    event.preventDefault();
    // 2. Pull values out of input
    const coin = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value
    }
    this.props.addCoin(coin);
    // refresh form
    event.currentTarget.reset();

  }

  render() {
    return (
      <form className='coin-edit' onSubmit={this.createCoin}>
        <input name='name' ref={this.nameRef} type='text' placeholder='Name' />
        <input name='price' ref={this.priceRef} type='text' placeholder='Price' />
        <select name='status' ref={this.statusRef}>
          <option value="available">Available</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name='desc' ref={this.descRef} placeholder='Desc' />
        <input name='image' ref={this.imageRef} type='text' placeholder='Image' />
        <button type="submit">+ Add Coin</button>
      </form>
    )
  }
}

export default AddCoinForm;