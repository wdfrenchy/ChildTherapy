import React, { useState } from 'react';
import { Button } from '@mui/material';
import { FileDownload as ExportIcon } from '@mui/icons-material';
import DataExportDialog from './DataExportDialog';

function ExportButton({ defaultType, variant = 'contained', color = 'primary', size = 'medium' }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button
        variant={variant}
        color={color}
        size={size}
        startIcon={<ExportIcon />}
        onClick={handleOpen}
      >
        Export
      </Button>
      <DataExportDialog
        open={dialogOpen}
        onClose={handleClose}
        defaultType={defaultType}
      />
    </>
  );
}

export default ExportButton;
