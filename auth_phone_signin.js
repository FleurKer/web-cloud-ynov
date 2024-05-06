import "./firebaseConfig";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

const auth = getAuth();
console.log(auth);

export const loginWithPhoneNumber = async (phoneNumber) => {
  //   if (window !== undefined) {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "normal",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        console.log(response);
      },
      "expired-callback": () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
        console.log("expired callback");
      },
    }
  );

  try {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    console.log(confirmationResult);
    return confirmationResult;
  } catch (error) {
    // Error; SMS not sent
    // ...
    console.log("sms not sent");
    console.log(error);
  }
  // const appVerifier = window.recaptchaVerifier;
  // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //   .then((confirmationResult) => {
  //     // SMS sent. Prompt user to type the code from the message, then sign the
  //     // user in with confirmationResult.confirm(code).
  //     window.confirmationResult = confirmationResult;
  //     console.log(confirmationResult);
  //     return confirmationResult;
  //   })
  //   .catch((error) => {
  //     // Error; SMS not sent
  //     // ...
  //     console.log("sms not sent");
  //     console.log(error);
  //   });
  //   }
};
