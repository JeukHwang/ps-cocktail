import { Navigate, useParams } from "react-router-dom";
import { search } from "./localbackend";
import "./Cocktail.css";

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

function Cocktail(props) {
	const { name } = useParams();
	const co = search(name, "cock");
	console.log(co);
	return (
		<div className="cocktail">
			<strong className="title">
				<div className="highlight">COCKTAIL NAME</div>
				{co.name}
			</strong>
			<div className="content">
				<div className="highlight">INSTRUCTION</div>
				<HandleOnInput el={co.description} maxlength={5} />
			</div>
			<div className="content">
				<div className="highlight">GLASS</div>
				{co.glass}
			</div>
			<div className="content">
				<div className="highlight">INGREDIENT</div>
				{co.ingredients
					.map(([name, measure]) => `${name} : ${measure}`)
					.join("\n")}
			</div>
			<img className="images" src={co.photo}></img>
		</div>
	);
}

export default Cocktail;
