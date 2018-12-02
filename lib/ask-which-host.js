const os = require('os');
const { prompt } = require('enquirer');

module.exports = async function pickHost() {
  const interfaces = os.networkInterfaces();
  let hosts = [];

  Object.keys(interfaces).forEach(key => {
      hosts = hosts.concat(
        interfaces[key]
          .filter(i => i.family === 'IPv4')
          .map(i => i.address)
      );
  });

  const response = await prompt({
      type: 'select',
      name: 'host',
      message: 'Select a host',
      choices: hosts
  });
  return response.host;
}
