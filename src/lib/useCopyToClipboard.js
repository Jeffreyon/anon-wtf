import { useState } from "react";

function useCopyToClipboard(text) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        setCopied(true);

        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.log("Can't copy to clipboard");
        }

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return [copied, copyToClipboard];
}

export default useCopyToClipboard;
