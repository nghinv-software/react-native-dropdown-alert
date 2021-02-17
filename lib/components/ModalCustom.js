/**
 * Created by nghinv on Tue Jan 12 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';

interface ModalCustomProps {
  nativeModal?: Boolean;
  visible?: Boolean;
  onDismiss?: () => void;
  zIndex?: Number | null;
}

ModalCustom.defaultProps = {
  nativeModal: true,
  visible: false,
};

export default function ModalCustom(props?: ModalCustomProps) {
  const { children, nativeModal, visible, onDismiss, zIndex } = props;

  if (nativeModal) {
    return (
      <Modal pointerEvents='box-none' visible={visible} transparent animationType='none' onDismiss={onDismiss}>
        {children}
      </Modal>
    );
  }

  if (!visible) return null;

  return (
    <View
      pointerEvents='box-none'
      style={[StyleSheet.absoluteFillObject, { zIndex }]}
    >
      {children}
    </View>
  );
}
