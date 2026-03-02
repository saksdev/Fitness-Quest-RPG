import React, { useState, useEffect } from 'react';
import { fetchQuests, claimQuest } from '../../api';
import { FaScroll, FaSkull, FaCheckCircle, FaLock } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import GuildLoading from './GuildLoading';

const QuestBoard = ({ userData, setGlobalLoading }) => {
    const [quests, setQuests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadQuests = async () => {
        try {
            if (setGlobalLoading) setGlobalLoading(true);
            setIsLoading(true);
            const response = await fetchQuests();
            if (response.data.success) {
                setQuests(response.data.quests);
            }
        } catch (err) {
            console.error("Quest Fetch Error:", err);
            toast.error("Failed to summon the quest scrolls.");
        } finally {
            setIsLoading(false);
            if (setGlobalLoading) setGlobalLoading(false);
        }
    };

    useEffect(() => {
        loadQuests();
    }, [setGlobalLoading]);

    const handleClaim = async (questId) => {
        try {
            const response = await claimQuest(questId);
            if (response.data.success) {
                toast.success(
                    <div>
                        <strong>{response.data.message}</strong><br />
                        <span>Reward: +{response.data.rewards.xp} XP, +{response.data.rewards.gold} Gold</span>
                        {response.data.rewards.loot && <><br /><span>Loot: {response.data.rewards.loot}</span></>}
                    </div>,
                    { icon: '⚔️' }
                );
                // Refresh data to reflect rewards and completion
                loadQuests();
            }
        } catch (err) {
            console.error("Claim Error:", err);
            toast.error(err.response?.data?.message || "The claim was rejected by the gods.");
        }
    };

    if (isLoading) return <GuildLoading />;

    return (
        <div className="rpg-quest-board">
            <h1 className="section-title">The Grand Quest Board</h1>

            <div className="quest-grid">
                {quests.map(quest => {
                    const isComplete = quest.isCompleted;
                    const isClaimable = quest.isClaimable;

                    return (
                        <div key={quest.id} className={`quest-card ${isComplete ? 'completed' : ''} ${isClaimable ? 'claimable glow-border' : ''}`}>
                            <div className="quest-icon-wrapper">
                                {quest.type === "Weekly" ? <FaSkull /> : <FaScroll />}
                            </div>
                            <div className="quest-details">
                                <div className="quest-header">
                                    <h3>{quest.title}</h3>
                                    <span className={`type-tag ${quest.type.toLowerCase()}`}>{quest.type}</span>
                                </div>
                                <p>Goal: {quest.target} steps</p>
                                <div className="quest-progress">
                                    <div className="progress-bar-bg">
                                        <div className="progress-bar-fill" style={{ width: `${quest.progress}%` }}></div>
                                    </div>
                                    <span className="progress-text">
                                        {isComplete ? '🏆 Quest Accomplished' : `Progress: ${Math.round(quest.progress)}%`}
                                    </span>
                                </div>
                                <div className="quest-footer">
                                    <span className="reward-text">
                                        Reward: {quest.xpReward} XP, {quest.goldReward} Gold {quest.lootChest && "+ Loot"}
                                    </span>
                                    {isComplete ? (
                                        <button className="completed-btn" disabled>
                                            <FaCheckCircle /> Completed
                                        </button>
                                    ) : isClaimable ? (
                                        <button className="claim-btn claim-animation" onClick={() => handleClaim(quest.id)}>
                                            <FaCheckCircle /> Claim
                                        </button>
                                    ) : (
                                        <button className="locked-btn" disabled>
                                            <FaLock /> In Progress
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestBoard;
