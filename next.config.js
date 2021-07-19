/**
 * @type {import('next').NextConfig}
 */
const withPWA = require('next-pwa')
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: prod ? false : true
    },
    images: {
        domains: ['laboratory.binus.ac.id'],
    }
})