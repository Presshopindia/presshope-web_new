import io from 'socket.io-client';

const socketServer = io(process.env.REACT_APP_SOCKET_SERVER);
export default socketServer;
