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
        disable: prod ? false : true,
        sw: '/service-worker.js'
    },
    images: {
        domains: ['laboratory.binus.ac.id'],
    }
})