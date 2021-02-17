/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useImperativeHandle, useState, useRef, useCallback } from 'react';
import DropdownAlertView from './DropdownAlertView';
import { isNullOrUndefined } from './utils';

function WrapDropdownAlertView(props, ref) {
  const [dataMessage, setDataMessage] = useState();
  const _queue = useRef([]);
  const dropDownRef = useRef();

  useImperativeHandle(ref, () => ({
    show: (content) => {
      if (content && (!isNullOrUndefined(content.title) || !isNullOrUndefined(content.message))) {
        _queue.current.push(content);

        processQueue();
      }
    },
    hide: () => {
      dropDownRef.current.hide();
    },
    hideAll: () => {
      dropDownRef.current.hide();
      _queue.current = [];
    },
  }));

  const processQueue = useCallback(() => {
    if (_queue.current.length > 0) {
      const message = _queue.current[0];

      showMessage(message);
    }
  }, [_queue.current]);

  const showMessage = useCallback((message) => {
    setDataMessage(message);
    dropDownRef.current.show();
  }, [_queue.current]);

  const onHideDropdown = useCallback(() => {
    if (_queue.current.length > 0) {
      _queue.current.splice(0, 1);
    }

    processQueue();
  }, [_queue.current]);

  return (
    <DropdownAlertView
      {...props}
      {...dataMessage}
      onHide={onHideDropdown}
      nativeModal={false}
      ref={dropDownRef}
    />
  );
}

export default React.memo(forwardRef(WrapDropdownAlertView));
