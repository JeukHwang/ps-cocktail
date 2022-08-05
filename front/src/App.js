import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cocktail from "./Cocktail";
import Error from "./Error";
import { useState } from "react";

function App() {
	const [userDt, setUserDt] = useState({
		logined: false,
		name: undefined,
	});
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Home userDt={userDt} setUserDt={setUserDt} />}
					/>
					<Route
						path="/home"
						element={<Home userDt={userDt} setUserDt={setUserDt} />}
					/>
					<Route
						path="/cocktail"
						element={
							<Cocktail userDt={userDt} setUserDt={setUserDt} />
						}
					/>
					<Route
						path="*"
						element={
							<Error errno={404} errdsc={"There is no page."} />
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

