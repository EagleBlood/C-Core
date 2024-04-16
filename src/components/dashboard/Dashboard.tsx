
import { IcSensor } from "../../assets/IcSensor";
import { PhPlugs } from "../../assets/PhPlugs";
import { PhPlugsConnected } from "../../assets/PhPlugsConnected";
import { PhPlus } from "../../assets/PhPlus";
import { PhUserBoldSec } from "../../assets/PhUserBoldSec";
import DashboardChart from "../charts/dashboardChart/chart";
import { DashboardProps } from "./dashboard.props";
import { Wrapper } from './dashboard.style';
import { FunctionComponent } from "react";
import 'chart.js/auto';

const Dashboard: FunctionComponent<DashboardProps> = ({}) => {


  return (
    <Wrapper>
      <div className="scrollContainer">
        <div className="deviceInfoContainer">
            <div className="deviceInfo">
                <div className="row" style={{gap: '10px'}}>
                    <IcSensor/>
                    <p>Number of devices</p>
                </div>
                
                <h1>5</h1>
            </div>

            <div className="verticleLine"></div>

            <div className="deviceInfo">
                <div className="row" style={{gap: '10px'}}>
                    <PhUserBoldSec/>
                    <p>Total Users</p>
                </div>
                <h1>5</h1>
            </div>

            <div className="verticleLine"></div>

            <div className="deviceInfo">
                <div className="row" style={{gap: '10px'}}>
                    <PhPlugsConnected/>
                    <p>Devices Active</p>
                </div>
                <h1>5</h1>
            </div>

            <div className="verticleLine"></div>

            <div className="deviceInfo">
                <div className="row" style={{gap: '10px'}}>
                    <PhPlugs/>
                    <p>Devices Inactive</p>
                </div>
                <h1>5</h1>
            </div>
        </div>

        <div className="chartContainer">
            <DashboardChart key={"123"}/>
        </div>

        <div className="deviceListContainer">
            <div className="addDevice">
                <PhPlus/>
            </div>

            <div className="device">
                <h1>test</h1>
            </div>
            <div className="device">
                <h1>test</h1>
            </div>
            <div className="device">
                <h1>test</h1>
            </div>
            <div className="device">
                <h1>test</h1>
            </div>
            <div className="device">
                <h1>test</h1>
            </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Dashboard;
