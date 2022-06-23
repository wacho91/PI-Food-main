import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDiets, getRecipes, postRecipe } from "../../redux/actions";
import styles from "./RecipeCreate.module.css";

export function validate(input) {
    let error = {}

    if(!input.name) {
        error.name = 'The name of the recipe is required'
    } else if (!/[a-zA-Z]{4}/.test(input.name)) {
        error.name= 'The name must have only letters and at least 4 characters'
    }
    if(!input.summary) {
        error.summary = 'The summary of the recipe is required';
    } else if (input.summary.length < 10 || input.summary.length > 500) {
        error.summary = 'The summary must have between 10 and 500 characters';
    }
    if(!input.nivelDeComidaSaludable) {
        error.nivelDeComidaSaludable = 'The health score of the recipe is required';
    }else if(input.nivelDeComidaSaludable < 0 || input.nivelDeComidaSaludable > 100){
        error.nivelDeComidaSaludable = 'Must be a number between 0 and 100';
    }
    if (!input.pasoAPaso) {
        error.pasoAPaso = 'The instructions of the recipe is required';
    } else if (input.pasoAPaso.length < 10) {
        error.pasoAPaso = 'The instructions must have more than 10 characters';
    }
    if (input.image !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        error.image = "Image must be a URL";
    }

    return error;

}

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allRecipes = useSelector((state) => state.recipes) // me declaro una const y le digo que con useSelector en esa const todo lo que esta en el estado de recipes, es para evitar utilizar mapStatesToProps y trabajar solo con esta const
    const allDiets = useSelector((state) => state.diets)

    const [error, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        summary: "",
        nivelDeComidaSaludable: 0,
        pasoAPaso: "",
        image: "",
        diets: [],
    });

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    useEffect(() => {
        if(allRecipes.length === 0) {
            dispatch(getRecipes());
        }
    }, [dispatch, allRecipes.length]);

    const recipesName = allRecipes.map(el => el.name)

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            diets: input.diets.includes(e.target.value) ? input.diets : [...input.diets, e.target.value]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.diets.length === 0) {
            alert('Please select at least one diets')
        }else if(error.name || error.summary || error.nivelDeComidaSaludable || error.pasoAPaso ) {
            e.preventDefault()
            alert('Please fill all fields')
        }else if(input.image === ''){
            alert('Por favor ingresar una imagen');
        }else if(input.name.length > 0) {
            let nameInput = input.name.toLowerCase();
            let result = recipesName.includes(nameInput)
            if(result) {
                alert('That name is in use')
                setInput({
                    name: "",
                    summary: "",
                    nivelDeComidaSaludable: 0,
                    pasoAPaso: "",
                    image: "",
                    diets: [],
                })
            } else {
                dispatch(postRecipe(input));
                navigate('/home');
                alert('Recipe created successfully')
                setInput({
                    name: "",
                    summary: "",
                    nivelDeComidaSaludable: 0,
                    pasoAPaso: "",
                    image: "",
                    diets: [],
                })
            }
        }
    }
    
    function handleButtonType(e) {
        e.preventDefault();
        // console.log("handleButtonType tiene..", e.target.value)
        setInput({
            ...input,
            //le seteo los mimos tipos menos lo que tengo en even target value
            diets: input.diets.filter(type => type !== e.target.value)
        });
    }

    function handleButtonHome(e){
        e.preventDefault();
        navigate('/home');
    }

    return (
        <div className={styles.mainContainer}>
            <form onSubmit={(e) => 
                (e)} className={styles.mainForm}>
                <h1 className={styles.mainTitle}>Create a New Recipe</h1>
                <div className={styles.formLabel}>
                    <label><strong>Name: </strong></label>
                    <input onChange={handleChange} type="text" name="name" required value={input.name} />
                    {error.name && <span className={styles.error}>{error.name}</span>}
                    <br></br>
                </div>

                <div className={styles.formLabel}>
                    <label><strong>Summary: </strong> </label>
                    <textarea onChange={handleChange} type="text" name="summary" required value={input.summary} />
                    {error.summary && <span className={styles.error}>{error.summary}</span>}
                    <br></br>
                </div>

                <div className={styles.formLabel}> 
                    <label ><strong>Health Score: </strong></label>
                    <input onChange={handleChange} type="number" name="nivelDeComidaSaludable" value={input.nivelDeComidaSaludable} />
                    {error.nivelDeComidaSaludable && <span className={styles.error}>{error.nivelDeComidaSaludable}</span>}
                    <br></br>
                </div>

                <div className={styles.formLabel}> 
                    <label ><strong>Instructions:</strong> </label>
                    <textarea onChange={handleChange} type="text" name="pasoAPaso" value={input.pasoAPaso} />
                    {error.pasoAPaso && <span className={styles.error}>{error.pasoAPaso}</span>}
                    <br></br>
                </div>

                <div className={styles.formLabel}>
                    <label> <strong>Diets: </strong></label>
                    <select onChange={handleSelect} >
                        {
                            allDiets && allDiets.map(el => (
                                <option key={el.id} value={el.name}>{el.name}</option>
                            ))
                        }
                    </select>
                    <div>
                        {
                            input.diets.map(type => (
                                <button onClick={handleButtonType} value={type} key={type} className={styles.removeBtn}> Remover {type}  </button>
                            ))
                        }
                        <br></br>
                    </div>
                    {error.diets && <span className={styles.error}>{error.diets}</span>}
                </div>
                <div className={styles.formLabel}>
                    <label> <strong>Image:  </strong></label>
                    <input onChange={handleChange} type="url" placeholder='https://example.com (Optional)' name="image" value={input.image} />
                    {error.image && <span className={styles.error}>{error.image}</span>}
                    <br></br>
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit} className={styles.formBtn} ><strong>Create </strong></button>
                    
                    
                </div>
            </form>
            <div>
            <button onClick={handleButtonHome} className={styles.btn}>Home</button>
            </div>
            <br></br>
        </div>
    );
}