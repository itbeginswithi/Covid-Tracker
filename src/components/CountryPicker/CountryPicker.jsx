import { FormControl, NativeSelect } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { fetchCountries } from '../../api'

import styles from './CountryPicker.module.css'

const CountryPicker = ({handleCountryChange}) => {
  const [fetchedCountries, setFetchedCountries] = useState([])

  useEffect(() => {
    const fetchForCountries = async () => {
      setFetchedCountries(await fetchCountries());
    }

    fetchForCountries();
  }, [])

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="global">Global</option>
        {
          fetchedCountries.length && fetchedCountries?.map((country, i) => (
            <option value={country} key={i}>{country}</option>
          ))
        }
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker