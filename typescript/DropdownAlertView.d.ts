/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { ViewStyle, ImageStyle } from 'react-native';
import { TitleProps } from './Title';
import { MessageProps } from './Message';

export type DropdownAlertType = 'info' | 'warning' | 'success' | 'error';

export interface DropdownAlertViewProps {
  title?: String;
  message?: String;
  type?: DropdownAlertType;
  timeDissmiss?: Number,
  autoHide?: Boolean,
  infoColor?: String,
  warnColor?: String,
  errorColor?: String,
  successColor?: String,
  timingAnimationConfig: Object;
  onHide?: () => void;
  showStatusBar?: Boolean;
  renderIcon?: React.FC;
  titleProps?: TitleProps;
  messageProps?: MessageProps;
  testIDDropdown?: String;
  accessibilityLabelDropdown?: String;
  contentStyle?: ViewStyle;
  imageStyle?: ImageStyle;
}

export declare function DropdownAlertView(props: DropdownAlertViewProps): JSX.Element;
