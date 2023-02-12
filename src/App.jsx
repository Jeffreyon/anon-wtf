import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoggedIn from "./components/LoggedIn";
import RequiresAuth from "./components/RequiresAuth";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import About from "./pages/About";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
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
                    <Route element={<AuthLayout />}>
                        <Route path="/about" element={<About />} />
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
                        <Route path="/r/:qid" element={<ReplyQuestion />} />
                        <Route
                            path="/q/:qid"
                            element={
                                <RequiresAuth>
                                    <QuestionDetails />
                                </RequiresAuth>
                            }
                        />
                    </Route>
                    <Route
                        path="/questions"
                        element={
                            <RequiresAuth>
                                <Questions />
                            </RequiresAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
