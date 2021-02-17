/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { TextStyle, Text, StyleSheet, TextProps } from 'react-native';

export interface MessageProps extends TextProps {
  value?: String;
  color?: String;
  style?: TextStyle,
}

Message.defaultProps = {
  color: 'white',
};

export default function Message(props?: MessageProps) {
  const { value, color, style, ...otherProps } = props;
  return (
    <Text
      {...otherProps}
      style={[styles.title, { color }, style]}
    >
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 2,
  },
});
