module.exports = {
  async redirects() {
    return [
      {
        source: '/topics',
        destination: '/#topics',
        permanent: true,
      },
      {
        source: '/bible-studies',
        destination: '/#bible-studies',
        permanent: true,
      },
    ]
  },
}