import React from 'react';
import PropTypes from 'prop-types';

// stateless functional component
// const Header = (props) => (
//   <header className="top">
//     <h1>
//       Coin
//           <span className="ofThe">
//         <span className="of">Of</span>
//         <span className="the">The</span>
//       </span>
//       Day
//         </h1>
//     <h3 className="tagline">
//       <span>{props.tagline}</span>
//     </h3>
//   </header>
// )

class Header extends React.Component {
  static propTypes = {
    tagline: PropTypes.string.isRequired
  }

  render() {
    return (
      <header className="top">
        <h1>
          Coin
          <span className="ofThe">
            <span className="of">Of</span>
            <span className="the">The</span>
          </span>
          Day
        </h1>
        <h3 className="tagline">
          <span>{this.props.tagline}</span>
        </h3>
      </header>
    )
  }
}

export default Header;