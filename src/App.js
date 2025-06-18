import RouteAll from "./pages/routes/RouteAll";
import FacebookPixel from './components/FacebookPixel';
import { useEffect } from 'react';
import { onMessageListener } from './component/firebase/NotificationToken';
import NotificationPermission from './component/NotificationPermission';

function App() {
  useEffect(() => {
    // Initialize foreground notification listener
    onMessageListener()
      .then((payload) => {
      })
      .catch((err) => {
      });
  }, []);

  return (
    <>
      <FacebookPixel />
      <NotificationPermission />
      <RouteAll />
    </>
  );
}

export default App;
