import { useState } from "react";
import Button from "./Button";

function PromptDrawer({ handleSubmit, handleClose }) {
    const [question, setQuestion] = useState("");

    const handleChange = (e) => {
        setQuestion(e.target.value);
    };

    const checkQuestion = () => {
        if (question.length) {
            handleClose();
            return handleSubmit(question);
        }
    };

    return (
        <div className="h-screen absolute bg-black bg-opacity-60 top-0 right-0 left-0 flex items-end">
            <div className=" w-full bg-neutral-800 border-t-4 border-lime-700 flex flex-col justify-between p-4 pb-8">
                <div>
                    <div className="flex justify-between items-baseline">
                        <p className="uppercase text-neutral-300 tracking-wider">
                            Ask a question
                        </p>
                        <button onClick={handleClose}>Close</button>
                    </div>
                    <textarea
                        type="text"
                        onChange={handleChange}
                        value={question}
                        placeholder="Your question?"
                        className=" my-6 bg-transparent text-2xl font-semibold placeholder:text-neutral-600 w-full h-56 focus:outline-none"></textarea>
                </div>
                <div className="ml-auto">
                    <Button onClick={checkQuestion} label="Post" />
                </div>
            </div>
        </div>
    );
}

export default PromptDrawer;
