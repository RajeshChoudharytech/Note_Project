const apiUrls = {
  LOGIN: `token/`,
  REGISTER: `users/`,
  LOGOUT:`logout/`,
  GETALLNOTES:'/notes/',
  ADDNOTE:'/notes/',
  ADDRECORDING:'/voice_recording/',
  DELETENOTES: (id) => `/notes/${id}`,
  GETNOTE:(id) => `/notes/${id}`,
  UPDATENOTE:(id) => `/notes/${id}/`,
  DELETERECORDING:(id) =>  `/voice_recording/${id}`
  
}

export default apiUrls;