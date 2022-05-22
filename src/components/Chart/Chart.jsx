import React, {useEffect, useState} from 'react'
import 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'
import {fetchDailyData} from '../../api/index';

const Chart = ({dataByCountry: {confirmed,recovered,deaths}, country}) => {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setDailyData(await fetchDailyData());
    }

    fetchData();
  }, [])
  
  const barChart = (
    confirmed && (
      <Bar 
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: ['rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(255, 0, 0, 0.5)'],
            data: [confirmed, recovered, deaths]
          }]
          // labels: dataByCountry.map(({reportDate}) => reportDate),
          // datasets: [{
          //   data: dataByCountry.map(({confirmed}) => confirmed),
          //   label: 'Infected',
          //   borderColor: '#3333ff',
          //   fill: true
          // }, {
          //   data: dataByCountry.map(({deaths}) => deaths),
          //   label: 'Deaths',
          //   borderColor: 'red',
          //   backgroundColor: 'rgba(255, 0,0, 0.5)',
          //   fill: true
          // }]
        }}
        options={{
          legend: {display: false},
          title: {display: true, text: `Currentl state in ${country}`}
        }}
      />
    )
  )

  const lineChart = (
    dailyData.length
    ? (
      <Line 
        data={{
          labels: dailyData.map(({reportDate}) => reportDate),
          datasets: [{
            data: dailyData.map(({confirmed}) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true
          }, {
            data: dailyData.map(({deaths}) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0,0, 0.5)',
            fill: true
          }]
        }}
      />
    ) : null
  )

  return (
    <div className={styles.container}>
      {(!country || country === 'global') && lineChart}
      {(country && country !== 'global') && barChart}
    </div>
  )
}

export default Chart