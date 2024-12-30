import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllNotes, deleteNote } from '../services/api'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);  
  const [selectedNote, setSelectedNote] = useState(null); 
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      setNotes(response);
    } catch (error) {
      console.error(error.message || 'An error occurred. Please try again.');
    }
  };

 
  const handleDelete = async (noteId) => {
    try {
      const response = await deleteNote(noteId);
      console.log(response);
    } catch (error) {
      console.error(error.message || "An error occurred. Please try again.");
    }
    fetchNotes();
  };

 
  const handleEdit = (noteId) => {
    navigate(`/edit-note/${noteId}`);
  };


  const handleView = (note) => {
    setSelectedNote(note);
    setOpenModal(true);
  };

  
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNote(null);
  };

  
  const handleLogout = () => {
    localStorage.clear()
    navigate('/'); 
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, #D9E4F5 0%, #A3C4F7 100%)',
      }}
    >
      <Box
        sx={{
          padding: 4,
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          width: '100%',
        }}
      >
        <Box
          component="img"
          src="https://img.icons8.com/fluency/96/000000/task.png"
          alt="Daily Notes Logo"
          sx={{ width: 80, height: 80, marginBottom: 2 }}
        />
        <Typography variant="h3" fontWeight="700" sx={{ fontFamily: "'Poppins', sans-serif", color: '#5E4B8B' }}>
          Daily Notes
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={1}>
          Your daily productivity partner
        </Typography>
      </Box>

      {/* Logout Button */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
      <IconButton
            onClick={handleLogout}
            color="primary"
            sx={{ color: "#5E4B8B" }}
          >
            <ExitToAppIcon sx={{ width: "50px", height: "100px" }} />
          </IconButton>
      </Box>

      {/* Button Section */}
      <Box textAlign="center" mb={4} sx={{ width: '100%' }}>
        <Link to="/add-note" style={{ textDecoration: 'none' }}>
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
            Add Note
          </Button>
        </Link>
      </Box>

      {/* Notes List Section */}
      <Grid
        item
        sx={{
          width: '100%',
          maxWidth: 800,
          margin: '0 auto',
          marginTop: 2,
        }}
      >
        <Paper
          sx={{
            height: '500px',
            padding: 3,
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            overflowY: 'auto',
          }}
        >
          <List>
            {notes.map((note) => (
              <ListItem
                key={note.id}
                sx={{
                  borderBottom: '1px solid #ccc',
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <ListItemText
                  primary={note.title}
                  secondary={note.description}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: 'bold',
                      color: '#5E4B8B',
                    },
                    '& .MuiListItemText-secondary': {
                      color: '#555',
                    },
                  }}
                />

                {/* Voice Recording Below Description */}
                {note.voice_recording && (
                  <Box sx={{ marginTop: 1 }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontStyle: 'italic',
                        wordWrap: 'break-word',
                      }}
                    >
                      Voice Recording: <a href={note.voice_recording.audio_file} target="_blank" rel="noopener noreferrer">
                        Listen to Recording
                      </a>
                    </Typography>
                  </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 2 }}>
                  <IconButton onClick={() => handleEdit(note.id)} sx={{ color: '#1976D2', marginRight: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(note.id)} sx={{ color: '#D32F2F' }}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleView(note)} sx={{ color: '#1976D2' }}>
                    <VisibilityIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

   
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal} 
        sx={{
          '& .MuiDialog-paper': {
            width: '80%',       
            maxWidth: '500px',  
            minHeight: '400px', 
            borderRadius:"15px"
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Note Details
        </DialogTitle>
        <DialogContent>
          {selectedNote ? (
            <>
              <Typography variant="h6">{selectedNote.title}</Typography>
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                {selectedNote.description}
              </Typography>
              {/* Display voice recording link if exists */}
              {selectedNote.voice_recording && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontStyle: 'italic',
                    wordWrap: 'break-word',
                    marginTop: 1,
                    borderRadius:'30px'
                  }}
                >
                  Voice Recording: <a href={selectedNote.voice_recording.audio_file} target="_blank" rel="noopener noreferrer">
                    Listen to Recording
                  </a>
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No details available.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default NotesPage;
