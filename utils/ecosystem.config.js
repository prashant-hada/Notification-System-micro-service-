export default {
    apps: [
      {
        name: 'main-server',
        script: 'server.js', // Your main server entry point
        instances: 1,
        exec_mode: 'cluster',
      },
      {
        name: 'worker',
        script: 'utils/worker.js', // Path to your worker script
        instances: 1,
        exec_mode: 'cluster'
      },
    ],
  };
  