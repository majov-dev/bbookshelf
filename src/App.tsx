import Router from "./Router/Router";
import { Auth } from "./context/Auth";
import Libary from "./context/Libary";
import User from "./context/User";
import Users from "./context/Users";
import Theme from "./providers/ThemeProvider/Theme";
function App() {
  return (
    <div className="App">
      <Theme>
        <Libary>
          <Users>
            <User>
              <Auth>
                
              </Auth>
            </User>
          </Users>
          <Router />
        </Libary>
      </Theme>
    </div>
  );
}

export default App;
