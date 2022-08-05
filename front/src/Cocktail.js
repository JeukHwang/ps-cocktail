import { Navigate, useParams } from "react-router-dom";
import cock from "./localbackend/cocktail.json";
import "./Cocktail.css";

function Cocktail(props) {
	const { name } = useParams();
	const co = cock.find((cock) => cock.strDrink === name);
	console.log(co);
	return (
		<div className="cocktail">
			<strong>{co.strDrink}</strong>
			<image>{co.strDrinkThumb}</image>
		</div>
	);
}

export default Cocktail;
