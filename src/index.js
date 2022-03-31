import React, { useEffect, forwardRef, useState } from 'react';
import { AppState } from 'react-native';
import PropTypes from 'prop-types';

function isFunc(func) {
  return func && typeof func === 'function';
}

export const withAppStateListener = (WrappedComponent) => {
  function EnhancedComponent(props) {
    const {
      forwardedRef,
      onAppStateChange,
      onBackground,
      onForeground,
      ...other
    } = props;

    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
      function handleChange(nextAppState) {
        const isActive = appState === 'active';
        const nextIsActive = nextAppState === 'active';
        const nextIsBackground = nextAppState.match(/inactive|background/);

        if (nextIsActive && !isActive && isFunc(onForeground)) {
          onForeground();
        }

        if (isActive && nextIsBackground && isFunc(onBackground)) {
          onBackground();
        }

        setAppState(nextAppState);
        if (isFunc(onAppStateChange)) onAppStateChange(nextAppState);
      }
      const eventListener = AppState.addEventListener('change', handleChange);

      return () => eventListener.remove();
    }, [appState, onAppStateChange, onBackground, onForeground]);

    return (
      <WrappedComponent {...other} appState={appState} ref={forwardedRef} />
    );
  }

  EnhancedComponent.propTypes = {
    forwardedRef: PropTypes.object,
    onAppStateChange: PropTypes.func,
    onBackground: PropTypes.func,
    onForeground: PropTypes.func,
  };

  EnhancedComponent.defaultProps = {
    forwardedRef: undefined,
    onAppStateChange: undefined,
    onBackground: undefined,
    onForeground: undefined,
  };

  // eslint-disable-next-line react/display-name
  return forwardRef((props, ref) => {
    return <EnhancedComponent {...props} forwardedRef={ref} />;
  });
};
