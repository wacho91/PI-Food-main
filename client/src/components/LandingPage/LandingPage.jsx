import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";


export default function LandingPage() {
    return (
        <div>
            <div className={s.divContainer}>
                <h1 className={s.title}>Welcome to the Food App</h1>

                <Link to={'/home'} style={{ textDecoration: 'none' }}>
                    <button className={s.start}>Start</button>
                </Link>
            </div>
        </div>
    )
}