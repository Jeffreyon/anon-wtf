import { useEffect, useState } from "react";
import simpleSvgPlaceholder from "@cloudfour/simple-svg-placeholder";
import Button from "../components/Button";
import PromptDrawer from "../components/PromptDrawer";
import { Link } from "react-router-dom";
import pb from "../lib/pocketbase";

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [drawerOpen, toggleDrawer] = useState(false);

    const user_id = pb.authStore.model.id;

    // get questions from db
    useEffect(() => {
        (async () => {
            try {
                // return all questions belonging to the current user
                let records = await pb.collection("questions").getList(1, 50, {
                    filter: `user='${user_id}'`,
                });

                setQuestions(() => {
                    return records.items.map((item) => ({
                        id: item.id,
                        text: item.text,
                    }));
                });
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleSubmit = async (q) => {
        // add question to database
        let data = {
            text: q,
            user: `${user_id}`,
        };

        let record = await pb.collection("questions").create(data);

        setQuestions((questions) => {
            return [
                ...questions,
                {
                    id: record.id,
                    text: record.id,
                },
            ];
        });
    };

    return (
        <div className="mx-auto">
            <div className="px-4">
                {questions.length ? (
                    <AllQuestions
                        handleClick={() => toggleDrawer(true)}
                        questions={questions}
                    />
                ) : (
                    <EmptyState handleClick={() => toggleDrawer(true)} />
                )}
            </div>
            {drawerOpen && (
                <PromptDrawer
                    handleClose={() => toggleDrawer(false)}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

function QuestionCard({ question }) {
    return (
        <Link to={`/q/${question.id}`}>
            <div className="border-b-2 border-neutral-800 py-4 ">
                <h2 className="text-2xl text-neutral-100">{question.text}</h2>
            </div>
        </Link>
    );
}

function AllQuestions({ questions, handleClick }) {
    return (
        <div className="mt-8">
            <h3 className=" text-lg font-semibold text-neutral-300">
                Your questions
            </h3>
            <div className="mt-6">
                {questions.map((q, ii) => (
                    <QuestionCard question={q} key={ii} />
                ))}
            </div>
            <div className="mt-4 fixed bottom-8 right-4">
                <Button onClick={() => handleClick()} label="Create" />
            </div>
        </div>
    );
}

function EmptyState({ handleClick }) {
    return (
        <div className=" px-4 flex flex-col gap-6 mt-24 text-center">
            <div className="mx-auto">
                <img
                    src={simpleSvgPlaceholder({
                        width: 250,
                        height: 250,
                    })}
                    alt=""
                />
            </div>
            <h1 className=" text-3xl font-bold leading-10">
                Ask your first question!
            </h1>
            <p className=" text-neutral-300">
                Listen to secrets, find ways you can improve yourself or get
                opinions on anything.
            </p>
            <Button onClick={() => handleClick()} label="Create" />
        </div>
    );
}

export default Questions;
