import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, CloseIcon } from 'Common';

function ConfirmModal({ open, onClose, title, onConfirm, bodyContent, loading = false }) {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
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

            <DialogContent>{bodyContent}</DialogContent>

            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    {t('btnNo')}
                </Button>
                <Button onClick={onConfirm} disabled={loading}>
                    {t('btnYes')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    bodyContent: PropTypes.node.isRequired,
};

export default ConfirmModal;
