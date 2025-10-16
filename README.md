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

### Development Best Practices

Before committing changes, always run:

```bash
# Check code quality and style
npm run lint

# Run tests to ensure functionality
npm test

# Fix auto-fixable linting issues
npm run lint -- --fix
```

These checks ensure:

- Code follows consistent style guidelines
- No TypeScript errors in production build
- All components render correctly
- Accessibility standards are maintained


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

We welcome contributions to improve the website! All changes should go through the pull request process to ensure quality and allow for review.

### Workflow

1. **Fork and clone** the repository and create a branch for your update:

   ```bash
   git checkout -b update/your-change-name
   ```

2. **Make your changes** following our development best practices
   - Run `npm run dev` to preview changes locally
   - Test responsiveness on different screen sizes
   - Ensure accessibility standards are met

3. **Test thoroughly** before committing

   ```bash
   npm run lint        # Check code quality
   npm test            # Run test suite
   ```

4. **Commit your changes** with clear, descriptive messages

   ```bash
   git add .
   git commit -m "feat: add new team member profile"
   ```

5. **Push to your branch** and create a pull request

   ```bash
   git push origin update/your-change-name
   ```

6. **Open a Pull Request** on GitHub
   - Provide a clear title and description
   - Explain what changes were made
   - Request review from team members

7. **Merge** once approved
   - Squash commits if there are many small changes
   - Delete the feature branch after merging

### Quick Content Updates

For simple content updates (team members, publications, research areas):

1. **Always start with a pull request** - even for small changes
2. Edit the relevant JSON file in `/data/`
3. Follow the existing data structure and formatting
4. Verify the change appears correctly in development mode
5. Submit PR with clear description of what was added/changed
