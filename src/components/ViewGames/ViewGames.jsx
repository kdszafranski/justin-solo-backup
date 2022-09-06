import React from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function ViewGames() {
    useEffect(() => {
        getGamesFromDatabase();
    }, []);


    const games = useSelector(store => store.games)
    const currentWeek = useSelector(store => store.week)

    const dispatch = useDispatch();
    const history = useHistory();

    const getGamesFromDatabase = () => {
        dispatch({
            type: 'GET_WEEK'
        })
        dispatch({
            type: 'GET_GAMES'
        })
        console.log('dipatched!');
    }

    const betOnThis = (game) => {
        dispatch({
            type: 'BET_ON_THIS',
            payload: game
        })
        history.push(`/database/bets/${game.score_id}`)
    }

    return(
        <>
            <h1>Games</h1>
            {/* <button onClick={() => getGamesFromDatabase()}>View Games!</button> */}
            {games.map( game => {
                if ( game.week === currentWeek ) {
                    // use moment js to parse time into easy to read text.
                    const date = moment(game.time).format('LLLL')
                return (
                <div key={game.score_id}>
                    <h1>Date/Time: {date} EST</h1>
                    <p>Home: {game.home_team}</p>
                    <p>Home Moneyline: {game.home_moneyline}</p>
                    <p>Away: {game.away_team}</p>
                    <p>Away Moneyline: {game.away_moneyline}</p>
                    <p>Channel: {game.channel}</p>
                    <button onClick={() => betOnThis(game)}>Bet On This</button>
                </div>
                )
                }
})}
        </>
    )
}

export default ViewGames;