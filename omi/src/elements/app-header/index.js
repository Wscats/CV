import { WeElement, define, h } from "omi";

class AppHeader extends WeElement {
  render(props) {
    return h(
      "div",
      null,
      h(
        "div",
        {
          style: "background: rgb(51, 51, 51) none repeat scroll 0% 0%;"
        },
        h(
          "div",
          {
            class: "container"
          },
          h(
            "div",
            {
              class: "text-sm-center text-white py-5"
            },
            h("h1", null, "Omi CV"),
            h(
              "p",
              null,
              "A Markdown Editor Tool with Resume Template for omi.",
              h("br", {
                class: "d-none d-sm-block"
              }),
              "Supports export files and automatic save"
            ),
            h(
              "div",
              {
                class: "mt-4"
              },
              h(
                "a",
                {
                  class: "btn btn-outline-light btn-lg",
                  href: "https://github.com/Wscats/piano"
                },
                "View docs on Github"
              ),
              h(
                "a",
                {
                  class: "btn btn-outline-light btn-lg",
                  href: "https://github.com/Wscats/piano"
                },
                "\u67E5\u770B\u8BE5\u9879\u76EEGithub\u5730\u5740"
              )
            )
          )
        )
      )
    );
  }
}

AppHeader.css = `
    * {
        margin: 0;
        padding: 0;
    }

    .container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;

    }

    .text-white {
        color: #fff !important;

    }

    .text-sm-center {
        text-align: center !important;
    }

    .mt-4,
    .my-4 {
        margin-top: 1.5rem !important;
    }

    .pb-5,
    .py-5 {
        padding-bottom: 3rem !important;
    }

    .pt-5,
    .py-5 {
        padding-top: 3rem !important;
    }

    .btn:not(:disabled):not(.disabled) {

        cursor: pointer;

    }

    .btn-group-lg>.btn,
    .btn-lg {

        padding: 5px 10px;
        font-size: 12px;
        line-height: 15px;
        border-radius: 3px;

    }

    .btn-outline-light {

        color: #f8f9fa;
        background-color: transparent;
        background-image: none;
        border-color: #f8f9fa;

    }

    .btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        padding: 15px 7.5px;
        font-size: 15px;
        line-height: 15px;
        border: 1px solid #fff;
        border-radius: 5px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    a {
        margin: 0 10px;
        text-decoration: none;
    }

    .text-center {
        margin-top: 12px;
        text-align: center !important;
    }

    p {
        margin: 0 10px;
    }
`;
define("app-header", AppHeader);
