const form = document.querySelector(".main-form");

const fetchTo = async (endPoint, routeParams) => {
  try {
    const response = await fetch(`${endPoint}${routeParams}`); // testar convertido no input

    if (!response.ok) {
      throw new Error(`Não existe Pokemon com esse nome ou número :(`);
    }

    return await response.json();
  } catch (error) {
    alert(`ATENÇÂO: ${error.message}`);
  }
};

const renderPokemonValues = async (idOrNameOfPokemon) => {
  const pokemondata = await fetchTo(
    "https://pokeapi.co/api/v2/pokemon/",
    idOrNameOfPokemon
  );

  const spreadTypes = (objectWithTypes) => {
    return (types = objectWithTypes.reduce(
      (acc, obj) => acc + `${obj.type.name}, `,
      ""
    ));
  };

  const spreadAbilities = (objectWithAbilities) => {
    return objectWithAbilities.reduce(
      (acc, e) => (acc += `${e.ability.name}, `),
      ""
    );
  };

  const nameOfPokemon = pokemondata.name;
  const weightOfPokemon = pokemondata["weight"];
  const heightOfPokemon = pokemondata["height"];
  const urlToMainImageOfPokemon =
    pokemondata["sprites"]["other"]["dream_world"]["front_default"];
  const urlToAnimatedGifOfPokemon =
    pokemondata["sprites"]["versions"]["generation-v"]["black-white"][
      "animated"
    ]["front_default"];

  const objectWithTypes = pokemondata["types"];
  const typeOfPokemon = spreadTypes(objectWithTypes);

  const objectWithAbilities = pokemondata["abilities"];
  const abilityOfPokemon = spreadAbilities(objectWithAbilities);

  const mainImagePokemon = document.querySelector("[data-js=mainImagePokemon]");
  const pokemonGif = document.querySelector("[data-js=pokemonGif]");
  const pokemonName = document.querySelector("[data-js=pokemonName]");
  const pokemonWeight = document.querySelector("[data-js=pokemonWeight]");
  const pokemonHeight = document.querySelector("[data-js=pokemonHeight]");
  const pokemonType = document.querySelector("[data-js=pokemonType]");
  const pokemonAbility = document.querySelector("[data-js=pokemonAbility]");

  pokemonName.innerText = nameOfPokemon;
  mainImagePokemon.setAttribute("src", urlToMainImageOfPokemon);
  mainImagePokemon.setAttribute("alt", `Imagem do pokemon ${nameOfPokemon}`);
  mainImagePokemon.setAttribute("title", nameOfPokemon);
  pokemonGif.setAttribute("src", urlToAnimatedGifOfPokemon);
  pokemonGif.setAttribute("alt", `Gif do pokemon ${nameOfPokemon}`);
  pokemonGif.setAttribute("title", nameOfPokemon);

  pokemonWeight.innerText = weightOfPokemon;
  pokemonHeight.innerText = heightOfPokemon;
  pokemonType.innerText = typeOfPokemon;
  pokemonAbility.innerText = abilityOfPokemon;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputOfForm = event.target.inputSearch.value.toLowerCase();

  renderPokemonValues(inputOfForm);

  form.reset();
});
renderPokemonValues("1");
