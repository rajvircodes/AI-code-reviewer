import { useState } from 'react'
import axios from 'axios'

// CSS Imports
import "prismjs/themes/prism-tomorrow.css"
import "highlight.js/styles/github-dark.css"
import './App.css'

// Glitch-proof imports (Jugaad wrapper)
import RawEditor from "react-simple-code-editor"
import RawMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import prism from "prismjs"

const Editor = RawEditor.default || RawEditor;
const Markdown = RawMarkdown.default || RawMarkdown;

const App = () => {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState('')

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
    } catch (e) {
      setReview("Error connecting to server...")
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <button onClick={reviewCode} className="review">Review</button>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  )
}

export default App