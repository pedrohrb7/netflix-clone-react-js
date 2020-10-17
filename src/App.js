import React, { useEffect, useState } from "react";
import "./App.css";
import MovieDB from "./service/MovieDB";
import MovieRow from "./components/MovieRow";
import SelectedMovie from "./components/SelectedMovie";
import Header from './components/Header';
import Loading from './assets/loading-netflix.gif';

export default () => {
    const [movieList, setMovieList] = useState([]);
    const [selectData, setSelectData] = useState(null);

    const [blackHeader, setBlackHeader] = useState(false);

    // Here you can control all data fetched
    useEffect(() => {
        const loadAll = async () => {
            let list = await MovieDB.getHomeList();
            setMovieList(list);

            let originals = list.filter((i) => i.slug === "originals");
            let randomChosen = Math.floor(
                Math.random() * (originals[0].items.results.length - 1)
            );
            let chosen = originals[0].items.results[randomChosen];

            let chosenInfo = await MovieDB.getMovieInfo(chosen.id, 'tv');
            setSelectData(chosenInfo);
        };
        loadAll();
    }, []);

    // Here you can control header behavior
    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
        <div className="page">

            <Header bgBlack={blackHeader} />

            {selectData && <SelectedMovie item={selectData} />}

            <section className="lists">
                {movieList.map((item, key) => (
                    <div key={key}>
                        <MovieRow title={item.title} items={item.items} />
                    </div>
                ))}
            </section>

            <footer className="footer">
                Made with love and passion by <a href="https://linkedin.com/in/pedrohrb">Pedro</a> <br />
                All rights reserved to <a href="https://netflix.com" className="link-footer">Netflix</a>
            </footer>

            {
                movieList.length <= 0 &&

                <div className="loading">
                    <img src={Loading} alt="Loading gif" />
                </div>
            }
        </div>
    );
};
