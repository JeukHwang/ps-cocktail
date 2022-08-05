import "./Home.css";
import { searchIngredient } from "./localbackend/index.js";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

function UserDataRow({ title, maxLength, setter }) {
	return (
		<div className="user-data-row">
			<div className="user-data-row-title">{title}</div>
			<input
				className="user-data-row-input"
				id={"user-data-row-input-" + title}
				maxLength={maxLength}
				onChange={(e) => {
					setter(e.target.value);
				}}
			/>
		</div>
	);
}
function Button({ title, id, setUserDt, userDt }) {
	return (
		<button
			id="home-button"
			onClick={() => {
				if (id === "a") {
					console.log(id);
					var dad = searchIngredient("");
					console.log(dad);
				}
			}}
		>
			{title}
		</button>
	);
}
function InputUserData({ title, setId }) {
	return (
		<div className="input-user-data">
			<UserDataRow title={title} shown={true} setter={setId} />
		</div>
	);
}

function Showlist({ title, props }) {
	return <div className="image-list"></div>;
}

function Showind({}) {
	const [isOpen, setIsOpen] = useState(false);
	const openSubnavbar = () => setIsOpen(true);
	const closeSubnavbar = () => setIsOpen(false);
	return <div id="showbar" style={isOpen ? {} : { height: 0 }}></div>;
}

function Home(props) {
	const [id, setId] = useState("");
	return (
		<div className="home">
			<img src={"../public/cocktail.png"} className="main-img" />
			<div className="home-info">
				<InputUserData title={"Ingredient"} setId={setId} />
				<Button
					title={"add"}
					id={id}
					setUserDt={props.setUserDt}
					userDt={props.userDt}
				/>
			</div>
			<Showind />
			<div className="home-info">
				<InputUserData title={"list"} setId={setId} />
				<Button
					title={"search"}
					id={id}
					setUserDt={props.setUserDt}
					userDt={props.userDt}
				/>
			</div>
			<Showlist title={"cocktail"} setId={setId} />
		</div>
	);
}

export default Home;
