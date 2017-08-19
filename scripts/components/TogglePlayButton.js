import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
};

class TogglePlayButton extends Component {
  constructor() {
    super();
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    if (this.props.isPlaying) {
      this.button.focus();
    }
  }

  togglePlay() {
    const { isPlaying } = this.props;
    const audioElement = document.getElementById('audio');
    if (!audioElement) {
      return;
    }

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  render() {
    const { isPlaying } = this.props;
    return (
      <button
        className={`toggle-play-button active ${(isPlaying ? 'is-playing' : '')}`}
        onClick={this.togglePlay}
        ref={(node) => { this.button = node; }}
      >
        <i className="toggle-play-button-icon ion-radio-waves" />
        <i className="toggle-play-button-icon ion-ios-play" />
      </button>
    );
  }
}

TogglePlayButton.propTypes = propTypes;

export default TogglePlayButton;
