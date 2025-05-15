import { useState } from "react"

const FindWalkPartner = ({ profiles = [] }) => {
    const [cityFilter, setCityFilter] = useState('')
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [selectedTime, setSelectedTime] = useState('')
    const [comment, setComment] = useState('')

    // безопасная фильтрация по sity
    const filtered = profiles.filter(p => (p.sity || '').toLowerCase().includes(cityFilter.toLowerCase()))

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
                    {filtered.map((p, idx) => (
                        <div key={idx} className="profile-card">
                            <img className="photo-profile" src={p.img} alt='фото-профиля' />
                            <h2 className="profile-name">{p.name}, {p.age}</h2>
                            <p><strong>Город: </strong>{p.sity}</p>
                            <p><strong>Время: </strong>{p.time}</p>
                            <p><strong>Интересы: </strong>{p.interests}</p>
                            <p><strong>О себе: </strong>{p.about}</p>
                            <p style={{fontFamily: 'serif'}}>Подробнее...</p>
                            <button onClick={() => setShowTimePicker(true)} className="button-profile">Предложить погулять</button>
                        </div>
                    ))}
                </div>
            </div>

            {showTimePicker && (
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
                            <button onClick={() => setShowTimePicker(false)}>Отмена</button>
                            <button onClick={() => setShowTimePicker(false)}>Отправить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FindWalkPartner