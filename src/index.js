import React, { useState, useEffect } from 'react';
import './style.scss';
import { render } from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
	const [location, setLocation] = useState("Country");
	const [forecast, setForecast] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const [temps, setTemps] = useState({});
	const [country, setCountry] = useState("");
	const [weather, setWeather] = useState({});
	const [error, setError] = useState();
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude.toPrecision(4) + '&lon=' + position.coords.longitude.toPrecision(4) + '&units=metric&APPID=75500792ea7488c01a878f05c8adf1d9';
				fetchData(url).then(data => {
					setIsLoaded(true);
					setForecast(data);
					setTemps(data.main);
					setCountry(data.sys.country);
					setWeather(data.weather[0])
				}).catch(error => {
					setError(error)
				});
			});
		} else {
			setError("Geolocation is not supported by this browser");
		}
	}, []);

	const getWeather = () => {
		setIsLoaded(false)
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=75500792ea7488c01a878f05c8adf1d9`;
		fetchData(url)
			.then(data => {
				setIsLoaded(true);
				setForecast(data);
				setTemps(data.main);
				setCountry(data.sys.country);
				setWeather(data.weather[0])
			}).catch(error => {
				setError(error)
				console.log(error.message);
			});
	}


	if (!isLoaded) {
		return <h1>Loading...</h1>
	}
	else if (error) {
		return <h1>{error}</h1>
	}
	const { description, icon } = weather;
	const { temp, temp_max, temp_min } = temps;
	const { name } = forecast;
	return (

		<div className="container">
			<h1>Weather Forecast</h1>
			<div className="form">
				<label htmlFor="location">Enter Location: <input type="text" name="location" id="location" onChange={(e) => { setLocation(e.target.value) }} /></label>
				<button onClick={getWeather}>Enter </button>
			</div>
			<section>
				<div>{name}, {country}</div>
				<div>{description}</div>
				<div><img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={`${description} icon`} /></div>
				<div className="temps">
					<span>{temp_min}</span>
					<div>{temp}</div>
					<span>{temp_max}</span>
				</div>
				<h1>{error}</h1>
			</section>
		</div>


	)
}

const fetchData = (url) => {
	var myHeaders = new Headers();
	var myInit = {
		method: 'GET',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default'
	};
	return fetch(url, myInit).then((res) => res.json())
}

render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('root'))