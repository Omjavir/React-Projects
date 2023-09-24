import { Children, useState } from "react";
import "./App.css";

const files = {
  subFiles: [
    {
      name: "node_modules",
      subFiles: [
        {
          name: "bin",
          subFiles: [
            {
              name: "acorn.cmd",
            },
            {
              name: "browserlist.cmd",
            },
          ],
        },
        {
          name: "vite",
        },
        {
          name: "babel",
          subFiles: [
            {
              name: "core.cmd",
            },
          ],
        },
        {
          name: "types",
        },
      ],
    },
    {
      name: "public",
      subFiles: [
        {
          name: "vite.svg",
        },
      ],
    },
    {
      name: "src",
      subFiles: [
        {
          name: "App.css",
        },
        {
          name: "App.jsx",
        },
        {
          name: "Main.jsx",
        },
      ],
    },
    {
      name: ".gitignore",
    },
    {
      name: "index.html",
    },
    {
      name: "package.json",
    },
    {
      name: "README.md",
    },
  ],
};

function Entry({ name, subFiles }) {
  // console.log("name", name);
  // console.log("subFiles", subFiles);

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      {subFiles ? (
        <button
          className="children"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {name} {isExpanded ? "-" : "+"}
        </button>
      ) : (
        <button className="children">{name}</button>
      )}
      {isExpanded && (
        <div className="padding">
          {subFiles.map((entry) => (
            <Entry
              name={entry.name}
              subFiles={entry.subFiles}
              key={entry.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="center pointer">
      {files.subFiles.map((entry) => (
        <Entry name={entry.name} subFiles={entry.subFiles} key={entry.name} />
      ))}
    </div>
  );
}

export default App;
