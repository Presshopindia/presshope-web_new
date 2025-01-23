import io from 'socket.io-client';

const socketServer = io('https://uat.presshop.live:3005');
export default socketServer;
