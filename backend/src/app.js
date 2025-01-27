import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import histogramRoutes from './routes/index.js';
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(cors());
app.use(express.json());
app.use('/', histogramRoutes);

app.use((req, res) => {
  res.status(404).send('Error 404: This URL does not exist' );
});

app.use((err, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;