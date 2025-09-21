  import { useEffect, useState } from 'react';
  import './App.css'

 function App() {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [translations, setTranslations] = useState([]);

  // useEffect(() => {
  //   // console.log(LanguageDetector.availability());
  //   console.log(Translator.availability()); 
  // }, []);

  const loadDetector =  async() =>{
      if (navigator.userActivation.isActive) {
        const detector = await LanguageDetector.create();
      //  const someUserText = 'Hallo und herzlich willkommen!';
       const results = await detector.detect(text.trim());
       for (const result of results) {
         // Show the full list of potential languages with their likelihood, ranked
         // from most likely to least likely. In practice, one would pick the top
         // language(s) that cross a high enough threshold.
         setResults(results);
         console.log(result.detectedLanguage, result.confidence.toFixed(2)*100, '%');
       }
    }
  }
  const languageTagToHumanReadable = (languageTag, targetLanguage) => {
    const displayNames = new Intl.DisplayNames([targetLanguage], {
      type: 'language',
    });
    return displayNames.of(languageTag);
  };
//-------------------------- Translator -------------------------------
     const translatText = async() =>{
      //    const translatorCapabilities = await Translator.availability({
      //    sourceLanguage: 'es',
      //    targetLanguage: 'fr',
      //  });
       const translator = await Translator.create({
         sourceLanguage: 'en',
         targetLanguage: 'es',
       });
       const translation = await translator.translate(text);
       setTranslations(translation);
     }


  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to detect language"
      />
      <button onClick={()=>loadDetector()}>Detect Language</button>
      
      {results.length > 0 && (
        <ul>
          {
            <li>
              Language: {languageTagToHumanReadable(results[0].detectedLanguage,'en')}, Confidence: {results[0].confidence.toFixed(1)*100} %
            </li>
          }
        </ul>
      )}
        <button onClick={()=>translatText()}>Translate</button>
      <p>{translations}</p>
    </div>
  )

 }
export default App
