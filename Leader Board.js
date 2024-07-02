import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3000/api/leaderboard');
      setTeams(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            <img src={team.avatarUrl} alt={team.name} />
            <p>{team.name} - Score: {team.score} - Games Played: {team.gamesPlayed}</p>
            {team.badges.includes('top-three') && <span>🏆</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
