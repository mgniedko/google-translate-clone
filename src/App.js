import {useEffect, useState} from "react";
import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import axios from 'axios';

const App = () => {
    const [showModal, setShowModal] = useState(null);
    const [inputLanguage, setInputLanguage] = useState('English');
    const [outputLanguage, setOutputLanguage] = useState('Ukrainian');
    const [languages, setLanguages] = useState(null);
    const [textToTranslate, setTextToTranslate] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleClick = () => {
        setInputLanguage(outputLanguage);
        setOutputLanguage(inputLanguage);
    }

    const getLanguages = async () => {
        console.log('GET /languages')
        const response = await axios('http://localhost:8000/languages');
        console.log(response)
        setLanguages(response.data);
    }

    const translate = async () => {
        console.log('GET /translate')
        const data = {
            textToTranslate, outputLanguage, inputLanguage
        }
        const response = await axios('http://localhost:8000/translation', {
            params: data
        });
        console.log(response)
        setLanguages(response.data);
    }

    useEffect(() => {
        getLanguages();
    }, []);

    return (
        <div className="app">

            {/*<SelectDropDown/>*/}
            {!showModal && <>
                <TextBox
                    style='input'
                    selectedLanguage={inputLanguage}
                    setShowModal={setShowModal}
                    textToTranslate={textToTranslate}
                    setTextToTranslate={setTextToTranslate}
                />

                <div className="arrow-container" onClick={handleClick}>
                    <Arrows/>
                </div>

                <TextBox
                    style='output'
                    selectedLanguage={outputLanguage}
                    setShowModal={setShowModal}
                    translatedText={translatedText}
                    setTranslatedText={setTranslatedText}
                />
                <div className="button-container" onClick={translate}>
                    <Button/>
                </div>
            </>}

            {showModal
                &&
                <Modal
                    setShowModal={setShowModal}
                    languages={languages}
                    chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
                    setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
                />}

        </div>
    );
}

export default App;
