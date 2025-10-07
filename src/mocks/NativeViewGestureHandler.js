import * as React from 'react';

export const nativeViewGestureHandlerProps = [];
export const nativeViewProps = [];
export const nativeViewHandlerName = 'NativeViewGestureHandler';

export const NativeViewGestureHandler = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return React.createElement('div', rest, children);
});

NativeViewGestureHandler.displayName = 'NativeViewGestureHandler';

export default NativeViewGestureHandler;

