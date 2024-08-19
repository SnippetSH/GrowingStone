from flask import Flask

app = Flask(__name__)
hostUrl = "0.0.0.0"
hostPort = "5000"


@app.route('/')
def home():
    return "hello"


if __name__ == "__main__":
    app.run(debug=True,
            host=hostUrl,
            port=hostPort)