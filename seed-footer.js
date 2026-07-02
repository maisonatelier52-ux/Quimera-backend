const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://db-8:admin123@cluster0.ph0keki.mongodb.net/news-portal?retryWrites=true&w=majority&appName=Cluster0';

const footerSchema = new mongoose.Schema({
  title: String,
  description: String,
  quickLinks: [{
    label: String,
    url: String,
  }],
  categories: [{
    label: String,
    url: String,
  }],
  copyrightText: String,
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
  }
}, { timestamps: true });

const Footer = mongoose.model('Footer', footerSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const existing = await Footer.findOne();
        if (existing) {
            console.log('Footer already exists');
        } else {
            await Footer.create({
                title: 'Quimera News',
                description: 'The #1 Source for Global News & Premium Insights.',
                quickLinks: [
                    { label: 'About Us', url: '/about-us' },
                    { label: 'Contact', url: '/contact' },
                    { label: 'Privacy Policy', url: '/privacy-policy' },
                    { label: 'Terms & Conditions', url: '/terms' }
                ],
                categories: [
                    { label: 'Politics', url: '/category/politics' },
                    { label: 'Business', url: '/category/business' },
                    { label: 'Tech', url: '/category/tech' },
                    { label: 'Sports', url: '/category/sports' }
                ],
                copyrightText: '© 2026 Quimera News. All rights reserved.',
                socialLinks: {
                    facebook: '#',
                    twitter: '#',
                    instagram: '#',
                    linkedin: '#',
                    youtube: '#'
                }
            });
            console.log('Created default footer');
        }
        
    } catch (err) {
        console.error('Seed failed:', err);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
