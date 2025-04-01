import { account } from "../config/appwrite";

export const createUser = async (email, password, name) => {
  try {
    const user = await account.create('unique()', email, password, name);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true, data: session };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const checkSession = async () => {
  try {
    const user = await account.get();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};