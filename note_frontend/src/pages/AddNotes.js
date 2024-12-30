import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams,Link } from "react-router-dom"; 

import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ClearIcon from "@mui/icons-material/Clear"; 
import { addNotes, getNote, updateNote, addRecording ,deleteRecording} from '../services/api'

const AddNotePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();
  const { noteId } = useParams(); 

 
  const isEdit = Boolean(noteId);

  useEffect(() => {

    if (isEdit) {
      const fetchNote = async () => {
        try {
          const response = await getNote(noteId);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setAudioBlob(response.data.voice_recording);
        } catch (error) {
          console.error("Error fetching note details:", error);
        }
      };

      fetchNote();
    }
  }, [isEdit, noteId]);
  console.log(audioBlob);
  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) =>
        chunks.push(event.data);
      mediaRecorderRef.current.onstop = () =>
        setAudioBlob(new Blob(chunks, { type: "audio/mp3" }));

      setIsRecording(true);
    } else {
      alert("Your browser does not support audio recording.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleDeleteRecording = async () => {
    if (isEdit) {
      const voiceRecodingId = audioBlob?.id;
      setAudioBlob(null);
      try {
        const data = await deleteRecording(voiceRecodingId);
      } catch (error) {
        
      }
    } else {
      setAudioBlob(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    let response;
    if (isEdit) {
     
      response = await updateNote(noteId, formData);
    } else {
      response = await addNotes(formData);
    }

    const createdNoteId = isEdit ? noteId :response.id

    if (audioBlob) {
      const audioFormData = new FormData();
      audioFormData.append("audio_file", audioBlob, "recording.mp3");
      audioFormData.append("note", createdNoteId);

      await addRecording(audioFormData);
    }

    setTitle("");
    setDescription("");
    setIsRecording(false);
    setAudioBlob(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        flexDirection: "column",
        backgroundImage: "linear-gradient(135deg, #D9E4F5 0%, #A3C4F7 100%)",
      }}
    >
      <Box
        sx={{
          padding: 4,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Box
            component="img"
            src="https://img.icons8.com/fluency/96/000000/task.png"
            alt="Daily Notes Logo"
            sx={{ width: 80, height: 80, marginLeft: "47%" }}
          />
          <IconButton
            onClick={handleLogout}
            color="primary"
            sx={{ color: "#5E4B8B" }}
          >
            <ExitToAppIcon sx={{ width: "50px", height: "100px" }} />
          </IconButton>
        </Box>
        <Typography
          variant="h3"
          fontWeight="700"
          sx={{ fontFamily: "'Poppins', sans-serif", color: "#5E4B8B" }}
        >
          {isEdit ? "Edit Note" : "Add New Note"}
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={1}>
          {isEdit
            ? "Modify the details of your note"
            : "Fill out the form to add a new note"}
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          padding: 2,
          flexGrow: 1,
          justifyContent: "center",
          overflowY: "auto",
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper
            sx={{
              padding: 4,
              borderRadius: 4,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": { color: "#5E4B8B" },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#5E4B8B" },
                    "&.Mui-focused fieldset": { borderColor: "#5E4B8B" },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  "& .MuiInputLabel-root": { color: "#5E4B8B" },
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#5E4B8B" },
                    "&.Mui-focused fieldset": { borderColor: "#5E4B8B" },
                  },
                }}
              />

              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                {!audioBlob && (
                  <IconButton
                    color="primary"
                    onClick={isRecording ? stopRecording : startRecording}
                    sx={{
                      backgroundColor: "#F4A300",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#D97904" },
                      marginRight: 2,
                    }}
                  >
                    {isRecording ? <StopIcon /> : <MicIcon />}
                  </IconButton>
                )}
                {audioBlob && (
                  <Box
                    sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                  >
                    <Typography>Recorded</Typography>
                    <IconButton
                      onClick={handleDeleteRecording}
                      sx={{ color: "#F44336", marginLeft: 2 }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg, #F4A300, #D97904)",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    background: "linear-gradient(90deg, #D97904, #F4A300)",
                  },
                }}
              >
                {isEdit ? "Update Note" : "Add Note"}
              </Button>
            </form>
          </Paper>
          <Box textAlign="center" mt={10} sx={{ width: '100%' }}>
        <Link to="/notes" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #F4A300, #D97904)',
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                background: 'linear-gradient(90deg, #D97904, #F4A300)',
              },
            }}
          >
          NoteList
          </Button>
        </Link>
      </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddNotePage;
