import * as React from 'react';
import styles from './TimeRangePicker.module.scss';
import { ITimeRangePickerProps } from './ITimeRangePickerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import pnp from 'sp-pnp-js';
import { Checkbox, PrimaryButton } from '@fluentui/react';
require('jquery');
declare var $: any;
require('../assets/jqueryUi.min.js');
SPComponentLoader.loadCss("https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css");
require("../assets/custom.css");
require('../assets/bootstrap.min.css');
require('../assets/bootstrap.min.js');

export interface ITimeRangePickerState {
  CheckboxData: any;
  CheckedItem: any;
  StartTime: any;
  EndTime: any;
  UpdatedDays: any;
  disableBtn: boolean;
}
let myThis: any;
export default class TimeRangePicker extends React.Component<ITimeRangePickerProps, ITimeRangePickerState> {

  public constructor(props: ITimeRangePickerProps, state: ITimeRangePickerState) {
    super(props);
    pnp.setup({
      spfxContext: this.props.spfxContext
    });
    this.state = {
      CheckboxData: [],
      CheckedItem: [],
      StartTime: [],
      EndTime: [],
      UpdatedDays: [],
      disableBtn: false
    };
    myThis = this;
  }

  public render(): React.ReactElement<ITimeRangePickerProps> {
    return (
      <>
        {
          this.state.CheckboxData.map((data: any, i: any) => {
            return (
              <div className='row' style={{ margin: '10px' }}>
                <div className='col-sm-3'>
                  <Checkbox label={data.wsp_ucc_day} onChange={(e, values) => { let item: any[] = this.state.CheckedItem; item[data.ID] = values; let Days: any[] = this.state.UpdatedDays; Days.push(data.ID); this.setState({ CheckedItem: item, UpdatedDays: Days }, () => { this.bindSlider(data.ID) }); }} />
                </div>
                <div id="time-range" className='col-sm-9'>
                  <p>Time Range: <span className={"slider-time"}>{this.state.StartTime.length > 0 ? this.state.StartTime[data.ID] : 0}</span> - <span className={"slider-time2"}>{this.state.EndTime.length > 0 ? this.state.EndTime[data.ID] : 0}</span>
                  </p>
                </div>
              </div>
            );
          })
        }
        <div className='row'>
          <div className="sliders_step1 col-sm-6">
            <div id={"slider-range"}></div>
          </div>
        </div>
        <div style={{ margin: '15px' }}>
          <PrimaryButton disabled={this.state.disableBtn} text='Save' onClick={() => this.UpdateTime()} />
        </div>
      </>
    );
  }

  public componentDidMount(): void {
    this.getFromList();
  }

  public getFromList() {
    let EndTimeArray = this.state.EndTime;
    let StartTimeArray = this.state.StartTime;
    pnp.sp.web.lists.getByTitle('TimesTemplate').items.getAll().then(async v => {
      v.forEach((data: any) => {
        EndTimeArray[data.ID] = data.wsp_ucc_End;
        StartTimeArray[data.ID] = data.wsp_ucc_Start;
      });
      this.setState({ CheckboxData: v, StartTime: StartTimeArray, EndTime: EndTimeArray });
    }).catch(function (err) {
      console.log(err);
    });
  }

  public bindSlider(i: any) {
    $(`#slider-range`).slider({
      range: true,
      min: 0,
      max: 1440,
      step: 15,
      values: [540, 1020],
      slide: function (e: any, ui: { values: number[]; }) {
        var hours1 = (Math.floor(ui.values[0] / 60));
        var minutes1 = (ui.values[0] - (hours1 * 60)).toString();

        if (hours1.toString().length == 1) hours1 = hours1;
        if (minutes1.length == 1) minutes1 = '0' + minutes1;
        if (parseInt(minutes1) == 0) minutes1 = '00';
        if (hours1 >= 12) {
          if (hours1 == 12) {
            hours1 = hours1;
            minutes1 = minutes1 + " PM";
          } else {
            hours1 = hours1 - 12;
            minutes1 = minutes1 + " PM";
          }
        } else {
          hours1 = hours1;
          minutes1 = minutes1 + " AM";
        }
        if (hours1 == 0) {
          hours1 = 12;
          minutes1 = minutes1;
        }



        // $(`.slider-time${i}`).html(hours1 + ':' + minutes1);
        // $(`.slider-time`).html(hours1 + ':' + minutes1);
        let StartTimeArray = myThis.state.StartTime;
        myThis.state.UpdatedDays.forEach((day: any) => {
          if (myThis.state.CheckedItem[day]) {
            StartTimeArray[day] = hours1 + ':' + minutes1;
          }
        });

        var hours2 = Math.floor(ui.values[1] / 60);
        var minutes2 = (ui.values[1] - (hours2 * 60)).toString();

        if (hours2.toString().length == 1) hours2 = hours2;
        if (minutes2.length == 1) minutes2 = '0' + minutes2;
        if (parseInt(minutes2) == 0) minutes2 = '00';
        if (hours2 >= 12) {
          if (hours2 == 12) {
            hours2 = hours2;
            minutes2 = minutes2 + " PM";
          } else if (hours2 == 24) {
            hours2 = 11;
            minutes2 = "59 PM";
          } else {
            hours2 = hours2 - 12;
            minutes2 = minutes2 + " PM";
          }
        } else {
          hours2 = hours2;
          minutes2 = minutes2 + " AM";
        }

        // $(`.slider-time2`).html(hours2 + ':' + minutes2);
        // $(`.slider-time2${i}`).html(hours2 + ':' + minutes2);
        let EndTimeArray = myThis.state.EndTime;
        myThis.state.UpdatedDays.forEach((day: any) => {
          if (myThis.state.CheckedItem[day]) {
            EndTimeArray[day] = hours2 + ':' + minutes2;
          }
        });

        myThis.setState({ StatTime: StartTimeArray, EndTime: EndTimeArray });
      }
    });
  }

  public UpdateTime() {

    this.state.UpdatedDays.length > 0 ?
      this.state.UpdatedDays.forEach((Day: any, i: any) => {
        this.setState({ disableBtn: true });
        pnp.sp.web.lists.getByTitle('TimesTemplate').items.getById(Day).update({
          wsp_ucc_Start: this.state.StartTime[Day],
          wsp_ucc_End: this.state.EndTime[Day]
        }).then((data) => {
          if (this.state.UpdatedDays.length - 1 == i) {
            alert("Saved successfully");
            this.setState({ disableBtn: false });
          }
        }).catch((error) => {
          if (this.state.UpdatedDays.length - 1 == i) {
            this.setState({ disableBtn: false });
          }
          console.log(error);
        });
      })
      :
      console.log("No data updated");
  }
}