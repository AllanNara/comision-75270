import jwt from "jsonwebtoken";

export const PRIVATE_KEY = "ashdguof4haew9sdDSFZAfd"

export const generateToken = user => {
  const token = jwt.sign({ user }, PRIVATE_KEY)
  return token
}

export const verifySign = (token) => {
  try {
    const credentials = jwt.verify(token, PRIVATE_KEY);
    return credentials
  } catch (error) {
    console.error("Invalid signature")
    return null  
  }
}

// const newToken = generateToken( { username: "allan", isAdmin: "true" })
// console.log(newToken)
//
//
// const verifyToken = verifySign(newToken)
// console.log(verifyToken)
