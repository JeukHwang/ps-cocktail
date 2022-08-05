
import { Navigate, useParams } from "react-router-dom";

function Cocktail(props) {
	const { id } = useParams();
	return (
		<div className="ProfessorInfo-page">
			<p>cocktail</p>
			<p>{id}</p>
		</div>
	);
}

export default Cocktail;
