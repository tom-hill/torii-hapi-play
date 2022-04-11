const fs = require('fs');
const path = require('path');

async function readRouteHandler (request, h) {
  let data;

  try {
    data = await fs.readFileSync(path.resolve(__dirname, '../data.json'));
  } catch (err) {
    return h.response(err.message).code(500);
  }

  const body = JSON.parse(data);
  const cleanData = body.data.map((app) => {
    const { name, users } = app;
    return { name, userCount: users.length };
  });

  const createRows = () => {
    let output = '';
    for (let i = cleanData.length; i > 0; i--) {
      const index = i - 1;
      const { name, userCount } = cleanData[index];
      output += `<tr><td>${name}</td><td>${userCount}</td></tr>`;
    }
    return output;
  };

  const response = `
    <table>
      <thead>
          <th>App</th>
          <th># of Users</th>
      </thead>
      ${createRows()}
    </table>
  `;

  return h.response(response).type('text/html');
}

module.exports = {
  handler: readRouteHandler,
};
