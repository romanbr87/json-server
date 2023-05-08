import router from './routes/routes';
import { app, server } from "./server"

app.use ('/', router);

