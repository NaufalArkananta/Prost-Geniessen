import express from 'express';
import app from './config/server';
import AdminRoute from './routes/adminRoute';
import UserRoute from './routes/userRoute';
import AuthRoute from './routes/authRoute';
import ProductRoute from './routes/productRoute';
import CartRoute from './routes/cartRoute';

// Middleware
app.use(express.json());

// Rute
app.use('/api', AdminRoute);
app.use('/api', UserRoute);
app.use('/api', AuthRoute);
app.use('/api', ProductRoute);
app.use('/api', CartRoute);

export default app;