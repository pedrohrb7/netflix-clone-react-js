import React, { useState } from 'react';
import "./MovieRow.css";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({ title, items }) => {

    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listSize = items.results.length * 150;
        
        if ((window.innerWidth - listSize) > x ) {
            x = (window.innerWidth - listSize) - 60;
        }
        setScrollX(x)
    }

    return (
        <div className="movie-row">

            <h2>{title}</h2>

            <div className="arrow-left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>

            <div className="arrow-right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className='movie-row--listArea'>
                <div className='movie-row--list' style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movie-row--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}