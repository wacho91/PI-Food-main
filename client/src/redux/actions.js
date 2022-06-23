import axios from 'axios';


export function getRecipes() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
};

export function getRecipesName(name) {
    return async function (dispatch) {
        try {
            let recipes = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: 'GET_RECIPES_NAME',
                payload: recipes.data
            })
        } catch (error) {
            
            console.log(alert('The recipe you are looking for was not found'));
        }
    }
}


export function getDiets() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
};

export function filterDiets(payload) {
    return {
        type: 'FILTER_DIETS',
        payload
    }
};

export function postRecipe(payload){
    return async function(dispatch){
        
        const response = await axios.post("http://localhost:3001/recipes", payload);
        return dispatch({type: 'POST_RECIPE', payload: response.data});
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try{
            const {data} = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch ({
                type: 'GET_DETAIL',
                payload: data
            })
        } catch (err) {
            alert('The ID you are looking for was not found');
        }
    }
}

export const removeDetail = (payload) => {
    return {
        type: 'REMOVE_DETAIL',
        payload
    }
}

export function orderScore(payload) {
    return {
        type: 'ORDER_SCORE',
        payload
    }
};

export const filterSortByName = (payload) => {
    return {
        type: 'SORT_BY_NAME',
        payload
    }
}