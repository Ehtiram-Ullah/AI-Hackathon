// src/services/firebase_service.ts
import { db, ref, set, push, get } from "../lib/firebase";

// Define what a user object looks like
export interface UserData {
  id?: string; // optional — will be auto-generated if not provided
  name: string;
  createdAt: string;
}
export async function createUser(userData: UserData): Promise<string | null> {
  try {
    const usersRef = ref(db, "users");

    // Create a new user reference (generate id if not given)
    const newUserRef = userData.id
      ? ref(db, `users/${userData.id}`)
      : push(usersRef);

    const userId = newUserRef.key!;

    // Store user data
    await set(newUserRef, {
      name: userData.name,

      createdAt: userData.createdAt,

    });

    console.log("✅ User created successfully:", userId);
    return userId;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return null;
  }
}

export async function getRemainingTime(){
}

export async function findMatchmakingUsers(topic: string, userId: string, limit: number = 20) {
  try {
    const matchmakingRef = ref(db, "matchmaking");
    const snapshot = await get(matchmakingRef);
    const now = Date.now();

    let existingMatchKey: string | null = null;
    let remainingTime = 0;

    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const [key, match] of Object.entries<any>(data)) {
        const userCount = match.users ? Object.keys(match.users).length : 0;
        const elapsed = now - match.timestamp;
        const duration = 60 * 1000; // 60 seconds
        const isNotExpired = elapsed < duration;

        if (match.topic === topic && isNotExpired && userCount < limit) {
          existingMatchKey = key;
          remainingTime = duration - elapsed; // calculate remaining time
          break;
        }
      }
    }

    if (existingMatchKey) {
      // ✅ Add this user to the existing match
      const userRef = ref(db, `matchmaking/${existingMatchKey}/users/${userId}`);
      await set(userRef, { joinedAt: now });

      console.log(`✅ User added to existing matchmaking: ${existingMatchKey}`);
      return { matchId: existingMatchKey, remainingTime };
    } else {
      // 🆕 Create a new matchmaking session
      const newMatchRef = push(matchmakingRef);
      const matchId = newMatchRef.key!;
      const duration = 60 * 1000;

      await set(newMatchRef, {
        topic,
        timestamp: now,
        expiresAt: now + duration,
        users: {
          [userId]: { joinedAt: now },
        },
      });

      console.log(`🆕 New matchmaking created: ${matchId}`);
      return { matchId, remainingTime: duration };
    }
  } catch (error) {
    console.error("❌ Error in matchmaking:", error);
    return null;
  }
}