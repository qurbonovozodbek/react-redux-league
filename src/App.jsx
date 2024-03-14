import { useState, useEffect } from "react";
import "./App.css";
import data from "./club/club.json";
import { Link } from "react-router-dom";
import { MdBookmarkAdded } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [count, setCount] = useState(0)
  const counter = useSelector(state => state.counter.counter)
  const dispatch = useDispatch()

  function getData() {
    let data = [];
    if (localStorage.getItem("clubs")) {
      data = JSON.parse(localStorage.getItem("clubs"));
    }
    return data;
  }

  useEffect(() => {
    let counts = getData().length;
    dispatch({
      type: "RESET",
      payload: counts
    })
  }, [])
  
  const [clubs, setClubs] = useState(getData());

  function handleBookmark(id) {
    const isBookmarked = clubs.some((el) => el.id === id);
    let updatedClubs;
    if (isBookmarked) {
      updatedClubs = clubs.filter((el) => el.id !== id);
      dispatch({type: "DELETE"})
    } else {
      dispatch({type: "ADD"})
      updatedClubs = [...clubs, { id }];
    }
    setClubs(updatedClubs);
    localStorage.setItem("clubs", JSON.stringify(updatedClubs));
  }

  return (
    <>
      <div className="container">
        <h1>Premier League</h1>
        <span className="saved" style={{color: "blue", fontSize: "12px"}}><MdBookmarkAdded style={{color: "blue", width: "15px", height: "15px", marginBottom: "-3px"}} />  {counter} </span>
        <span> <MdBookmarkAdded />  </span>
        <div className="clubs">
          {data.teams.map((club) => {
            const isBookmarked = clubs.some((el) => el.id === club.idTeam);
            return (
              <div className="club" key={club.idTeam}>
                <i
                  onClick={() => handleBookmark(club.idTeam)}
                  className={`${
                    isBookmarked ? "fa-solid" : "fa-regular"
                  } fa-bookmark`}
                ></i>
                <img className="img-1" src={club.strTeamFanart4} alt="banner" />
                <div className="title-logo">
                  <h2>{club.strTeam}</h2>
                  <img className="img-2" src={club.strTeamBadge} alt="badge" />
                </div>
                <div className="stadium-info">
                  <div className="stadium">
                    <span>Stadium:</span>
                    <p>{club.strStadium}</p>
                  </div>
                  <div className="stadium">
                    <span>Capacity:</span>
                    <p>{club.intStadiumCapacity}</p>
                  </div>
                </div>
                <div className="links">
                  <div className="media">
                    <Link
                      to={`https://${club.strInstagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="icon" />
                    </Link>
                  </div>
                  <div className="media">
                    <Link
                      to={`https://${club.strFacebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="icon" />
                    </Link>
                  </div>
                  <div className="media">
                    <Link
                      to={`https://${club.strTwitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="icon" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
