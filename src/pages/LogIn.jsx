import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LinkRegular from "../components/LinkRegular";
import pb from "../lib/pocketbase";
import SignInMethod from "../components/SignInMethod";
import ErrorText from "../components/ErrorText";
import PromptDrawer from "../components/PromptDrawer";
import { toast } from "react-toastify";

function LogIn() {
    const [drawerOpen, toggleDrawer] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const logInUser = async (data) => {
        setIsSubmitting(true);

        try {
            await pb
                .collection("users")
                .authWithPassword(data.email, data.password);

            setIsSubmitting(false);
            toggleDrawer(false);

            toast.success("Logged in", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            navigate("/questions");
        } catch (error) {
            alert(
                "Invalid login details, make sure your email or password is correct"
            );
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto">
            <div className=" px-4 flex flex-col gap-6 mt-24 text-center">
                <h1 className=" text-3xl font-bold leading-10">
                    Continue to your account by logging in
                </h1>
                <p className=" text-neutral-300">
                    Pick a preferred method to continue
                </p>
                <div className="flex flex-col gap-3">
                    <SignInMethod
                        handleClick={() => toggleDrawer(true)}
                        label="Email"
                    />
                </div>
                <p>
                    First time here?{" "}
                    <LinkRegular label="Sign up" linkTo="/sign-up" />
                </p>
                {drawerOpen && (
                    <PromptDrawer
                        handleClose={() => toggleDrawer(false)}
                        title="Log in with email"
                        isSubmitting={isSubmitting}>
                        <LogInForm
                            submitHandler={logInUser}
                            isSubmitting={isSubmitting}
                        />
                    </PromptDrawer>
                )}
            </div>
        </div>
    );
}

function LogInForm({ submitHandler, isSubmitting }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
            <div className="my-6">
                <fieldset className="flex flex-col items-start">
                    <label className=" text-neutral-300" htmlFor="">
                        Email
                    </label>
                    <input
                        className="w-full mt-2 p-2 bg-neutral-600 focus:bg-neutral-200 focus:text-neutral-900 rounded"
                        type="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email?.type === "required" && (
                        <ErrorText error="Valid email required" />
                    )}
                </fieldset>
                <fieldset className="flex flex-col items-start mt-4">
                    <label className=" text-neutral-300" htmlFor="">
                        Password
                    </label>
                    <input
                        className="w-full mt-2 p-2 bg-neutral-600 focus:bg-neutral-200 focus:text-neutral-900 rounded"
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors.password?.type === "required" && (
                        <ErrorText error="Password required" />
                    )}
                    {errors.password?.type === "minLength" && (
                        <ErrorText error="Password must be 8 characters or more" />
                    )}
                </fieldset>
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    label={isSubmitting ? "Logging in..." : "Log in"}
                    disabled={isSubmitting}
                />
            </div>
        </form>
    );
}

export default LogIn;
