import { Navigate, useParams } from "react-router-dom";
import "./Ingredient.css";
import { search } from "./localbackend";

function HandleOnInput({ el, maxlength }) {
	if (el.length > maxlength) {
		const text = el.splice(0, maxlength).join("\n");
		return (
			<div>
				{text}
				<br />. . .
			</div>
		);
	} else {
		const text = el.join("\n");
		return <div>{text}</div>;
	}
}

function Ingredient(props) {
	const { name } = useParams();
	const ind = search(name);
	console.log(ind);
	return (
		<div className="ingredient">
			<strong className="title">
				<div className="highlight">INGREDIENT</div>
				{ind.name}
			</strong>
			<div className="content">
				<div className="highlight">DESCIPTION</div>
				<HandleOnInput el={ind.description} maxlength={5} />
			</div>
			<div className="content">
				<div className="highlight">ABV</div>
				{ind.abv}%
			</div>
		</div>
	);
}
export default Ingredient;
