import { WeElement, define, h } from "omi";
import { Remarkable } from "remarkable";
import autosize from "autosize";
import input from "./index.txt";
import hljs from "highlight.js";
const md = new Remarkable({
  html: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return "";
  }
});

class AppMarkdown extends WeElement {
  render(props) {
    return h(
      "div",
      {
        class: "app-markdown"
      },
      h(
        "div",
        {
          class: "column"
        },
        h("h3", null, "Markdown Input (editable)"),
        h("textarea", {
          value: this.data.input,
          ref: e => {
            this.textarea = e;
          },
          onKeyup: this.getInputValue.bind(this)
        })
      ),
      h(
        "div",
        {
          id: "output",
          class: "column"
        },
        h("h3", null, "Rendered"),
        h("div", {
          id: "rendered",
          class: "markdown-body",
          ref: e => {
            this.rendered = e;
          }
        })
      )
    );
  }

  install() {
    this.data = {
      title: "Install Omi Snippets!",
      input
    };
  }

  installed() {
    this.getInputValue({
      target: {
        value: input
      }
    });
  }

  getInputValue(e) {
    let output = md.render(e.target.value);
    this.rendered.innerHTML = output;
    console.log(output, this.rendered);
    setTimeout(() => {
      autosize(this.textarea);
    }, 0);
  }
}

AppMarkdown.css = `
  * {
    margin: 0;
    padding: 0;
  }

  .app-markdown {
    background-color: #f2f2f2;
    padding: 20px;
    display: flex;
  }

  textarea {
    overflow: hidden;
    overflow-wrap: break-word;
    height: 696px;
  }

  textarea {
    font-size: 14px;
    font-family: Consolas, monaco, monospace;
    resize: none;
    outline: none;
    border: none;
  }

  .column {
    flex: 1;
    padding: 10px;
  }

  .column h3 {
    /* color: black; */
    margin-bottom: 30px;
    text-align: center;
  }

  textarea,
  #rendered {
    /* overflow: hidden; */
    max-width: 800px;
    text-align: left;
    background-color: white;
    display: block;
    width: 95%;
    padding: 20px;
    border-radius: 10px;
  }

  .markdown-body h1 {
    color: red;
  }

  h1 {
    color: red;
  }
`;
define("app-markdown", AppMarkdown);
