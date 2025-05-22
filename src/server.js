import dotenv from 'dotenv';
dotenv.config();

console.log('DB_USER:', process.env.DB_USER);

import app from "./app.js";

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
