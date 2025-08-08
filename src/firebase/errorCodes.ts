const getFirebaseAuthErrorMessage = (errorCode: string): string => {
  // Map Firebase Auth error codes to user-friendly messages
  // Firebase SDK provides error codes but not detailed messages,
  // so we handle them here
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "This user has been disabled.";
    case "auth/user-not-found":
      return "User not found.";
    case "auth/wrong-password":
      return "Wrong password.";
    case "auth/weak-password":
      return "Password too weak (min 6 characters).";
    case "auth/operation-not-allowed":
      return "Operation not allowed.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    case "auth/invalid-credential":
      return "Invalid credentials.";
    case "auth/account-exists-with-different-credential":
      return "Account exists with different sign-in method.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export default getFirebaseAuthErrorMessage;
