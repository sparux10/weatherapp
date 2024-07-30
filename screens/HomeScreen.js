import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import wind from '../assets/png/aviable/wind.png'
import humidity from '../assets/png/aviable/hymidity.png'
import pressure from '../assets/png/aviable/pressure.png'
import rain from '../assets/png/aviable/rainy.png'
import sunrise from '../assets/png/aviable/sunrise.png'
import sunset from '../assets/png/aviable/sunset.png'
import cloud from '../assets/png/cloudy.png'

import moon from '../assets/png/night/night.png'
import sun from '../assets/png/day/sun.png'

export default function HomeScreen() {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchWeather(){
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=33.5883&longitude=-7.6114&current=temperature_2m,wind_speed_10m,relative_humidity_2m,pressure_msl,cloud_cover,precipitation,precipitation_probability,rain,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,rain_sum,precipitation_probability_min,sunrise,sunset,weather_code');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    } 
  }
  fetchWeather()
  }, []);


  function weatherCode(code) {

    switch (code) {
      case 0, 1, 2:
        return 'clear_day'
      case 5:
        return 'pcloudy'
      case 45, 48:
        return ('Fog and depositing rime fog')

      case 51, 53, 55:
        return ('Drizzle: Light, moderate, and dense intensity')

      case 56, 57:
        return ('Freezing Drizzle: Light and dense intensity')

      case 61, 63, 65:
        return ('	Rain: Slight, moderate and heavy intensity')

      case 66, 67:
        return('Freezing Rain: Light and heavy intensity')
      case 71, 73, 75:
        return ('Snow fall: Slight, moderate, and heavy intensity')

      case 77:
        return ('Snow grains')

      case 80, 81, 82:
        return ('Rain showers: Slight, moderate, and violent')

      case 85, 86:
        return ('Snow showers slight and heavy')

    }
  }


  const date = data && new Date(data.current.time);
  const sunRise = data && new Date(data.daily.sunrise[1]);
  const sunSet = data && new Date(data.daily.sunset[1]);

  const hours = new Date().getHours()
  const isDayTime = hours > 6 && hours < 20

  return (
    <View style={styles.container}>
      <LinearGradient
        // اعدادات التدرج اللوني
        colors={['#020423', '#041630', '#0b364f', 'rgb(0, 187, 125)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={styles.card}>
          <Text style={styles.title}>Casablanca</Text>
          <Text style={styles.date}>{data && date.toDateString() + ", " + date.getHours() + " : " + date.getMinutes()}</Text>
          <View style={styles.weatherInfo}>
            <View style={styles.weatherDetail}>
              <Image source={ isDayTime ? sun : moon} resizeMode="contain" style={styles.weatherIcon} />
              <Text style={[styles.colorText, {fontSize:10}]}>{data && weatherCode(data.current.weather_code)}</Text>
            </View>
            <Text style={styles.temperature}>{data ? data.current.temperature_2m + " " : "..."}{data && data.current_units.temperature_2m}</Text>
          </View>
          <View style={styles.gridBox}>
            <View style={styles.gridItem}><Image source={wind} resizeMode="contain" style={styles.gridIcon} /><Text style={styles.colorText}>{data && data.current.wind_speed_10m + " " + data.current_units.wind_speed_10m}</Text></View>
            <View style={styles.gridItem}><Image source={humidity} resizeMode="contain" style={styles.gridIcon} /><Text style={styles.colorText}>{data && data.current.relative_humidity_2m + " " + data.current_units.relative_humidity_2m}</Text></View>
            <View style={styles.gridItem}><Image source={pressure} resizeMode="contain" style={styles.gridIcon} /><Text style={styles.colorText}>{data && data.current.pressure_msl + " " + data.current_units.pressure_msl}</Text></View>
            <View style={styles.gridItem}><Image source={cloud} resizeMode="contain" style={styles.gridIcon} /><Text style={styles.colorText}>{data && data.current.cloud_cover + " " + data.current_units.cloud_cover}</Text></View>
            <View style={styles.gridItem}><Image source={rain} resizeMode="contain" style={styles.gridIcon} /><Text style={styles.colorText}>{data && data.current.precipitation + " " + data.current_units.precipitation}</Text></View>
            <View style={styles.gridItem}><Image source={rain} resizeMode="contain" style={styles.gridIcon} /><Text style={styles.colorText}>{data && data.current.precipitation_probability + " " + data.current_units.precipitation_probability}</Text></View>
            <View style={styles.gridItem}><Image source={sunrise} resizeMode="contain" style={styles.gridIcon} /><Text style={styles.colorText}>{data && data && sunRise.getHours() + " : " + sunRise.getMinutes()}</Text></View>
            <View style={styles.gridItem}><Image source={sunset} resizeMode="contain" style={styles.gridIcon} /><Text style={styles.colorText}>{data && sunSet.getHours() + " : " + sunSet.getMinutes()}</Text></View>
          </View>
        </View>
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    height: "auto",

  },
  gradient: {
    borderRadius: 10, // حواف دائرية
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10,
    color: "#fff"
  },
  date: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 10, 
  },
  weatherInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
    color: "#fff"
  },
  weatherDetail: {
    flexDirection: "row",
    alignItems: 'center',
    color: "#fff"
  },
  weatherIcon: {
    width: 50,
    marginRight: 10,
    color: "#fff"
  },
  temperature: {
    fontSize: 24,
    color: "#fff"
  },
  gridBox: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    
  },
  gridItem: {
    width: '50%',
    height: 50,
    flexDirection:'row',
    justifyContent: 'start',
    alignItems: 'center',
    marginVertical: 10,
    color: "#fff"
  },
  gridIcon: {
    width: 26,
    marginLeft: "20%",
    marginRight: 20
  },
  colorText: {
    color: "#fff",
  }
});