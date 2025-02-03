// socket.js
import io from 'socket.io-client';

const socketInternal = io('https://uat.presshop.live:3005');
export default socketInternal;
