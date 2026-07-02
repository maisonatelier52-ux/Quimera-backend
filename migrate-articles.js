const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = 'mongodb+srv://db-8:admin123@cluster0.ph0keki.mongodb.net/news-portal?retryWrites=true&w=majority&appName=Cluster0';

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  bannerImage: String,
  description: String,
  position: Number,
  isVisible: Boolean
}, { timestamps: true });

const articleSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  excerpt: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isPublished: Boolean,
  image: String,
  author: Object,
  date: String,
  content: Array
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
const Article = mongoose.model('Article', articleSchema);

const articlesDir = 'c:/Users/progr/OneDrive/Desktop/foxiz-p8/public/data/articles';

async function migrate() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.json'));
        
        for (const file of files) {
            const slug = file.replace('.json', '');
            const filePath = path.join(articlesDir, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            const catName = data.category || 'Uncategorized';
            const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            
            let category = await Category.findOne({ slug: catSlug });
            if (!category) {
                category = await Category.create({
                    name: catName,
                    slug: catSlug,
                    isVisible: true
                });
                console.log(`Created category: ${catName}`);
            }

            let excerpt = '';
            if (data.content && data.content.length > 0) {
                const introPara = data.content.find((c) => c.type === 'intro' || c.type === 'paragraph');
                if (introPara && introPara.text) {
                    excerpt = introPara.text.substring(0, 150) + '...';
                }
            }

            const existingArticle = await Article.findOne({ slug });
            if (existingArticle) {
                console.log(`Article ${slug} already exists, skipping...`);
                continue;
            }

            await Article.create({
                title: data.title,
                slug: slug,
                excerpt: excerpt,
                category: category._id,
                isPublished: true,
                image: data.image,
                author: data.author,
                date: data.date,
                content: data.content
            });
            console.log(`Created article: ${slug}`);
        }

        console.log('Migration complete!');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await mongoose.disconnect();
    }
}

migrate();
