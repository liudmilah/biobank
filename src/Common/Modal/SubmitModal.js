import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    AlertError,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    CircularProgress,
    Button,
    IconButton,
    CloseIcon,
} from 'Common';

function SubmitModal({ open, error, loading, onClose, title, onSubmit, disabledSubmit, bodyContent }) {
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
            <DialogContent>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <AlertError visible={!!error} text={error} />
                        {bodyContent}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t('btnCancel')}</Button>
                <Button onClick={onSubmit} disabled={disabledSubmit}>
                    {t('btnSave')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

SubmitModal.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    bodyContent: PropTypes.node.isRequired,
    disabledSubmit: PropTypes.bool.isRequired,
};

export default SubmitModal;
