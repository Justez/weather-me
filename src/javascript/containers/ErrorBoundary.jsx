/* eslint-disable no-undef */
import React from 'react';
import Main from './Main';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.warn(error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn(error, info);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <h1>Something went wrong. Please check your connection.</h1>
      );
    }

    return (<Main />);
  }
}
