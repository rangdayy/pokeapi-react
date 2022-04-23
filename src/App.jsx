
import { LanguageProvider } from "./containers/language";
import LanguageSelector from "./components/languageSelector";
import { BottomNavigationUI } from "./components/bottomNavigationUI";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <header className="App-header">
          <LanguageSelector  />
        </header>
        <BottomNavigationUI />
      </div>
    </LanguageProvider>
  );
}

export default App;
