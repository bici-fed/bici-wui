import type { EmptyProps } from 'antd';

export type BiciEmptyProps = {
  type?:
    | 'default'
    | 'searchResultEmpty'
    | 'addDevice'
    | 'noHistoryTrend'
    | 'noFile'
    | 'equipmentWorkWell'
    | 'noMessage'
    | 'associatedCockpit'
    | 'networkOff';
} & EmptyProps;
