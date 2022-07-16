import * as React from 'react';
import styles from './Reactgrid.module.scss';
import { IReactgridProps } from './IReactgridProps';
import { escape } from '@microsoft/sp-lodash-subset';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import Tabel from './Tabel';

export interface ICustomDatatableState {
  selectedRows: any;
}
const audittaskTableColumns = [
  {
    text: "Name",
    dataField: 'Name',
    sort: true
  },
  {
    text: 'Address',
    dataField: 'Address',
    sort: true
  },
  {
    text: 'Email',
    dataField: 'Email',
    sort: true
  },
  {
    text: 'Phone',
    dataField: 'Phone',
    sort: true
  },
  {
    text: 'StartDate',
    dataField: 'StartDate',
    sort: true
  },
  {
    text: 'EndDate',
    dataField: 'EndDate',
    sort: true
  },
];

const Documenttabel=[
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
  {
    "Name" : "Test User",
    "Address":"Street 235 Paradise tower, S.G Highway Ahmedabad",
    "Email":"abc@gmail.com ",
    "Phone":"9904587962",
    "StartDate":"1 june",
    "EndDate":"30 june",
  },
];

export default class Reactgrid extends React.Component<IReactgridProps, {}> {
  public render(): React.ReactElement<IReactgridProps> {
    return (
      <div>
          <Tabel keyField={"TaskID"} TableDataAndColumns={{ columns: audittaskTableColumns, rows: Documenttabel }}></Tabel>
      </div>
    );
  }
}
