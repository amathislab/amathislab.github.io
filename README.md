# Mathis Group Website


## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

The site will be available at [http://localhost:3000](http://localhost:3000).


## Content Management

### Adding Team Members

Edit `data/people.json`:

```json
{
  "id": "unique-id",
  "name": "Name",
  "role": "PhD Student",
  "project": "Research focus",
  "tags": ["tag1", "tag2"],
  "links": {
    "scholar": "url",
    "github": "url"
  }
}
```

### Adding Publications

Edit `data/publications.json`:

```json
{
  "id": "unique-id",
  "title": "Paper Title",
  "authors": ["Author 1", "Author 2"],
  "year": 2024,
  "venue": "Conference/Journal",
  "type": "conference|journal|preprint",
  "tags": ["tag1", "tag2"],
  "featured": true,
  "links": {
    "arxiv": "url",
    "github": "url"
  }
}
```

### Adding Research Areas

Edit `data/research.json` to add or modify research directions.

## Contributing

This is a research lab website. For updates or corrections:

1. Create a feature branch
2. Make your changes
3. Submit a pull request
