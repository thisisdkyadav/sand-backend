import { Client, Account, ID } from "appwrite"

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66bce4a3001c2245957e",
  key: "31470bd8443897f51f7b64efcbc51937bd669a329d50995a69278c545610205f3e6d23a32023fc83f0b9399be7ecdbed1e9f9e3569e5542d9c9a88c7369628b35e9985b74ee26d06f9677fc25d85908f34061f5272020909305769c0ba46e18401aedb975ef0a5cba4b1a40b790b44a1a774c05b53bdca959292c4ac85464a0b",
}

const client = new Client()
client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)

const account = new Account(client)
// const users = new Users(client)

export default client

// export async function createAccount(phone) {
//   try {
//     const uid = ID.unique()
//     console.log(uid)

//     const user = await users.create(uid, undefined, phone)

//     return user
//   } catch (error) {
//     throw new Error(error)
//   }
// }

export async function sendOtp(number) {
  try {
    // uid is number without +
    const uid = number.replace("+", "")
    const token = await account.createPhoneToken(uid, number)
    return token
  } catch (error) {
    throw new Error(error)
  }
}

export async function verify(userId, otp) {
  try {
    await account.createSession(userId, otp)
    return true
  } catch (error) {
    return false
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current")

    return session
  } catch (error) {
    throw new Error(error)
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get()

    return currentAccount
  } catch (error) {
    throw new Error(error)
  }
}

// export async function generateJWT() {
//   try {
//     const jwt = await account.createJWT()

//     return jwt
//   } catch (error) {
//     throw new Error(error)
//   }
// }
