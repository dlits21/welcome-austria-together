import React, { useState } from 'react';
import { View } from 'react-native';

export const CircleBorder = ({ size, borderWidth, borderColor, children }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: 0.5 * size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ececec',
      borderColor: '#ececec',
      borderColor,
      borderWidth,
      overflow: "hidden"
    }}>
    {children}
  </View>
);