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
      {
        source: '/studies',
        destination: '/#topics',
        permanent: true,
      },
      {
        source: '/studies/:slug*',
        destination: '/bible-studies/:slug*',
        permanent: true,
      },
    ]
  },
}
