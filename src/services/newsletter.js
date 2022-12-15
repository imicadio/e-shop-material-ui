import { toast } from "react-toastify";

export const getMails = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/newsletter.json")
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log("Error fetch emails, ", error));

  return response;
};

export const newsletterHasEmail = async (mail) => {
  const allMails = await getMails();

  if (allMails) {
    return Object.values(allMails).includes(mail) ? true : false;
  } else {
    return false;
  }
};

export const postMail = async (mail) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL + "/newsletter.json",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(mail),
      }
    );

    if (response.status === 200)
      toast.success("Thank you for subscribe to our newsletter", {
        position: "top-left",
      });

    if (response.status < 200 || response.status >= 400)
      toast.error("Something wrong", { position: "top-left" });
  } catch (error) {
    return toast.error(error, { position: "top-left" });
  }
};
