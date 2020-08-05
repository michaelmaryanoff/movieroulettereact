import React from 'react';
import tmdbLogo from '../images/tmdb-logo.svg';

const Footer = () => {
  return (
    <footer className="ui vertical  footer segment">
      <div className="ui center aligned container">
        <a style={{ color: 'black' }} href="https://github.com/michaelmaryanoff">
          <i href="https://github.com/michaelmaryanoff" className="github link big icon" />
        </a>
        <p />
        <em>This product uses the TMDb API but is not endorsed or certified by TMDb.</em>
        <p></p>
        <img src={tmdbLogo} alt="tmdb logo" className="ui centered tiny image"></img>
      </div>
    </footer>
  );
};

export default Footer;
