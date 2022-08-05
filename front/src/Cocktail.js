import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Cocktail(props) {
	const { name } = useParams();
	return (
		<div>
			<strong>{props.userDt.name}님 안녕하세요!</strong>
		</div>
	);
}

export default Cocktail;
