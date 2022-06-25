import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, getDiets } from "../../redux/actions"
import styles from "./NotFound.module.css";


export default function NotFound() {

   const  dispatch = useDispatch();

   function  handleClick(e) {
        e.preventDefault(e)
        dispatch(getRecipes());
        dispatch(getDiets());
    }

    return(
        <div>

            <Link to='/home'><button onClick={(e) => handleClick(e)} className={styles.btn}>Go Back</button></Link>
            
            <h1 className={styles.title}>Recipes Didn't Found</h1>
            <br /><br />
            <br />
            <Link to='/recipes'><button className={styles.btn}>Create Recipe</button></Link>
           
            
           
        </div>
    )
}