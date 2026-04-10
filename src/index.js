const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint (GENAI-1572: AC3)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Only start listening when this file is run directly, not when required in tests
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
