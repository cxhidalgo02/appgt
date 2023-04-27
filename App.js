import Navigation from "./src/Navigation";
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function App() {
  return (
    <AlertNotificationRoot>
       <Navigation />
    </AlertNotificationRoot>
  );
}