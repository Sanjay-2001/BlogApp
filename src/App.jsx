import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Footer, Header, ErrorBoundary } from "./components";
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  return !loading ? (
    <>
      <ErrorBoundary>
        <div className="main">
          <div className="body">
            <Header />
            <main>
              {/* <Outlet/> */}
            </main>
            <Footer />
          </div>
        </div>
      </ErrorBoundary>
    </>
  ) : null;
}

export default App;
