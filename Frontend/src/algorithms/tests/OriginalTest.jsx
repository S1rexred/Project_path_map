import React, { useState } from "react";
import { BuildWalkingRoute } from "../../routes/BuildRouteWalking";
import { SearchCafes } from "../../searchPlace/SearchCafes";

const OriginalTest = ({ onClose, map, userCoords, places, userPlacemark }) => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        tourist: null,
        cafe: null,
        preference: null,
        routeLength: null,
    });

    const handleChange = (question, value) => {
        setAnswers((prev) => ({ ...prev, [question]: value }));
        setStep((prev) => prev + 1); // Переход к следующему вопросу
    };

    const handleSubmit = () => {
        console.log("Ответы:", answers);
        BuildWalkingRoute(map, userCoords, places, userPlacemark, answers, SearchCafes)
        onClose(); // Закрываем тест
    };


    return (
        <div className="content-questionOriginal">
            <div className="questionOriginal">
                <button className="close-button" onClick={onClose}>
                ✖
                </button>

                {step === 1 && (
                    <>
                        <h2>Пройди тест ({step}/4)</h2>
                        <p className="questionOriginal">Вы турист?</p>
                        <label>
                            <input type="radio" name="tourist" onChange={() => handleChange('tourist', 'yes')}/>
                            Да
                        </label>
                        <label>
                            <input type="radio" name="tourist" onChange={() => handleChange('tourist', 'yes')}/>
                            Нет
                        </label>
                    </>
                )}
                {step === 2 && (
                    <>
                        <h2>Пройди тест ({step}/4)</h2>
                        <p className="questionOriginal">Хотите ли зайти перекусить?</p>
                        <label>
                            <input type="radio" name="" onChange={() => handleChange('cafe', 'yes cafe/restourant')}/>
                            Да, кафе/ресторан
                        </label>
                        <label>
                            <input type="radio" name="cafe" onChange={() => handleChange('cafe', 'yes fastFood')}/>
                            Да, ресторан быстрого питания (кфс, вкусно и точка и тп)
                        </label>
                        <label>
                            <input type="radio" name="cafe" onChange={() => handleChange('cafe', 'yes, caffee')}/>
                            Да, кофейня
                        </label>
                        <label>
                            <input type="radio" name="cafe" onChange={() => handleChange('cafe', 'no')}/>
                            Нет, не хочу
                        </label>
                    </>
                )}

                {step === 3 && (
                    <>
                         <h2>Пройди тест ({step}/4)</h2>
                        <p className="questionOriginal">Предпочитаешь парки или улицы?</p>
                        <button onClick={() => handleChange("preference", "parks")}>Парки</button>
                        <button onClick={() => handleChange("preference", "streets")}>Улицы</button>
                    </>
                )}

                {step === 4 && (
                    <>
                        <h2>Пройди тест ({step}/4)</h2>
                        <p className="questionOriginal">Длина маршрута?</p>
                        <button onClick={() => handleChange("routeLength", "short")}> Короткий</button>
                        <button onClick={() => handleChange("routeLength", "medium")}>Средний</button>
                        <button onClick={() => handleChange("routeLength", "long")}>Длинный</button>
                    </>
                )}
                {step === 5 && (
                    <>
                        <h2>Маршрут успешно готов,<br></br>осталось лишь построить его</h2>
                        <p className="EndTest">Вы всегда можете изменить свой маршрут<br /> по кнопке "Изменить маршрут"или заново пройти тест</p>
                        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
                            Построить маршрут
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default OriginalTest;
