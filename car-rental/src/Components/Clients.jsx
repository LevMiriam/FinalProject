import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid
} from '@mui/material';
import { fetchClients, addClient } from '../Redux/clientsSlice';

export default function ClientsList({ setClientAdded }) {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients.items);
    const status = useSelector((state) => state.clients.status);
    const error = useSelector((state) => state.clients.error);
    const [open, setOpen] = useState(false);
    const [newClient, setNewClient] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        role: '',
        driverLicenseNumber: ''
    });
    const [addError, setAddError] = useState(null);
    const [addSuccess, setAddSuccess] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            setShowLoading(true);
            dispatch(fetchClients());
        }
    }, [status, dispatch]);

    // הצגת שגיאה בהוספת לקוח
    useEffect(() => {
        if (error && status !== 'failed') {
            setAddError(error);
            setAddSuccess(false); // איפוס הצלחה אם יש שגיאה כללית
        }
    }, [error, status]);

    // העלמת הודעת שגיאה אחרי 3 שניות
    useEffect(() => {
        if (addError) {
            const timer = setTimeout(() => setAddError(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [addError]);

    // העלמת הודעת הצלחה אחרי 3 שניות
    useEffect(() => {
        if (addSuccess) {
            const timer = setTimeout(() => setAddSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [addSuccess]);

    // הצגת לודינג יפה ל-3 שניות או עד שהטעינה מסתיימת
    useEffect(() => {
        if (status === 'loading') {
            setShowLoading(true);
            const timer = setTimeout(() => setShowLoading(false), 3000);
            return () => clearTimeout(timer);
        } else if (status === 'succeeded' || status === 'failed') {
            setShowLoading(false);
        }
    }, [status]);

    return (
        <Box
            sx={{
                bgcolor: '#f5f5f5',
                minHeight: '100vh',
                py: 6,
                px: 2,
                width: '100vw', // הרקע יתפוס את כל רוחב המסך
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            {/* הודעת שגיאה להוספת לקוח */}
            {addError && (
                <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 2, fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                    {addError}
                </Alert>
            )}

            {/* הודעת הצלחה להוספת לקוח */}
            {addSuccess && (
                <Alert severity="success" sx={{ maxWidth: 600, mx: 'auto', mt: 2, fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                    !הלקוח נוסף בהצלחה
                </Alert>
            )}

            {/* כותרת וכפתור הוספה */}
            <Box
                sx={{
                    maxWidth: 1000,
                    mx: 'auto',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column', // שורה מתחת לשורה
                    alignItems: 'center', // מרכז את הכותרת והכפתור
                    justifyContent: 'center',
                    gap: 2,
                    mb: 4,
                    px: 2
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: 'Comic Sans MS, cursive, sans-serif',
                        fontWeight: 'bold',
                        color: '#333',
                        textAlign: 'center',
                    }}
                >
                    Our Clients
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    sx={{
                        fontFamily: 'Comic Sans MS, cursive, sans-serif',
                        textTransform: 'none',
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: '#000',
                        color: '#fff',
                        '&:hover': { backgroundColor: '#333' },
                        alignSelf: 'center',
                    }}
                >
                    + Add Client
                </Button>

            </Box>

            {/* לודינג יפה */}
            {showLoading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
                    <CircularProgress size={60} thickness={5} sx={{ color: '#1976d2' }} />
                    <Typography sx={{ mt: 2, fontFamily: 'Comic Sans MS, cursive, sans-serif', color: '#1976d2' }}>
                        Loading...
                    </Typography>
                </Box>
            )}

            {status === 'loading' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {status === 'failed' && (
                <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                    Error: {error}
                </Alert>
            )}

            {status === 'succeeded' && (
                <Box
                    sx={{
                        maxWidth: 1200,
                        mx: 'auto',
                        px: 2,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {clients.map((client, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={client.id || `client-${idx}`} display="flex" justifyContent="center">
                                <Card
                                    sx={{
                                        width: 320, // גודל אחיד לכל הכרטיסים
                                        minHeight: 180, // גובה מינימלי אחיד
                                        backgroundColor: 'white',
                                        borderRadius: 3,
                                        boxShadow: 4,
                                        '&:hover': { boxShadow: 8, transform: 'scale(1.02)' },
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                                                fontWeight: 'bold',
                                                mb: 1,
                                                color: '#222'
                                            }}
                                        >
                                            {client.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                                                color: '#555',
                                                mb: 0.5
                                            }}
                                        >
                                            ID: {client.id}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                                                color: '#555',
                                                mb: 0.5
                                            }}
                                        >
                                            Email: {client.email}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                                                color: '#555',
                                                mb: 0.5
                                            }}
                                        >
                                            Phone: {client.phone}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                                                color: '#555',
                                                mb: 0.5
                                            }}
                                        >
                                            Role: {client.role}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                                                color: '#555'
                                            }}
                                        >
                                            Driver License: {client.driverLicenseNumber}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {/* דיאלוג להוספת לקוח */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle
                    sx={{
                        fontFamily: 'Comic Sans MS, cursive, sans-serif',
                        fontWeight: 'bold'
                    }}
                >
                    Add New Client
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="ID"
                        variant="outlined"
                        value={newClient.id}
                        onChange={(e) => setNewClient({ ...newClient, id: e.target.value })}
                    />
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    />
                    <TextField
                        label="Phone"
                        variant="outlined"
                        value={newClient.phone}
                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    />
                    <TextField
                        label="Role"
                        variant="outlined"
                        value={newClient.role}
                        onChange={(e) => setNewClient({ ...newClient, role: e.target.value })}
                    />
                    <TextField
                        label="Driver License Number"
                        variant="outlined"
                        value={newClient.driverLicenseNumber}
                        onChange={(e) => setNewClient({ ...newClient, driverLicenseNumber: e.target.value })}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={() => setOpen(false)}
                        sx={{
                            fontFamily: 'Comic Sans MS, cursive, sans-serif',
                            textTransform: 'none'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setShowLoading(true);
                            setAddError(null); // איפוס שגיאה לפני ניסיון הוספה
                            setAddSuccess(false); // איפוס הצלחה לפני ניסיון הוספה
                            const clientToSend = {
                                ...newClient,
                                id: newClient.id ? Number(newClient.id) : undefined,
                                driverLicenseNumber: newClient.driverLicenseNumber ? String(newClient.driverLicenseNumber) : undefined
                            };
                            dispatch(addClient(clientToSend))
                                .unwrap()
                                .then((res) => {
                                    setAddSuccess(true);
                                    setAddError(null); // איפוס שגיאה
                                    dispatch(fetchClients());
                                    if (setClientAdded) setClientAdded(true);
                                })
                                .catch((e) => {
                                    // אם הלקוח נוסף בפועל (כלומר, אין שגיאה אמיתית), נציג הצלחה בלבד
                                    if (clients.some(c => c.id === Number(newClient.id))) {
                                        setAddSuccess(true);
                                        setAddError(null);
                                    } else {
                                        setAddError('הוספת הלקוח נכשלה');
                                        setAddSuccess(false);
                                    }
                                })
                                .finally(() => {
                                    setTimeout(() => setShowLoading(false), 3000);
                                });
                            setOpen(false);
                            setNewClient({ id: '', name: '', email: '', phone: '', role: '', driverLicenseNumber: '' });
                        }}
                        sx={{
                            fontFamily: 'Comic Sans MS, cursive, sans-serif',
                            textTransform: 'none'
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
