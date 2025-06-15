import React, { useState } from "react";
import { Modal, ModalDialog, Box, Typography, Button, IconButton } from '@mui/joy';
import { FaQuestion } from 'react-icons/fa';

const HelpPopup: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Question mark icon button */}
      <IconButton 
        variant="plain" 
        color="neutral" 
        size="sm"
        onClick={() => setShowModal(true)}
        aria-label="Help"
      >
        <FaQuestion />
      </IconButton>

      {/* Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ModalDialog
          sx={{
            maxWidth: '500px',
            borderRadius: '16px',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <Typography level="h4" fontWeight="bold" mb={2} textAlign="center">
            🧐 Lost, are we?
          </Typography>
          <Typography mb={3} textAlign="center">
            Don't worry, even the best explorers need help sometimes. <br />
            This isn't peak intelligence — but close! Let's get you back on track before  the brain cells unionize. <br />

            (Also, no wardrobe required.)
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={() => setShowModal(false)}
              sx={{
                bgcolor: 'primary.500',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.600',
                },
                px: 3,
                py: 1,
                borderRadius: '8px',
              }}
            >
              Show Me the Way
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default HelpPopup;