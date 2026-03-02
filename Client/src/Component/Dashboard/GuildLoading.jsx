import React, { useState, useEffect } from 'react';
import { FaCompass } from "react-icons/fa";
import '../Css/Dashboard/GuildLoading.css';

const fantasyMessages = [
    "Consulting the Ancient Oracles...",
    "Sharpening your Steel...",
    "Brewing Agility Potions...",
    "Mapping the Uncharted Realm...",
    "Gathering Mana for the Journey...",
    "Securing the Guild Hall...",
    "Whispering to the Spirits of Strength..."
];

const GuildLoading = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % fantasyMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="guild-portal-container">
            <div className="portal-glow"></div>
            <div className="loading-core">
                <div className="rpg-spinner-wrapper">
                    <FaCompass className="rpg-portal-spinner" style={{ fontSize: '3.5rem', color: 'var(--rpg-gold)' }} />
                    <div className="spinner-ring"></div>
                </div>
                <div className="loading-text-container">
                    <h2 className="portal-title">Entering the Guild Hall</h2>
                    <p className="fantasy-tip">{fantasyMessages[messageIndex]}</p>
                </div>
            </div>
            <div className="loading-footer">
                <div className="loading-progress-bar">
                    <div className="loading-progress-fill"></div>
                </div>
            </div>
        </div>
    );
};

export default GuildLoading;
