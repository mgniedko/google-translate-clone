import SelectDropDown from "./SelectDropDown";

const TextBox = (
    {
        style,
        selectedLanguage,
        setShowModal,
        setTextToTranslate,
        textToTranslate,
        translatedText,
        setTranslatedText}
) => {
    const handleClick = () => {
        setTextToTranslate('');
        setTranslatedText('');
    }

    return (
        <div className={style}>

            <SelectDropDown
                style={style}
                selectedLanguage={selectedLanguage}
                setShowModal={setShowModal}
            />

            <textarea
                placeholder={style === 'input' ? 'Enter Text' : 'Translation'}
                disabled={style === 'output'}
                onChange={(e) => setTextToTranslate(e.target.value)}
                value={style === 'input' ? textToTranslate : translatedText}
            />
            {style === 'input' && (
                <div
                    className="delete"
                    onClick={handleClick}
                >
                    x
                </div>
            )}
        </div>
    );
}

export default TextBox;