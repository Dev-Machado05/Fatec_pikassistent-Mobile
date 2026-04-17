const app = require('./server');
const PORT = process.env.PORT || 7070;

// Infra do servidor: inicializa a aplicacao na porta definida (ambiente local).
app.listen(PORT, () => {
  console.log(`🚀 App listening on the port: http://localhost:${PORT} `);
  console.log('📊 Database connected');
});