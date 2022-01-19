import React from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components//SearchBox.js';
import Scroll from '../components//Scroll.js';
import './App.css';
// react runs these when it refreshes:
// constructor, render, componentDidMount, render
// this occurs because componentDidMount updates
// render then refreshes

class App extends React.Component {
	constructor() {
		// call super constructor from React.Component
		// these are called smart components
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({robots: users}));
	}

	render() { 
		// destructure for readability
		const { robots, searchfield } = this.state
		const filteredRobot = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		// could use ternary operator here
		if (!robots.length) {
			return <h1 className='tc'>Loading</h1>	
		} else {
			
			return (
				<div className='tc'>
					<h1 className='f1'> RoboFriends </h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots={filteredRobot}/>
					</Scroll>
				</div>
				);
		}
	}
}

export default App;


