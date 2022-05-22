import React, { Component } from "react";

import styles from './App.module.css'
import { Chart, Cards, CountryPicker } from "./components";
import {fetchData} from './api'
import covidImg from './images/covid.png';

class App extends Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount(){
    const response = await fetchData();
    this.setState({data : response})
  }

  handleCountryChange = async (country) => {
    this.setState({country});
    //fetchTheData
    const response = await fetchData(country);
    if(response) this.setState({data: response, country});  
    console.log(this.state.data)
  } 

  render() {
    const {data} = this.state;

    return (
      <div className={styles.container}>
        <img src={covidImg} alt="covid-19" className={styles.image}/>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart dataByCountry={data} country={this.state.country}/>
      </div>
    );
  }
}

export default App;
