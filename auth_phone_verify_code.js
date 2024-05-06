export const verifyCode = async (code) => {
  window.confirmationResult
    .confirm(code)
    .then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log("User signed in successfully");
      console.log(user);
      // router.replace("/profile");
      return true;
    })
    .catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      console.log("User couldn't sign in (bad verification code?)");
      console.log(error);
    });
};
