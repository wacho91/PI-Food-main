import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesName } from "../../redux/actions";
import styles from "./NavBar.module.css";

export default function NavBar({setCurrentPage}) {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    function handleOnChange(e) {
        e.preventDefault();
        setInput(e.target.value);   //esto es para que me muestre el valor que esta en el input
        console.log(input)
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getRecipesName(input));
        setCurrentPage(1);
        setInput("");
    }

    return (
        <div className={styles.divContainer}>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Search Recipe"
                    value={input}
                    className={styles.navBar}
                    onChange={handleOnChange}
                />
                <button type="submit" className={styles.searchButton}>Search</button>
            </form>
        </div>
    )
}