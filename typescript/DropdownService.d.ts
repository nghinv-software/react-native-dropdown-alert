/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { DropdownAlertViewProps } from "./DropdownAlertView";

export interface DropdownAlertServiceType {
  show: (content: DropdownAlertViewProps) => void;
  hide: () => void;
  hideAll: () => void;
}

interface DropdownAlertPropsType extends DropdownAlertViewProps {
  reference?: (data: DropdownAlertServiceType) => void;
}

export const DropdownAlert: DropdownAlertServiceType;

export declare function DropdownAlertService(props: DropdownAlertPropsType): JSX.Element;
