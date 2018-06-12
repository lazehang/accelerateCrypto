import React from 'react';

class EditCoinForm extends React.Component {
  handleChange = (event) => {
    console.log(event.currentTarget.value);
    // update that coin
    // 1. Take copy of current coin
    const updatedCoin = {
      ...this.props.coin,
      [event.currentTarget.name]: event.currentTarget.value
    }
    this.props.updateCoin(this.props.index, updatedCoin);
  }
  render() {
    return <div className="coin-edit">
      <input type="text" name='name' onChange={this.handleChange} value={this.props.coin.name} placeholder='Name' />
      <input type="text" name='price' onChange={this.handleChange} value={this.props.coin.price} placeholder='Price' />
      <select type="text" name='status' onChange={this.handleChange} value={this.props.coin.status} placeholder='Status' >
        <option value="available">Available</option>
        <option value="unavailable">Sold Out</option>
      </select>
      <textarea type="text" name='desc' onChange={this.handleChange} value={this.props.coin.desc} placeholder='Desc' />
      <input type="text" name='image' onChange={this.handleChange} value={this.props.coin.image} placeholder='Image' />

    </div>
  }
}

export default EditCoinForm;