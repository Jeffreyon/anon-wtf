import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedIn from "./components/LoggedIn";
import RequiresAuth from "./components/RequiresAuth";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import QuestionDetails from "./pages/QuestionDetails";
import Questions from "./pages/Questions";
import ReplyQuestion from "./pages/ReplyQuestion";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/sign-up"
                        element={
                            <LoggedIn>
                                <SignUp />
                            </LoggedIn>
                        }
                    />
                    <Route
                        path="/log-in"
                        element={
                            <LoggedIn>
                                <LogIn />
                            </LoggedIn>
                        }
                    />
                    <Route
                        path="/questions"
                        element={
                            <RequiresAuth>
                                <Questions />
                            </RequiresAuth>
                        }
                    />
                    <Route
                        path="/q/:qid"
                        element={
                            <RequiresAuth>
                                <QuestionDetails />
                            </RequiresAuth>
                        }
                    />
                    <Route path="/r/:qid" element={<ReplyQuestion />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
