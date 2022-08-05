import { Navigate, useParams } from "react-router-dom";
import indg from "./localbackend/ingredients.json";
import "./Ingredient.css";

function HandleOnInput({ el, maxlength }) {
	if (el.length > maxlength) {
		el = el.substr(0, maxlength) + "...";
	}
	return <div>{el}</div>;
}

function Ingredient(props) {
	const { name } = useParams();
	const ind = indg.find((indg) => indg.strIngredient === name);
	return (
		<div className="ingredient">
			<strong className="title">
				<div className="highlight">INGREDIENT NAME</div>
				{ind.strIngredient}
			</strong>
			<div className="content">
				<div className="highlight">DESCIPTION</div>
				<HandleOnInput el={ind.strDescription} maxlength={500} />
			</div>
			<div className="content">
				<div className="highlight">ABV</div>
				{ind.strABV}
			</div>
		</div>
	);
}

export default Ingredient;
