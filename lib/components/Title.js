/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

export interface TitleProps extends TextProps {
  value?: String;
  color?: String;
  style?: TextStyle,
}

Title.defaultProps = {
  color: 'white',
};

export default function Title(props?: TitleProps) {
  const { value, color, style, ...otherProps } = props;
  return (
    <Text
      {...otherProps}
      style={[
        styles.title,
        { color },
        style,
      ]}
    >
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
