exports.config = {
    // Runner Configuration
    runner: 'local',
  
    // Specify Test Files
    specs: [
      './test/features/**/*.feature'
    ],
  
    // Capabilities
    capabilities: [{
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true
    }],
  
    // Test Configurations
    logLevel: 'info',
  
    // Base URL
    baseUrl: 'https://www.ebay.com',
  
    // Default Timeout for all Waits
    waitforTimeout: 10000,
  
    // Framework you are using
    framework: 'cucumber',
  
    // Specifying the test framework
    reporters: ['spec'],
  
    // Services
    services: ['chromedriver'],
  
    // Cucumber options
    cucumberOpts: {
      require: ['./test/step_definitions/**/*.js'], // Load step definitions
      tagExpression: 'not @skip', // Only execute the features or scenarios with this tag
      timeout: 60000, // Timeout for step definitions
    },
  };
  