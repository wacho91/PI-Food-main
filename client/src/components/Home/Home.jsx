import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { filterDiets, filterSortByName, getDiets, getRecipes, orderScore } from "../../redux/actions";
import { Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import Paginated from "../Paginated/Paginated";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";




export default function Home() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]) // nos traemos del estado las recetas cuando el componente se monta

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    const allRecipes = useSelector((state) => state.recipes) // me declaro una const y le digo que con useSelector en esa const todo lo que esta en el estado de recipes, es para evitar utilizar mapStatesToProps y trabajar solo con esta const
    const allDiets = useSelector((state) => state.diets)

    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = Array.isArray(allRecipes)
        ? allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
        : allRecipes;

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    function handleClick(e) { //creo esta funcion para 
        e.preventDefault(); //para que no se rompa
        dispatch(getRecipes()); //esta funcion me resetea cuando se me tilda y me que me mande todo devuelta 
    }

    const handleOrderScore = (e) => {
        dispatch(orderScore(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(filterSortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    const handleFilterDiets = (e) => {
        e.preventDefault();
        dispatch(filterDiets(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className={styles.homeContainer}>
            <div className={styles.divNavBar}>
                <ul className={styles.navBar}>
                <li>
                    <button onClick={e => { handleClick(e) }} className={styles.allElements}>Home</button>
                </li>
                 <li>
                    <Link to='/recipes'>
                        <button className={styles.allElements}>Create Recipe</button>
                    </Link>
                </li>
                
                <li className={styles.elements}>
                    <select onChange={handleSortByName}>
                        <option value='default' className={styles.allElements}  hidden>Sort recipes by name</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                        {/* siempre hay que ponerle un value porque me permite acceder y despues poder preguntar al select. si el value es ascendente hace esto, si es desc hace esto. por eso hay que pasarle si o si un value */}
                    </select>
                </li>
                <li className={styles.elements}>
                    <select onChange={handleOrderScore}>
                        <option value='default' className={styles.allElements} hidden>Sort recipes by value</option>
                        <option value='min'> Lower score</option>
                        <option value='max'> Higher score</option>
                    </select>
                </li>
                <li className={styles.elements}>
                    <select onChange={(e) => handleFilterDiets(e)}>
                        <option value='all'>All recipes</option>
                        {
                            allDiets?.map(d => <option key={d.name} >{d.name}</option>)
                        }
                    </select>
                </li>
                <li>
                    <NavBar
                        setCurrentPage={setCurrentPage}
                    />
                </li>
                </ul>
            </div>
            <div className={styles.mainTitle}>
                    <h1 className={styles.title}>The Best Recipes</h1>
            </div>

            <div>
                <Paginated
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginated={paginated}
                />
            </div>

            <div className={styles.container}>    
                {currentRecipes?.map(el => {
                    return (
                        <div className={styles.cardHome} key={el.id}>
                            <Link to={'/detail/' + el.id} className={styles.cardText}>
                                <Cards 
                                 name={el.name} 
                                 image={el.image !== "" ? el.image :  "https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_1280.jpg"} 
                                 id={el.id} 
                                 diets={el.diets} 
                                 types={el.dishTypes} 
                                />
                            </Link>
                        </div>
                    )
                  }
                )}
        
            </div>
            
        </div>
    )
}