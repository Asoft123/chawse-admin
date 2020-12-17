import http  from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = `${apiUrl}/users`;
const msgLink = `${apiUrl}/users/message`;
const subScriptionEndpoint = `${apiUrl}/sub`;

export function getUsers(){
      return http.get(apiEndpoint);
}
export function getUserUrl(id){
 return `${apiEndpoint}/${id}` 
}

export function register(user){
return http.post(apiEndpoint, {
      email:user.email,
      password:user.password,
      firstname:user.firstname,
      lastname:user.lastname,
      phone:user.phone,
      user_cat:user.user_cat,
})
}

export function updatePassword(user){
return http.put(apiEndpoint, {
      password:user.password,
      
})
}


export function saveUser(user) {
  if(user._id){
      const body = {...user};
      delete body._id;
      return http.put(getUserUrl(user._id), body)
  }

      return http.post(apiEndpoint, user)
}

export function updateuser(userid, data){

      return http.put(getUserUrl(userid), data)
}

export function getSingleUser(userid){
   return http.get(getUserUrl(userid))
}

export function getUserSubscriptionDetails(userid){
      return http.get(`${subScriptionEndpoint}/${userid}`);
}

export function subScribeCheck(userid){
       return http.get(`${apiUrl}/sub/${userid}`)
 }

export function newSubcription(userid){
       return http.put(`${apiUrl}/sub/${userid}`)
 }
export function expireUserSubcription(userid){
       return http.put(`${apiUrl}/sub/exp/${userid}`)
 }

 export function Sendmessage(messageData){
       return http.post(`${msgLink}`, messageData)
 }