import React, { useState } from "react";

const OriginalTest = ({ onClose }) => { // <- Принимаем onClose
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
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
                        <h2>Пройди тест ({step}/3)</h2>
                        <p className="questionOriginal">Хочешь зайти в кафе?</p>
                        <button onClick={() => handleChange("cafe", "yes")}>Да</button>
                        <button onClick={() => handleChange("cafe", "no")}>Нет</button>
                    </>
                )}

                {step === 2 && (
                    <>
                         <h2>Пройди тест ({step}/3)</h2>
                        <p className="questionOriginal">Предпочитаешь парки или улицы?</p>
                        <button onClick={() => handleChange("preference", "parks")}>Парки</button>
                        <button onClick={() => handleChange("preference", "streets")}>Улицы</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>Пройди тест ({step}/3)</h2>
                        <p className="questionOriginal">Длина маршрута?</p>
                        <button onClick={() => handleChange("routeLength", "short")}>Короткий</button>
                        <button onClick={() => handleChange("routeLength", "medium")}>Средний</button>
                        <button onClick={() => handleChange("routeLength", "long")}>Длинный</button>
                    </>
                )}
                {step === 4 && (
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
