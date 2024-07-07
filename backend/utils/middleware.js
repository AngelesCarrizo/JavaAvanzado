import jwt from 'jsonwebtoken';
const SECRET = "D9HeJsfngORdA_vjNWV8Y77K_8tBlqoYvVQ4oL0SAw4NG9EhmQu1IzRRjLnfrtfV"

export const verifyToken = async (token) => {

    console.log(token)
    if (!token) {
      return false; 
    }
  
    try {
      const decode = await jwt.verify(token, SECRET);
      console.log(decode.nombre)
      return true;  
    } catch (error) {
      console.log(error);
      return false
    }
} 

/*export const decodeToken=async(token)=>{

    if(!verifyToken){
        return false
    }
    const decode = await jwt.verify(token, SECRET)
    return decode
}*/

