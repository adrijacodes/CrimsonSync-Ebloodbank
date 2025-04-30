// Import the socket.io-client library
import { io } from 'socket.io-client';

// Replace with your server's WebSocket URL (use 'ws://' for local or 'wss://' for production)
const socket = io('http://localhost:8001'); // Make sure this matches your server address

// Once connected, emit events to simulate donation acceptance or rejection
socket.on('connect', () => {
  console.log('Connected to socket server');

  // Example of accepting a donation request
  socket.emit('acceptDonation', { bloodRequestId: 'your-blood-request-id' });

  // Example of rejecting a donation request
  socket.emit('rejectDonation', { bloodRequestId: 'your-blood-request-id' });
});

// Listen for responses from the server
socket.on('donorAccepted', (data) => {
  console.log('Donor accepted the request:', data);
});

socket.on('donorRejected', (data) => {
  console.log('Donor rejected the request:', data);
});
