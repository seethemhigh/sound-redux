import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

class Popover extends Component {
  constructor(props) {
    super(props);
    if (props.children.length !== 2) {
      throw new Error('Popover component requires exactly 2 children');
    }

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = { isOpen: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

  onOutsideClick(e) {
    if (!this.state.isOpen) {
      return;
    }

    const node = this.popover;

    if (!node.contains(e.target)) {
      this.setState({
        isOpen: false,
      });
    }
  }

  toggleIsOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleBlur() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { className, children } = this.props;

    return (
      <button
        ref={(node) => { this.popover = node; }}
        className={`${className} popover ${(isOpen ? ' open' : '')}`}
        onClick={this.toggleIsOpen}
      >
        {children[0]}
        {isOpen ? React.cloneElement(children[1], { onBlur: this.handleBlur }) : null}
        <span className="player-button-tooltip">Playlist</span>
      </button>
    );
  }
}

Popover.propTypes = propTypes;

export default Popover;
