import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Box, Loading, IconButton, CloseIcon } from 'Common';

function InfoModal({ open = false, loading = false, title = '', onClose, bodyContent, maxWidth = 'sm' }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={maxWidth}>
            <DialogTitle>
                {title}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Loading />
                    </Box>
                ) : (
                    <Box justifyContent="center" alignItems="center">
                        {bodyContent}
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}

InfoModal.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    bodyContent: PropTypes.node.isRequired,
    maxWidth: PropTypes.string,
};

export default InfoModal;
