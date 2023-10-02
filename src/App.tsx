import Router from "./Router/Router";
import Libary from "./context/Libary";
import Theme from "./providers/ThemeProvider/Theme";
function App() {
  return (
    <div className="App">
      <Theme>
        <Libary>
          <Router />
        </Libary>
      </Theme>
    </div>
  );
}

export default App;
