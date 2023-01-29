import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pb from "../lib/pocketbase";
import Button from "../components/Button";
import PromptDrawer from "../components/PromptDrawer";
import LoadingComponent from "../components/LoadingComponent";

function ReplyQuestion() {
    // get parameters from react router
    let { qid } = useParams();

    const [q, setQ] = useState(null);
    const [userName, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [drawerOpen, toggleDrawer] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // fetch question details from database
    useEffect(() => {
        try {
            (async () => {
                let question = await pb.collection("questions").getOne(qid);

                setQ(question.text);

                let user = await pb.collection("users").getOne(question.user);

                setUser(user.name);

                setLoading(false);
            })();
        } catch (error) {
            console.log(error);
        }
    }, []);

    // handle reply submission
    const handleSubmit = async (reply) => {
        setIsSubmitting(true);
        await pb.collection("replies").create({
            text: reply,
            question: qid,
        });
        setIsSubmitting(false);
    };

    return (
        <div className="mx-auto">
            <div className="px-4 mt-16">
                {loading ? (
                    <LoadingComponent loading={loading} />
                ) : (
                    <>
                        <p className="mb-4 text-amber-300">{userName} asked,</p>
                        <h1 className=" text-3xl font-bold leading-10">{q}</h1>
                        <div className="mt-8 flex justify-between">
                            <p className="uppercase text-neutral-300 tracking-wider">
                                Share
                            </p>
                            <div>Share buttons</div>
                        </div>
                        <div className="mt-10 pt-6 flex flex-col text-center border-t border-neutral-700">
                            <Button
                                onClick={() => toggleDrawer(true)}
                                label="Reply anonymously"
                            />
                            <p className="mt-3 text-neutral-500">
                                No sign in needed
                            </p>
                        </div>
                    </>
                )}
            </div>
            {drawerOpen && (
                <PromptDrawer
                    handleClose={() => toggleDrawer(false)}
                    title="Reply anonymously"
                    isSubmitting={isSubmitting}>
                    <ReplyTextBox
                        handleSubmit={handleSubmit}
                        handleClose={() => toggleDrawer(false)}
                        isSubmitting={isSubmitting}
                    />
                </PromptDrawer>
            )}
        </div>
    );
}

function ReplyTextBox({ handleSubmit, handleClose, isSubmitting }) {
    const [reply, setReply] = useState("");

    const handleChange = (e) => {
        setReply(e.target.value);
    };

    const checkReply = () => {
        if (reply.length) {
            handleClose();
            return handleSubmit(reply);
        }
    };

    return (
        <>
            <textarea
                type="text"
                onChange={handleChange}
                value={reply}
                placeholder="Your reply"
                className=" my-6 bg-transparent text-xl placeholder:text-neutral-600 w-full h-56 focus:outline-none"></textarea>
            <div className="ml-auto">
                <Button
                    onClick={checkReply}
                    label={isSubmitting ? "Sending..." : "Send reply"}
                />
            </div>
        </>
    );
}

export default ReplyQuestion;
