import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

class Car extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				locus: "",
				city: "",
				country: "",
				img: "",
				description: "",
				minTemp: 0,
				aveTemp: 0,
				maxTemp: 0
			};
		}
		location = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
				var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude.toPrecision(4) + '&lon=' + position.coords.longitude.toPrecision(4)  + '&units=metric&APPID=75500792ea7488c01a878f05c8adf1d9';
				var myHeaders = new Headers();
				var myInit = { method: 'GET',
					headers: myHeaders,
					mode: 'cors',
					cache: 'default' };	
				fetch(url, myInit).then(function(resp){
					return resp.json();
				}).then((ans)=>{ 
				this.setState({
					city: ans.name + ', ',
					country: ans.sys.country,
					img: 'https://openweathermap.org/img/wn/' + ans.weather[0].icon + '@2x.png',
					description: ans.weather[0].description,
					minTemp: (ans.main.temp_min).toPrecision(2),
					aveTemp: (ans.main.temp).toPrecision(2),
					maxTemp: (ans.main.temp_max).toPrecision(2)
				});
			});
				});
			} else {
				document.getElementById("message").innerHTML = "Geolocationis not supported by this browser";
			}
		};
		enteredCity = (event) => {
			event.preventDefault();
			var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.locus + '&units=metric&APPID=75500792ea7488c01a878f05c8adf1d9';
			var myHeaders = new Headers();
		    var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };	
			fetch(url, myInit).then(function(resp){
			return resp.json();
			}).then(function(ans){ 
				this.setState({
					city: ans.name + ', ',
					country: ans.sys.country,
					img: 'https://openweathermap.org/img/wn/' + ans.weather[0].icon + '@2x.png',
					description: ans.weather[0].description,
					minTemp: (ans.main.temp_min).toPrecision(2),
					aveTemp: (ans.main.temp).toPrecision(2),
					maxTemp: (ans.main.temp_max).toPrecision(2)
				});
			}.bind(this));		
		}; 
		stater = (event) => {
			this.setState({locus: event.target.value});
		}
	render(){
		var img = "";
		return (
		<div>
			<button onClick={this.location}>Local Weather</button>
			<div id="message"></div>
			<form name="myCity" onSubmit={this.enteredCity} method="POST" netlify>
			<input type="text" onChange={this.stater}/>
			<input type="submit" value="Enter"/>
			</form>
			<div><img src={this.state.img}/></div>
			<div>{this.state.city}{this.state.country}</div>
			<div>{this.state.description}</div>
			<div>Min: {this.state.minTemp} °C</div> 
			<div id="ave">Actual: {this.state.aveTemp} °C</div> 
			<div>Max: {this.state.maxTemp} °C</div> 
		</div>
		);
	}
}
ReactDOM.render(<Car/>, document.getElementById('root'));