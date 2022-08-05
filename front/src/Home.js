import "./Home.css";
import { autoComplete, combination, search } from "./localbackend/index.js";


function Home(props) {
    window.onload = () => {
        function saveLocalStorage(data, id) {
            localStorage.setItem("ings", JSON.stringify(data));
            console.log("save", data?.length, id);
        }

        function loadLocalStorage(id) {
            const data = JSON.parse(localStorage.getItem("ings"));
            console.log("load", data?.length, id);
            return data;
        }
        const searchInput = document.getElementById("searchInput");
        document.body.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                if (searchInput.value === "") {
                    alert("Write name of ingredient not blank!");
                    return;
                }
                const searchData = search(searchInput.value);
                const existAsIng = searchData !== undefined && searchData.mode === "ing";
                if (!existAsIng) {
                    alert("Write name of ingredient not cocktail!");
                    return;
                }
                addIngredient(searchInput.value);
                searchInput.value = "";
                setAutocomplete();
                return;
            }
        });
        const autocompleteElem = document.getElementById("autocomplete");
        function setAutocomplete() {
            while (autocompleteElem.lastElementChild) {
                autocompleteElem.removeChild(autocompleteElem.lastElementChild);
            }
            if (searchInput.value.length < 2) { return; }
            const words = autoComplete(searchInput.value.trim());
            const maxNum = 5;
            [...Array(maxNum).keys()].forEach((i) => {
                if (!words[i]) { return; }
                const [type, word] = words[i];
                const text = document.createElement("div");
                text.id = word;
                text.classList.add("autocomplete-words");
                text.innerText = `${type} | ${word}`;
                text.addEventListener("click", () => {
                    // const str = text.innerText;
                    // const type = str.substring(0, str.indexOf(' '));
                    // const name = str.substring(str.indexOf(' ') + 1);
                    searchInput.value = text.id;
                    setAutocomplete();
                });
                const button = document.createElement("div");
                button.id = `/${type}/${word}`;
                button.classList.add("words-button");
                button.innerText = "🔗";
                button.addEventListener("click", function() {
                    window.location.href = this.id;
                }.bind(button))
                text.appendChild(button);
                autocompleteElem.appendChild(text);
            });
            if (words.length - maxNum > 0) {
                const text = document.createElement("div");
                text.classList.add("autocomplete-words");
                text.innerText = `${words.length - maxNum} more results ...`;
                autocompleteElem.appendChild(text);
            }
        }
        let debounce;
        searchInput.addEventListener("input", () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => { setAutocomplete(); }, 500);
        });
        const ings = document.getElementById("ingredients");

        function removeIngredient(name) {
            const localIngs = loadLocalStorage("removeIngredient-load");
            if (localIngs.includes(name)) {
                const index = localIngs.indexOf(name);
                if (index > -1) { localIngs.splice(index, 1); }
            }
            saveLocalStorage(localIngs, "removeIngredient-save");
            const element = document.getElementById(`id-${name}`);
            element.remove();
        }

        const combinationElem = document.getElementById("combination-button");
        const combinations = document.getElementById("combinations");
        function resetCombinations() {
            while (combinations.lastElementChild) {
                combinations.removeChild(combinations.lastElementChild);
            }
        }

        function addIngredient(name) {
            resetCombinations();
            if (loadLocalStorage("addIngredient-load").includes(name)) {
                alert("Already added!");
                return;
            }
            saveLocalStorage([...loadLocalStorage("addIngredient-load"), name], "addIngredient-save");
            const ing = document.createElement("div");
            ing.id = `id-${name}`;
            ing.classList.add("ingredient");
            ing.innerText = name;
            ing.addEventListener("click", () => {
                // const str = ing.innerText;
                // const type = str.substring(0, str.indexOf(' '));
                // const name = str.substring(str.indexOf(' ') + 1);
                window.location.href = `/Ingredient/${name}`;
            });
            ing.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                removeIngredient(name);
            });
            ings.appendChild(ing);
        }

        const data = loadLocalStorage("init-load");
        if (!data) {
            saveLocalStorage([], "init-save"); // Initial
        } else {
            saveLocalStorage([], "init-save2");
            data.forEach((ing) => { addIngredient(ing); });
        }
        function setCombinations() {
            const names = loadLocalStorage("setComb-load");
            const possibleNames = combination(names);
            if (possibleNames.length === 0) {
                const comb = document.createElement("div");
                comb.classList.add("comb");
                comb.innerText = "No possible cocktail!";
                combinations.appendChild(comb);
            }
            possibleNames.forEach((name) => {
                const comb = document.createElement("div");
                comb.id = `id-${name}`;
                comb.classList.add("comb");
                comb.innerText = name;
                comb.addEventListener("click", () => {
                    window.location.href = `/cocktail/${name}`;
                });
                combinations.appendChild(comb);
            });
        }
        combinationElem.addEventListener("click", () => {
            setCombinations();
        });
    };
    return (
        <div>
            <div className="padding?"></div>
            <div className="home">
                <div className="logo">🍷</div>
                <div className="search-bar">
                    <div className="psuedo-search-bar">
                        🔍<input id="searchInput" className="search-input" placeholder="Ingredient"></input>
                    </div>
                    <div id="autocomplete" className="autocomplete"></div>
                </div>
                <div className="ingredients-info">My list</div>
                <div id="ingredients" className="ingredients"></div>
                <button id="combination-button" className="combination">🥴</button>
                <div id="combinations" className="combinations"></div>
            </div>
            <div className="ps">Ps : Yurim Jeuk SangOh</div>
        </div>
    );
}



export default Home;