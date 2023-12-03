export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data?.message} (${res?.status})`);

    let { recipe } = data?.data;

    state.recipe = {
      id: recipe?.id,
      publisher: recipe?.publisher,
      ingredients: recipe?.ingredients,
      sourceUrl: recipe.source_url,
      title: recipe?.title,
      image: recipe?.image_url,
      cookingTime: recipe?.cooking_time,
      servings: recipe?.servings,
    };

    // console.log(state.recipe, "model recipe");
  } catch (err) {
    alert(err);
  }
};
