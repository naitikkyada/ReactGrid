import * as React from 'react';
import styles from './TimeRangePicker.module.scss';
import { ITimeRangePickerProps } from './ITimeRangePickerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';
import pnp from 'sp-pnp-js';
import { Checkbox } from '@fluentui/react';
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
      EndTime: []
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
                  <Checkbox label={data.wsp_ucc_day} onChange={(e, values) => { let item: any[] = this.state.CheckedItem; item[data.ID] = values; this.setState({ CheckedItem: item }, () => { this.bindSlider(data.ID); }); }} />
                </div>
                {
                  this.state.CheckedItem[data.ID] &&
                  <div id="time-range" className='col-sm-9'>
                    <p>Time Range: <span className={"slider-time" + data.ID}>{data.wsp_ucc_Start}</span> - <span className={"slider-time2" + data.ID}>{data.wsp_ucc_End}</span>
                    </p>
                    <div className="sliders_step1">
                      <div id={"slider-range" + data.ID}></div>
                    </div>
                  </div>
                }
              </div>
            );
          })
        }
      </>
    );
  }

  public componentDidMount(): void {
    this.getFromList();
  }

  public getFromList() {
    pnp.sp.web.lists.getByTitle('TimesTemplate').items.getAll().then(async v => {
      this.setState({ CheckboxData: v });
    }).catch(function (err) {
      console.log(err);
    });
  }

  public bindSlider(i: any) {
    $(`#slider-range${i}`).slider({
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



        $(`.slider-time${i}`).html(hours1 + ':' + minutes1);
        let StartTimeArray = myThis.state.StartTime;
        StartTimeArray[i] = hours1 + ':' + minutes1;

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

        $(`.slider-time2${i}`).html(hours2 + ':' + minutes2);
        let EndTimeArray = myThis.state.EndTime;
        EndTimeArray[i] = hours2 + ':' + minutes2;

        myThis.setState({ StatTime: StartTimeArray, EndTime: EndTimeArray }, () => { myThis.UpdateTime(i); });
      }
    });
  }

  public UpdateTime(ID: any) {
    pnp.sp.web.lists.getByTitle('TimesTemplate').items.getById(ID).update({
      wsp_ucc_Start: this.state.StartTime[ID],
      wsp_ucc_End: this.state.EndTime[ID]
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }
}
