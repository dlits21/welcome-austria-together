import React, { useState } from 'react';
import { View } from 'react-native';

interface CircleBorderProps {
  size: number;
  borderWidth: any;
  borderColor: string;
  children: any;
}

export const CircleBorder : React.FC<CircleBorderProps> = ({
    size,
    borderWidth,
    borderColor: '#ececec',
    children,
  }) => {
    return  (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 0.5 * size,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ececec',
          borderColor: borderColor,
          borderWidth,
          overflow: "hidden"
        }}>
        {children}
      </View>
    );
  };