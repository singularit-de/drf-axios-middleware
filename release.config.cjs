module.exports = {
  branches: [
    'master', // deprecated
    {name: 'beta', prerelease: true},
  ],
  // plugins: [
  //   '@semantic-release/commit-analyzer',
  //   '@semantic-release/release-notes-generator',
  //   // [
  //   //   '@semantic-release/exec',
  //   //   {
  //   //     // eslint-disable-next-line no-template-curly-in-string
  //   //     verifyReleaseCmd: 'echo "export default \'${nextRelease.version}\'" > "src/version.ts"',
  //   //   },
  //   // ],
  //   ['@semantic-release/npm', {
  //     npmPublish: false,
  //     tarballDir: 'dist',
  //   }],
  // ],
}

