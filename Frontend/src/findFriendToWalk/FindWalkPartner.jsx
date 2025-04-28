import { useState } from "react"

const FindWalkPartner = ({ profiles = [] }) => {
    const [cityFilter, setCityFilter] = useState('')
    const [showTimePircker, setShowTimePircker] = useState(false)
    const [selectedTime, setSelectedTime] = useState('')
    const [comment, setComment] = useState('')
    const filtered = (profiles || []).filter(p => p.city.toLowerCase().includes(cityFilter.toLowerCase()))

    return (
    <div>
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
                    <button onClick={() => setShowTimePircker(true)} className="button-profile">Предложить погулять</button>
                </div>
            ))}
            </div>
        </div>
        {showTimePircker && (
            <div className="time-picker-overlay">
                <div className="time-picker-modal">
                    <h1>Предложите время для прогулки</h1>
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                        <textarea
                        className="comment-picker" 
                        placeholder="Комментарий"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="time-picker-buttons">
                    <button onClick={() => setShowTimePircker(false)}>Отмена</button>
                    <button onClick={() => setShowTimePircker(false)}>Отправить</button>
                        </div>
                </div>
            </div>
        )}
    </div>
    )
}

export default FindWalkPartner