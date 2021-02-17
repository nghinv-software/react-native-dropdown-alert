/**
 * Created by nghinv on Mon Jan 11 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useEffect } from 'react';
import WrapDropdownAlertView from './WrapDropdownAlertView';
import { DropdownAlertViewProps } from './DropdownAlertView';

export interface DropdownAlertServiceType {
  show: (content: DropdownAlertViewProps) => void;
  hide: () => void;
  hideAll: () => void;
}

interface DropdownAlertPropsType extends DropdownAlertViewProps {
  reference?: (data: DropdownAlertServiceType) => void;
}

// eslint-disable-next-line import/no-mutable-exports
let DropdownAlert: DropdownAlertServiceType;

export default function DropdownAlertService({ children, reference, ...defaultProps }: DropdownAlertPropsType) {
  useEffect(() => {
    reference && reference(DropdownAlert);
  }, [reference]);

  return (
    <>
      {children}
      <WrapDropdownAlertView {...defaultProps} ref={refs => { DropdownAlert = refs; }} />
    </>
  );
}

export { DropdownAlert };
