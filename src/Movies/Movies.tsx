import React, { useState, useEffect } from "react";
import { movies$ } from "../movies";
import _ from "lodash";
import "./MoviesStyle.scss";
import {bin, like, dislike} from "../svg";

interface Movie {
    id: number;
    title: string;
    category:  string;
    likes: number;
    dislikes: number;
}

export const Movies = () => {
    const [init, setInit] = useState(false);
    const [movies, setMovies] = useState(Array<Movie>);

    useEffect(() => {
        console.log("useEffect !! ");
        if(!init) {
            movies$.then((movies) => setMovies(movies));
            setInit(true);
        }
    })

    function getPercentage(value: number, totValues: number) {
        return Math.ceil((value / totValues) * 100);
    }

    function toggleDeleteBtn(id: number) {
        const newMovies = _.filter(movies, (movie: Movie) => !_.isEqual(movie.id, id));
        setMovies(newMovies);
    }

    return (
        <div id="movies">
            <div className="cards-container">
                {
                    movies && _.map(movies, (movie: Movie) => <div className="card-movie" key={movie.id}>
                        <div className="title">{movie.title}</div>
                        <button className="bin-btn" onClick={() => toggleDeleteBtn(movie.id)}><img className="bin-icon" src={bin}/></button>
                        <div>{movie.category}</div>
                        <button className="like-btn"><img className="like-icon" src={like}/>{movie.likes}</button>
                        <button className="dislike-btn"><img className="dislike-icon" src={dislike}/>{movie.dislikes}</button>
                        <div className="liking-bar">
                            <div className="like-bar" style={{width: `${getPercentage(movie.likes, (movie.likes + movie.dislikes))}%`}}></div>
                        </div>
                    </div>)
                }
            </div>
            <footer>
                <a href="https://www.flaticon.com/free-icons/bad" title="bad icons">Bad icons created by vectorspoint - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/like" title="like icons">Like icons created by Pixel perfect - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by smalllikeart - Flaticon</a>
            </footer>
        </div>
    );
}