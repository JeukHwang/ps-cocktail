import { Navigate, useParams } from "react-router-dom";
import cock from "./localbackend/cocktail.json";
import "./Cocktail.css";

function Cocktail(props) {
	const { name } = useParams();
	const co = cock.find((cock) => cock.strDrink === name);
	console.log(co);
	return (
		<div className="cocktail">
			<strong className="title">
				<div className="highlight">COCKTAIL NAME</div>
				{co.strDrink}
			</strong>
			<div className="content">
				<div className="highlight">INSTRUCTION</div>
				{co.strInstructions}
			</div>
			<div className="content">
				<div className="highlight">GLASS</div>
				{co.strGlass}
			</div>
			<img className="images" src={co.strDrinkThumb}></img>
		</div>
	);
}

export default Cocktail;
