import React, { useState, useEffect } from 'react';
import { FaCrown, FaMedal, FaUserCircle } from "react-icons/fa";
import { fetchLeaderboard } from '../../api';
import GuildLoading from './GuildLoading';

const Leaderboard = ({ userData, setGlobalLoading }) => {
    const [champions, setChampions] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [serverUser, setServerUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getHeroData = async () => {
            try {
                if (setGlobalLoading) setGlobalLoading(true);
                setIsLoading(true);
                const response = await fetchLeaderboard();
                if (response.data.success) {
                    setChampions(response.data.data);
                    setUserRank(response.data.userRank);
                    setServerUser(response.data.currentUser);
                } else {
                    setError("The scrolls are illegible. Try again later.");
                }
            } catch (err) {
                console.error("Leaderboard Error:", err);
                setError("A dark mist blocks our vision of the Hall of Champions.");
            } finally {
                setIsLoading(false);
                if (setGlobalLoading) setGlobalLoading(false);
            }
        };

        getHeroData();
    }, [setGlobalLoading]);

    if (isLoading) {
        return <GuildLoading />;
    }

    if (error) {
        return (
            <div className="rpg-leaderboard">
                <h1 className="section-title">Hall of Champions</h1>
                <div className="error-container">
                    <p className="error-text">⚠️ {error}</p>
                    <button className="rpg-btn-primary" onClick={() => window.location.reload()}>Retry Quest</button>
                </div>
            </div>
        );
    }

    // Check if the current user is already in the top 50
    const isUserInTop = champions.some(hero => hero.username === userData?.username);

    return (
        <div className="rpg-leaderboard">
            <h1 className="section-title">Hall of Champions</h1>
            <p className="subtitle">Only the most disciplined warriors ascend these ranks.</p>

            <div className="leaderboard-table shadow-effect">
                <div className="table-header">
                    <span>Rank</span>
                    <span>Hero</span>
                    <span>Level</span>
                    <span>Guild Power</span>
                </div>

                {champions.length === 0 ? (
                    <div className="table-row">
                        <span style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No heroes have entered the hall yet. Be the first!</span>
                    </div>
                ) : (
                    <>
                        {champions.map((hero, index) => (
                            <div key={hero._id} className={`table-row ${hero.username === userData?.username ? 'self-highlight' : ''}`}>
                                <span className="rank-cell">
                                    {index === 0 && <FaCrown className="crown" />}
                                    {index === 1 && <FaMedal className="medal-silver" />}
                                    {index === 2 && <FaMedal className="medal-bronze" />}
                                    {index > 2 && index + 1}
                                </span>
                                <span className="hero-cell">
                                    {hero.profilePicture ? (
                                        <img src={hero.profilePicture} alt={hero.name} className="user-icon-img" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--rpg-gold)' }} />
                                    ) : (
                                        <FaUserCircle className="user-icon" />
                                    )}
                                    {hero.name}
                                    {hero.username === userData?.username && <span className="you-badge">(YOU)</span>}
                                </span>
                                <span className="level-cell">LVL {hero.level}</span>
                                <span className="steps-cell">{hero.gold.toLocaleString()} Gold</span>
                            </div>
                        ))}

                        {/* If user is not in top 50, show their rank at the bottom */}
                        {!isUserInTop && serverUser && (
                            <>
                                <div className="rank-divider">
                                    <span>•••</span>
                                </div>
                                <div className="table-row self-highlight personal-rank">
                                    <span className="rank-cell">#{userRank}</span>
                                    <span className="hero-cell">
                                        {serverUser.profilePicture ? (
                                            <img src={serverUser.profilePicture} alt={serverUser.name} className="user-icon-img" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--rpg-gold)' }} />
                                        ) : (
                                            <FaUserCircle className="user-icon" />
                                        )}
                                        {serverUser.name}
                                        <span className="you-badge">(YOU)</span>
                                    </span>
                                    <span className="level-cell">LVL {serverUser.level}</span>
                                    <span className="steps-cell">{serverUser.gold.toLocaleString()} Gold</span>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
