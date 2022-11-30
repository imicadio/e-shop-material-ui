import { Auth } from "@zalter/identity-js";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase";
import firebase from "./firebase";
import { useRef } from "react";

export const ENABLE_AUTH = process.env.NEXT_PUBLIC_ENABLE_ZALTER_AUTH === "true";

// export const auth = ENABLE_AUTH
//   ? new Auth({
//     projectId: process.env.NEXT_PUBLIC_ZALTER_PROJECT_ID
//   })
//   : noop();

export const auth = {};
