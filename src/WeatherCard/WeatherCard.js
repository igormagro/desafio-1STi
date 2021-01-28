import React from "react";
import "./WeatherCard.css";
import { DAYS, CONDITION_CODES } from "../translations";
import _ from "lodash";

const WeatherCard = (props) => {
  //const dailyForecast = [];
  const dailyForecast = props.data.forecasts
    .filter((el, idx) => {
      if (window.outerWidth >= 500) {
        return (idx - 1) * (idx - 5) <= 0;
      } else {
        return (idx - 1) * (idx - 4) <= 0;
      }
    })
    .map((el) => {
      return (
        <td>
          <tr>
            <td colSpan="2">{DAYS[el.day]}</td>
          </tr>
          <tr>
            <td className="temperature">
              {el.low}° {el.high}°
            </td>
          </tr>
        </td>
      );
    });

  return (
    <div className="box">
      <div className="box__current-weather">
        <p className="location">{`${_.startCase(props.data.name)},${
          props.data.state
        } - Brazil`}</p>
        <i onClick={props.closed} className="fas fa-times"></i>
        <h1 className="box__heading">{`${
          props.data.currentObservation.temperature
        }°C ${_.startCase(
          CONDITION_CODES[props.data.currentObservation.conditionCode]
        )}`}</h1>

        <table>
          <tbody>
            <tr>
              <td className="col_1">
                <i className="fas fa-arrow-up"></i>{" "}
                <strong>{props.data.forecasts[0].low}°</strong>
              </td>
              <td className="col_1">
                <i className="fas fa-arrow-down"></i>{" "}
                <strong>{props.data.forecasts[0].high}°</strong>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="col_1">
                Vento: <strong>{props.data.currentObservation.wind}km/h</strong>
              </td>
              <td className="col_2">
                Humidade:{" "}
                <strong>{props.data.currentObservation.humidity}%</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="box__forecast">
        <table>
          <tbody>{dailyForecast}</tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherCard;
