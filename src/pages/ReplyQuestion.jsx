import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pb from "../lib/pocketbase";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import PromptDrawer from "../components/PromptDrawer";
import LoadingComponent from "../components/LoadingComponent";
import useCopyToClipboard from "../lib/useCopyToClipboard";
import { toast } from "react-toastify";
import LinkRegular from "../components/LinkRegular";

function ReplyQuestion() {
    // get parameters from react router
    let { qid } = useParams();

    const [q, setQ] = useState(null);
    const [userName, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [drawerOpen, toggleDrawer] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replySent, setReplySent] = useState(false);

    // for the clipboard
    let url = `${import.meta.env.VITE_SITE_BASE_URL}/r/${qid}`;
    const [copied, copyToClipboard] = useCopyToClipboard(url);

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
        await pb
            .collection("replies")
            .create({
                text: reply,
                question: qid,
            })
            .then((res) => {
                setIsSubmitting(false);
                toggleDrawer(false);

                toast.success("Reply sent", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
                setReplySent(true);
            });
    };

    return (
        <>
            <div className="mt-8 sm:mt-16">
                {loading ? (
                    <LoadingComponent loading={loading} />
                ) : replySent ? (
                    <div className="bg-neutral-900 px-4 py-6 sm:p-8 rounded-2xl border border-neutral-700 text-center max-w-sm mx-auto">
                        <p className="mb-4 text-amber-300">Reply sent!</p>
                        <h1 className=" text-3xl font-bold leading-10">
                            Curious to know what people really think?
                        </h1>
                        <div className="mt-6">
                            <ButtonLink
                                label="Ask a question"
                                linkTo="/sign-up"
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="bg-neutral-900 px-4 py-6 sm:p-8 rounded-2xl border border-neutral-700 ">
                            <p className="mb-4 text-amber-300">
                                {userName} asked,
                            </p>
                            <h1 className=" text-3xl font-bold leading-10">
                                {q}
                            </h1>
                            <div className="mt-8 flex items-baseline justify-between">
                                <p className="uppercase text-sm text-neutral-300 tracking-wider mr-2">
                                    Share
                                </p>
                                <div>
                                    <button
                                        className=" font-semibold text-lime-500 hover:text-lime-600 transition-colors delay-75 p-1 flex"
                                        onClick={copyToClipboard}>
                                        {copied ? "Copied" : "Copy link"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 text-center">
                            <Button
                                onClick={() => toggleDrawer(true)}
                                label="Reply anonymously"
                            />
                            <p className="text-center mt-8 text-sm text-neutral-400">
                                <span className="block sm:inline">
                                    Curious to know what people really think?
                                </span>
                                <LinkRegular
                                    label="Ask a question"
                                    linkTo="/sign-up"
                                />
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
        </>
    );
}

function ReplyTextBox({ handleSubmit, handleClose, isSubmitting }) {
    const [reply, setReply] = useState("");

    const handleChange = (e) => {
        setReply(e.target.value);
    };

    const checkReply = () => {
        if (reply.length) {
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
