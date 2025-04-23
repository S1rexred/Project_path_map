import { useState } from "react"

const FindWalkPartner = ({ profiles = [] }) => {
    const [cityFilter, setCityFilter] = useState('')

    const filtered = (profiles || []).filter(p => p.city.toLowerCase().includes(cityFilter.toLowerCase()))

    return (
        <div className="find-partner-wrapper">
            <input 
            placeholder="Фильтр по городу"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="city-filter-input"
            />

            {filtered.length === 0 && <p className="no-profiles">Нет подходящих анкет</p>}

            <div className="profile-grid">
            {filtered.map((profile, idx) => (
                <div key={idx} className="profile-card">
                    <img className="photo-profile" src={profile.img} alt='фото-профиля' />
                    <h2 className="profile-name">{profile.name}, {profile.age}</h2>
                    <p><strong>Город: </strong>{profile.city}</p>
                    <p><strong>Время: </strong>{profile.time}</p>
                    <p><strong>Интересы: </strong>{profile.interests}</p>
                    <p><strong>О себе: </strong>{profile.about}</p>
                    <p style={{fontFamily: 'serif'}}>Подробнее...</p>
                    <button className="button-profile">Предложить погулять</button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default FindWalkPartner