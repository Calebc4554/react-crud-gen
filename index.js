#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const supabaseClientTemplate = () => `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
`;

const reactComponentTemplate = (name, fields) => `import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function ${name}List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('${name.toLowerCase()}s').select('*');
      if (error) console.error(error);
      else setData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>${name} List</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.${fields[0]}}</li>
        ))}
      </ul>
    </div>
  );
}
`;

async function run() {
	const answers = await inquirer.prompt([
		{ name: "entity", message: "Entity name (PascalCase):" },
		{ name: "fields", message: "Comma-separated field names (e.g. title,description):" },
		{ name: "frontendDir", message: "Frontend component output directory:" },
	]);

	const entity = answers.entity;
	const fields = answers.fields.split(",").map((f) => f.trim());

	// React Component
	const componentCode = reactComponentTemplate(entity, fields);
	const frontendPath = path.join(answers.frontendDir, `${entity}List.jsx`);
	fs.writeFileSync(frontendPath, componentCode);

	// Supabase Client
	const clientPath = path.join(answers.frontendDir, "..", "supabaseClient.js");
	if (!fs.existsSync(clientPath)) {
		const clientCode = supabaseClientTemplate();
		fs.writeFileSync(clientPath, clientCode);
	}

	console.log(" React component and Supabase client created successfully.");
	console.log(" Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
}

run();
