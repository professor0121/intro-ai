
"use server"

import { db, auth } from "../../firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
    try {
        const { uid, name, email } = params;

        const userRecord = await db.collection("users").doc(uid).get();
        if (userRecord.exists) {
            return {
                success: false,
                error: "User already exists"
            };
        }
        await db.collection('users').doc(uid).set({
            name,
            email,
        });
        return {
            success: true,
            message: "Account created successfully"
        };
    } catch (error: any) {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
            return {
                success: false,
                error: "Email already in use"
            };
        }
        return {
            success: false,
            error: error.message || "Unknown error occurred"
        };
    }
}

export async function signIn(params: SignInParams) {
    try {
        const { email, idToken } = params;

        // Verify the ID token first
        const decodedToken = await auth.verifyIdToken(idToken);
        if (decodedToken.email !== email) {
            return {
                success: false,
                error: "Invalid credentials"
            };
        }

        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                error: "User does not exist"
            };
        }
        await setSessionCookie(idToken);
        return {
            success: true,
            message: "Signed in successfully",
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
            }
        };
    } catch (error: any) {
        console.error(error);
        if (error.code === "auth/user-not-found") {
            return {
                success: false,
                error: "User does not exist"
            };
        }
        return {
            success: false,
            error: error.message || "Unknown error occurred"
        };
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: 60 * 60 * 24 * 7
    });
    cookieStore.set("__session",
        sessionCookie,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV==="production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            sameSite: "lax"
        });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("__session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return user;
}

// Logout function
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("__session");
  return {
    success: true,
    message: "Logged out successfully"
  };
}