import async from "async";
import _ from "lodash";
import React, { Component } from "react";
import { getWeatherForecast } from "./apiRequest";
import "./App.css";

import WeatherCard from "./WeatherCard/WeatherCard";

class App extends Component {
  state = {
    width: window.outerWidth,
    opened: false,
    searchedCity: {
      name: "",
      state: "",
      forecasts: [],
      currentObservation: {
        humidity: "",
        condition: {
          teperature: "",
          code: "",
        },
        wind: "",
      },
    },
    capitals: [
      { city: "Rio de Janeiro", state: "RJ", data: {} },
      { city: "Sao Paulo", state: "SP", data: {} },
      { city: "Belo Horizonte", state: "MG", data: {} },
      { city: "Brasilia", state: "DF", data: {} },
      { city: "Belem", state: "PA", data: {} },
      { city: "Salvador", state: "BA", data: {} },
      { city: "Curitiba", state: "PR", data: {} },
      { city: "Fortaleza", state: "CE", data: {} },
      { city: "Manaus", state: "AM", data: {} },
      { city: "Joao Pessoa", state: "PB", data: {} },
    ],
  };

  componentDidMount() {
    const auxList = this.state.capitals;
    async.eachOf(
      this.state.capitals,
      (capital, idx, callback) => {
        getWeatherForecast(
          [_.lowerCase(capital.city), _.lowerCase(capital.state)].join(","),
          (res, err) => {
            if (!err) {
              const { forecasts } = res;
              auxList[idx]["data"] = {
                min: forecasts[0].low,
                max: forecasts[0].high,
              };
            }

            callback();
          }
        );
      },
      () => {
        this.setState({ ...this.state, capitals: auxList });
      }
    );
  }

  inputChangeHandler = (e) => {
    const cityName = e.target.value;
    this.setState({
      ...this.state,
      searchedCity: { ...this.state.searchedCity, name: cityName },
    });
  };

  searchClickHandler = (e) => {
    e.preventDefault();

    getWeatherForecast(
      [_.lowerCase(this.state.searchedCity.name), "br"].join(","),
      (res, err) => {
        if (!err) {
          const { current_observation, forecasts, location } = res;
          const { region } = location;
          const { atmosphere, condition, wind } = current_observation;
          const filledData = {
            state: region,
            forecasts: forecasts,
            currentObservation: {
              humidity: atmosphere.humidity,
              temperature: condition.temperature,
              conditionCode: condition.code,
              wind: wind.speed,
            },
          };

          this.setState({
            ...this.setState,
            opened: true,
            searchedCity: {
              ...this.state.searchedCity,
              ...filledData,
            },
          });
        }
      }
    );
  };

  closeCardClickHanlder = () => {
    this.setState({ ...this.state, opened: false });
  };

  render() {
    const capitalsList1 = this.state.capitals
      .filter((el, idx) => {
        return idx < 5;
      })
      .map((el, idx) => {
        return (
          <tr key={idx} className="row">
            <td className="row__item">{el.data.min}°</td>
            <td className="row__item">{el.data.max}°</td>
            <td className="row__item">{el.city}</td>
          </tr>
        );
      });
    const capitalsList2 = this.state.capitals
      .filter((el, idx) => {
        return idx >= 5;
      })
      .map((el, idx) => {
        return (
          <tr key={idx} className="row">
            <td className="row__item">{el.data.min}°</td>
            <td className="row__item">{el.data.max}°</td>
            <td className="row__item">{el.city}</td>
          </tr>
        );
      });

    return (
      <div className="root">
        <div className="topContainer">
          <h1>Previsao do Tempo</h1>
          {this.state.opened && (
            <WeatherCard
              data={this.state.searchedCity}
              closed={this.closeCardClickHanlder}
            />
          )}

          <form>
            <div className="inputContainer">
              <input
                className="input"
                placeholder="Insira aqui o nome da cidade"
                onChange={this.inputChangeHandler}
              />
            </div>
            <div
              className="inputIconContainer"
              onClick={this.searchClickHandler}
            >
              <i className="fa fa-search"></i>
            </div>
          </form>
        </div>
        <div className="bottomContainer">
          <div className="capitalsContainer">
            <h2 className="capitals__heading">Capitais</h2>
            <div className="table">
              <table className="table__column">
                <tbody>
                  <tr>
                    <td className="row__head" colSpan="1">
                      Min
                    </td>
                    <td className="row__head" colSpan="1">
                      Max
                    </td>
                  </tr>
                  {capitalsList1}
                  {this.state.width <= 500 && capitalsList2}
                </tbody>
              </table>
              {this.state.width > 500 && (
                <table className="table__column">
                  <tbody>
                    <tr>
                      <td className="row__head" colSpan="1">
                        Min
                      </td>
                      <td className="row__head" colSpan="1">
                        Max
                      </td>
                    </tr>
                    {capitalsList2}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// const App = () => {
//   const [city, setCity] = useState("");
//   const [capitals, setCapitals] = useState([
//     { city: "Rio de Janeiro", state: "RJ", data: {} },
//     { city: "Sao Paulo", state: "SP", data: {} },
//     { city: "Belo Horizonte", state: "MG", data: {} },
//     { city: "Brasilia", state: "DF", data: {} },
//     { city: "Belem", state: "PA", data: {} },
//     { city: "Salvador", state: "BA", data: {} },
//     { city: "Curitiba", state: "PR", data: {} },
//     { city: "Fortaleza", state: "CE", data: {} },
//     { city: "Manaus", state: "AM", data: {} },
//     { city: "Joao Pessoa", state: "PB", data: {} },
//   ]);
//   useEffect(() => {
//     console.log("[useEffect]");
//     const auxList = capitals;
//     async.eachOf(
//       capitals,
//       (capital, idx, callback) => {
//         getWeatherForecast(
//           [_.lowerCase(capital.city), _.lowerCase(capital.state)].join(","),
//           (res, err) => {
//             if (!err) {
//               const { forecasts } = res;
//               auxList[idx]["data"] = {
//                 min: forecasts[0].low,
//                 max: forecasts[0].high,
//               };
//             }
//             console.log("[async loop]", idx);
//             callback();
//           }
//         );
//       },
//       () => {
//         console.log("reached async callback");
//         setCapitals(auxList);
//       }
//     );
//   }, [capitals]);

//   const inputChangeHandler = (e) => {
//     const cityName = e.target.value;
//     setCity(cityName);
//   };

//   const searchClickHandler = (e) => {
//     e.preventDefault();
//     getWeatherForecast([_.lowerCase(city), "br"].join(","), (res, err) => {
//       if (!err) {
//         console.log(res);
//       }
//     });
//   };

//   const capitalsList1 = capitals
//     .filter((el, idx) => {
//       return idx < 5;
//     })
//     .map((el, idx) => {
//       return (
//         <div key={idx} className="row">
//           <p className="row__item">{el.data.min}°</p>
//           <p className="row__item">{el.data.max}°</p>
//           <p className="row__item">{el.city}</p>
//         </div>
//       );
//     });
//   const capitalsList2 = capitals
//     .filter((el, idx) => {
//       return idx >= 5;
//     })
//     .map((el, idx) => {
//       return (
//         <div key={idx} className="row">
//           <p className="row__item">{el.data.min}°</p>
//           <p className="row__item">{el.data.max}°</p>
//           <p className="row__item">{el.city}</p>
//         </div>
//       );
//     });

//   return (
//     <div className="root">
//       <div className="topContainer">
//         <h1>Previsao do Tempo</h1>
//         <form>
//           <div className="inputContainer">
//             <input
//               className="input"
//               placeholder="Insira aqui o nome da cidade"
//               onChange={inputChangeHandler}
//             />
//           </div>
//           <div className="inputIconContainer" onClick={searchClickHandler}>
//             <i className="fa fa-search"></i>
//           </div>
//         </form>
//       </div>
//       <div className="bottomContainer">
//         <div className="capitalsContainer">
//           <h2>Capitais</h2>
//           <div className="table">
//             <div className="table__column">{capitalsList1}</div>
//             <div className="table__column">{capitalsList2}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//export default App;
