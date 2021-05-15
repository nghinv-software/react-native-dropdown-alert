/**
 * Created by nghinv on Thu Jan 14 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useImperativeHandle, forwardRef, useState, useEffect, useCallback, useRef } from 'react';
import { Dimensions, View, Image, StyleSheet, StatusBar, ViewStyle, ImageStyle } from 'react-native';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { defaultTimingConfig, isNullOrUndefined } from './utils';
import ModalCustom from './components/ModalCustom';
import Title, { TitleProps } from './components/Title';
import Message, { MessageProps } from './components/Message';
import { images } from './images';

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

const SCREEN = Dimensions.get('window');

function DropdownAlertViewComponent(props?: DropdownAlertViewProps, ref: React.Ref) {
  const {
    title,
    message,
    type,
    timeDissmiss,
    autoHide,
    infoColor,
    warnColor,
    errorColor,
    successColor,
    timingAnimationConfig,
    onHide,
    showStatusBar,
    renderIcon,
    titleProps,
    messageProps,
    testIDDropdown,
    accessibilityLabelDropdown,
    imageStyle,
  } = props;
  const [visible, setVisible] = useState(false);
  const [statusBarVisible, setStatusBarVisible] = useState(false);
  const translateY = useSharedValue(0);
  const _mounted = useRef();
  const _timeoutDismiss = useRef();

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
      setStatusBarVisible(true);
    },
    hide: () => {
      dismissDropdow();
    },
  }));

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(SCREEN.height, timingAnimationConfig, () => {
        if (autoHide) {
          runOnJS(autoHideDropdown)();
        }
      });
    }
  }, [visible, autoHide]);

  useEffect(() => {
    _mounted.current = true;

    return () => {
      _mounted.current = false;
    };
  }, []);

  const autoHideDropdown = useCallback(() => {
    if (_timeoutDismiss.current) {
      clearTimeout(_timeoutDismiss.current);
    }

    _timeoutDismiss.current = setTimeout(() => {
      dismissDropdow();
    }, timeDissmiss);
  }, [_timeoutDismiss.current, timeDissmiss]);

  const dismissDropdow = useCallback(() => {
    setStatusBarVisible(false);
    translateY.value = withTiming(0, { duration: 100 }, () => {
      runOnJS(oncancel)();
    });
  }, []);

  const onPanGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = event.translationY + ctx.y;
    },
    onFinish: () => {
      if (translateY.value > SCREEN.height - 20) {
        translateY.value = withTiming(SCREEN.height, timingAnimationConfig);
      } else {
        runOnJS(dismissDropdow)();
      }
    },
  });

  const oncancel = useCallback(() => {
    if (_timeoutDismiss.current) {
      clearTimeout(_timeoutDismiss.current);
    }

    _mounted.current && setVisible(false);
    onHide && onHide();
  }, [onHide, _mounted.current, _timeoutDismiss.current]);

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: Math.min(translateY.value, SCREEN.height) },
      ],
    };
  });

  const safeArea = useSafeAreaInsets();
  const imageSource = type === 'info' ? images.info : type === 'error' ? images.error : type === 'warning' ? images.warn : images.success;
  const backgroundColor = type === 'info' ? infoColor : type === 'error' ? errorColor : type === 'warning' ? warnColor : successColor;

  return (
    <ModalCustom nativeModal={false} visible={visible}>
      {
        showStatusBar && statusBarVisible && <StatusBar backgroundColor={backgroundColor} barStyle='light-content' animated />
      }
      <PanGestureHandler
        onGestureEvent={onPanGesture}
      >
        <Animated.View style={[styles.container, { backgroundColor, paddingTop: safeArea.top }, contentStyle]}>
          <View testID={testIDDropdown} accessibilityLabel={accessibilityLabelDropdown} style={[styles.viewContent, props.contentStyle]}>
            {
              renderIcon ? renderIcon() : <Image source={imageSource} style={[styles.image, imageStyle]} resizeMode='contain' />
            }
            <View style={styles.content}>
              {
                !isNullOrUndefined(title) && <Title numberOfLines={1} {...titleProps} value={title} />
              }
              {
                !isNullOrUndefined(message) && <Message numberOfLines={2} {...messageProps} value={message} />
              }
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -SCREEN.height,
  },
  viewContent: {
    flexDirection: 'row',
    minHeight: 65,
  },
  image: {
    padding: 8,
    width: 36,
    height: 36,
    alignSelf: 'center',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});

const DropdownAlertView = React.memo(forwardRef(DropdownAlertViewComponent));

DropdownAlertView.defaultProps = {
  type: 'success',
  timeDissmiss: 3000,
  autoHide: true,
  infoColor: '#2B73B6',
  warnColor: '#FF821E',
  errorColor: '#cc3232',
  successColor: '#32A54A',
  timingAnimationConfig: defaultTimingConfig,
  showStatusBar: true,
};

export default DropdownAlertView;
