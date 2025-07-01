# react-crud-gen

Quickly scaffold React CRUD components for Supabase + Vite projects.

## What It Does

This CLI generates:

- Supabase-ready React List component (e.g. `EventList.jsx`)
- A Supabase client config file (`supabaseClient.js`)

Great for bootstrapping full-stack apps using Supabase.

## CLI Prompts

When you run the CLI, you'll be asked:

| Prompt | Example input | Description |
| Entity name | `Event` | The model name in PascalCase |
| Field names | `title,location,date` | Comma-separated property names |
| Frontend component folder | `./src/components` | Folder to save the generated JSX file |

---

## Usage

1. Add your Supabase credentials to a `.env` file:
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key

2. Import and use the component in your app:


3. Run your app

npm run dev

##  Created by:

Caleb Calderon
GitHub: https://github.com/Calebc4554
LinkedIn: https://www.linkedin.com/in/caleb-calderon/


##  Install

```bash
npx react-crud-gen
````
