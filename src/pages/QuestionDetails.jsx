import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pb from "../lib/pocketbase";
import Button from "../components/Button";
import LoadingComponent from "../components/LoadingComponent";
import plane from "../assets/rocket.png";
import useCopyToClipboard from "../lib/useCopyToClipboard";

function QuestionDetails() {
    // get parameters from react router
    let { qid } = useParams();

    const [q, setQ] = useState(null);
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);

    // for the clipboard
    let url = `${import.meta.env.VITE_SITE_BASE_URL}/r/${qid}`;
    const [copied, copyToClipboard] = useCopyToClipboard(url);

    // fetch question and replies from database
    useEffect(() => {
        try {
            (async () => {
                let question = await pb.collection("questions").getOne(qid);

                setQ(question.text);

                // fetch replies
                let replies = await pb.collection("replies").getFullList(200, {
                    filter: `question='${qid}'`,
                    sort: "-created",
                });

                replies = replies.map((reply) => {
                    return {
                        text: reply.text,
                    };
                });

                setReplies(replies);
                setLoading(false);
            })();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <div className="mt-16">
                <h1 className=" text-3xl font-bold leading-10">{q}</h1>
                <div className="mt-8 flex justify-between">
                    <p className="uppercase text-neutral-300 tracking-wider">
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
                <div className="mt-10">
                    {loading ? (
                        <LoadingComponent loading={loading} />
                    ) : replies.length ? (
                        <>
                            <h3 className=" text-xl font-semibold text-neutral-300">
                                {replies.length}{" "}
                                {replies.length === 1 ? "Reply" : "Replies"}
                            </h3>

                            {replies.map((reply, ii) => (
                                <ReplyCard reply={reply.text} key={ii} />
                            ))}
                        </>
                    ) : (
                        <EmptyState url={url} />
                    )}
                </div>
            </div>
        </>
    );
}

function EmptyState({ url }) {
    const [copied, copyToClipboard] = useCopyToClipboard(url);

    return (
        <div className=" px-4 pt-6 flex flex-col mt-10 text-center border-t border-neutral-700">
            <div className="mx-auto">
                <img src={plane} className="h-72" alt="" />
            </div>
            <h1 className=" text-xl mt-4 font-bold leading-10">
                No replies yet
            </h1>
            <p className=" text-neutral-500">
                Share this question to your audience to get anonymous replies
                from them
            </p>
            <div className="mt-3">
                <Button
                    label={copied ? "Copied" : "Copy link"}
                    onClick={() => copyToClipboard(url)}
                />
            </div>
        </div>
    );
}

function ReplyCard({ reply }) {
    return (
        <div className="border-b-2 border-neutral-800 py-4 ">
            <h2 className="text-lg">{reply}</h2>
        </div>
    );
}

export default QuestionDetails;
