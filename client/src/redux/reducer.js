const initialState = {
    recipes: [],
    diets: [],
    allRecipes: [],
    detail: {}
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };

        case 'GET_RECIPES_NAME':
            return {
                ...state,
                recipes: action.payload
            }

        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload,
            };

        case "POST_RECIPE":
            return {
                ...state
            }    

        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'REMOVE_DETAIL':
            return {
                ...state,
                detail: {}
            }

        case 'ORDER_SCORE':
            let orderScore = action.payload === 'min'
                ? state.recipes.sort(function (a, b) {
                    if (a.nivelDeComidaSaludable > b.nivelDeComidaSaludable) {
                        return 1;
                    }
                    if (b.nivelDeComidaSaludable > a.nivelDeComidaSaludable) {
                        return -1;
                    }
                    return 0;
                })
                : state.recipes.sort(function (a, b) {
                    if (a.nivelDeComidaSaludable > b.nivelDeComidaSaludable) {
                        return -1;
                    }
                    if (b.nivelDeComidaSaludable > a.nivelDeComidaSaludable) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: orderScore
            };

        case 'SORT_BY_NAME':
            const sortedName = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sortedName
            }

        case 'FILTER_DIETS':
            let allRecipes = state.allRecipes;
            let dietsFilter = action.payload === 'all'
                ? allRecipes
                : allRecipes.filter(el => el.diets.includes(action.payload) ||
                    el.diets.map(e => e.name).includes(action.payload))
            return {
                ...state,
                recipes: dietsFilter
            };

        default:
            return state;
    }
}

export default rootReducer;