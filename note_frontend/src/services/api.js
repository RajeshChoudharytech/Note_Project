import axiosInstance from '../utils/axiosInstance';
import apiUrl from '../utils/apiUrls';


export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(apiUrl.LOGIN, credentials);
  return response.data;
};


export const registerUser = async (userData) => {
  const response = await axiosInstance.post(apiUrl.REGISTER, userData);
  return response.data;
};


export const getAllNotes = async (page) => {
  const response = await axiosInstance.get(`${apiUrl.GETALLNOTES}`);
  return response.data;
};

export const addNotes = async (noteData) => {
  const response = await axiosInstance.post(apiUrl.ADDNOTE,noteData);
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await axiosInstance.delete(apiUrl.DELETENOTES(noteId));
  return response;
};

export const getNote = async (noteId) => {
  const response = await axiosInstance.get(apiUrl.GETNOTE(noteId));
  return response;
};

export const updateNote = async (noteId,updatedNoteData) => {
  const response = await axiosInstance.patch(apiUrl.UPDATENOTE(noteId),updatedNoteData);
  return response;
};

export const addRecording = async (voiceRecordingData) => {
  const response = await axiosInstance.post(apiUrl.ADDRECORDING,voiceRecordingData);
  return response.data;
};

export const deleteRecording =async(recordingId) =>{
  const response = await axiosInstance.delete(apiUrl.DELETERECORDING(recordingId))
  return response;
};




