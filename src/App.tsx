import Router from "./Router/Router";
import Theme from "./providers/ThemeProvider/Theme";
function App() {
  return (
    <div className="App">
      <Theme>
        <Router />
      </Theme>
    </div>
  );
}

export default App;
