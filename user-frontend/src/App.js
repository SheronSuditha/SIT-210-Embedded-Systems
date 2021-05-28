import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Homepage from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DashboardPage from './components/pages/Dashboard';


function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/" exact component={Homepage} />
					<Route path="/dashboard" exact component={DashboardPage} />
				</Switch>
			</div>
		</Router>

	)
}

export default App;
