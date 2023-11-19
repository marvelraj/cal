const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/calculate', (req, res) => {
  const { num1, num2, operator } = req.body;

  if (!num1 || !num2 || !operator) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const parsedNum1 = parseFloat(num1);
  const parsedNum2 = parseFloat(num2);

  if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  let result;

  switch (operator) {
    case '+':
      result = parsedNum1 + parsedNum2;
      break;
    case '-':
      result = parsedNum1 - parsedNum2;
      break;
    case '*':
      result = parsedNum1 * parsedNum2;
      break;
    case '/':
      if (parsedNum2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero' });
      }
      result = parsedNum1 / parsedNum2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operator' });
  }

  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
