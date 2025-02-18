import { useEffect, useState } from 'react';
import { firebase } from '../util/firebase';

function App() {
    const [text, setText] = useState('');
    const [language, setLanguage] = useState(null);
    const [highlightedText, setHighlightedText] = useState('');
    const [checked, setChecked] = useState(false);
    const [history, setHistory] = useState([]);


    function inputValidation(input) {
        const value = input.target.value;
        setText(value);
        checkLanguage(value);
    }

    function checkLanguage(value) {
        const latinRegex = /[a-zA-Z]/g;
        const cyrillicRegex = /[а-яА-Я]/g;
        const latinCount = (value.match(latinRegex) || []).length;
        const cyrillicCount = (value.match(cyrillicRegex) || []).length;

        if (cyrillicCount > latinCount) {
            setLanguage('ru');
        } else if (latinCount > cyrillicCount) {
            setLanguage('en');
        } else {
            setLanguage('ru');
        }

        highlightText(value);
    }

    function highlightText(value) {
        const highlighted = value.split('').map((char) => {
            if (language === 'ru' && /[a-zA-Z]/g.test(char)) {
                return `<span style="background-color: yellow">${char}</span>`;
            } else if (language === 'en' && /[а-яА-Я]/g.test(char)) {
                return `<span style="background-color: yellow">${char}</span>`;
            } else {
                return char;
            }
        }).join('');

        setHighlightedText(highlighted);
    }

    function formValidation() {
        if (text !== '') {
            // checkLanguage(text);
            setChecked(true);
        } else {
            alert('Заполните поле!');
        }
    }

    useEffect(() => {
        async function updateFirebaseDB() {
            try {
                firebase.database().ref('history').push({
                    text: text
                });
            } catch (e) {
                alert('Ошибка подключения');
                console.error('Ошибка подключения: ', e);
            }
        }
        if (text !== '') {
            updateFirebaseDB();
        }
    }, [checked]);

    useEffect(() => {
        try {
            firebase.database().ref('history').on('value', (snapshot) => {
                const history = snapshot.val();
                if (history) {
                    setHistory(Object.values(history));
                } else {
                    setHistory([]);
                }
            });
        } catch (e) {
            alert('Не удалось извлечь историю');
            console.error('Не удалось извлечь историю: ', e);
        }
    }, []);



    return (
        <div>
            <form>
                <input type='text' placeholder='Введите текст' onChange={inputValidation} />
                <button type='button' onClick={formValidation}>Проверить</button>
            </form>
            {checked && (
                <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
            )}
            <hr />
            <h2>История</h2>
            <div>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default App;