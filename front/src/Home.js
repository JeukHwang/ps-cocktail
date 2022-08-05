import { useState } from "react";
import "./Home.css";
import { searchIngredient } from "./localbackend/index.js";

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

function Showind({ }) {
    const [isOpen, setIsOpen] = useState(false);
    const openSubnavbar = () => setIsOpen(true);
    const closeSubnavbar = () => setIsOpen(false);
    return <div id="showbar" style={isOpen ? {} : { height: 0 }}></div>;
}

function Home(props) {
    const [id, setId] = useState("");
    return (
        <div className="home">
            <div className="logo">🍸</div>
            <div className="search-bar">
                <div className="psuedo-search-bar">
                    🔍<input id="searchInput" className="search-input" placeholder="Ingredient"></input>
                </div>
                <div id="autocomplete" className="autocomplete"></div>
            </div>
            <InputUserData title={"Ingredient"} setId={setId} />
            <Button
                title={"add"}
                id={id}
                setUserDt={props.setUserDt}
                userDt={props.userDt}
            />
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

window.onload = () => {
    const searchInput = document.getElementById("searchInput");
    function addIntegredient() {
        if (searchInput.value === "") { return; }
        console.log("add!");
        searchInput.value = "";
        return;
    }
    document.body.addEventListener("keypress", (event) => {
        if (event.key === "Enter") { addIntegredient(); }
    });
    const autocomplete = document.getElementById("autocomplete");
    function setAutocomplete(words) {
        while (autocomplete.lastElementChild) {
            autocomplete.removeChild(autocomplete.lastElementChild);
        }
        words.forEach((word) => {
            const text = document.createElement("div");
            text.classList.add("autocomplete-words");
            text.innerText = word;
            text.addEventListener("click", () => {
                searchInput.value = text.innerText;
                const data = searchInput.value !== "" ? [searchInput.value, searchInput.value + "1", searchInput.value + "2"] : [];
                setAutocomplete(data);
            });
            autocomplete.appendChild(text);
        });
    }
    let debounce;
    searchInput.addEventListener("input", () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            const data = searchInput.value !== "" ? [searchInput.value, searchInput.value + "1", searchInput.value + "2"] : [];
            setAutocomplete(data);
        }, 300);
    });
};

export default Home;
