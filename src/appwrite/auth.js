import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
  }

  // create a account
  async createAccount({ email, password, name }) {
  const userAccount = await this.account.create({
    userId: ID.unique(),
    email,
    password,
    name,
  });

  if (userAccount) {
    return this.login({ email, password });
  }

  return userAccount;
}
  // login
  async login({ email, password }) {
  return await this.account.createEmailPasswordSession({
    email,
    password,
  });
}

  // getting currnet user
  async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
  }

  // log out
  async logout() {
    try {
        await this.account.deleteSessions('current');
    } catch (error) {
        console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
