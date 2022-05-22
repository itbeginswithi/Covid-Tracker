import axios from 'axios';

const endpoint = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = endpoint;

    if(country && country !== 'global'){
        changeableUrl = `${endpoint}/countries/${country}`;

        try {
            const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
    
            const modifiedData = {
                confirmed: confirmed.value,
                recovered: recovered.value,
                deaths: deaths.value,
                reportDate: lastUpdate,
            };

            return modifiedData;
        } catch (error) {
            console.log(error);
        }
    }else{
        try {
            const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
    
            return {
                confirmed: confirmed.value ,
                recovered: recovered.value ,
                deaths: deaths.value ,
                lastUpdate
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${endpoint}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            reportDate: dailyData.reportDate,
        }))
        return modifiedData;
    }catch(error){
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try{
        const {data: {countries}} = await axios.get(`${endpoint}/countries`);
        return countries.map((country) => country.name);
    }catch(error){
        console.log(error);
    }
}

export const fetchByCountry = async (country) => {
    try{
        const {data} = await axios.get(`${endpoint}/countries/${country}`);
        // return countries.map((country) => country.name);
        const modifiedData = {
            confirmed: data.confirmed.value,
            deaths: data.deaths.value,
            reportDate: data.lastUpdate,
        };

        return modifiedData;
    }catch(error){
        console.log(error);
    }
}