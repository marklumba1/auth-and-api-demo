import { useEffect, useState, type MouseEventHandler } from "react";
import useAuth from "./firebase/useAuth";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const anonymousOnly = true;
  const {
    user,
    error,
    initializing,
    setError,
    loading,
    handleSignIn,
    handleRegister,
    handleSignInAnon,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    shouldUnregister: true,
  });

  const handleSwitch = () => {
    setError(null);
    setIsRegister(!isRegister);
    reset();
  };

  const handleAnonymous: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    handleSignInAnon();
  };

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    if (isValid) {
      isRegister
        ? handleRegister(data.email, data.password)
        : handleSignIn(data.email, data.password);
    } else {
      setError("Form is not valid.");
    }
  };

  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/chat");
  }, [user]);
  console.log(loading);
  if (initializing) return <p className="h-dvh flex justify-center items-center text-center">Loading...</p>;
  return (
    <div className="h-dvh p-4 flex items-center justify-center">
      {anonymousOnly ? (
        <div className="max-w-sm mx-auto p-6 bg-teal-50 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-extrabold mb-2 text-teal-800">
            Welcome, mga BOBO! 🕵️‍♂️
          </h1>
          <p className="mb-6 text-teal-700">
            Lungub ka king Mekus chat, e mu kailangan magsalikut, ahh!
          </p>
          <button
            className="anonymous bg-amber-400 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAnonymous}
            disabled={loading}
          >
            Sign in Anonymously
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 max-w-md p-6 border border-teal-700 rounded-lg bg-teal-800 shadow-lg"
        >
          <h2>
            {isRegister ? "Create a Firebase Account" : "Sign in to Firebase"}
          </h2>
          <p>This is a practice app using Firebase Authentication</p>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full"
              disabled={loading}
              {...register("email", {
                required: "Email is required.",
              })}
            />
            {errors.email && (
              <p className="error">{errors.email.message?.toString()}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full"
              disabled={loading}
              {...register("password", {
                required: "Password is required.",
                validate: (value) =>
                  value.length > 6 || "Password must be at least 6 characters",
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message?.toString()}</p>
            )}
          </div>

          {isRegister && (
            <div>
              <input
                type="password"
                className="w-full"
                placeholder="Confirm Password"
                disabled={loading}
                {...register("confirmPassword", {
                  required: "Cofirmation is required.",
                  validate: (value) =>
                    value.length < 6
                      ? "Password must be at least 6 characters"
                      : value !== passwordValue
                      ? "Passwords do not match"
                      : true,
                })}
              />
              {errors.confirmPassword && (
                <p className="error">
                  {errors.confirmPassword.message?.toString()}
                </p>
              )}
            </div>
          )}
          <button type="submit" disabled={loading}>
            {isRegister ? `Register` : `Login`}
          </button>

          <p
            className=" cursor-pointer underline text-center"
            onClick={handleSwitch}
          >
            {isRegister
              ? "Already have an account? Login here"
              : "Don't have an account? Sign up here"}
          </p>
          {error && <p className="text-rose-500 text-center">{error}</p>}
          {loading && <p className="text-center">Loading...</p>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
