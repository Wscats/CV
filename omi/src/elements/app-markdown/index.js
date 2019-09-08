import { WeElement, define, h } from "omi";
import { Remarkable } from "remarkable";
import autosize from "autosize";
import input from "./index.txt";
import hljs from "highlight.js";
import style from "./index.css";
import contact from "./template/contact.txt";
import personal from "./template/personal.txt";
import work from "./template/work.txt";
import project from "./template/project.txt";
import source from "./template/source.txt";
import skill from "./template/skill.txt";
import evaluation from "./template/evaluation.txt";
import thank from "./template/thank.txt";
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
      null,
      h(
        "div",
        {
          class: "text-center"
        },
        h(
          "p",
          null,
          "Click on the button below to add the corresponding content to your resume:"
        ),
        h(
          "p",
          null,
          "\u70B9\u51FB\u4E0B\u9762\u6309\u94AE\uFF0C\u8BA9\u7B80\u5386\u589E\u52A0\u5BF9\u5E94\u7684\u5185\u5BB9:"
        ),
        h(
          "div",
          null,
          h(
            "div",
            null,
            h(
              "button",
              {
                onClick: this.insertInformation.bind(this, 1),
                class: "btn btn-outline-info"
              },
              "\u8054\u7CFB\u65B9\u5F0F"
            ),
            "+ ",
            h(
              "button",
              {
                onClick: this.insertInformation.bind(this, 2),
                class: "btn btn-outline-info"
              },
              "\u4E2A\u4EBA\u4FE1\u606F"
            ),
            "+ ",
            h(
              "button",
              {
                onClick: this.insertInformation.bind(this, 3),
                class: "btn btn-outline-info"
              },
              "\u5DE5\u4F5C\u7ECF\u5386"
            ),
            "+ ",
            h(
              "button",
              {
                onClick: this.insertInformation.bind(this, 4),
                class: "btn btn-outline-info"
              },
              "\u516C\u53F8\u9879\u76EE\u548C\u4F5C\u54C1"
            ),
            "+ ",
            h(
              "button",
              {
                onClick: this.insertInformation.bind(this, 5),
                class: "btn btn-outline-info"
              },
              "\u5F00\u6E90\u9879\u76EE\uFF0C\u535A\u5BA2\u548C\u6587\u7AE0"
            ),
            "+ ",
            h(
              "button",
              {
                onClick: this.insertInformation.bind(this, 6),
                class: "btn btn-outline-info"
              },
              "\u6280\u80FD\u6E05\u5355"
            ),
            "+ ",
            h(
              "button",
              {
                onClick: this.insertInformation.bind(this, 7),
                class: "btn btn-outline-info"
              },
              "\u81EA\u6211\u8BC4\u4EF7"
            ),
            "+ ",
            h(
              "button",
              {
                onClick: this.insertInformation.bind(this, 8),
                class: "btn btn-outline-info"
              },
              "\u81F4\u8C22"
            ),
            "= ",
            h(
              "button",
              {
                onClick: this.download.bind(this),
                class: "btn btn-stop"
              },
              "\u4E0B\u8F7D&&\u5BFC\u51FA\u7B80\u5386"
            )
          )
        ),
        h("hr", null)
      ),
      h(
        "div",
        {
          class: "app-markdown"
        },
        h(
          "div",
          {
            class: "column"
          },
          h("h3", null, "Markdown Input (editable) - \u8F93\u5165"),
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
          h("h3", null, "Rendered - \u8F93\u51FA"),
          h("div", {
            id: "rendered",
            class: "markdown-body",
            ref: e => {
              this.rendered = e;
            }
          })
        )
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
    this.data.input = e.target.value;
    console.log(output, this.rendered);
    setTimeout(() => {
      autosize(this.textarea);
    }, 0);
  }

  insertInformation(type) {
    switch (type) {
      case 1:
        this.data.input = this.data.input + contact;
        break;

      case 2:
        this.data.input = this.data.input + personal;
        break;

      case 3:
        this.data.input = this.data.input + work;
        break;

      case 4:
        this.data.input = this.data.input + project;
        break;

      case 5:
        this.data.input = this.data.input + source;
        break;

      case 6:
        this.data.input = this.data.input + skill;
        break;

      case 7:
        this.data.input = this.data.input + evaluation;
        break;

      case 8:
        this.data.input = this.data.input + thank;
        break;
    }

    this.rendered.innerHTML = md.render(this.data.input);
    this.update();
    this.textarea.focus();
    setTimeout(() => {
      autosize(this.textarea);
    }, 0);
  }

  download() {
    console.log(this.data.input);
    let a = document.createElement("a");
    let blob = new Blob([this.data.input]);
    a.download = "CV.md";
    a.href = URL.createObjectURL(blob);
    a.click();
  }
}

AppMarkdown.css =
  `
  * {
    margin: 0;
    padding: 0;
  }

  .text-center {
    background-color: #f2f2f2;
    padding-top: 25px;
    text-align: center;
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

  .btn-outline-info {
    color: #17a2b8;
    background-color: transparent;
    background-image: none;
    border-color: #17a2b8;

  }

  .btn {
    text-transform: none;
    margin: 15px;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    /* white-space: nowrap; */
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #17a2b8;
    padding: 8px 8px;
    font-size: 16px;
    line-height: 16px;
    border-radius: 2.5px;
    /* transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out; */
  }

  .btn-stop {
    color: #ff7171;
    border-color: #ff7171;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    margin: 0 50px;
    border: 0;
    border-top-color: currentcolor;
    border-top-style: none;
    border-top-width: 0px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
` + style;
define("app-markdown", AppMarkdown);
