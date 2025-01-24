from sanic import Sanic 
from sanic.response import html,file

app = Sanic('reviewer')

@app.route('/')
async def index(request):
    return html("""
                <html>
                    <head>
                        <title> test </title>

  <meta name="theme-color" content="#317EFB"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
<!--
  <link rel="icon" href="{{url_for('static', filename='icons/icon_144x144.png')}}" type="image/png">
  <link rel="icon" href="{{url_for('static', filename='icons/icon_192x192.png')}}" type="image/png">
  <link rel="icon" href="{{url_for('static', filename='icons/icon_512x512.png')}}" type="image/png">
  <link rel="apple-touch-icon" href="{{url_for('static', filename='icons/icon_144x144.png')}}" type="image/png">
  <link rel="apple-touch-icon" href="{{url_for('static', filename='icons/icon_192x192.png')}}" type="image/png">
  <link rel="apple-touch-icon" href="{{url_for('static', filename='icons/icon_512x512.png')}}" type="image/png">
                -->
  <link rel="manifest" href="/manifest.json">
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register("/sw.js").then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  </script>
                    </head>
                    <body>
                        <h1> Test </h1>
                <a href="/check"> Go check </a>
                    </body>
                </html>
""")    

@app.route('check')
async def check(request):
    return html("""
                <html>
                    <head>
                        <title> test </title>

  <meta name="theme-color" content="#317EFB"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="manifest" href="/manifest.json">
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register("/sw.js").then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  </script>
                    </head>
                    <body>
                        <h1> Test </h1>
                <a href="/"> Go back </a>
                    </body>
                </html>
""")    

@app.route('manifest.json')
async def send_manifest(request):
    return await file("manifest.json",mime_type="application/manifest+json")
    
@app.route('sw.js')
async def send_service_worker(request):
    return await file("sw.js",mime_type="application/javascript")
if __name__ == "__main__":
    app.run()